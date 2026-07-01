import { spawn } from "node:child_process";
import { randomBytes, createHash } from "node:crypto";
import { existsSync, openSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createConnection, type Socket } from "node:net";
import type { Annotation } from "@loupe/core/model";
import type { AgentCommand, BridgeConfig } from "../config.js";
import type { WrittenBundle } from "../bundle.js";
import type { SourceResolution } from "../resolve/index.js";
import type { StoredAnnotation } from "../store.js";
import type { Action, ActionContext, ActionOutcome } from "./types.js";

/**
 * Build one action per configured agent (claude, codex, copilot, pi, …).
 * Spawn-mode agents whose binary isn't installed are omitted, so Loupe only
 * advertises providers the machine can actually run.
 */
export function agentActions(config: BridgeConfig): Action[] {
  return Object.entries(config.agents)
    .filter(([, cmd]) => agentAvailable(cmd))
    .map(([name, cmd]) => ({
      id: name,
      label: capitalize(name),
      hint: agentHint(name, cmd),
      run: (ctx: ActionContext) =>
        cmd.mode === "session"
          ? sessionOutcome(name, ctx)
          : cmd.mode === "codex-app-server"
            ? openCodexAppServer(name, cmd, ctx.config.repoRoot, `/loupe ${ctx.annotation.id}`)
            : cmd.mode === "codex-app"
              ? openCodexApp(name, ctx.config.repoRoot, `/loupe ${ctx.annotation.id}`)
              : runAgent(name, cmd, ctx),
    }));
}

/**
 * Whether an agent should be advertised. Spawn-mode agents require their binary
 * on PATH; other modes (session, codex-app, codex-app-server) aren't a simple
 * PATH check, so they're always advertised.
 */
export function agentAvailable(cmd: AgentCommand): boolean {
  if (cmd.mode && cmd.mode !== "spawn") return true;
  return Boolean(cmd.argv?.length) && commandAvailable(cmd.argv![0]!);
}

