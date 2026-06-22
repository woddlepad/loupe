import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "packages/extension/dist-firefox");
const manifest = JSON.parse(readFileSync(resolve(dist, "manifest.json"), "utf8"));
const outDir = resolve(root, "artifacts");
const zip = resolve(outDir, `loupe-firefox-v${manifest.version}.zip`);

if (!existsSync(resolve(dist, "background.js"))) {
  throw new Error("Firefox extension dist is missing. Run pnpm build:firefox first.");
}

mkdirSync(outDir, { recursive: true });
rmSync(zip, { force: true });
execFileSync("zip", ["-r", zip, "."], {
  cwd: dist,
  stdio: "inherit",
});

console.log(`\n[loupe] wrote ${zip}`);
