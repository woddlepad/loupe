#!/usr/bin/env node
import { createServer } from "node:http";
import { spawnSync } from "node:child_process";
import { chmodSync, cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, symlinkSync, writeFileSync } from "node:fs";
import { chmod, realpath } from "node:fs/promises";
import { homedir, platform } from "node:os";
import { delimiter, dirname, isAbsolute, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const isWindows = platform() === "win32";
const isMac = platform() === "darwin";
const isLinux = platform() === "linux";

main().catch((error) => {
  console.error(`[loupe] source install failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});

async function main() {
  if (process.env.LOUPE_SKIP_SOURCE_INSTALL === "1") {
    console.log("[loupe] skipping source install because LOUPE_SKIP_SOURCE_INSTALL=1");
    return;
  }

  if (process.env.CI && process.env.LOUPE_RUN_SOURCE_INSTALL_IN_CI !== "1") {
    console.log("[loupe] skipping source install in CI");
    return;
  }

  if (!isSourceCheckout()) {
    console.log("[loupe] skipping source install outside a Loupe source checkout");
    return;
  }

  runPnpm(["build"]);
  await installCli();
  installSkills();

  if (process.env.LOUPE_SKIP_CHROME_INSTALL === "1") {
    console.log("[loupe] skipping Chrome extension setup because LOUPE_SKIP_CHROME_INSTALL=1");
    return;
  }

  await ensureChromeExtension();
}

function isSourceCheckout() {
  return (
    existsSync(resolve(root, "pnpm-workspace.yaml")) &&
    existsSync(resolve(root, "packages/extension/manifest.json")) &&
    existsSync(resolve(root, "skills/loupe/SKILL.md")) &&
    existsSync(resolve(root, "skills/dream/SKILL.md"))
  );
}

function runPnpm(args) {
  const command = isWindows ? "pnpm.cmd" : "pnpm";
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`pnpm ${args.join(" ")} exited with ${result.status}`);
}

async function installCli() {
  const loupe = resolve(root, "apps/bridge/dist/loupe.js");
  const bridge = resolve(root, "apps/bridge/dist/cli.js");
  if (!existsSync(loupe) || !existsSync(bridge)) throw new Error("bridge dist is missing after build");

  const binDir = userBinDir();
  mkdirSync(binDir, { recursive: true });

  if (isWindows) {
    writeCmdShim(resolve(binDir, "loupe.cmd"), loupe);
    writeCmdShim(resolve(binDir, "loupe-bridge.cmd"), bridge);
    writePowerShellShim(resolve(binDir, "loupe.ps1"), loupe);
    writePowerShellShim(resolve(binDir, "loupe-bridge.ps1"), bridge);
  } else {
    await chmod(loupe, 0o755);
    await chmod(bridge, 0o755);
    replaceSymlink(loupe, resolve(binDir, "loupe"));
    replaceSymlink(bridge, resolve(binDir, "loupe-bridge"));
  }

  console.log(`[loupe] installed CLI shims in ${binDir}`);
  warnIfNotOnPath(binDir);
}

function userBinDir() {
  if (process.env.LOUPE_BIN_DIR) return resolve(process.env.LOUPE_BIN_DIR);
  if (isWindows) {
    return resolve(process.env.LOCALAPPDATA ?? join(homedir(), "AppData", "Local"), "Programs", "Loupe", "bin");
  }
  return resolve(homedir(), ".local", "bin");
}

function replaceSymlink(target, link) {
  rmSync(link, { force: true, recursive: true });
  symlinkSync(target, link);
}

function writeCmdShim(path, target) {
  writeFileSync(path, `@ECHO OFF\r\nnode "${target}" %*\r\n`);
}

function writePowerShellShim(path, target) {
  writeFileSync(path, `#!/usr/bin/env pwsh\n& node "${target}" @args\nexit $LASTEXITCODE\n`);
}

function warnIfNotOnPath(binDir) {
  const paths = (process.env.PATH ?? "").split(delimiter).map((item) => normalize(resolve(item)));
  if (!paths.includes(normalize(resolve(binDir)))) {
    console.warn(`[loupe] ${binDir} is not on PATH; add it if "loupe" is not found in new shells`);
  }
}

function installSkills() {
  const codexHome = resolve(process.env.CODEX_HOME ?? resolve(homedir(), ".codex"));
  const codexSkill = resolve(codexHome, "skills/loupe");
  const codexDreamSkill = resolve(codexHome, "skills/dream");
  const claudeCommands = resolve(homedir(), ".claude/commands");

  rmSync(codexSkill, { recursive: true, force: true });
  rmSync(codexDreamSkill, { recursive: true, force: true });
  mkdirSync(resolve(codexSkill, ".."), { recursive: true });
  cpSync(resolve(root, "skills/loupe"), codexSkill, { recursive: true });
  cpSync(resolve(root, "skills/dream"), codexDreamSkill, { recursive: true });
  chmodSyncBestEffort(resolve(codexSkill, "scripts/loupe_context.py"), 0o755);

  mkdirSync(claudeCommands, { recursive: true });
  cpSync(resolve(root, "commands/claude/loupe.md"), resolve(claudeCommands, "loupe.md"));
  cpSync(resolve(root, "commands/claude/dream.md"), resolve(claudeCommands, "dream.md"));

  console.log(`[loupe] installed Codex skills in ${resolve(codexSkill, "..")}`);
  console.log(`[loupe] installed Claude commands in ${claudeCommands}`);
}

function chmodSyncBestEffort(path, mode) {
  try {
    chmodSync(path, mode);
  } catch {
    // Windows does not need the executable bit for the Python helper.
  }
}

async function ensureChromeExtension() {
  const dist = resolve(root, "packages/extension/dist");
  if (!existsSync(resolve(dist, "manifest.json"))) {
    console.warn("[loupe] Chrome extension dist is missing; skipping Chrome setup");
    return;
  }

  const matches = await findInstalledUnpackedExtensions(dist);
  if (matches.length > 0) {
    const reloaded = await reloadInstalledExtension(matches.map((match) => match.id));
    if (reloaded) {
      console.log("[loupe] reloaded the installed Chrome extension");
      return;
    }
    console.warn("[loupe] found Loupe in Chrome, but could not trigger an automatic reload");
    console.warn("[loupe] reload Loupe once from chrome://extensions; future installs can reload it automatically");
    openChromeUrl("chrome://extensions").ok || console.warn("[loupe] open chrome://extensions and reload Loupe manually");
    return;
  }

  console.warn("[loupe] Chrome requires one manual approval before a source-built extension can be installed");
  console.warn(`[loupe] Load unpacked extension folder: ${dist}`);
  console.warn("[loupe] After that first load, future pnpm install runs will rebuild and reload it automatically");
  openChromeUrl("chrome://extensions");
  openFolder(dist);
}

async function findInstalledUnpackedExtensions(dist) {
  const target = await canonicalPath(dist);
  const matches = [];
  for (const profile of chromeProfiles()) {
    const prefsPath = resolve(profile, "Preferences");
    let prefs;
    try {
      prefs = JSON.parse(readFileSync(prefsPath, "utf8"));
    } catch {
      continue;
    }

    const settings = prefs.extensions?.settings;
    if (!settings || typeof settings !== "object") continue;

    for (const [id, setting] of Object.entries(settings)) {
      const extensionPath = extensionSettingPath(profile, setting);
      if (!extensionPath) continue;
      const canonical = await canonicalPath(extensionPath);
      if (canonical === target) matches.push({ id, profile });
    }
  }
  return matches;
}

function extensionSettingPath(profile, setting) {
  if (!setting || typeof setting !== "object") return null;
  const value = setting.path;
  if (typeof value !== "string" || value.length === 0) return null;
  return isAbsolute(value) ? value : resolve(profile, value);
}

async function canonicalPath(path) {
  try {
    return normalize(await realpath(path));
  } catch {
    return normalize(resolve(path));
  }
}

function chromeProfiles() {
  const bases = chromeUserDataDirs().filter((dir) => existsSync(dir));
  const profiles = [];
  for (const base of bases) {
    if (existsSync(resolve(base, "Preferences"))) profiles.push(base);
    let entries = [];
    try {
      entries = readDirNames(base);
    } catch {
      continue;
    }
    for (const entry of entries) {
      const profile = resolve(base, entry);
      if (existsSync(resolve(profile, "Preferences"))) profiles.push(profile);
    }
  }
  return [...new Set(profiles)];
}

function chromeUserDataDirs() {
  if (isMac) {
    const app = resolve(homedir(), "Library/Application Support");
    return [
      resolve(app, "Google/Chrome"),
      resolve(app, "Google/Chrome Beta"),
      resolve(app, "Google/Chrome Canary"),
      resolve(app, "Chromium"),
    ];
  }
  if (isLinux) {
    const config = process.env.XDG_CONFIG_HOME ?? resolve(homedir(), ".config");
    return [
      resolve(config, "google-chrome"),
      resolve(config, "google-chrome-beta"),
      resolve(config, "google-chrome-unstable"),
      resolve(config, "chromium"),
    ];
  }
  if (isWindows) {
    const local = process.env.LOCALAPPDATA ?? resolve(homedir(), "AppData", "Local");
    return [
      resolve(local, "Google/Chrome/User Data"),
      resolve(local, "Google/Chrome Beta/User Data"),
      resolve(local, "Google/Chrome SxS/User Data"),
      resolve(local, "Chromium/User Data"),
    ];
  }
  return [];
}

function readDirNames(dir) {
  return readdirSync(dir).filter((entry) => {
    try {
      return statSync(resolve(dir, entry)).isDirectory();
    } catch {
      return false;
    }
  });
}

async function reloadInstalledExtension(ids) {
  const server = createServer((req, res) => {
    if (req.method === "POST" && req.url === "/result") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          const result = JSON.parse(body);
          server.emit("loupe-result", result);
        } catch {
          server.emit("loupe-result", { ok: false, error: "invalid result" });
        }
        res.writeHead(204).end();
      });
      return;
    }

    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(reloadPage(ids));
  });

  await new Promise((resolveListen, rejectListen) => {
    server.once("error", rejectListen);
    server.listen(0, "127.0.0.1", resolveListen);
  });

  const address = server.address();
  const url = `http://127.0.0.1:${address.port}/`;
  const opened = openChromeUrl(url);
  if (!opened.ok) {
    server.close();
    console.warn(`[loupe] could not open Chrome: ${opened.error}`);
    return false;
  }

  return await new Promise((resolveResult) => {
    const timeout = setTimeout(() => finish(false), 12000);
    const results = [];
    server.on("loupe-result", (result) => {
      results.push(result);
      if (result?.ok) finish(true);
      if (results.length >= ids.length) finish(false);
    });

    function finish(ok) {
      clearTimeout(timeout);
      server.close();
      resolveResult(ok);
    }
  });
}

