import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import type { ActionModelOption } from "@loupe/core/model";
import type { LinearConfig } from "./actions/linear.js";

export type CodexLaunchMode = "background" | "url-handler";

/**
 * An agent command template. Placeholders are substituted per-annotation:
 *   {prompt}     — the full instruction string
 *   {bundleDir}  — absolute path to .loupe/annotations/<id>/
 *   {screenshot} — absolute path to the cropped PNG
 *   {source}     — best resolved source path (or empty)
 *   {loupeCommand} — Claude/Codex-readable pickup command, e.g. /loupe notes
 *   {codexUrl}   — codex://new deep link with the Loupe command + repo path
 *   {repoRoot}   — absolute repo root path
 */
export interface AgentCommand {
  /**
   * "spawn" (default): run `argv` as a fresh detached process.
   * "codex-app": open a new Codex Desktop thread with `{loupeCommand}` and
   *   the repo path prefilled.
   * "codex-app-server": create a thread through the local Codex app-server
   *   daemon. Use this when the bridge runs on a remote host and your Codex
   *   desktop app is connected to that host.
   * "session": don't spawn — the annotation is already committed to `.loupe/`,
   *   so an already-open agent session picks it up (e.g. Claude Code with a
   *   `/rc`-style command). No headless `-p` run.
   */
  mode?: "spawn" | "session" | "codex-app" | "codex-app-server";
  /** argv for spawn mode, e.g. ["claude", "--permission-mode", "auto", "--bg", "{loupeCommand}"]. */
  argv?: string[];
  /** Unix socket for the Codex app-server daemon; defaults to $CODEX_HOME/app-server-control/app-server-control.sock. */
  socketPath?: string;
  /** Model choices advertised to the Loupe panel for this agent. */
  models?: ActionModelOption[];
  /** Model used when the panel has not sent a selected model. */
  defaultModel?: string;
  /** Extra argv inserted after argv[0] when a model is selected. Defaults to ["--model", "{model}"]. */
  modelArgv?: string[];
}

export interface BridgeConfig {
  /** Port the daemon listens on. */
  port: number;
  /** Host/interface the daemon binds to. Use 0.0.0.0 or a Tailscale IP for remote debugging. */
  host: string;
  /** Repo root annotations are written into (defaults to cwd). */
  repoRoot: string;
  /** Agent command templates, keyed by id (each becomes an action). */
  agents: Record<string, AgentCommand>;
  /** Optional integrations, each gated on being present. */
  integrations?: {
    linear?: LinearConfig;
  };
  /** Repo-specific settings for custom `.loupe/actions/*.mjs` scripts. */
  custom?: Record<string, unknown>;
  /** Project metadata written by `loupe init` for future multi-project routing. */
  project?: {
    name: string;
    origins: string[];
    framework?: string;
  };
}

export function codexBackgroundAgent(): AgentCommand {
  const codexCloudEnv = process.env["LOUPE_CODEX_CLOUD_ENV"] ?? process.env["CODEX_CLOUD_ENV"];
  const models = codexModels();
  if (codexCloudEnv) {
    return {
      mode: "spawn",
      argv: ["codex", "cloud", "exec", "--env", codexCloudEnv, "{loupeCommand}"],
      models,
      defaultModel: "gpt-5.5",
    };
  }
  if (shouldUseCodexAppServer()) return codexAppServerAgent(models);
  return { mode: "spawn", argv: ["codex", "exec", "{loupeCommand}"], models, defaultModel: "gpt-5.5" };
}

export function codexUrlHandlerAgent(): AgentCommand {
  return { mode: "codex-app", models: codexModels(), defaultModel: "gpt-5.5" };
}

export function codexAppServerAgent(models = codexModels()): AgentCommand {
  return {
    mode: "codex-app-server",
    socketPath: process.env["LOUPE_CODEX_APP_SERVER_SOCKET"],
    models,
    defaultModel: "gpt-5.5",
  };
}

