import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { codexBackgroundAgent, defaultAgents, defaultCodexAppServerSocketPath, type AgentCommand } from "./config.js";
import { agentAvailable, buildCodexUrl, buildDreamLaunchPrompt, expandAgentArgv } from "./actions/agent.js";
import { ActionRegistry } from "./actions/registry.js";
import type { DreamDetail } from "./dreams.js";

test("expands Claude default to background Loupe slash command", () => {
  const cmd: AgentCommand = { mode: "spawn", argv: ["claude", "--permission-mode", "auto", "--bg", "{loupeCommand}"] };
  assert.deepEqual(expandAgentArgv(cmd, "inline prompt", "/loupe dde8f08a", undefined, []), [
    "claude",
    "--permission-mode",
    "auto",
    "--bg",
    "/loupe dde8f08a",
  ]);
});

test("expands selected models into agent argv", () => {
  assert.deepEqual(
    expandAgentArgv(
      { mode: "spawn", argv: ["claude", "--permission-mode", "auto", "--bg", "{loupeCommand}"] },
      "inline prompt",
      "/loupe dde8f08a",
      undefined,
      [],
      process.cwd(),
      "fable",
    ),
    ["claude", "--model", "fable", "--permission-mode", "auto", "--bg", "/loupe dde8f08a"],
  );
  assert.deepEqual(
    expandAgentArgv(
      { mode: "spawn", argv: ["codex", "exec", "{loupeCommand}"] },
      "inline prompt",
      "/loupe notes",
      undefined,
      [],
      process.cwd(),
      "gpt-5.6",
    ),
    ["codex", "--model", "gpt-5.6", "exec", "/loupe notes"],
  );
});

test("expands selected speed into Codex config argv", () => {
  assert.deepEqual(
    expandAgentArgv(
      { mode: "spawn", argv: ["codex", "exec", "{loupeCommand}"] },
      "inline prompt",
      "/loupe notes",
      undefined,
      [],
      process.cwd(),
      "gpt-5.6",
      "fast",
    ),
    ["codex", "--config", 'service_tier="fast"', "--config", "features.fast_mode=true", "--model", "gpt-5.6", "exec", "/loupe notes"],
  );
});

test("expands Codex image args and inline prompt", () => {
  const cmd: AgentCommand = { mode: "spawn", argv: ["codex", "exec", "{imageArgs}", "{prompt}"] };
  assert.deepEqual(expandAgentArgv(cmd, "fix it", "/loupe notes", undefined, ["shot.png", "ref.png"]), [
    "codex",
    "exec",
    "-i",
    "shot.png,ref.png",
    "fix it",
  ]);
});

