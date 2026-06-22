import { build, context } from "esbuild";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));
const watch = process.argv.includes("--watch");
const browser = process.argv.includes("--firefox") ? "firefox" : "chrome";
const out = resolve(here, browser === "firefox" ? "dist-firefox" : "dist");

const TW = resolve(here, "node_modules/@tailwindcss/cli/dist/index.mjs");

/** Compile a Tailwind entry to a CSS file. */
function tailwind(input, output) {
  execFileSync("node", [TW, "-i", input, "-o", output], { cwd: here, stdio: "inherit" });
}

function compileStyles() {
  mkdirSync(out, { recursive: true });
  // Overlay sheet is text-loaded into the content bundle (injected into the
  // shadow root); the pages sheet is linked by options.html / popup.html.
  tailwind(resolve(here, "src/styles/overlay.css"), resolve(here, "src/styles/overlay.gen.css"));
  tailwind(resolve(here, "src/styles/pages.css"), resolve(out, "pages.css"));
}

const entryPoints = {
  "framework-inspector": resolve(here, "src/framework-inspector.ts"),
  content: resolve(here, "src/content.ts"),
  background: resolve(here, "src/background.ts"),
  options: resolve(here, "src/options.ts"),
  popup: resolve(here, "src/popup.ts"),
};

const common = {
  entryPoints,
  outdir: out,
  bundle: true,
  format: "esm",
  target: browser === "firefox" ? "firefox121" : "chrome120",
  logLevel: "info",
  legalComments: "none",
  minify: !watch,
  define: { "process.env.NODE_ENV": '"production"' },
  loader: { ".css": "text" },
};

function copyStatic() {
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  writeFileSync(resolve(out, "manifest.json"), JSON.stringify(manifestFor(browser), null, 2) + "\n");
  for (const html of ["options.html", "popup.html"]) {
    cpSync(resolve(here, "src", html), resolve(out, html));
  }
  generateIcons();
}

function generateIcons() {
  mkdirSync(resolve(out, "icons"), { recursive: true });
  for (const size of [16, 48, 128]) {
    cpSync(resolve(here, `icons/icon${size}.png`), resolve(out, `icons/icon${size}.png`));
  }
}

function manifestFor(targetBrowser) {
  const manifest = JSON.parse(readFileSync(resolve(here, "manifest.json"), "utf8"));
  if (targetBrowser !== "firefox") return manifest;

  delete manifest.minimum_chrome_version;
  manifest.background = {
    scripts: [manifest.background.service_worker],
    type: "module",
  };
  manifest.browser_specific_settings = {
    gecko: {
      id: "loupe@woddlepad.com",
      strict_min_version: "140.0",
      data_collection_permissions: {
        required: ["browsingActivity", "websiteContent", "websiteActivity"],
      },
    },
    gecko_android: {
      strict_min_version: "142.0",
    },
  };
  return manifest;
}

compileStyles();
copyStatic();

if (watch) {
  const ctx = await context(common);
  await ctx.watch();
  console.log("[loupe] watching…");
} else {
  await build(common);
}
