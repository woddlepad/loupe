#!/usr/bin/env node
import { resolve } from "node:path";
import { spawn } from "node:child_process";
import { cpSync, existsSync, chmodSync, mkdirSync, rmSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { AnnotationStatus } from "@loupe/core/model";
import { createBridge } from "./server.js";
import { loadConfig } from "./config.js";
import { listDreams, readDream } from "./dreams.js";
import { initProject } from "./project.js";
import { groupSummaries, listAnnotations, listRecordings, setAnnotationStatus, updateAnnotation, type StoredAnnotation } from "./store.js";
import { captureStory, resolveStorybookBaseUrl, storybookContext, storyUrl } from "./storybook.js";

const STATUS_VALUES = ["open", "needs_review", "resolved"] as const satisfies readonly AnnotationStatus[];

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const cmd = args[0];
  if (!cmd || cmd === "help" || cmd === "--help" || cmd === "-h") return help();

  if (cmd === "init") return init(args.slice(1));
  if (cmd === "bridge" || cmd === "start") return bridge(args.slice(1));
  if (cmd === "list" || cmd === "ls") return list(args.slice(1));
  if (cmd === "dreams") return dreams(args.slice(1));
  if (cmd === "dream") return dream(args.slice(1));
  if (cmd === "dreamer") return dreamer(args.slice(1));
  if (cmd === "show") return show(args.slice(1));
  if (cmd === "story") return story(args.slice(1));
  if (cmd === "status") return status(args.slice(1));
  if (cmd === "title") return title(args.slice(1));
  if (cmd === "install-skill") return installSkill();

  throw new Error(`unknown command "${cmd}"`);
}

function init(args: string[]): void {
  const repoRoot = resolve(strFlag(args, "--repo") ?? process.cwd());
  const name = strFlag(args, "--name");
  const origins = allFlags(args, "--origin");
  const ports = allFlags(args, "--port").map((p) => Number(p));
  const result = initProject({
    repoRoot,
    ...(name ? { name } : {}),
    ...(origins.length ? { origins } : {}),
    ...(ports.length ? { ports } : {}),
  });

  if (hasFlag(args, "--json")) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log(`Initialized Loupe project: ${result.project.name}`);
  console.log(`Repo: ${result.project.repoRoot}`);
  if (result.project.framework) console.log(`Detected: ${result.project.framework}`);
  console.log(`Origins: ${result.project.origins.join(", ")}`);
  console.log(`Repo config: ${result.configPath}`);
  console.log(`Project registry: ${result.registryPath}`);
  console.log("");
  console.log("Next:");
  console.log("  loupe bridge");
  console.log("Then keep the Chrome extension pointed at http://localhost:7337.");
}

async function bridge(args: string[]): Promise<void> {
  const port = numFlag(args, "--port");
  const host = strFlag(args, "--host");
  const repoRoot = strFlag(args, "--repo");
  const config = loadConfig({
    ...(port !== undefined ? { port } : {}),
    ...(host !== undefined ? { host } : {}),
    ...(repoRoot !== undefined ? { repoRoot: resolve(repoRoot) } : {}),
  });
  const server = createBridge(config);
  await server.listen();
  for (const sig of ["SIGINT", "SIGTERM"] as const) {
    process.on(sig, () => {
      console.log("\n[loupe] shutting down");
      void server.close().then(() => process.exit(0));
    });
  }
}

function list(args: string[]): void {
  const repo = repoRoot(args);
  const annotations = listAnnotations(repo);
  if (hasFlag(args, "--json")) {
    console.log(JSON.stringify({ repo, groups: groupSummaries(repo), annotations }, null, 2));
    return;
  }
  console.log(`Loupe annotations in ${repo}\n`);
  const groups = groupSummaries(repo);
  if (groups.length === 0) {
    console.log("No annotations found.");
    return;
  }
  for (const group of groups) {
    console.log(`${group.group} (${group.open}/${group.count} open)`);
    for (const a of annotations.filter((item) => item.groupSlug === group.slug)) {
      console.log(`  ${a.id}  ${a.status ?? "open"}  ${a.label || a.note || "(no note)"}`);
    }
    console.log("");
  }

  const recordings = listRecordings(repo);
  if (recordings.length > 0) {
    console.log("Flow recordings");
    for (const r of recordings) {
      console.log(`  ${r.id}  ${r.status ?? "open"}  🎥 ${r.note || "(no note)"}`);
    }
    console.log("");
  }
}

