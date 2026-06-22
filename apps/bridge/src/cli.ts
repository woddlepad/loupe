#!/usr/bin/env node
import { resolve } from "node:path";
import { loadConfig } from "./config.js";
import { createBridge } from "./server.js";

/**
 * Loupe bridge daemon. Run from your target repo root:
 *   loupe-bridge [--port 7337] [--host 127.0.0.1] [--repo <path>]
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (hasFlag(args, "--help") || hasFlag(args, "-h")) return help();
  const port = numFlag(args, "--port");
  const host = strFlag(args, "--host");
  const repoRoot = strFlag(args, "--repo");

  const config = loadConfig({
    ...(port !== undefined ? { port } : {}),
    ...(host !== undefined ? { host } : {}),
    ...(repoRoot !== undefined ? { repoRoot: resolve(repoRoot) } : {}),
  });

  const bridge = createBridge(config);
  await bridge.listen();

  for (const sig of ["SIGINT", "SIGTERM"] as const) {
    process.on(sig, () => {
      console.log("\n[loupe] shutting down");
      void bridge.close().then(() => process.exit(0));
    });
  }
}

function strFlag(args: string[], name: string): string | undefined {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}

function numFlag(args: string[], name: string): number | undefined {
  const v = strFlag(args, name);
  return v !== undefined ? Number(v) : undefined;
}

function hasFlag(args: string[], name: string): boolean {
  return args.includes(name);
}

function help(): void {
  console.log(`loupe-bridge

Usage:
  loupe-bridge [--repo <path>] [--port 7337] [--host 127.0.0.1]

Prefer the main CLI when available:
  loupe bridge [--repo <path>] [--port 7337] [--host 127.0.0.1]
`);
}

void main();
