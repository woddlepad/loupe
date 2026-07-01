import assert from "node:assert/strict";
import { test } from "node:test";
import { codexBackgroundAgent, defaultAgents, type AgentCommand } from "./config.js";
import { agentAvailable, buildCodexUrl, defaultCodexAppServerSocketPath, expandAgentArgv } from "./actions/agent.js";

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
  delete process.env.LOUPE_CODEX_CLOUD_ENV;
  delete process.env.CODEX_CLOUD_ENV;
  delete process.env.LOUPE_CODEX_APP_SERVER;
  try {
    assert.deepEqual(defaultAgents().codex, { mode: "spawn", argv: ["codex", "exec", "{loupeCommand}"] });
    assert.deepEqual(expandAgentArgv(codexBackgroundAgent(), "inline prompt", "/loupe notes", undefined, []), [
      "codex",
      "exec",
      "/loupe notes",
    ]);
  } finally {
    restoreEnv("LOUPE_CODEX_CLOUD_ENV", previousCloud);
    restoreEnv("CODEX_CLOUD_ENV", previousCodeCloud);
    restoreEnv("LOUPE_CODEX_APP_SERVER", previousAppServer);
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

function restoreEnv(name: string, value: string | undefined): void {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}