function dreams(args: string[]): void {
  const repo = repoRoot(args);
  const items = listDreams(repo);
  if (hasFlag(args, "--json")) {
    console.log(JSON.stringify({ repo, dreams: items }, null, 2));
    return;
  }
  console.log(`Loupe dreams in ${repo}\n`);
  if (items.length === 0) {
    console.log("No dreams found.");
    return;
  }
  for (const item of items) {
    const marker = item.recommended ? "tonight" : item.status ?? "planned";
    console.log(`${item.id}  ${marker}  ${item.title}`);
    if (item.summary) console.log(`  ${item.summary}`);
    console.log(`  ${resolve(repo, item.dir)}`);
  }
}

function dream(args: string[]): void {
  const id = args.find((arg) => !arg.startsWith("-"));
  if (!id) throw new Error("usage: loupe dream <dream_id> [--repo <path>] [--json]");
  const repo = repoRoot(args);
  const item = readDream(repo, id);
  if (!item) throw new Error(`dream ${id} not found`);
  if (hasFlag(args, "--json")) {
    console.log(JSON.stringify({ repo, dream: item }, null, 2));
    return;
  }
  console.log(renderDream(repo, item));
}

function dreamer(args: string[]): void {
  const repo = repoRoot(args);
  const config = loadConfig({ repoRoot: repo });
  const host = strFlag(args, "--host") ?? config.host;
  const port = numFlag(args, "--port") ?? config.port;
  const browserHost = host === "0.0.0.0" || host === "::" ? "localhost" : host;
  console.log(`http://${browserHost}:${port}/dreamer?repoRoot=${encodeURIComponent(repo)}`);
}

function show(args: string[]): void {
  const target = args.find((arg) => !arg.startsWith("-"));
  if (!target) throw new Error("usage: loupe show <group|annotation_id> [--repo <path>] [--json]");
  const repo = repoRoot(args);
  const matches = resolveTarget(repo, target);
  if (matches.length === 0) throw new Error(`no annotation or group matched "${target}"`);
  if (hasFlag(args, "--json")) {
    console.log(JSON.stringify({ repo, target, annotations: matches }, null, 2));
    return;
  }
  console.log(renderContext(repo, target, matches));
}

async function story(args: string[]): Promise<void> {
  const subcommand = args[0];
  if (subcommand === "open") return openStory(args.slice(1));
  if (subcommand !== "shot") throw new Error("usage: loupe story <shot|open> <annotation_id|story_id> [options]");
  const shotArgs = args.slice(1);
  const target = positionalArgs(shotArgs, ["--url", "--output", "--selector", "--repo"])[0];
  if (!target) throw new Error("usage: loupe story shot <annotation_id|story_id> [--url <storybook_url>] [--output <path>] [--selector <css>] [--repo <path>]");
  const repo = repoRoot(shotArgs);
  const annotation = resolveTarget(repo, target)[0];
  const result = await captureStory({
    repoRoot: repo,
    target,
    ...(annotation ? { annotation } : {}),
    ...(strFlag(shotArgs, "--url") ? { baseUrl: strFlag(shotArgs, "--url") } : {}),
    ...(strFlag(shotArgs, "--output") ? { output: strFlag(shotArgs, "--output") } : {}),
    ...(strFlag(shotArgs, "--selector") ? { selector: strFlag(shotArgs, "--selector") } : {}),
  });
  if (hasFlag(shotArgs, "--json")) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`Captured Storybook story ${result.storyId}`);
    console.log(`URL: ${result.url}`);
    console.log(`Screenshot: ${result.output}`);
  }
}

