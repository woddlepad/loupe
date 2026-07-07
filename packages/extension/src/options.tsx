import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Plus, Trash2 } from "lucide-react";
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
import {
  bridgeRouteFromInput,
  bridgeUrlForUrl,
  loadSettings,
  normalizeBridgeRoutes,
  parseBridgeRouteOrigins,
  saveSettings,
} from "./settings.js";

const COMMAND_LABELS: Record<string, string> = {
  "toggle-loupe": "Annotate",
  "toggle-frozen-loupe": "Freeze annotate",
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

interface BridgeRouteDraft {
  id: string;
  originsText: string;
  bridgeUrl: string;
}

let nextRouteId = 0;

function createRouteDraft(route?: BridgeRoute): BridgeRouteDraft {
  nextRouteId += 1;
  return {
    id: `bridge-route-${nextRouteId}`,
    originsText: route?.origins.join(", ") ?? "",
    bridgeUrl: route?.bridgeUrl ?? "",
  };
}

function bridgeRoutesFromDrafts(drafts: BridgeRouteDraft[]): BridgeRoute[] {
  return drafts
    .map((draft) => bridgeRouteFromInput(draft.originsText, draft.bridgeUrl))
    .filter((route): route is BridgeRoute => Boolean(route));
}

function bridgeRoutesKey(routes: BridgeRoute[]): string {
  return JSON.stringify(normalizeBridgeRoutes(routes));
}

function hasIncompleteBridgeRouteDraft(drafts: BridgeRouteDraft[]): boolean {
  return drafts.some((draft) => {
    const hasOrigins = parseBridgeRouteOrigins(draft.originsText).length > 0;
    const hasBridgeUrl = Boolean(draft.bridgeUrl.trim());
    return hasOrigins !== hasBridgeUrl;
  });
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
  const [bridgeRoutes, setBridgeRoutes] = useState<BridgeRouteDraft[]>([]);
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
  const bridgeRoutesRef = useRef<BridgeRouteDraft[]>([]);
  // Last-committed values, so a blur without an edit does not re-save/flash
  // (the native <input> "change" event only fired when the value changed).
  const committedBridgeUrl = useRef("");
  const committedBridgeRoutes = useRef("");
  const committedAuthor = useRef("");
  const committedOrigins = useRef("");
  const settingsLoaded = useRef(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const flash = (text: string): void => {
    setSaved(text);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setSaved(""), 1600);
  };

  const setBridgeRouteDrafts = (updater: BridgeRouteDraft[] | ((routes: BridgeRouteDraft[]) => BridgeRouteDraft[])): void => {
    const next = typeof updater === "function" ? updater(bridgeRoutesRef.current) : updater;
    bridgeRoutesRef.current = next;
    setBridgeRoutes(next);
  };

  const renderDaemonStatus = async (): Promise<void> => {
    const current = await currentTabUrl();
    const settings = await loadSettings();
    settings.bridgeUrl = bridgeUrlRef.current.trim() || settings.bridgeUrl;
    settings.bridgeRoutes = bridgeRoutesFromDrafts(bridgeRoutesRef.current);
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
          "Install Loupe from the source checkout:",
          "  cd /path/to/loupe",
          "  pnpm install",
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
    settings.bridgeRoutes = bridgeRoutesFromDrafts(bridgeRoutesRef.current);
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
      const routeDrafts = normalizeBridgeRoutes(s.bridgeRoutes).map((route) => createRouteDraft(route));
      const originsText = s.projectOrigins.join("\n");
      setBridgeUrl(s.bridgeUrl);
      setBridgeRoutes(routeDrafts);
      setAuthor(s.author);
      setCodexMode(s.codexLaunchMode);
      setProjectOriginsText(originsText);
      bridgeUrlRef.current = s.bridgeUrl;
      bridgeRoutesRef.current = routeDrafts;
      committedBridgeUrl.current = s.bridgeUrl;
      committedBridgeRoutes.current = bridgeRoutesKey(bridgeRoutesFromDrafts(routeDrafts));
      committedAuthor.current = s.author;
      committedOrigins.current = originsText;
      await renderDaemonStatus();
      await renderProviders();
      await renderShortcuts();
      settingsLoaded.current = true;
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
    if (hasIncompleteBridgeRouteDraft(bridgeRoutesRef.current)) return;
    const routes = bridgeRoutesFromDrafts(bridgeRoutesRef.current);
    const key = bridgeRoutesKey(routes);
    if (key === committedBridgeRoutes.current) return;
    committedBridgeRoutes.current = key;
    await saveSettings({ bridgeRoutes: routes });
    await renderDaemonStatus();
    await renderProviders();
    flash("saved");
  };

  useEffect(() => {
    if (!settingsLoaded.current) return;
    if (hasIncompleteBridgeRouteDraft(bridgeRoutesRef.current)) return;
    const routes = bridgeRoutesFromDrafts(bridgeRoutesRef.current);
    if (bridgeRoutesKey(routes) === committedBridgeRoutes.current) return;
    const timer = setTimeout(() => {
      void commitBridgeRoutes();
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bridgeRoutes]);

  const addBridgeRoute = (): void => {
    setBridgeRouteDrafts((routes) => [...routes, createRouteDraft()]);
  };

  const updateBridgeRoute = (id: string, patch: Partial<Omit<BridgeRouteDraft, "id">>): void => {
    setBridgeRouteDrafts((routes) => routes.map((route) => (route.id === id ? { ...route, ...patch } : route)));
  };

  const removeBridgeRoute = (id: string): void => {
    setBridgeRouteDrafts((routes) => routes.filter((route) => route.id !== id));
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

      <div className="mt-4 mb-1.5 flex items-center gap-2">
        <label className="block text-[12px] text-loupe-muted">Bridge routes</label>
        <Button type="button" size="xs" variant="outline" className="ml-auto text-[11px]" onClick={addBridgeRoute}>
          <Plus className="h-3.5 w-3.5" />
          Add route
        </Button>
      </div>
      <div className="space-y-2">
        {bridgeRoutes.length === 0 ? (
          <div className="rounded-lg bg-loupe-panel/60 border border-loupe-line p-3 text-[12px] text-loupe-muted">
            No route overrides. Pages use the default bridge URL above.
          </div>
        ) : (
          bridgeRoutes.map((route, index) => (
            <div key={route.id} className="rounded-lg bg-loupe-panel/60 border border-loupe-line p-2.5">
              <div className="mb-2 flex items-center gap-2">
                <div className="text-[11px] font-medium text-loupe-muted">Route {index + 1}</div>
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  className="ml-auto text-loupe-muted hover:text-loupe-fg"
                  aria-label={`Remove bridge route ${index + 1}`}
                  title="Remove route"
                  onClick={() => removeBridgeRoute(route.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="grid gap-2">
                <Input
                  type="text"
                  placeholder="localhost:5173, *.tailnet.ts.net"
                  className="w-full text-[12px] font-mono"
                  aria-label={`Route ${index + 1} page origins`}
                  value={route.originsText}
                  onChange={(e) => updateBridgeRoute(route.id, { originsText: e.target.value })}
                  onBlur={() => void commitBridgeRoutes()}
                />
                <Input
                  type="text"
                  placeholder="http://remote-host:7337"
                  className="w-full text-[12px] font-mono"
                  aria-label={`Route ${index + 1} bridge URL`}
                  value={route.bridgeUrl}
                  onChange={(e) => updateBridgeRoute(route.id, { bridgeUrl: e.target.value })}
                  onBlur={() => void commitBridgeRoutes()}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <p className="text-loupe-faint text-[11px] mt-1.5">
        first match wins. local pages can use the default bridge; remote or staging pages can route
        to another daemon.
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
