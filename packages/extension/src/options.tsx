import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@loupe/ui";
import type { BridgeRoute, CodexLaunchMode } from "./settings.js";
import { bridgeUrlForUrl, loadSettings, saveSettings } from "./settings.js";

const COMMAND_LABELS: Record<string, string> = {
  "toggle-loupe": "Annotate",
  "toggle-view": "View annotations",
};

interface ProviderItem {
  id: string;
  label: string;
  enabled: boolean;
}

type ProvidersState =
  | { kind: "message"; text: string }
  | { kind: "list"; items: ProviderItem[] };

interface ShortcutItem {
  label: string;
  shortcut: string | undefined;
}

interface DaemonState {
  text: string;
  connected: boolean;
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

function parseCodexLaunchMode(value: string): CodexLaunchMode {
  return value === "url-handler" ? "url-handler" : "background";
}

async function currentTabUrl(): Promise<string | undefined> {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab?.url;
  } catch {
    return undefined;
  }
}

function App() {
  const [bridgeUrl, setBridgeUrl] = useState("");
  const [bridgeRoutesText, setBridgeRoutesText] = useState("");
  const [author, setAuthor] = useState("");
  const [codexMode, setCodexMode] = useState<CodexLaunchMode>("background");
  const [projectOriginsText, setProjectOriginsText] = useState("");
  const [daemon, setDaemon] = useState<DaemonState>({ text: "", connected: false });
  const [providers, setProviders] = useState<ProvidersState>({ kind: "message", text: "" });
  const [shortcuts, setShortcuts] = useState<ShortcutItem[]>([]);
  const [saved, setSaved] = useState("");
  const [openingShortcuts, setOpeningShortcuts] = useState(false);

  // Mirror the committed field values so the async render helpers below always
  // read the latest bridge URL / routes without stale closures.
  const bridgeUrlRef = useRef("");
  const bridgeRoutesRef = useRef("");
  // Last-committed values, so a blur without an edit does not re-save/flash
  // (the native <input> "change" event only fired when the value changed).
  const committedBridgeUrl = useRef("");
  const committedBridgeRoutes = useRef("");
  const committedAuthor = useRef("");
  const committedOrigins = useRef("");
  const flashTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const flash = (text: string): void => {
    setSaved(text);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setSaved(""), 1600);
  };

  const renderDaemonStatus = async (): Promise<void> => {
    const current = await currentTabUrl();
    const settings = await loadSettings();
    settings.bridgeUrl = bridgeUrlRef.current.trim() || settings.bridgeUrl;
    settings.bridgeRoutes = parseBridgeRoutes(bridgeRoutesRef.current);
    const url = bridgeUrlForUrl(settings, current);
    try {
      const healthUrl = new URL("/health", url.endsWith("/") ? url : `${url}/`);
      if (current) healthUrl.searchParams.set("pageUrl", current);
      if (settings.activeRepoRoot) healthUrl.searchParams.set("repoRoot", settings.activeRepoRoot);
      healthUrl.searchParams.set("codexMode", settings.codexLaunchMode);
      const res = await fetch(healthUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = (await res.json()) as { repoRoot?: string; project?: { name?: string } };
      setDaemon({
        connected: true,
        text: `Daemon connected${current ? `\ncurrent page bridge: ${url}` : `\nbridge: ${url}`}${body.project?.name ? `\nproject: ${body.project.name}` : ""}${body.repoRoot ? `\nrepo: ${body.repoRoot}` : ""}`,
      });
    } catch {
      setDaemon({
        connected: false,
        text: [
          `Daemon not reachable at ${url}.`,
          "",
          "Install the Loupe CLI:",
          "  npm install -g @woddlepad/loupe",
          "  # or from a source checkout: pnpm install:cli",
          "",
          "Then from your app repo:",
          "  loupe init",
          "  loupe bridge",
        ].join("\n"),
      });
    }
  };

  const renderProviders = async (): Promise<void> => {
    const current = await currentTabUrl();
    const settings = await loadSettings();
    settings.bridgeUrl = bridgeUrlRef.current.trim() || settings.bridgeUrl;
    settings.bridgeRoutes = parseBridgeRoutes(bridgeRoutesRef.current);
    const base = bridgeUrlForUrl(settings, current);
    let actions: { id: string; label: string }[] = [];
    try {
      const actionsUrl = new URL("/actions", base.endsWith("/") ? base : `${base}/`);
      if (current) actionsUrl.searchParams.set("pageUrl", current);
      if (settings.activeRepoRoot) actionsUrl.searchParams.set("repoRoot", settings.activeRepoRoot);
      const res = await fetch(actionsUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = (await res.json()) as { actions?: { id: string; label: string }[] };
      actions = (body.actions ?? []).filter((a) => a.id !== "save");
    } catch {
      setProviders({ kind: "message", text: "Daemon not reachable — provider list unavailable." });
      return;
    }
    if (actions.length === 0) {
      setProviders({
        kind: "message",
        text: "No providers detected. Install an agent CLI (claude, codex, copilot, pi).",
      });
      return;
    }
    const disabled = new Set(settings.disabledProviders);
    setProviders({
      kind: "list",
      items: actions.map((a) => ({ id: a.id, label: a.label, enabled: !disabled.has(a.id) })),
    });
  };

  const renderShortcuts = async (): Promise<void> => {
    const commands = await chrome.commands.getAll();
    setShortcuts(
      commands
        .filter((command) => command.name && COMMAND_LABELS[command.name])
        .map((command) => ({
          label: COMMAND_LABELS[command.name!]!,
          shortcut: command.shortcut,
        })),
    );
  };

  useEffect(() => {
    void (async () => {
      const s = await loadSettings();
      const routesText = formatBridgeRoutes(s.bridgeRoutes);
      const originsText = s.projectOrigins.join("\n");
      setBridgeUrl(s.bridgeUrl);
      setBridgeRoutesText(routesText);
      setAuthor(s.author);
      setCodexMode(s.codexLaunchMode);
      setProjectOriginsText(originsText);
      bridgeUrlRef.current = s.bridgeUrl;
      bridgeRoutesRef.current = routesText;
      committedBridgeUrl.current = s.bridgeUrl;
      committedBridgeRoutes.current = routesText;
      committedAuthor.current = s.author;
      committedOrigins.current = originsText;
      await renderDaemonStatus();
      await renderProviders();
      await renderShortcuts();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commitBridgeUrl = async (): Promise<void> => {
    if (bridgeUrl === committedBridgeUrl.current) return;
    committedBridgeUrl.current = bridgeUrl;
    await saveSettings({ bridgeUrl: bridgeUrl.trim() });
    await renderDaemonStatus();
    await renderProviders();
    flash("saved");
  };

  const commitBridgeRoutes = async (): Promise<void> => {
    if (bridgeRoutesText === committedBridgeRoutes.current) return;
    committedBridgeRoutes.current = bridgeRoutesText;
    await saveSettings({ bridgeRoutes: parseBridgeRoutes(bridgeRoutesText) });
    await renderDaemonStatus();
    flash("saved");
  };

  const commitAuthor = async (): Promise<void> => {
    if (author === committedAuthor.current) return;
    committedAuthor.current = author;
    await saveSettings({ author: author.trim() || "me" });
    flash("saved");
  };

  const onChangeCodexMode = async (value: string): Promise<void> => {
    const mode = parseCodexLaunchMode(value);
    setCodexMode(mode);
    await saveSettings({ codexLaunchMode: mode });
    await renderDaemonStatus();
    flash("saved");
  };

  const commitProjectOrigins = async (): Promise<void> => {
    if (projectOriginsText === committedOrigins.current) return;
    committedOrigins.current = projectOriginsText;
    const list = projectOriginsText
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
    await saveSettings({ projectOrigins: list });
    flash("saved");
  };

  const toggleProvider = async (id: string, currentlyEnabled: boolean): Promise<void> => {
    const newEnabled = !currentlyEnabled;
    const current = await loadSettings();
    const set = new Set(current.disabledProviders);
    if (newEnabled) set.delete(id);
    else set.add(id);
    await saveSettings({ disabledProviders: [...set] });
    setProviders((prev) =>
      prev.kind === "list"
        ? {
            kind: "list",
            items: prev.items.map((it) => (it.id === id ? { ...it, enabled: newEnabled } : it)),
          }
        : prev,
    );
    flash("saved");
  };

  const openShortcuts = async (): Promise<void> => {
    setOpeningShortcuts(true);
    try {
      await chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
    } catch {
      flash("open chrome://extensions/shortcuts");
    } finally {
      setOpeningShortcuts(false);
    }
  };

  return (
    <div className="mx-auto max-w-[460px]">
      <h1 className="text-[18px] font-semibold">Loupe</h1>
      <p className="text-loupe-muted text-[13px] mt-1 mb-5">
        where annotations go, and who picks them up.
      </p>

      <label htmlFor="bridgeUrl" className="block text-[12px] text-loupe-muted mb-1.5 mt-4">
        Bridge daemon URL
      </label>
      <Input
        id="bridgeUrl"
        type="text"
        placeholder="http://localhost:7337 or http://my-mac.tailnet.ts.net:7337"
        className="w-full text-[13px]"
        value={bridgeUrl}
        onChange={(e) => {
          setBridgeUrl(e.target.value);
          bridgeUrlRef.current = e.target.value;
        }}
        onBlur={() => void commitBridgeUrl()}
      />
      <p className="text-loupe-faint text-[11px] mt-1.5">
        local setup:{" "}
        <code className="font-mono text-loupe-muted">loupe init</code>{" "}
        then{" "}
        <code className="font-mono text-loupe-muted">loupe bridge</code>{" "}
        · remote:{" "}
        <code className="font-mono text-loupe-muted">
          loupe bridge --repo ~/dev/app --host 0.0.0.0
        </code>
      </p>

      <label htmlFor="bridgeRoutes" className="block text-[12px] text-loupe-muted mb-1.5 mt-4">
        Bridge routes
      </label>
      <Textarea
        id="bridgeRoutes"
        rows={3}
        placeholder={"mac-studio*.ts.net http://mac-studio.tailnet.ts.net:7337\n*.mac-studio.local http://mac-studio.local:7337"}
        className="w-full text-[12px] font-mono resize-y"
        value={bridgeRoutesText}
        onChange={(e) => {
          setBridgeRoutesText(e.target.value);
          bridgeRoutesRef.current = e.target.value;
        }}
        onBlur={() => void commitBridgeRoutes()}
      />
      <p className="text-loupe-faint text-[11px] mt-1.5">
        first match wins. pages that do not match a route use the default bridge URL above.
      </p>

      <div
        className={
          daemon.connected
            ? "mt-3 rounded-lg bg-white/10 border border-white/20 p-3 text-[12px] text-loupe-fg whitespace-pre-line"
            : daemon.text
              ? "mt-3 rounded-lg bg-loupe-elev/80 border border-white/15 p-3 text-[12px] text-loupe-muted whitespace-pre-line"
              : "mt-3 rounded-lg bg-loupe-panel/60 border border-loupe-line p-3 text-[12px] text-loupe-muted whitespace-pre-line"
        }
      >
        {daemon.text}
      </div>

      <label htmlFor="author" className="block text-[12px] text-loupe-muted mb-1.5 mt-4">
        Your name (on comments)
      </label>
      <Input
        id="author"
        type="text"
        placeholder="me"
        className="w-full text-[13px]"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        onBlur={() => void commitAuthor()}
      />
      <p className="text-loupe-faint text-[11px] mt-1.5">
        actions in the panel are advertised by the daemon (save, agents, integrations, custom).
      </p>

      <label htmlFor="codexLaunchMode" className="block text-[12px] text-loupe-muted mb-1.5 mt-4">
        Codex handoff
      </label>
      <Select value={codexMode} onValueChange={(v) => void onChangeCodexMode(v)}>
        <SelectTrigger id="codexLaunchMode" className="w-full text-[13px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="background">Background agent</SelectItem>
          <SelectItem value="url-handler">URL handler</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-loupe-faint text-[11px] mt-1.5">
        background runs Codex from the bridge; URL handler opens a visible Codex app thread.
      </p>

      <label className="block text-[12px] text-loupe-muted mb-1.5 mt-4">Providers</label>
      <div className="rounded-lg bg-loupe-panel/60 border border-loupe-line p-3 text-[12px] text-loupe-muted space-y-1.5">
        {providers.kind === "message"
          ? providers.text
          : providers.items.map((item) => (
              <label key={item.id} className="flex items-center gap-2 text-loupe-fg cursor-pointer">
                <Checkbox
                  checked={item.enabled}
                  aria-label={item.label}
                  onCheckedChange={() => void toggleProvider(item.id, item.enabled)}
                />
                <span>{item.label}</span>
              </label>
            ))}
      </div>
      <p className="text-loupe-faint text-[11px] mt-1.5">
        toggle which agents appear in the Loupe panel. only providers the daemon detects (installed
        binaries) are listed here.
      </p>

      <label htmlFor="projectOrigins" className="block text-[12px] text-loupe-muted mb-1.5 mt-4">
        Project origins
      </label>
      <Textarea
        id="projectOrigins"
        rows={4}
        placeholder={"localhost\n*.my-tailnet.ts.net\nstaging.acme.com"}
        className="w-full text-[12px] font-mono resize-y"
        value={projectOriginsText}
        onChange={(e) => setProjectOriginsText(e.target.value)}
        onBlur={() => void commitProjectOrigins()}
      />
      <p className="text-loupe-faint text-[11px] mt-1.5">
        one host pattern per line — these count as "your app" (annotations map to source). supports
        ports, remote hosts, and wildcards (e.g. localhost:5173 or a Tailscale tailnet). anything
        else becomes a reference capture.
      </p>

      <div className="mt-6 rounded-lg bg-loupe-panel/60 border border-loupe-line p-3 text-[12px] text-loupe-muted">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-loupe-fg font-medium text-[12px]">Shortcuts</div>
          <Button
            type="button"
            size="xs"
            className="ml-auto text-[11px]"
            loading={openingShortcuts}
            onClick={() => void openShortcuts()}
          >
            Open shortcuts
          </Button>
        </div>
        <div className="space-y-1.5">
          {shortcuts.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 min-w-[132px]">
                {item.shortcut ? (
                  item.shortcut
                    .split("+")
                    .map((part, i) => (
                      <kbd key={i} className="bg-white/10 rounded px-1.5 py-0.5 text-[11px]">
                        {part}
                      </kbd>
                    ))
                ) : (
                  <span className="text-loupe-faint text-[11px]">Not set</span>
                )}
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <p className="text-loupe-faint text-[11px] mt-2">
          Chrome owns extension shortcut editing. Use the shortcut editor to change or clear these
          keys.
        </p>
      </div>

      <div className="text-loupe-muted text-[12px] h-4 mt-3">{saved}</div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