test("defaults Codex to background local exec", () => {
  const previousCloud = process.env.LOUPE_CODEX_CLOUD_ENV;
  const previousCodeCloud = process.env.CODEX_CLOUD_ENV;
  const previousAppServer = process.env.LOUPE_CODEX_APP_SERVER;
  const previousAppServerSocket = process.env.LOUPE_CODEX_APP_SERVER_SOCKET;
  const previousCodexHome = process.env.CODEX_HOME;
  delete process.env.LOUPE_CODEX_CLOUD_ENV;
  delete process.env.CODEX_CLOUD_ENV;
  delete process.env.LOUPE_CODEX_APP_SERVER;
  delete process.env.LOUPE_CODEX_APP_SERVER_SOCKET;
  process.env.CODEX_HOME = mkdtempSync(join(tmpdir(), "loupe-codex-home-no-socket-"));
  try {
    const codex = defaultAgents().codex;
    assert.deepEqual(codex?.argv, ["codex", "exec", "{loupeCommand}"]);
    assert.equal(codex?.defaultModel, "gpt-5.6");
    assert.deepEqual(expandAgentArgv(codexBackgroundAgent(), "inline prompt", "/loupe notes", undefined, []), [
      "codex",
      "exec",
      "/loupe notes",
    ]);
    assert.deepEqual(codex?.models?.slice(0, 4).map((model) => model.id), ["gpt-5.6", "gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]);
    assert.deepEqual(codex?.speeds?.map((speed) => speed.id), ["default", "fast"]);
  } finally {
    restoreEnv("LOUPE_CODEX_CLOUD_ENV", previousCloud);
    restoreEnv("CODEX_CLOUD_ENV", previousCodeCloud);
    restoreEnv("LOUPE_CODEX_APP_SERVER", previousAppServer);
    restoreEnv("LOUPE_CODEX_APP_SERVER_SOCKET", previousAppServerSocket);
    restoreEnv("CODEX_HOME", previousCodexHome);
  }
});

test("defaults Codex background handoff to app-server when socket exists", () => {
  const previousCloud = process.env.LOUPE_CODEX_CLOUD_ENV;
  const previousCodeCloud = process.env.CODEX_CLOUD_ENV;
  const previousAppServer = process.env.LOUPE_CODEX_APP_SERVER;
  const previousAppServerSocket = process.env.LOUPE_CODEX_APP_SERVER_SOCKET;
  const previousCodexHome = process.env.CODEX_HOME;
  delete process.env.LOUPE_CODEX_CLOUD_ENV;
  delete process.env.CODEX_CLOUD_ENV;
  delete process.env.LOUPE_CODEX_APP_SERVER;
  delete process.env.LOUPE_CODEX_APP_SERVER_SOCKET;
  process.env.CODEX_HOME = mkdtempSync(join(tmpdir(), "loupe-codex-home-socket-"));
  try {
    const socketPath = defaultCodexAppServerSocketPath();
    mkdirSync(dirname(socketPath), { recursive: true });
    writeFileSync(socketPath, "");

    const codex = codexBackgroundAgent();
    assert.equal(codex.mode, "codex-app-server");
    assert.equal(codex.socketPath, undefined);
  } finally {
    restoreEnv("LOUPE_CODEX_CLOUD_ENV", previousCloud);
    restoreEnv("CODEX_CLOUD_ENV", previousCodeCloud);
    restoreEnv("LOUPE_CODEX_APP_SERVER", previousAppServer);
    restoreEnv("LOUPE_CODEX_APP_SERVER_SOCKET", previousAppServerSocket);
    restoreEnv("CODEX_HOME", previousCodexHome);
  }
});

test("expands Copilot to a headless prompt run", () => {
  const cmd: AgentCommand = { mode: "spawn", argv: ["copilot", "--allow-all-tools", "-p", "{prompt}"] };
  assert.deepEqual(expandAgentArgv(cmd, "fix the header", "/loupe notes", undefined, ["shot.png"]), [
    "copilot",
    "--allow-all-tools",
    "-p",
    "fix the header",
  ]);
});

test("expands Pi with @-attached images and inline prompt", () => {
  const cmd: AgentCommand = { mode: "spawn", argv: ["pi", "-p", "{atImages}", "{prompt}"] };
  assert.deepEqual(expandAgentArgv(cmd, "fix it", "/loupe notes", undefined, ["shot.png", "ref.png"]), [
    "pi",
    "-p",
    "@shot.png",
    "@ref.png",
    "fix it",
  ]);
});

test("drops {atImages} when there are no images", () => {
  const cmd: AgentCommand = { mode: "spawn", argv: ["pi", "-p", "{atImages}", "{prompt}"] };
  assert.deepEqual(expandAgentArgv(cmd, "fix it", "/loupe notes", undefined, []), ["pi", "-p", "fix it"]);
});

test("agentAvailable requires a binary for spawn mode but not other modes", () => {
  assert.equal(agentAvailable({ mode: "spawn", argv: ["definitely-not-a-real-binary-xyz", "{prompt}"] }), false);
  assert.equal(agentAvailable({ mode: "codex-app" }), true);
  assert.equal(agentAvailable({ mode: "session" }), true);
  assert.equal(agentAvailable({ mode: "spawn" }), false);
});

test("action descriptors mark every configured session agent as executable", async () => {
  const registry = await ActionRegistry.build({
    port: 7337,
    host: "127.0.0.1",
    repoRoot: process.cwd(),
    agents: {
      claude: { mode: "session" },
      codex: { mode: "session" },
      copilot: { mode: "session" },
      pi: { mode: "session" },
    },
  });

  assert.deepEqual(
    registry
      .descriptors()
      .filter((action) => action.kind === "agent")
      .map((action) => action.id),
    ["claude", "codex", "copilot", "pi"],
  );
});

test("builds Codex app deep link with Loupe command and repo path", () => {
  assert.equal(
    buildCodexUrl("/loupe notes", "/Users/dani/dev/atmOS"),
    "codex://new?prompt=%2Floupe+notes&path=%2FUsers%2Fdani%2Fdev%2FatmOS",
  );
});

test("expands Codex Cloud command from config", () => {
  const cmd: AgentCommand = {
    mode: "spawn",
    argv: ["codex", "cloud", "exec", "--env", "env_123", "{loupeCommand}"],
  };
  assert.deepEqual(expandAgentArgv(cmd, "inline prompt", "/loupe notes", undefined, []), [
    "codex",
    "cloud",
    "exec",
    "--env",
    "env_123",
    "/loupe notes",
  ]);
});

test("builds default Codex app-server socket path from CODEX_HOME", () => {
  const previous = process.env.CODEX_HOME;
  process.env.CODEX_HOME = "/tmp/test-codex-home";
  try {
    assert.equal(
      defaultCodexAppServerSocketPath(),
      "/tmp/test-codex-home/app-server-control/app-server-control.sock",
    );
  } finally {
    if (previous === undefined) delete process.env.CODEX_HOME;
    else process.env.CODEX_HOME = previous;
  }
});

test("builds Dreamer implementation launch prompt with goal and ship-feature", () => {
  const dream: DreamDetail = {
    id: "notes-as-layouts",
    title: "Notes as Layouts",
    goal: "Ship notes as switchable document, page, and slide layouts.",
    summary: "Implement the saved Dreamer plan.",
    status: "planned",
    priority: 1,
    recommended: true,
    branch: "main",
    createdAt: "2026-07-03T00:00:00.000Z",
    updatedAt: "2026-07-03T00:00:00.000Z",
    dir: ".loupe/dreams/notes-as-layouts",
    files: {
      plan: "plan.mdx",
      canvas: "canvas.mdx",
      images: [],
    },
    content: {
      plan: "# Notes as Layouts\n",
      canvas: "## Flow\n",
    },
  };

  const prompt = buildDreamLaunchPrompt(dream);
  assert.match(prompt, /^\/goal Ship notes as switchable document, page, and slide layouts\./);
  assert.match(prompt, /Use the ship-feature skill/);
  assert.match(prompt, /This is an implementation launch, not a request to create another dream/);
  assert.match(prompt, /\.loupe\/dreams\/notes-as-layouts\/plan\.mdx/);
  assert.match(prompt, /\.loupe\/dreams\/notes-as-layouts\/report\.md/);
});

function restoreEnv(name: string, value: string | undefined): void {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}
