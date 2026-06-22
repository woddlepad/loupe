import type { BridgeRoute } from "./settings.js";
import { bridgeUrlForUrl, loadSettings, saveSettings } from "./settings.js";

const bridgeUrl = document.getElementById("bridgeUrl") as HTMLInputElement;
const bridgeRoutes = document.getElementById("bridgeRoutes") as HTMLTextAreaElement;
const author = document.getElementById("author") as HTMLInputElement;
const projectOrigins = document.getElementById("projectOrigins") as HTMLTextAreaElement;
const daemonStatus = document.getElementById("daemonStatus") as HTMLDivElement;
const shortcuts = document.getElementById("shortcuts") as HTMLDivElement;
const openShortcuts = document.getElementById("openShortcuts") as HTMLButtonElement;
const saved = document.getElementById("saved") as HTMLDivElement;

const COMMAND_LABELS: Record<string, string> = {
  "toggle-loupe": "Annotate",
  "toggle-view": "View annotations",
};

void (async () => {
  const s = await loadSettings();
  bridgeUrl.value = s.bridgeUrl;
  bridgeRoutes.value = formatBridgeRoutes(s.bridgeRoutes);
  author.value = s.author;
  projectOrigins.value = s.projectOrigins.join("\n");
  await renderDaemonStatus();
  await renderShortcuts();
})();

let timer: ReturnType<typeof setTimeout> | undefined;
function flash(text: string): void {
  saved.textContent = text;
  clearTimeout(timer);
  timer = setTimeout(() => (saved.textContent = ""), 1600);
}

bridgeUrl.addEventListener("change", async () => {
  await saveSettings({ bridgeUrl: bridgeUrl.value.trim() });
  await renderDaemonStatus();
  flash("saved");
});

bridgeRoutes.addEventListener("change", async () => {
  await saveSettings({ bridgeRoutes: parseBridgeRoutes(bridgeRoutes.value) });
  await renderDaemonStatus();
  flash("saved");
});

author.addEventListener("change", async () => {
  await saveSettings({ author: author.value.trim() || "me" });
  flash("saved");
});

projectOrigins.addEventListener("change", async () => {
  const list = projectOrigins.value
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
  await saveSettings({ projectOrigins: list });
  flash("saved");
});

openShortcuts.addEventListener("click", async () => {
  try {
    await chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
  } catch {
    flash("open chrome://extensions/shortcuts");
  }
});

async function renderShortcuts(): Promise<void> {
  const commands = await chrome.commands.getAll();
  shortcuts.replaceChildren(
    ...commands
      .filter((command) => command.name && COMMAND_LABELS[command.name])
      .map((command) => shortcutRow(COMMAND_LABELS[command.name!]!, command.shortcut)),
  );
}

async function renderDaemonStatus(): Promise<void> {
  const current = await currentTabUrl();
  const settings = await loadSettings();
  settings.bridgeUrl = bridgeUrl.value.trim() || settings.bridgeUrl;
  settings.bridgeRoutes = parseBridgeRoutes(bridgeRoutes.value);
  const url = bridgeUrlForUrl(settings, current);
  try {
    const healthUrl = new URL("/health", url.endsWith("/") ? url : `${url}/`);
    if (current) healthUrl.searchParams.set("pageUrl", current);
    if (settings.activeRepoRoot) healthUrl.searchParams.set("repoRoot", settings.activeRepoRoot);
    const res = await fetch(healthUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = (await res.json()) as { repoRoot?: string; project?: { name?: string } };
    daemonStatus.textContent = `Daemon connected${current ? `\ncurrent page bridge: ${url}` : `\nbridge: ${url}`}${body.project?.name ? `\nproject: ${body.project.name}` : ""}${body.repoRoot ? `\nrepo: ${body.repoRoot}` : ""}`;
    daemonStatus.className = "mt-3 rounded-lg bg-white/10 border border-white/20 p-3 text-[12px] text-loupe-fg whitespace-pre-line";
  } catch {
    daemonStatus.textContent = [
      `Daemon not reachable at ${url}.`,
      "",
      "Install the Loupe CLI:",
      "  npm install -g @woddlepad/loupe",
      "  # or from a source checkout: pnpm install:cli",
      "",
      "Then from your app repo:",
      "  loupe init",
      "  loupe bridge",
    ].join("\n");
    daemonStatus.className = "mt-3 rounded-lg bg-loupe-elev/80 border border-white/15 p-3 text-[12px] text-loupe-muted whitespace-pre-line";
  }
}

function parseBridgeRoutes(value: string): BridgeRoute[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [originsRaw, bridgeRaw] = line.split(/\s+/, 2);
      return {
        origins: (originsRaw ?? "").split(",").map((origin) => origin.trim()).filter(Boolean),
        bridgeUrl: (bridgeRaw ?? "").trim().replace(/\/$/, ""),
      };
    })
    .filter((route) => route.origins.length > 0 && route.bridgeUrl);
}

function formatBridgeRoutes(routes: BridgeRoute[]): string {
  return routes.map((route) => `${route.origins.join(",")} ${route.bridgeUrl}`).join("\n");
}

async function currentTabUrl(): Promise<string | undefined> {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab?.url;
  } catch {
    return undefined;
  }
}

function shortcutRow(label: string, shortcut: string | undefined): HTMLElement {
  const row = document.createElement("div");
  row.className = "flex items-center gap-2";
  const keys = document.createElement("div");
  keys.className = "flex items-center gap-1.5 min-w-[132px]";
  if (shortcut) {
    for (const part of shortcut.split("+")) keys.append(kbd(part));
  } else {
    const unset = document.createElement("span");
    unset.className = "text-loupe-faint text-[11px]";
    unset.textContent = "Not set";
    keys.append(unset);
  }
  const text = document.createElement("span");
  text.textContent = label;
  row.append(keys, text);
  return row;
}

function kbd(text: string): HTMLElement {
  const key = document.createElement("kbd");
  key.className = "bg-white/10 rounded px-1.5 py-0.5 text-[11px]";
  key.textContent = text;
  return key;
}
