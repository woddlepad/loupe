import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(resolve(root, "packages/extension/dist/manifest.json"), "utf8"));
const outDir = resolve(root, "artifacts");
const zip = resolve(outDir, `loupe-extension-v${manifest.version}.zip`);

if (!existsSync(resolve(root, "packages/extension/dist/background.js"))) {
  throw new Error("Extension dist is missing. Run pnpm build:extension first.");
}

mkdirSync(outDir, { recursive: true });
rmSync(zip, { force: true });
execFileSync("zip", ["-r", zip, "."], {
  cwd: resolve(root, "packages/extension/dist"),
  stdio: "inherit",
});

console.log(`\n[loupe] wrote ${zip}`);
