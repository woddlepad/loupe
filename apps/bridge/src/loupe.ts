#!/usr/bin/env node
import { resolve } from "node:path";
import { cpSync, existsSync, chmodSync, mkdirSync, rmSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { AnnotationComment } from "@loupe/core/model";
import { createBridge } from "./server.js";
import { loadConfig } from "./config.js";
import { gitUserName } from "./git.js";
import { initProject } from "./project.js";
import { appendComment, groupSummaries, listAnnotations, type StoredAnnotation } from "./store.js";

type Status = "open" | "resolved";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const cmd = args[0];
  if (!cmd || cmd === "help" || cmd === "--help" || cmd === "-h") return help();

  if (cmd === "init") return init(args.slice(1));
  if (cmd === "bridge" || cmd === "start") return bridge(args.slice(1));
  if (cmd === "list" || cmd === "ls") return list(args.slice(1));
  if (cmd === "show") return show(args.slice(1));
  if (cmd === "comment") return comment(args.slice(1));
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
      console.log(`  ${a.id}  ${a.status ?? "open"}  ${a.note || "(no note)"}`);
    }
    console.log("");
  }
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

function comment(args: string[]): void {
  const id = args.find((arg) => !arg.startsWith("-"));
  if (!id) throw new Error("usage: loupe comment <annotation_id> --body <text> [--status open|resolved] [--repo <path>]");
  const body = strFlag(args, "--body");
  if (!body) throw new Error("missing --body");
  const status = strFlag(args, "--status") as Status | undefined;
  if (status && status !== "open" && status !== "resolved") throw new Error("--status must be open or resolved");
  const repo = repoRoot(args);
  const entry: AnnotationComment = {
    author: strFlag(args, "--author") ?? gitUserName(repo),
    body,
    createdAt: new Date().toISOString(),
    ...(status ? { status } : {}),
  };
  const ok = appendComment(repo, id, entry);
  if (!ok) throw new Error(`annotation ${id} not found`);
  console.log(`commented on ${id}${status ? ` (${status})` : ""}`);
}

function installSkill(): void {
  const root = distributionRoot();
  const codexSkill = resolve(process.env["CODEX_HOME"] ?? resolve(process.env["HOME"] ?? "~", ".codex"), "skills/loupe");
  const claudeCommands = resolve(process.env["HOME"] ?? "~", ".claude/commands");
  const claudeCommand = resolve(claudeCommands, "loupe.md");

  rmSync(codexSkill, { recursive: true, force: true });
  mkdirSync(resolve(codexSkill, ".."), { recursive: true });
  cpSync(resolve(root, "skills/loupe"), codexSkill, { recursive: true });
  chmodSync(resolve(codexSkill, "scripts/loupe_context.py"), 0o755);

  mkdirSync(claudeCommands, { recursive: true });
  cpSync(resolve(root, "commands/claude/loupe.md"), claudeCommand);
  console.log(`Installed Codex skill: ${codexSkill}`);
  console.log(`Installed Claude command: ${claudeCommand}`);
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
      existsSync(resolve(candidate, "commands/claude/loupe.md"))
    ) {
      return candidate;
    }
  }
  throw new Error("could not find packaged Loupe skill files");
}

function resolveTarget(repo: string, target: string): StoredAnnotation[] {
  const annotations = listAnnotations(repo);
  const groupMatches = annotations.filter((a) => a.groupSlug === target || (a.group ?? "") === target);
  if (groupMatches.length) return groupMatches;
  return annotations.filter((a) => a.id === target || a.id.endsWith(target) || a.dir.includes(target));
}

function renderContext(repo: string, target: string, annotations: StoredAnnotation[]): string {
  const lines = [
    `# Loupe task: ${target}`,
    "",
    `Repo: \`${repo}\``,
    `Matched annotations: ${annotations.length}`,
    "",
    "## Agent instructions",
    "",
    "- Implement the requested UI change(s) in this repo.",
    "- Inspect every screenshot and reference image listed below before editing.",
    "- Use URL, selector, data attributes, visible text, and source hints to find the code.",
    "- If source is unresolved, search using route segments, data-testid values, labels, selected text, and classes.",
    "- Keep changes focused. Run relevant checks.",
    "- When done, run `loupe comment <id> --status resolved --body \"Implemented: ... Checks: ...\"` for each implemented annotation.",
    "",
  ];
  annotations.forEach((a, i) => lines.push(renderAnnotation(repo, a, i + 1), ""));
  return lines.join("\n");
}

function renderAnnotation(repo: string, a: StoredAnnotation, index: number): string {
  const dir = resolve(repo, a.dir);
  const target = a.target;
  const meta = a as StoredAnnotation & { resolution?: { primary?: string; candidates?: string[]; method?: string } };
  const refs = (a.references ?? []).map((r) => r.file).filter((file): file is string => Boolean(file));
  return [
    `## ${index}. Annotation \`${a.id}\``,
    "",
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
    `- note.md: \`${resolve(dir, "note.md")}\``,
    `- meta.json: \`${resolve(dir, "meta.json")}\``,
    `- screenshot: \`${resolve(dir, "shot.png")}\``,
    `  ![annotation screenshot](${resolve(dir, "shot.png")})`,
    ...refs.flatMap((ref) => [
      `- reference: \`${resolve(dir, ref)}\``,
      `  ![reference image](${resolve(dir, ref)})`,
    ]),
    `- comments: \`${resolve(dir, "comments.jsonl")}\``,
  ]
    .filter(Boolean)
    .join("\n");
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

function help(): void {
  console.log(`loupe

Usage:
  loupe init [--repo <path>] [--name <name>] [--origin <host[:port]>] [--port <port>]
  loupe bridge [--repo <path>] [--port 7337] [--host 127.0.0.1]
  loupe list [--repo <path>] [--json]
  loupe show <group|annotation_id> [--repo <path>] [--json]
  loupe comment <annotation_id> --body <text> [--status open|resolved] [--author agent:codex] [--repo <path>]
  loupe install-skill

Initialize a project once from its repo root:
  loupe init
  loupe init --origin staging.acme.com --port 5173

Run one bridge for registered projects:
  loupe bridge

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