export function defaultCodexAppServerSocketPath(): string {
  const codexHome = process.env.CODEX_HOME || join(homedir(), ".codex");
  return join(codexHome, "app-server-control", "app-server-control.sock");
}

function shouldUseCodexAppServer(): boolean {
  const requested = process.env["LOUPE_CODEX_APP_SERVER"];
  if (requested && requested !== "0") return true;
  const socketPath = process.env["LOUPE_CODEX_APP_SERVER_SOCKET"] || defaultCodexAppServerSocketPath();
  return existsSync(socketPath);
}

export function defaultAgents(): Record<string, AgentCommand> {
  return {
    // Claude: start a background Claude Code run that picks up the saved Loupe
    // bundle through the installed /loupe slash command.
    claude: {
      mode: "spawn",
      argv: ["claude", "--permission-mode", "auto", "--bg", "{loupeCommand}"],
      models: claudeModels(),
      defaultModel: "fable",
    },
    // Codex: prefer the app-server when the Desktop socket is available so
    // background handoffs appear in the Codex app; otherwise fall back to the
    // headless CLI.
    codex: codexBackgroundAgent(),
    // GitHub Copilot CLI: the standalone `copilot` binary (not the deprecated
    // `gh copilot` extension). It has no /loupe shim, so it receives the full
    // self-contained inline prompt. --allow-all-tools skips per-tool approval.
    copilot: { mode: "spawn", argv: ["copilot", "--allow-all-tools", "-p", "{prompt}"] },
    // Pi coding agent (@earendil-works/pi-coding-agent): headless single-shot
    // via -p. It gets the inline prompt plus the bundle images attached with
    // `@path` (pi is vision-capable) so it can actually see the screenshot.
    pi: { mode: "spawn", argv: ["pi", "-p", "{atImages}", "{prompt}"] },
  };
}

function claudeModels(): ActionModelOption[] {
  return [
    { id: "fable", label: "Fable 5", hint: "latest Claude coding model" },
    { id: "sonnet", label: "Sonnet 5", hint: "balanced default" },
    { id: "opus", label: "Opus 4.8", hint: "deep reasoning" },
  ];
}

function codexModels(): ActionModelOption[] {
  return [
    { id: "gpt-5.5", label: "GPT-5.5", hint: "frontier coding model" },
    { id: "gpt-5.4", label: "GPT-5.4", hint: "strong everyday coding" },
    { id: "gpt-5.4-mini", label: "GPT-5.4 Mini", hint: "faster, lower cost" },
    { id: "gpt-5.3-codex-spark", label: "Codex Spark", hint: "ultra-fast coding" },
  ];
}

const DEFAULTS: BridgeConfig = {
  port: 7337,
  host: "127.0.0.1",
  repoRoot: process.cwd(),
  agents: defaultAgents(),
};

/**
 * Layered config: built-in defaults < .loupe/config.json in the repo root <
 * env/flags. Missing or malformed config files are ignored with a warning.
 */
export function loadConfig(overrides: Partial<BridgeConfig> = {}): BridgeConfig {
  const repoRoot = overrides.repoRoot ?? DEFAULTS.repoRoot;
  let fileCfg: Partial<BridgeConfig> = {};
  try {
    const raw = readFileSync(resolve(repoRoot, ".loupe/config.json"), "utf8");
    fileCfg = JSON.parse(raw) as Partial<BridgeConfig>;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") {
      console.warn(`[loupe] ignoring .loupe/config.json: ${String(e)}`);
    }
  }

  return {
    port: overrides.port ?? fileCfg.port ?? DEFAULTS.port,
    host: overrides.host ?? fileCfg.host ?? DEFAULTS.host,
    repoRoot,
    // File config replaces the agent set wholesale when provided, so a repo can
    // pare it down to just the agents it actually has installed.
    agents: fileCfg.agents ?? DEFAULTS.agents,
    integrations: fileCfg.integrations,
    custom: fileCfg.custom,
    project: fileCfg.project,
  };
}