function reloadPage(ids) {
  return `<!doctype html>
<meta charset="utf-8">
<title>Reload Loupe</title>
<body>Reloading Loupe...</body>
<script>
const ids = ${JSON.stringify(ids)};
function report(result) {
  fetch("/result", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(result) }).catch(() => {});
}
if (!globalThis.chrome?.runtime?.sendMessage) {
  report({ ok: false, error: "chrome.runtime is unavailable" });
} else {
  for (const id of ids) {
    chrome.runtime.sendMessage(id, { type: "loupe-dev-reload" }, (response) => {
      const error = chrome.runtime.lastError?.message;
      report({ id, ok: !error && response?.ok === true, error });
    });
  }
}
</script>`;
}

function openChromeUrl(url) {
  const attempts = chromeOpenCommands(url);
  for (const [command, args] of attempts) {
    const result = spawnSync(command, args, { stdio: "ignore", windowsHide: true });
    if (!result.error && result.status === 0) return { ok: true };
  }
  return { ok: false, error: "Chrome executable was not found" };
}

function chromeOpenCommands(url) {
  if (isMac) return [["open", ["-a", "Google Chrome", url]], ["open", [url]]];
  if (isLinux) {
    return [
      ["google-chrome", [url]],
      ["google-chrome-stable", [url]],
      ["google-chrome-beta", [url]],
      ["chromium", [url]],
      ["chromium-browser", [url]],
      ["xdg-open", [url]],
    ];
  }
  if (isWindows) return [["cmd.exe", ["/c", "start", "", "chrome", url]], ["cmd.exe", ["/c", "start", "", url]]];
  return [];
}

function openFolder(folder) {
  const attempts = isMac
    ? [["open", [folder]]]
    : isLinux
      ? [["xdg-open", [folder]]]
      : isWindows
        ? [["explorer.exe", [folder]]]
        : [];
  for (const [command, args] of attempts) {
    const result = spawnSync(command, args, { stdio: "ignore", windowsHide: true });
    if (!result.error && result.status === 0) return;
  }
}