/** Split configured agents into detected vs hidden (binary not on PATH). */
export function agentAvailability(agents: Record<string, AgentCommand>): {
  available: string[];
  hidden: string[];
} {
  const available: string[] = [];
  const hidden: string[] = [];
  for (const [name, cmd] of Object.entries(agents)) {
    (agentAvailable(cmd) ? available : hidden).push(name);
  }
  return { available, hidden };
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
  const prompt =
    ctx.annotation.kind === "recording"
      ? buildRecordingPrompt(name, ctx.annotation, ctx.bundle)
      : buildPrompt(name, ctx.annotation, ctx.bundle, ctx.resolution);
  const images = [ctx.bundle.screenshot, ...ctx.bundle.references, ...ctx.bundle.keyframes].filter((p): p is string => Boolean(p));
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
): ActionOutcome | Promise<ActionOutcome> {
  if (cmd.mode === "codex-app-server") return openCodexAppServer(name, cmd, config.repoRoot, `/loupe ${group}`);
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

async function openCodexAppServer(
  name: string,
  cmd: AgentCommand,
  repoRoot: string,
  loupeCommand: string,
): Promise<ActionOutcome> {
  const socketPath = cmd.socketPath ?? defaultCodexAppServerSocketPath();
  if (!existsSync(socketPath)) {
    return {
      ok: false,
      detail: `${name}: Codex app-server socket not found (${socketPath}); start Codex Desktop remote connection or run codex app-server daemon start`,
    };
  }

  let client: CodexAppServerRpcClient | undefined;
  try {
    client = await CodexAppServerRpcClient.connect(socketPath);
    await client.call("initialize", {
      clientInfo: { name: "loupe-bridge", version: "0.1.0" },
      capabilities: {
        experimentalApi: true,
        requestAttestation: false,
        mcpServerOpenaiFormElicitation: false,
      },
    });
    client.notify("initialized");

    const started = await client.call("thread/start", { cwd: repoRoot });
    const threadId = jsonPath(started, ["thread", "id"]);
    if (typeof threadId !== "string" || !threadId) {
      return { ok: false, detail: `${name}: thread/start did not return a thread id` };
    }

    await client.call("turn/start", {
      threadId,
      cwd: repoRoot,
      input: [{ type: "text", text: loupeCommand, textElements: [] }],
    });

    return { ok: true, detail: `opened Codex thread ${threadId}` };
  } catch (e) {
    return { ok: false, detail: `${name}: ${e instanceof Error ? e.message : String(e)}` };
  } finally {
    client?.close();
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
    // {atImages} expands to one `@path` arg per image (Pi) or nothing when empty.
    if (a === "{atImages}") return images.map((p) => `@${p}`);
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

export function commandAvailable(command: string): boolean {
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
  if (cmd.mode === "codex-app-server") return "create a visible Codex app thread through the app-server daemon";
  if (cmd.mode === "codex-app") return "open a Codex app thread for this annotation";
  return `start a fresh ${name} session on this annotation`;
}

function closeLoop(agentName: string): string {
  return (
    'When done, first give the annotation a concise human-readable title so the human can recognize it later while browsing the backlog: ' +
    'loupe title <annotation_id> "<title>" (5–8 words describing the change, not the component name). Then run ' +
    `loupe status <annotation_id> --status needs_review --author agent:${agentName} ` +
    "to move it to review. Do not mark the annotation resolved yourself; leave it for human review."
  );
}

function buildPrompt(agentName: string, a: Annotation, bundle: WrittenBundle, r: SourceResolution): string {
  const chain = a.target.componentChain.map((c) => c.name).join(" › ") || "(unknown component)";
  const slot = a.target.dataAttributes["data-slot"];

  return [
    "You're picking up a UI annotation captured with Loupe. Make the change in the source, then summarize what you did.",
    "",
    `Annotation bundle: ${bundle.dir} (screenshot at ${bundle.screenshot ? "./shot.png" : "n/a"})`,
    `Page: ${a.title} — ${a.url}`,
    a.label ? `Current title: ${a.label}` : "Current title: (unset — give it a descriptive one when you close the loop)",
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
    "",
    closeLoop(agentName),
  ]
    .filter(Boolean)
    .join("\n");
}

function buildRecordingPrompt(agentName: string, a: Annotation, bundle: WrittenBundle): string {
  const rec = a.recording;
  const summary = rec
    ? `Captured ${rec.console.length} console, ${rec.network.length} requests, ${rec.errors.length} errors, ${rec.events?.length ?? 0} events, ${bundle.keyframes.length} keyframes.`
    : "";
  return [
    "You're picking up a Loupe flow recording — a screen recording captured alongside keyframes, page events, console logs, network logs, and errors. You cannot watch the video; use the still keyframes and logs.",
    "",
    `Recording bundle: ${bundle.dir}`,
    `Page: ${a.title} — ${a.url}`,
    a.group ? `Group: ${a.group}` : "",
    summary,
    bundle.keyframes.length ? `Keyframes: ${bundle.keyframes.join(", ")}` : "",
    "Read in this order: note.md, keyframes, events.jsonl, console.log, network.jsonl, and errors.jsonl in the bundle. Correlate the note with clicks/typing, errors thrown, and requests that failed or returned >= 400, then find and fix the code.",
    "",
    a.note ? `Note: ${a.note}` : "Note: (none)",
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
    `After implementing each, give it a concise human-readable title with \`loupe title <id> "<title>"\` (5–8 words describing the change), then run \`loupe status <id> --status needs_review --author agent:${agentName}\`. Do not mark annotations resolved yourself; leave them for human review. Then summarize the whole change set.`,
  ].join("\n");
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function defaultCodexAppServerSocketPath(): string {
  const codexHome = process.env.CODEX_HOME || join(homedir(), ".codex");
  return join(codexHome, "app-server-control", "app-server-control.sock");
}

function jsonPath(value: unknown, path: string[]): unknown {
  let current = value;
  for (const key of path) {
    if (!current || typeof current !== "object" || !(key in current)) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

class CodexAppServerRpcClient {
  private nextId = 1;
  private frameBuffer = Buffer.alloc(0);
  private readonly pending = new Map<
    string,
    {
      method: string;
      resolve: (value: unknown) => void;
      reject: (error: Error) => void;
      timeout: NodeJS.Timeout;
    }
  >();

  private constructor(private readonly socket: Socket) {}

  static async connect(socketPath: string): Promise<CodexAppServerRpcClient> {
    const socket = createConnection(socketPath);
    const client = new CodexAppServerRpcClient(socket);
    await client.handshake();
    socket.on("data", (chunk) => client.receiveFrames(chunk));
    socket.on("error", (error) => client.rejectAll(error));
    socket.on("close", () => client.rejectAll(new Error("Codex app-server connection closed")));
    return client;
  }

  call(method: string, params: Record<string, unknown> = {}): Promise<unknown> {
    const id = String(this.nextId++);
    this.writeJson({ jsonrpc: "2.0", id, method, params });
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`${method} timed out`));
      }, 30_000);
      this.pending.set(id, { method, resolve, reject, timeout });
    });
  }

  notify(method: string, params?: Record<string, unknown>): void {
    this.writeJson(params ? { jsonrpc: "2.0", method, params } : { jsonrpc: "2.0", method });
  }

  close(): void {
    if (!this.socket.destroyed) this.socket.end(encodeWebSocketFrame(Buffer.alloc(0), 0x8));
  }

  private handshake(): Promise<void> {
    return new Promise((resolve, reject) => {
      const key = randomBytes(16).toString("base64");
      const expectedAccept = createHash("sha1")
        .update(`${key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`)
        .digest("base64");
      let buffer = Buffer.alloc(0);
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error("Codex app-server websocket handshake timed out"));
      }, 10_000);

      const cleanup = () => {
        clearTimeout(timeout);
        this.socket.off("data", onData);
        this.socket.off("error", onError);
      };
      const onError = (error: Error) => {
        cleanup();
        reject(error);
      };
      const onData = (chunk: Buffer) => {
        buffer = Buffer.concat([buffer, chunk]);
        const headerEnd = buffer.indexOf("\r\n\r\n");
        if (headerEnd < 0) return;
        const header = buffer.subarray(0, headerEnd).toString("utf8");
        if (!/^HTTP\/1\.1 101\b/m.test(header)) {
          cleanup();
          reject(new Error(`Codex app-server websocket handshake failed: ${header.split("\r\n")[0] ?? header}`));
          return;
        }
        if (!header.toLowerCase().includes(`sec-websocket-accept: ${expectedAccept.toLowerCase()}`)) {
          cleanup();
          reject(new Error("Codex app-server websocket handshake returned an invalid accept key"));
          return;
        }
        cleanup();
        this.frameBuffer = buffer.subarray(headerEnd + 4);
        resolve();
      };

      this.socket.once("error", onError);
      this.socket.on("data", onData);
      this.socket.write(
        [
          "GET /rpc HTTP/1.1",
          "Host: localhost",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Key: ${key}`,
          "Sec-WebSocket-Version: 13",
          "",
          "",
        ].join("\r\n"),
      );
    });
  }

  private writeJson(value: unknown): void {
    this.socket.write(encodeWebSocketFrame(Buffer.from(JSON.stringify(value)), 0x1));
  }

  private receiveFrames(chunk: Buffer): void {
    this.frameBuffer = Buffer.concat([this.frameBuffer, chunk]);
    while (this.frameBuffer.length >= 2) {
      const first = this.frameBuffer[0]!;
      const second = this.frameBuffer[1]!;
      const opcode = first & 0x0f;
      let length = second & 0x7f;
      let offset = 2;
      if (length === 126) {
        if (this.frameBuffer.length < 4) return;
        length = this.frameBuffer.readUInt16BE(2);
        offset = 4;
      } else if (length === 127) {
        this.rejectAll(new Error("Codex app-server sent an oversized websocket frame"));
        this.close();
        return;
      }

      const masked = Boolean(second & 0x80);
      let mask: Buffer | undefined;
      if (masked) {
        if (this.frameBuffer.length < offset + 4) return;
        mask = this.frameBuffer.subarray(offset, offset + 4);
        offset += 4;
      }
      if (this.frameBuffer.length < offset + length) return;

      let payload: Buffer = Buffer.from(this.frameBuffer.subarray(offset, offset + length));
      this.frameBuffer = this.frameBuffer.subarray(offset + length);
      if (mask) payload = unmask(payload, mask);

      if (opcode === 0x1) this.handleJson(payload.toString("utf8"));
      else if (opcode === 0x8) this.close();
      else if (opcode === 0x9) this.socket.write(encodeWebSocketFrame(payload, 0xA));
    }
  }

  private handleJson(text: string): void {
    const message = JSON.parse(text) as Record<string, unknown>;
    const id = typeof message.id === "string" ? message.id : undefined;
    if (id && this.pending.has(id)) {
      const pending = this.pending.get(id)!;
      this.pending.delete(id);
      clearTimeout(pending.timeout);
      if (message.error) {
        const error = message.error as { message?: unknown };
        pending.reject(new Error(`${pending.method}: ${typeof error.message === "string" ? error.message : "request failed"}`));
      } else {
        pending.resolve(message.result);
      }
      return;
    }

    if (id && typeof message.method === "string") {
      this.writeJson({
        jsonrpc: "2.0",
        id,
        error: {
          code: -32000,
          message: `loupe-bridge does not handle Codex app-server request ${message.method}`,
        },
      });
    }
  }

  private rejectAll(error: Error): void {
    for (const [id, pending] of this.pending) {
      clearTimeout(pending.timeout);
      pending.reject(error);
      this.pending.delete(id);
    }
  }
}

function encodeWebSocketFrame(payload: Buffer, opcode: number): Buffer {
  const mask = randomBytes(4);
  let header: Buffer;
  if (payload.length < 126) {
    header = Buffer.from([0x80 | opcode, 0x80 | payload.length]);
  } else if (payload.length < 65_536) {
    header = Buffer.alloc(4);
    header[0] = 0x80 | opcode;
    header[1] = 0x80 | 126;
    header.writeUInt16BE(payload.length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x80 | opcode;
    header[1] = 0x80 | 127;
    header.writeBigUInt64BE(BigInt(payload.length), 2);
  }
  return Buffer.concat([header, mask, unmask(payload, mask)]);
}

function unmask(payload: Buffer, mask: Buffer): Buffer {
  const out = Buffer.alloc(payload.length);
  for (let i = 0; i < payload.length; i++) out[i] = payload[i]! ^ mask[i % 4]!;
  return out;
}
