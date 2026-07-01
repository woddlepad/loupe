import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { Annotation, NetworkEntry, RecordingCapture, RecordingKeyframe } from "@loupe/core/model";
import type { SourceResolution } from "./resolve/index.js";
import { groupSlug } from "./store.js";

export interface WrittenBundle {
  id: string;
  /** Repo-relative bundle directory, e.g. .loupe/annotations/2026-06-21-a1b2. */
  dir: string;
  /** Absolute bundle directory. */
  absDir: string;
  /** Absolute path to the screenshot, if one was written. */
  screenshot?: string;
  /** Absolute paths to reference images (refs/), if any. */
  references: string[];
  /** Absolute paths to recording keyframes, if any. */
  keyframes: string[];
}

/**
 * Write an annotation into the target repo under `.loupe/annotations/<id>/` as
 * committable files: `shot.png`, `note.md` (human + agent readable), and
 * `meta.json` (machine payload). These are meant to be committed and shared.
 */
export function writeBundle(
  repoRoot: string,
  annotation: Annotation,
  resolution: SourceResolution,
): WrittenBundle {
  // Nest by group so a batch (e.g. "notes UI refactor") stays together on disk.
  const dir = join(".loupe", "annotations", groupSlug(annotation.group), bundleSlug(annotation));
  const absDir = resolve(repoRoot, dir);
  mkdirSync(absDir, { recursive: true });

  let screenshot: string | undefined;
  if (annotation.screenshotDataUrl) {
    const png = dataUrlToBuffer(annotation.screenshotDataUrl);
    if (png) {
      screenshot = join(absDir, "shot.png");
      writeFileSync(screenshot, png);
    }
  }

  // Persist reference images into refs/ and replace inline data URLs with files.
  const references: string[] = [];
  const persistedRefs = (annotation.references ?? []).map((ref, i) => {
    if (!ref.dataUrl) return { caption: ref.caption, file: ref.file };
    const decoded = decodeImage(ref.dataUrl);
    if (!decoded) return { caption: ref.caption };
    mkdirSync(join(absDir, "refs"), { recursive: true });
    const name = `refs/ref-${i + 1}.${decoded.ext}`;
    const abs = join(absDir, name);
    writeFileSync(abs, decoded.buffer);
    references.push(abs);
    return { caption: ref.caption, file: name };
  });

  const { screenshotDataUrl: _omit, ...rest } = annotation;
  const meta = { ...rest, references: persistedRefs, resolution };
  writeFileSync(join(absDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
  writeFileSync(
    join(absDir, "note.md"),
    renderNote(annotation, resolution, Boolean(screenshot), persistedRefs),
  );

  return { id: annotation.id, dir, absDir, screenshot, references, keyframes: [] };
}

function bundleSlug(a: Annotation): string {
  const date = (a.createdAt || new Date().toISOString()).slice(0, 10);
  const id = a.id.replace(/[^a-z0-9]/gi, "").slice(0, 8) || "anon";
  return `${date}-${id}`;
}

/**
 * Write a flow recording into `.loupe/recordings/<group>/<id>/` as committable
 * files: `recording.webm`, `console.log`, `network.jsonl`, `errors.jsonl`,
 * `note.md`, and `meta.json`. The heavy video + telemetry live in their own
 * files; `meta.json` keeps only compact counts and file pointers so it stays
 * cheap for an agent to read.
 */
export function writeRecordingBundle(
  repoRoot: string,
  annotation: Annotation,
  resolution: SourceResolution,
): WrittenBundle {
  // Recordings are local-only by default (large video binaries).
  ensureRecordingsGitignored(repoRoot);

  const dir = join(".loupe", "recordings", groupSlug(annotation.group), bundleSlug(annotation));
  const absDir = resolve(repoRoot, dir);
  mkdirSync(absDir, { recursive: true });

  const rec = annotation.recording;

  let video: string | undefined;
  if (rec?.videoDataUrl) {
    const buffer = decodeVideo(rec.videoDataUrl);
    if (buffer) {
      video = "recording.webm";
      writeFileSync(join(absDir, video), buffer);
    }
  }

  const consoleLines = (rec?.console ?? []).map((c) => `[${formatTime(c.t)}] ${c.level.toUpperCase()} ${c.text}`);
  writeFileSync(join(absDir, "console.log"), joinLines(consoleLines));
  writeFileSync(join(absDir, "network.jsonl"), joinLines((rec?.network ?? []).map((n) => JSON.stringify(n))));
  writeFileSync(join(absDir, "errors.jsonl"), joinLines((rec?.errors ?? []).map((e) => JSON.stringify(e))));
  writeFileSync(join(absDir, "events.jsonl"), joinLines((rec?.events ?? []).map((e) => JSON.stringify(e))));

  const keyframes: string[] = [];
  const persistedKeyframes = (rec?.keyframes ?? []).map((frame, i) => {
    const persisted = persistRecordingKeyframe(absDir, frame, i + 1);
    if (persisted.absPath) keyframes.push(persisted.absPath);
    return persisted.meta;
  });

  const recordingMeta = rec
    ? {
        startedAt: rec.startedAt,
        durationMs: rec.durationMs,
        video: video ?? null,
        counts: {
          console: rec.console.length,
          network: rec.network.length,
          errors: rec.errors.length,
          failedRequests: rec.network.filter(isFailedRequest).length,
          events: rec.events?.length ?? 0,
          keyframes: persistedKeyframes.length,
        },
        files: {
          console: "console.log",
          network: "network.jsonl",
          errors: "errors.jsonl",
          events: "events.jsonl",
          keyframes: persistedKeyframes.map((frame) => frame.file).filter(Boolean),
        },
        keyframes: persistedKeyframes,
      }
    : undefined;

  const { screenshotDataUrl: _shot, recording: _rec, ...rest } = annotation;
  const meta = { ...rest, recording: recordingMeta, resolution };
  writeFileSync(join(absDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
  writeFileSync(join(absDir, "note.md"), renderRecordingNote(annotation, rec, video, persistedKeyframes));

  return { id: annotation.id, dir, absDir, references: [], keyframes };
}

function renderRecordingNote(
  a: Annotation,
  rec: RecordingCapture | undefined,
  video: string | undefined,
  persistedKeyframes: RecordingKeyframe[],
): string {
  const failed = (rec?.network ?? []).filter(isFailedRequest);
  const errors = rec?.errors ?? [];
  const keyframes = persistedKeyframes.filter((frame) => frame.file);
  return [
    `# Flow recording ${a.id}`,
    "",
    video ? `🎥 [recording.webm](./${video}) · ${formatDuration(rec?.durationMs ?? 0)}` : "_(no video captured)_",
    "",
    `**Page:** ${a.title} — ${a.url}`,
    a.group ? `**Group:** ${a.group}` : "",
    rec
      ? `**Captured:** ${rec.console.length} console · ${rec.network.length} requests · ${errors.length} errors · ${failed.length} failed requests · ${rec.events?.length ?? 0} events · ${keyframes.length} keyframes`
      : "",
    "",
    "## Requested change",
    a.note || "_(no free-form note)_",
    "",
    keyframes.length
      ? "## Keyframes\n" +
        keyframes
          .map((frame, i) => {
            const file = frame.file ?? `keyframes/frame-${String(i + 1).padStart(3, "0")}.png`;
            return `- \`${formatTime(frame.t)}\` ${frame.label} — ![${frame.label}](./${file})`;
          })
          .join("\n") +
        "\n"
      : "",
    "## Captured logs",
    "- console: [`console.log`](./console.log)",
    "- network: [`network.jsonl`](./network.jsonl)",
    "- errors: [`errors.jsonl`](./errors.jsonl)",
    "- events: [`events.jsonl`](./events.jsonl)",
    errors.length
      ? "\n## Errors during the flow\n" +
        errors.map((e) => `- \`${formatTime(e.t)}\` **${e.kind}**: ${e.message}`).join("\n")
      : "",
    failed.length
      ? "\n## Failed requests\n" +
        failed.map((n) => `- \`${formatTime(n.t)}\` ${n.method} ${n.url} → ${n.error ?? n.status}`).join("\n")
      : "",
    "",
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

function persistRecordingKeyframe(
  absDir: string,
  frame: RecordingKeyframe,
  index: number,
): { meta: RecordingKeyframe; absPath?: string } {
  const { dataUrl: _dataUrl, ...meta } = frame;
  if (!frame.dataUrl) return { meta };
  const decoded = decodeImage(frame.dataUrl);
  if (!decoded) return { meta };
  mkdirSync(join(absDir, "keyframes"), { recursive: true });
  const file = `keyframes/frame-${String(index).padStart(3, "0")}.${decoded.ext}`;
  const absPath = join(absDir, file);
  writeFileSync(absPath, decoded.buffer);
  return { meta: { ...meta, file }, absPath };
}

/**
 * Ensure `.loupe/.gitignore` excludes `recordings/` so flow recordings (large
 * webm videos) stay local by default. Idempotent: appends the rule only if no
 * existing line already ignores the directory. Committed so the rule travels
 * with the repo for teammates.
 */
export function ensureRecordingsGitignored(repoRoot: string): void {
  const loupeDir = resolve(repoRoot, ".loupe");
  mkdirSync(loupeDir, { recursive: true });
  const gitignore = join(loupeDir, ".gitignore");
  const existing = existsSync(gitignore) ? readFileSync(gitignore, "utf8") : "";
  const alreadyIgnored = existing
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^\//, "").replace(/\/$/, ""))
    .some((line) => line === "recordings");
  if (alreadyIgnored) return;
  const prefix = existing.length === 0 || existing.endsWith("\n") ? existing : `${existing}\n`;
  writeFileSync(gitignore, `${prefix}# Loupe flow recordings are local by default (large video binaries).\nrecordings/\n`);
}

function isFailedRequest(n: NetworkEntry): boolean {
  return Boolean(n.error) || (n.status ?? 0) >= 400;
}

function joinLines(lines: string[]): string {
  return lines.length ? lines.join("\n") + "\n" : "";
}

function formatTime(ms: number): string {
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatDuration(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function decodeVideo(dataUrl: string): Buffer | null {
  const m = dataUrl.match(/^data:video\/[a-z0-9.+-]+;base64,(.+)$/i);
  if (!m) return null;
  return Buffer.from(m[1]!, "base64");
}

export interface WrittenReference {
  id: string;
  dir: string;
  absDir: string;
}

/**
 * Write a cross-site reference capture (e.g. a Notion screenshot) into the
 * shared library at `.loupe/references/<id>/`. Lighter than an annotation: just
 * the screenshot, the note, and where it came from — meant to be pulled into a
 * real annotation later without re-screenshotting.
 */
export function writeReference(repoRoot: string, a: Annotation): WrittenReference {
  const dir = join(".loupe", "references", bundleSlug(a));
  const absDir = resolve(repoRoot, dir);
  mkdirSync(absDir, { recursive: true });

  if (a.screenshotDataUrl) {
    const png = dataUrlToBuffer(a.screenshotDataUrl);
    if (png) writeFileSync(join(absDir, "shot.png"), png);
  }

  const { screenshotDataUrl: _omit, ...meta } = a;
  writeFileSync(join(absDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
  writeFileSync(
    join(absDir, "note.md"),
    [
      `# Reference ${a.id}`,
      "",
      a.screenshotDataUrl ? "![reference](./shot.png)" : "_(no screenshot)_",
      "",
      `**From:** ${a.title} — ${a.url}`,
      "",
      a.note || "_(no note)_",
      "",
    ].join("\n"),
  );

  return { id: a.id, dir, absDir };
}

function renderNote(
  a: Annotation,
  r: SourceResolution,
  hasShot: boolean,
  refs: Array<{ caption?: string; file?: string }>,
): string {
  const chain = a.target.componentChain.map((c) => c.name).join(" › ") || "(no React component found)";
  const slot = a.target.dataAttributes["data-slot"];
  const suggestions = a.acceptedSuggestions.map((s) => `- **${s.label}** — ${s.detail}`).join("\n");
  const candidates = r.candidates.length
    ? r.candidates.map((c) => `- \`${c}\``).join("\n")
    : "- _(unresolved — use the component name + selector + screenshot)_";
  const refImgs = refs
    .filter((ref) => ref.file)
    .map((ref) => `![${ref.caption ?? "reference"}](./${ref.file})`)
    .join("\n");

  return [
    `# Annotation ${a.id}`,
    "",
    hasShot ? "![screenshot](./shot.png)" : "_(no screenshot)_",
    "",
    `**Page:** ${a.title} — ${a.url}`,
    a.group ? `**Group:** ${a.group}` : "",
    `**Component:** ${chain}${slot ? `  ·  data-slot=\`${slot}\`` : ""}`,
    `**Source (${r.method}):** ${r.primary ? `\`${r.primary}\`` : "_unresolved_"}`,
    `**Selector:** \`${a.target.selector}\``,
    a.target.text ? `**Text:** “${a.target.text}”` : "",
    "",
    "## Source candidates",
    candidates,
    "",
    "## Note",
    a.note || "_(no free-form note)_",
    refImgs ? "\n## Reference images\n" + refImgs : "",
    suggestions ? "\n## Suggested fixes\n" + suggestions : "",
    "",
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

function dataUrlToBuffer(dataUrl: string): Buffer | null {
  const m = dataUrl.match(/^data:image\/png;base64,(.+)$/);
  if (!m) return null;
  return Buffer.from(m[1]!, "base64");
}

/** Decode any image data URL to a buffer + file extension. */
function decodeImage(dataUrl: string): { buffer: Buffer; ext: string } | null {
  const m = dataUrl.match(/^data:image\/([a-z0-9.+-]+);base64,(.+)$/i);
  if (!m) return null;
  const ext = m[1]!.toLowerCase().replace("jpeg", "jpg").replace("svg+xml", "svg");
  return { buffer: Buffer.from(m[2]!, "base64"), ext };
}
