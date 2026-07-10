import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const tailwindCli = resolve(root, "node_modules/.bin/tailwindcss");

mkdirSync(resolve(root, "dist"), { recursive: true });
execFileSync(tailwindCli, ["-i", resolve(here, "styles.css"), "-o", resolve(root, "dist/dreamer.css")], {
  cwd: root,
  stdio: "inherit",
});
// Overlay sheet for the feedback LoupeOverlay (shadow root + panel iframe).
execFileSync(tailwindCli, ["-i", resolve(here, "overlay.css"), "-o", resolve(root, "dist/dreamer-overlay.css")], {
  cwd: root,
  stdio: "inherit",
});
