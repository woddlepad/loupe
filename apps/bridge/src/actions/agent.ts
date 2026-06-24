import { spawn } from "node:child_process";
import { existsSync, openSync } from "node:fs";
import { join } from "node:path";
import type { Annotation } from "@loupe/core/model";
import type { AgentCommand, BridgeConfig } from "../config.js";
import type { WrittenBundle } from "../bundle.js";
import type { SourceResolution } from "../resolve/index.js";
import type { StoredAnnotation } from "../store.js";
import type { Action, ActionContext, ActionOutcome } from "./types.js";

/** Build one action per configured agent (claude, codex, …). */
export function agentActions(config: BridgeConfig): Action[] {
  return Object.entries(config.agents).map(([name, cmd]) => ({
    id: name,
    label: capitalize(name),
    hint: agentHint(name, cmd),
    run: (ctx: ActionContext) =>
      cmd.mode === "session"
        ? sessionOutcome(name, ctx)
        : cmd.mode === "codex-app"
          ? openCodexApp(name, ctx.config.repoRoot, `/loupe ${ctx.annotation.id}`)
          : runAgent(name, cmd, ctx),
  }));
}

/** Session mode: the bundle is already written; nothing to spawn. */
export function sessionOutcome(name: string, ctx: ActionContext): ActionOutcome {
  return {
    ok: true,
    detail: `saved to ${ctx.bundle.dir} — pick it up in your open ${name} session`,
  };
}

function runAgent(name: string, cmd: AgentCommand, ctx: ActionContext): ActionOutcome {
  if (!cmd.argv?.length) return { ok: false, detail: `${name}: no argv configured for spawn mode` };
  const prompt = buildPrompt(name, ctx.annotation, ctx.bundle, ctx.resolution);
  const images = [ctx.bundle.screenshot, ...ctx.bundle.references].filter((p): p is string => Boolean(p));
  return spawnAgent(
    name,
    cmd,
    ctx.config.repoRoot,
    prompt,
    `/loupe ${ctx.annotation.id}`,
    ctx.bundle,
    images,
    join(ctx.bundle.absDir, `agent-${name}.log`),
  );
}

/** Run one agent over a whole group as a single session (no work mixing). */
export function runAgentGroup(
  name: string,
  cmd: AgentCommand,
  config: BridgeConfig,
  group: string,
  annotations: StoredAnnotation[],
  groupLogPath: string,
): ActionOutcome {
  if (cmd.mode === "codex-app") return openCodexApp(name, config.repoRoot, `/loupe ${group}`);
  const prompt = buildGroupPrompt(name, group, annotations);
  return spawnAgent(name, cmd, config.repoRoot, prompt, `/loupe ${group}`, undefined, [], groupLogPath);
}

function openCodexApp(name: string, repoRoot: string, loupeCommand: string): ActionOutcome {
  const url = buildCodexUrl(loupeCommand, repoRoot);
  const argv = openerArgv(url);
  const command = argv[0]!;
  const args = argv.slice(1);
  if (!commandAvailable(command)) {
    return { ok: false, detail: `${name}: opener command not found (${command})` };
  }
  try {
    const child = spawn(command, args, { cwd: repoRoot, detached: true, stdio: ["ignore", "ignore", "ignore"] });
    child.on("error", (e) => console.warn(`[loupe] ${name} failed to open: ${e.message}`));
    child.unref();
    return { ok: true, detail: "opened Codex app" };
  } catch (e) {
    return { ok: false, detail: `${name}: ${String(e)}` };
  }
}

function spawnAgent(
  name: string,
  cmd: AgentCommand,
  cwd: string,
  prompt: string,
  loupeCommand: string,
  bundle: WrittenBundle | undefined,
  images: string[],
  logPath: string,
): ActionOutcome {
  if (!cmd.argv?.length) return { ok: false, detail: `${name}: no argv configured` };
  const argv = expandAgentArgv(cmd, prompt, loupeCommand, bundle, images, cwd);
  if (!commandAvailable(argv[0]!)) {
    return { ok: false, detail: `${name}: command not found (${argv[0]})` };
  }
  try {
    const fd = openSync(logPath, "a");
    const child = spawn(argv[0]!, argv.slice(1), { cwd, detached: true, stdio: ["ignore", fd, fd] });
    child.on("error", (e) => console.warn(`[loupe] ${name} failed to start: ${e.message}`));
    child.unref();
    return { ok: true, detail: `spawned ${name}` };
  } catch (e) {
    return { ok: false, detail: `${name}: ${String(e)}` };
  }
}

