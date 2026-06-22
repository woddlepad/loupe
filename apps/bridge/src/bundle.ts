import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { Annotation } from "@loupe/core/model";
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

  // Touch an append-only comment log so agents/teammates can write follow-ups.
  if (!existsSync(join(absDir, "comments.jsonl"))) writeFileSync(join(absDir, "comments.jsonl"), "");

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

  return { id: annotation.id, dir, absDir, screenshot, references };
}

function bundleSlug(a: Annotation): string {
  const date = (a.createdAt || new Date().toISOString()).slice(0, 10);
  const id = a.id.replace(/[^a-z0-9]/gi, "").slice(0, 8) || "anon";
  return `${date}-${id}`;
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