function openStory(args: string[]): void {
  const target = positionalArgs(args, ["--url", "--repo"])[0];
  if (!target) throw new Error("usage: loupe story open <annotation_id|story_id> [--url <storybook_url>] [--repo <path>]");
  const repo = repoRoot(args);
  const annotation = resolveTarget(repo, target)[0];
  const context = annotation ? storybookContext(annotation) : undefined;
  if (annotation && !context) throw new Error(`annotation ${annotation.id} was not captured from a Storybook story`);
  const url = storyUrl(resolveStorybookBaseUrl(repo, annotation, strFlag(args, "--url")), context?.storyId ?? target);
  const command = process.platform === "darwin" ? "open" : process.platform === "win32" ? "cmd" : "xdg-open";
  const commandArgs = process.platform === "win32" ? ["/c", "start", "", url] : [url];
  const child = spawn(command, commandArgs, { detached: true, stdio: "ignore" });
  child.unref();
  console.log(url);
}

function status(args: string[]): void {
  const id = args.find((arg) => !arg.startsWith("-"));
  if (!id) throw new Error("usage: loupe status <annotation_id> --status open|needs_review|resolved [--author agent:codex] [--repo <path>]");
  const next = parseStatus(strFlag(args, "--status"));
  if (!next) throw new Error("missing --status");
  const repo = repoRoot(args);
  const ok = setAnnotationStatus(repo, id, next, strFlag(args, "--author"));
  if (!ok) throw new Error(`annotation ${id} not found`);
  console.log(`${id} → ${next}`);
}

function title(args: string[]): void {
  const positionals = args.filter((arg) => !arg.startsWith("-"));
  const id = positionals[0];
  if (!id) throw new Error('usage: loupe title <annotation_id> "<title>" [--repo <path>]');
  const label = (strFlag(args, "--title") ?? positionals.slice(1).join(" ")).trim();
  if (!label) throw new Error("missing title text");
  const repo = repoRoot(args);
  const ok = updateAnnotation(repo, id, { label });
  if (!ok) throw new Error(`annotation ${id} not found`);
  console.log(`${id} → "${label}"`);
}

function installSkill(): void {
  const root = distributionRoot();
  const codexSkill = resolve(process.env["CODEX_HOME"] ?? resolve(process.env["HOME"] ?? "~", ".codex"), "skills/loupe");
  const codexDreamSkill = resolve(process.env["CODEX_HOME"] ?? resolve(process.env["HOME"] ?? "~", ".codex"), "skills/dream");
  const claudeCommands = resolve(process.env["HOME"] ?? "~", ".claude/commands");
  const claudeCommand = resolve(claudeCommands, "loupe.md");
  const claudeDreamCommand = resolve(claudeCommands, "dream.md");

  rmSync(codexSkill, { recursive: true, force: true });
  rmSync(codexDreamSkill, { recursive: true, force: true });
  mkdirSync(resolve(codexSkill, ".."), { recursive: true });
  cpSync(resolve(root, "skills/loupe"), codexSkill, { recursive: true });
  cpSync(resolve(root, "skills/dream"), codexDreamSkill, { recursive: true });
  chmodSync(resolve(codexSkill, "scripts/loupe_context.py"), 0o755);

  mkdirSync(claudeCommands, { recursive: true });
  cpSync(resolve(root, "commands/claude/loupe.md"), claudeCommand);
  cpSync(resolve(root, "commands/claude/dream.md"), claudeDreamCommand);
  console.log(`Installed Codex skill: ${codexSkill}`);
  console.log(`Installed Codex skill: ${codexDreamSkill}`);
  console.log(`Installed Claude command: ${claudeCommand}`);
  console.log(`Installed Claude command: ${claudeDreamCommand}`);
}