export function expandAgentArgv(
  cmd: AgentCommand,
  prompt: string,
  loupeCommand: string,
  bundle: WrittenBundle | undefined,
  images: string[],
  repoRoot = process.cwd(),
): string[] {
  return (cmd.argv ?? []).flatMap((a) => {
    // {imageArgs} expands to `-i path1,path2` (Codex) or nothing when no images.
    if (a === "{imageArgs}") return images.length ? ["-i", images.join(",")] : [];
    return [
      a
        .replaceAll("{prompt}", prompt)
        .replaceAll("{loupeCommand}", loupeCommand)
        .replaceAll("{codexUrl}", buildCodexUrl(loupeCommand, repoRoot))
        .replaceAll("{repoRoot}", repoRoot)
        .replaceAll("{bundleDir}", bundle?.absDir ?? "")
        .replaceAll("{screenshot}", bundle?.screenshot ?? "")
        .replaceAll("{source}", ""),
    ];
  });
}

function commandAvailable(command: string): boolean {
  if (process.platform === "win32" && command.toLowerCase() === "cmd") return true;
  if (command.includes("/")) return existsSync(command);
  const path = process.env.PATH ?? "";
  return path.split(":").some((dir) => existsSync(join(dir, command)));
}

export function buildCodexUrl(loupeCommand: string, repoRoot: string): string {
  const params = new URLSearchParams({ prompt: loupeCommand, path: repoRoot });
  return `codex://new?${params.toString()}`;
}

function openerArgv(url: string): string[] {
  if (process.platform === "darwin") return ["open", url];
  if (process.platform === "win32") return ["cmd", "/c", "start", "", url];
  return ["xdg-open", url];
}

function agentHint(name: string, cmd: AgentCommand): string {
  if (cmd.mode === "session") return `hand to an open ${name} session (it's committed to .loupe/)`;
  if (cmd.mode === "codex-app") return "open a Codex app thread for this annotation";
  return `start a fresh ${name} session on this annotation`;
}

function closeLoop(agentName: string): string {
  return (
    "When done, run " +
    `loupe comment <annotation_id> --status needs_review --author agent:${agentName} --body "Implemented: <summary>. Checks: <commands run>." ` +
    "Do not mark the annotation resolved yourself; leave it for human review."
  );
}

function buildPrompt(agentName: string, a: Annotation, bundle: WrittenBundle, r: SourceResolution): string {
  const chain = a.target.componentChain.map((c) => c.name).join(" › ") || "(unknown component)";
  const slot = a.target.dataAttributes["data-slot"];
  const suggestions = a.acceptedSuggestions.map((s) => `- ${s.label}: ${s.detail}`).join("\n");

  return [
    "You're picking up a UI annotation captured with Loupe. Make the change in the source, then summarize what you did.",
    "",
    `Annotation bundle: ${bundle.dir} (screenshot at ${bundle.screenshot ? "./shot.png" : "n/a"})`,
    `Page: ${a.title} — ${a.url}`,
    a.group ? `Group: ${a.group}` : "",
    `Component: ${chain}${slot ? ` (data-slot="${slot}")` : ""}`,
    r.primary
      ? `Source file: ${r.primary}`
      : `Source file: unresolved — find the component "${chain}" in the repo.`,
    r.candidates.length > 1 ? `Other candidates: ${r.candidates.slice(1).join(", ")}` : "",
    `Selector: ${a.target.selector}`,
    a.target.text ? `Element text: "${a.target.text}"` : "",
    "",
    a.note ? `Note: ${a.note}` : "Note: (none)",
    bundle.references.length
      ? `Reference images (what it should look like): ${bundle.references.join(", ")}`
      : "",
    suggestions ? `Suggested fixes:\n${suggestions}` : "",
    "",
    closeLoop(agentName),
  ]
    .filter(Boolean)
    .join("\n");
}

function buildGroupPrompt(agentName: string, group: string, annotations: StoredAnnotation[]): string {
  const lines = annotations.map((a, i) => {
    const chain = a.target.componentChain.map((c) => c.name).join(" › ") || a.target.tag;
    return [
      `${i + 1}. ${a.dir}`,
      `   component: ${chain}${a.target.dataAttributes["data-slot"] ? ` (data-slot="${a.target.dataAttributes["data-slot"]}")` : ""}`,
      `   page: ${a.url}`,
      a.note ? `   note: ${a.note}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [
    `You're implementing a batch of UI annotations grouped as "${group}". Treat them as one coherent change set; do them all.`,
    "",
    "Each item is a committed folder under the repo; read its note.md and shot.png for detail:",
    "",
    ...lines,
    "",
    `After implementing each, run \`loupe comment <id> --status needs_review --author agent:${agentName} --body "Implemented: ... Checks: ..."\`. Do not mark annotations resolved yourself; leave them for human review. Then summarize the whole change set.`,
  ].join("\n");
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
