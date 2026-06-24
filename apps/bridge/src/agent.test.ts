import assert from "node:assert/strict";
import { test } from "node:test";
import type { AgentCommand } from "./config.js";
import { buildCodexUrl, defaultCodexAppServerSocketPath, expandAgentArgv } from "./actions/agent.js";

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
