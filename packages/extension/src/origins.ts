/**
 * Decide whether the current page is part of "your project" (so annotations map
 * to source) or a foreign site (so a capture becomes a reference). Project
 * origins are host patterns the user configures — crucially this includes remote
 * hosts, e.g. apps served over a Tailscale tailnet (`*.my-tailnet.ts.net`) or a
 * staging domain, not just localhost.
 *
 * A pattern matches against the URL's hostname, or against `hostname:port` when
 * the pattern includes a port. `*` is a wildcard for one or more characters
 * within a label span; a leading `*.` also matches the bare apex.
 */

export const DEFAULT_PROJECT_ORIGINS = ["localhost", "127.0.0.1", "*.localhost", "*.local"];

export function isProjectUrl(url: string, patterns: string[]): boolean {
  let host: string;
  let hostWithPort: string;
  try {
    const parsed = new URL(url);
    host = parsed.hostname.toLowerCase();
    hostWithPort = parsed.port ? `${host}:${parsed.port}` : host;
  } catch {
    return false;
  }
  return patterns.some((p) => {
    const pattern = p.trim().toLowerCase();
    return matchHost(pattern.includes(":") ? hostWithPort : host, pattern);
  });
}

function matchHost(host: string, pattern: string): boolean {
  if (!pattern) return false;
  if (pattern === host) return true;

  // "*.example.com" matches any subdomain and the apex itself.
  if (pattern.startsWith("*.")) {
    const suffix = pattern.slice(2);
    return host === suffix || host.endsWith("." + suffix);
  }

  // General glob: "*" stands for any run of characters.
  if (pattern.includes("*")) {
    const re = new RegExp(
      "^" + pattern.split("*").map(escapeRe).join(".*") + "$",
    );
    return re.test(host);
  }

  return false;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
