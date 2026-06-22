import { DEFAULT_PROJECT_ORIGINS } from "./origins.js";
import { isProjectUrl } from "./origins.js";

export interface BridgeRoute {
  /** Host patterns that should use this bridge, e.g. "mac-studio*.ts.net". */
  origins: string[];
  /** Bridge daemon base URL for matching pages. */
  bridgeUrl: string;
}

export interface LoupeSettings {
  /** Bridge daemon base URL. */
  bridgeUrl: string;
  /** Display name attached to comments you post from the viewer. */
  author: string;
  /**
   * Host patterns that count as "your project" (annotations map to source).
   * Anything else is treated as a foreign site → reference capture. Supports
   * remote hosts and wildcards, e.g. "*.my-tailnet.ts.net", "staging.acme.com".
   */
  projectOrigins: string[];
  /**
   * Optional bridge routing. First match wins. Use this when localhost should
   * stay local, but remote preview/Tailscale hosts should write to a remote repo.
   */
  bridgeRoutes: BridgeRoute[];
  /** Optional manual routing override for ambiguous origins, e.g. many apps reusing localhost:5173. */
  activeRepoRoot?: string;
}

export const DEFAULT_SETTINGS: LoupeSettings = {
  bridgeUrl: "http://localhost:7337",
  author: "me",
  projectOrigins: DEFAULT_PROJECT_ORIGINS,
  bridgeRoutes: [],
};

export async function loadSettings(): Promise<LoupeSettings> {
  const stored = await chrome.storage.sync.get(DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...stored } as LoupeSettings;
}

export async function saveSettings(patch: Partial<LoupeSettings>): Promise<void> {
  await chrome.storage.sync.set(patch);
}

export function bridgeUrlForUrl(settings: LoupeSettings, pageUrl: string | undefined): string {
  if (pageUrl) {
    const route = settings.bridgeRoutes.find((r) => isProjectUrl(pageUrl, r.origins));
    if (route?.bridgeUrl) return cleanBridgeUrl(route.bridgeUrl);
  }
  return cleanBridgeUrl(settings.bridgeUrl);
}

export function cleanBridgeUrl(url: string): string {
  return (url || DEFAULT_SETTINGS.bridgeUrl).trim().replace(/\/$/, "");
}