function distributionRoot(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    resolve(here, "../../.."),
    resolve(here, ".."),
    process.cwd(),
  ];
  for (const candidate of candidates) {
    if (
      existsSync(resolve(candidate, "skills/loupe/SKILL.md")) &&
      existsSync(resolve(candidate, "skills/dream/SKILL.md")) &&
      existsSync(resolve(candidate, "commands/claude/loupe.md")) &&
      existsSync(resolve(candidate, "commands/claude/dream.md"))
    ) {
      return candidate;
    }
  }
  throw new Error("could not find packaged Loupe skill files");
}

function resolveTarget(repo: string, target: string): StoredAnnotation[] {
  const annotations = [...listAnnotations(repo), ...listRecordings(repo)];
  const groupMatches = annotations.filter((a) => a.groupSlug === target || (a.group ?? "") === target);
  if (groupMatches.length) return groupMatches;
  return annotations.filter((a) => a.id === target || a.id.endsWith(target) || a.dir.includes(target));
}

function renderContext(repo: string, target: string, annotations: StoredAnnotation[]): string {
  const hasStorybook = annotations.some((annotation) => storybookContext(annotation));
  const lines = [
    `# Loupe task: ${target}`,
    "",
    `Repo: \`${repo}\``,
    `Matched annotations: ${annotations.length}`,
    "",
    "## Agent instructions",
    "",
    "- Implement the requested UI change(s) in this repo.",
    ...(hasStorybook ? ["- Use the `storybook-workbench` skill for these Storybook annotations.", "- Use `loupe story shot <id>` to capture the rendered story headlessly after editing."] : []),
    "- Inspect every screenshot and reference image listed below before editing.",
    "- Use URL, selector, data attributes, visible text, and source hints to find the code.",
    "- If source is unresolved, search using route segments, data-testid values, labels, selected text, and classes.",
    "- Keep changes focused. Run relevant checks.",
    "- Give each annotation a concise, human-readable title so the human can recognize it later while browsing the backlog: `loupe title <id> \"<title>\"` (5–8 words describing the change, not the component name).",
    "- When done, run `loupe status <id> --status needs_review` for each implemented annotation.",
    "",
  ];
  annotations.forEach((a, i) => lines.push(renderAnnotation(repo, a, i + 1), ""));
  return lines.join("\n");
}

function renderDream(repo: string, item: NonNullable<ReturnType<typeof readDream>>): string {
  const dir = resolve(repo, item.dir);
  const lines = [
    `# Dream: ${item.title}`,
    "",
    `Repo: \`${repo}\``,
    `Dream dir: \`${dir}\``,
    `Status: \`${item.status ?? "planned"}\``,
    item.branch ? `Branch: \`${item.branch}\`` : "",
    item.summary ? `Summary: ${item.summary}` : "",
    item.goal ? `Goal: ${item.goal}` : "",
    "",
    "## Files",
    item.files.plan ? `- Plan: \`${resolve(dir, item.files.plan)}\`` : "",
    item.files.canvas ? `- Canvas: \`${resolve(dir, item.files.canvas)}\`` : "",
    item.files.prototype ? `- Prototype: \`${resolve(dir, item.files.prototype)}\`` : "",
    item.files.prototypeHtml ? `- Prototype HTML: \`${resolve(dir, item.files.prototypeHtml)}\`` : "",
    item.files.report ? `- Report: \`${resolve(dir, item.files.report)}\`` : "",
    ...item.files.images.map((image) => `- Image: \`${resolve(dir, image)}\``),
    "",
    item.content.plan ? "## Plan\n\n" + item.content.plan : "",
  ];
  return lines.filter(Boolean).join("\n");
}

