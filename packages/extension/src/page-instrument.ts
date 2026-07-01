/**
 * MAIN-world page instrument. Injected into the page (like framework-inspector)
 * so it can see the page's own `console`, `fetch`, and `XMLHttpRequest` — which
 * the isolated content-script world cannot. It buffers console output, network
 * activity, and uncaught errors *only while a flow recording is running*, and
 * hands the buffer back to the content script over DOM CustomEvents.
 *
 * Control + collection protocol (content script ↔ this script):
 *   - "loupe:record-ctl"       { action: "start" | "stop" | "reset" }
 *   - "loupe:record-collect"   { id }            → request the current buffers
 *   - "loupe:record-collected" { id, console, network, errors }
 */

interface ConsoleEntry {
  level: "log" | "info" | "warn" | "error" | "debug";
  text: string;
  t: number;
}
interface NetworkEntry {
  method: string;
  url: string;
  status?: number;
  ok?: boolean;
  durationMs?: number;
  kind: "fetch" | "xhr";
  error?: string;
  t: number;
}
interface PageErrorEntry {
  kind: "error" | "unhandledrejection";
  message: string;
  stack?: string;
  t: number;
}

const CTL = "loupe:record-ctl";
const COLLECT = "loupe:record-collect";
const COLLECTED = "loupe:record-collected";
/** Cap per-buffer so a noisy page can't grow memory unbounded. */
const MAX_ENTRIES = 2000;

(() => {
  const w = window as unknown as { __loupeInstrumented?: boolean };
  if (w.__loupeInstrumented) return;
  w.__loupeInstrumented = true;

  let recording = false;
  let startMs = 0;
  const consoleBuf: ConsoleEntry[] = [];
  const networkBuf: NetworkEntry[] = [];
  const errorBuf: PageErrorEntry[] = [];

  const now = (): number => (recording ? Math.max(0, Math.round(performance.now() - startMs)) : 0);
  const push = <T>(buf: T[], entry: T): void => {
    if (recording && buf.length < MAX_ENTRIES) buf.push(entry);
  };

  // --- console ---
  const levels = ["log", "info", "warn", "error", "debug"] as const;
  for (const level of levels) {
    const original = console[level]?.bind(console);
    if (!original) continue;
    console[level] = (...args: unknown[]): void => {
      push(consoleBuf, { level, text: args.map(stringifyArg).join(" "), t: now() });
      original(...args);
    };
  }

  // --- uncaught errors ---
  window.addEventListener("error", (e: ErrorEvent) => {
    push(errorBuf, {
      kind: "error",
      message: e.message || String(e.error ?? "error"),
      stack: e.error instanceof Error ? e.error.stack : undefined,
      t: now(),
    });
  });
  window.addEventListener("unhandledrejection", (e: PromiseRejectionEvent) => {
    const reason = e.reason as { message?: string; stack?: string } | string | undefined;
    push(errorBuf, {
      kind: "unhandledrejection",
      message: typeof reason === "string" ? reason : (reason?.message ?? "unhandled rejection"),
      stack: typeof reason === "object" ? reason?.stack : undefined,
      t: now(),
    });
  });

  // --- fetch ---
  const origFetch = window.fetch?.bind(window);
  if (origFetch) {
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const start = performance.now();
      const method = (init?.method || (input instanceof Request ? input.method : "") || "GET").toUpperCase();
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      try {
        const res = await origFetch(input, init);
        push(networkBuf, { kind: "fetch", method, url, status: res.status, ok: res.ok, durationMs: ms(start), t: now() });
        return res;
      } catch (err) {
        push(networkBuf, { kind: "fetch", method, url, error: errMessage(err), durationMs: ms(start), t: now() });
        throw err;
      }
    };
  }

  // --- XMLHttpRequest ---
  const OrigXHR = window.XMLHttpRequest;
  if (OrigXHR) {
    const open = OrigXHR.prototype.open;
    const send = OrigXHR.prototype.send;
    type Tracked = XMLHttpRequest & { __loupe?: { method: string; url: string } };
    OrigXHR.prototype.open = function (this: Tracked, method: string, url: string | URL, ...rest: unknown[]) {
      this.__loupe = { method: (method || "GET").toUpperCase(), url: String(url) };
      return (open as (...a: unknown[]) => void).call(this, method, url, ...rest);
    };
    OrigXHR.prototype.send = function (this: Tracked, ...args: unknown[]) {
      const meta = this.__loupe;
      if (meta) {
        const start = performance.now();
        this.addEventListener("loadend", () => {
          const entry: NetworkEntry = { kind: "xhr", method: meta.method, url: meta.url, durationMs: ms(start), t: now() };
          if (this.status) {
            entry.status = this.status;
            entry.ok = this.status >= 200 && this.status < 400;
          } else {
            entry.error = "network error";
          }
          push(networkBuf, entry);
        });
      }
      return (send as (...a: unknown[]) => void).apply(this, args);
    };
  }

  // --- control + collection ---
  window.addEventListener(CTL, (e: Event) => {
    const action = (e as CustomEvent<{ action?: string }>).detail?.action;
    if (action === "start") {
      recording = true;
      startMs = performance.now();
      reset();
    } else if (action === "stop") {
      recording = false;
    } else if (action === "reset") {
      recording = false;
      reset();
    }
  });

  window.addEventListener(COLLECT, (e: Event) => {
    const id = (e as CustomEvent<{ id?: string }>).detail?.id;
    window.dispatchEvent(
      new CustomEvent(COLLECTED, {
        detail: { id, console: consoleBuf.slice(), network: networkBuf.slice(), errors: errorBuf.slice() },
      }),
    );
  });

  function reset(): void {
    consoleBuf.length = 0;
    networkBuf.length = 0;
    errorBuf.length = 0;
  }

  function ms(start: number): number {
    return Math.round(performance.now() - start);
  }

  function errMessage(err: unknown): string {
    return err instanceof Error ? err.message : String(err);
  }

  function stringifyArg(a: unknown): string {
    if (typeof a === "string") return a;
    if (a instanceof Error) return a.stack || a.message;
    try {
      return JSON.stringify(a);
    } catch {
      return String(a);
    }
  }
})();
