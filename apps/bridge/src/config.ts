import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { LinearConfig } from "./actions/linear.js";

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
   * "session": don't spawn — the annotation is already committed to `.loupe/`,
   *   so an already-open agent session picks it up (e.g. Claude Code with a
   *   `/rc`-style command). No headless `-p` run.
   */
  mode?: "spawn" | "session" | "codex-app";
  /** argv for spawn mode, e.g. ["claude", "--permission-mode", "auto", "--bg", "{loupeCommand}"]. */
  argv?: string[];
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

function defaultAgents(): Record<string, AgentCommand> {
  const codexCloudEnv = process.env["LOUPE_CODEX_CLOUD_ENV"] ?? process.env["CODEX_CLOUD_ENV"];
  return {
    // Claude: start a background Claude Code run that picks up the saved Loupe
    // bundle through the installed /loupe slash command.
    claude: { mode: "spawn", argv: ["claude", "--permission-mode", "auto", "--bg", "{loupeCommand}"] },
    // Codex Desktop: open a real app thread so the handoff is visible. For
    // phone-visible Cloud tasks, set LOUPE_CODEX_CLOUD_ENV to a Codex Cloud env.
    codex: codexCloudEnv
      ? { mode: "spawn", argv: ["codex", "cloud", "exec", "--env", codexCloudEnv, "{loupeCommand}"] }
      : { mode: "codex-app" },
  };
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