function renderAnnotation(repo: string, a: StoredAnnotation, index: number): string {
  if (a.kind === "recording") return renderRecording(repo, a, index);
  const dir = resolve(repo, a.dir);
  const target = a.target;
  const meta = a as StoredAnnotation & { resolution?: { primary?: string; candidates?: string[]; method?: string } };
  const refs = (a.references ?? []).map((r) => r.file).filter((file): file is string => Boolean(file));
  const storybook = storybookContext(a);
  return [
    `## ${index}. Annotation \`${a.id}\``,
    "",
    `- Title: ${a.label || "(unset — set a concise one with `loupe title`)"}`,
    `- Status: \`${a.status ?? "open"}\``,
    `- Group: \`${a.group ?? a.groupSlug}\``,
    `- Bundle: \`${dir}\``,
    `- Note: ${a.note || "(none)"}`,
    `- Page: ${a.title || "(untitled)"} - ${a.url}`,
    `- Component chain: ${componentChain(a) || "(none captured)"}`,
    `- Tag: \`${target.tag}\``,
    `- Selector: \`${target.selector}\``,
    target.dataAttributes && Object.keys(target.dataAttributes).length
      ? `- Data attributes: \`${JSON.stringify(target.dataAttributes)}\``
      : "",
    target.className ? `- Class: \`${target.className}\`` : "",
    target.text ? `- Selected text: ${compact(target.text, 260)}` : "",
    meta.resolution?.primary
      ? `- Resolved source: \`${meta.resolution.primary}\``
      : meta.resolution?.candidates?.length
        ? `- Source candidates: \`${meta.resolution.candidates.join(", ")}\``
        : "- Source: unresolved; infer from screenshot, URL, selector, and repo search.",
    storybook ? `- Storybook story: \`${storybook.storyId}\`` : "",
    storybook?.exportName ? `- Story export: \`${storybook.exportName}\`` : "",
    storybook?.storyFile ? `- Story source: \`${resolve(repo, storybook.storyFile)}\`` : "",
    storybook?.componentSource ? `- Story component source: \`${resolve(repo, storybook.componentSource)}\`` : "",
    storybook?.baseUrl ? `- Storybook URL: ${storybook.baseUrl}` : "",
    storybook?.baseUrl ? `- Direct story preview: ${storyUrl(storybook.baseUrl, storybook.storyId)}` : "",
    `- note.md: \`${resolve(dir, "note.md")}\``,
    `- meta.json: \`${resolve(dir, "meta.json")}\``,
    `- screenshot: \`${resolve(dir, "shot.png")}\``,
    `  ![annotation screenshot](${resolve(dir, "shot.png")})`,
    ...refs.flatMap((ref) => [
      `- reference: \`${resolve(dir, ref)}\``,
      `  ![reference image](${resolve(dir, ref)})`,
    ]),
  ]
    .filter(Boolean)
    .join("\n");
}

interface RecordingMeta {
  durationMs?: number;
  video?: string | null;
  counts?: { console?: number; network?: number; errors?: number; failedRequests?: number; events?: number; keyframes?: number };
  keyframes?: { t?: number; label?: string; file?: string }[];
}

function renderRecording(repo: string, a: StoredAnnotation, index: number): string {
  const dir = resolve(repo, a.dir);
  const rec = (a as StoredAnnotation & { recording?: RecordingMeta }).recording;
  const counts = rec?.counts;
  return [
    `## ${index}. Flow recording \`${a.id}\``,
    "",
    `- Status: \`${a.status ?? "open"}\``,
    `- Group: \`${a.group ?? a.groupSlug}\``,
    `- Bundle: \`${dir}\``,
    `- Note: ${a.note || "(none)"}`,
    `- Page: ${a.title || "(untitled)"} - ${a.url}`,
    rec ? `- Duration: ${formatDuration(rec.durationMs ?? 0)}` : "",
    counts
      ? `- Captured: ${counts.console ?? 0} console · ${counts.network ?? 0} requests · ${counts.errors ?? 0} errors · ${counts.failedRequests ?? 0} failed requests · ${counts.events ?? 0} events · ${counts.keyframes ?? 0} keyframes`
      : "",
    "- Read the keyframes and logs below to diagnose the flow; the video is for the human reviewer.",
    rec?.video ? `- video: \`${resolve(dir, rec.video)}\`` : "- video: (none captured)",
    ...(rec?.keyframes?.length
      ? rec.keyframes.map((frame, i) => {
          const file = frame.file ? resolve(dir, frame.file) : resolve(dir, `keyframes/frame-${String(i + 1).padStart(3, "0")}.png`);
          return `- keyframe ${i + 1} (${formatDuration(frame.t ?? 0)} ${frame.label ?? "interaction"}): \`${file}\`\n  ![recording keyframe ${i + 1}](${file})`;
        })
      : ["- keyframes: (none captured)"]),
    `- events: \`${resolve(dir, "events.jsonl")}\``,
    `- console: \`${resolve(dir, "console.log")}\``,
    `- network: \`${resolve(dir, "network.jsonl")}\``,
    `- errors: \`${resolve(dir, "errors.jsonl")}\``,
    `- note.md: \`${resolve(dir, "note.md")}\``,
    `- meta.json: \`${resolve(dir, "meta.json")}\``,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatDuration(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, "0")}`;
}

function componentChain(a: StoredAnnotation): string {
  return (a.target.componentChain ?? []).map((c) => c.name).filter(Boolean).join(" > ");
}

function compact(value: string, limit: number): string {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length <= limit ? text : `${text.slice(0, limit - 1)}...`;
}

function repoRoot(args: string[]): string {
  return resolve(strFlag(args, "--repo") ?? process.cwd());
}

function strFlag(args: string[], name: string): string | undefined {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}

function allFlags(args: string[], name: string): string[] {
  const values: string[] = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === name && args[i + 1]) values.push(args[i + 1]!);
  }
  return values;
}

function numFlag(args: string[], name: string): number | undefined {
  const v = strFlag(args, name);
  return v !== undefined ? Number(v) : undefined;
}

function hasFlag(args: string[], name: string): boolean {
  return args.includes(name);
}

function positionalArgs(args: string[], valueFlags: string[]): string[] {
  const values: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!;
    if (valueFlags.includes(arg)) {
      if (!args[i + 1] || args[i + 1]!.startsWith("-")) throw new Error(`missing value for ${arg}`);
      i++;
    } else if (!arg.startsWith("-")) {
      values.push(arg);
    }
  }
  return values;
}

function parseStatus(value: string | undefined): AnnotationStatus | undefined {
  if (!value) return undefined;
  const normalized = value === "needs-review" ? "needs_review" : value;
  if (STATUS_VALUES.includes(normalized as AnnotationStatus)) return normalized as AnnotationStatus;
  throw new Error("--status must be open, needs_review, or resolved");
}

function help(): void {
  console.log(`loupe

Usage:
  loupe init [--repo <path>] [--name <name>] [--origin <host[:port]>] [--port <port>]
  loupe bridge [--repo <path>] [--port 7337] [--host 127.0.0.1]
  loupe list [--repo <path>] [--json]
  loupe dreams [--repo <path>] [--json]
  loupe dream <dream_id> [--repo <path>] [--json]
  loupe dreamer [--repo <path>] [--port 7337] [--host 127.0.0.1]
  loupe show <group|annotation_id> [--repo <path>] [--json]
  loupe story shot <annotation_id|story_id> [--url <storybook_url>] [--output <path>] [--selector <css>] [--repo <path>] [--json]
  loupe story open <annotation_id|story_id> [--url <storybook_url>] [--repo <path>]
  loupe status <annotation_id> --status open|needs_review|resolved [--author agent:codex] [--repo <path>]
  loupe title <annotation_id> "<short descriptive title>" [--repo <path>]
  loupe install-skill

Initialize a project once from its repo root:
  loupe init
  loupe init --origin staging.acme.com --port 5173

Run one bridge for registered projects:
  loupe bridge

Open Dreamer while the bridge is running:
  loupe dreamer
  open "$(loupe dreamer)"

If several projects reuse the same origin, choose the active project in the
extension popup before annotating.

For remote debugging over Tailscale, run the bridge on the target device:
  loupe bridge --repo ~/dev/atmOS --host 0.0.0.0 --port 7337
`);
}

void main().catch((e) => {
  console.error(`[loupe] ${e instanceof Error ? e.message : String(e)}`);
  process.exit(1);
});
