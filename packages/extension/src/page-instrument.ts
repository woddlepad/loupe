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
  requestHeaders?: [string, string][];
  requestBody?: string;
  responseHeaders?: [string, string][];
  responseContentType?: string;
  responseBody?: string;
  bodyTruncated?: { request?: boolean; response?: boolean };
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
      const requestHeaders = fetchRequestHeaders(input, init);
      const requestBody = recording ? capBody(readRequestBody(input, init)) : undefined;
      try {
        const res = await origFetch(input, init);
        const entry: NetworkEntry = {
          kind: "fetch",
          method,
          url,
          status: res.status,
          ok: res.ok,
          durationMs: ms(start),
          requestHeaders,
          requestBody: requestBody?.text,
          responseHeaders: headerPairs(res.headers),
          responseContentType: res.headers.get("content-type") ?? undefined,
          t: now(),
        };
        markTruncated(entry, requestBody, undefined);
        push(networkBuf, entry);
        captureResponseBody(res, entry);
        return res;
      } catch (err) {
        push(networkBuf, {
          kind: "fetch",
          method,
          url,
          error: errMessage(err),
          durationMs: ms(start),
          requestHeaders,
          requestBody: requestBody?.text,
          t: now(),
        });
        throw err;
      }
    };
  }

  // --- XMLHttpRequest ---
  const OrigXHR = window.XMLHttpRequest;
  if (OrigXHR) {
    const open = OrigXHR.prototype.open;
    const send = OrigXHR.prototype.send;
    const setHeader = OrigXHR.prototype.setRequestHeader;
    type Tracked = XMLHttpRequest & {
      __loupe?: { method: string; url: string; requestHeaders: [string, string][]; requestBody?: Capped };
    };
    OrigXHR.prototype.open = function (this: Tracked, method: string, url: string | URL, ...rest: unknown[]) {
      this.__loupe = { method: (method || "GET").toUpperCase(), url: String(url), requestHeaders: [] };
      return (open as (...a: unknown[]) => void).call(this, method, url, ...rest);
    };
    OrigXHR.prototype.setRequestHeader = function (this: Tracked, name: string, value: string) {
      this.__loupe?.requestHeaders.push([name, redactHeader(name, value)]);
      return (setHeader as (...a: unknown[]) => void).call(this, name, value);
    };
    OrigXHR.prototype.send = function (this: Tracked, ...args: unknown[]) {
      const meta = this.__loupe;
      if (meta) {
        if (recording && typeof args[0] === "string") meta.requestBody = capBody(args[0] as string);
        const start = performance.now();
        this.addEventListener("loadend", () => {
          const entry: NetworkEntry = {
            kind: "xhr",
            method: meta.method,
            url: meta.url,
            durationMs: ms(start),
            requestHeaders: meta.requestHeaders.length ? meta.requestHeaders : undefined,
            requestBody: meta.requestBody?.text,
            t: now(),
          };
          if (this.status) {
            entry.status = this.status;
            entry.ok = this.status >= 200 && this.status < 400;
          } else {
            entry.error = "network error";
          }
          entry.responseHeaders = parseXhrHeaders(this.getAllResponseHeaders());
          entry.responseContentType = this.getResponseHeader("content-type") ?? undefined;
          const responseBody = recording ? capBody(readXhrResponse(this)) : undefined;
          entry.responseBody = responseBody?.text;
          markTruncated(entry, meta.requestBody, responseBody);
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

  /** Read a response body in the background and attach it to an already-pushed entry. */
  function captureResponseBody(res: Response, entry: NetworkEntry): void {
    if (!recording || !isTextBody(entry.responseContentType)) return;
    res
      .clone()
      .text()
      .then((text) => {
        const capped = capBody(text);
        if (capped === undefined) return;
        entry.responseBody = capped.text;
        if (capped.truncated) (entry.bodyTruncated ??= {}).response = true;
      })
      .catch(() => {});
  }

  function fetchRequestHeaders(input: RequestInfo | URL, init?: RequestInit): [string, string][] | undefined {
    const headers = new Headers(input instanceof Request ? input.headers : undefined);
    if (init?.headers) new Headers(init.headers).forEach((value, name) => headers.set(name, value));
    const pairs = headerPairs(headers);
    return pairs && pairs.length ? pairs : undefined;
  }

  function readRequestBody(input: RequestInfo | URL, init?: RequestInit): string | undefined {
    const body = init?.body;
    if (typeof body === "string") return body;
    if (body instanceof URLSearchParams) return body.toString();
    return undefined;
  }

  function headerPairs(headers: Headers | undefined): [string, string][] | undefined {
    if (!headers) return undefined;
    const pairs: [string, string][] = [];
    headers.forEach((value, name) => pairs.push([name, redactHeader(name, value)]));
    return pairs.length ? pairs : undefined;
  }

  function parseXhrHeaders(raw: string | null): [string, string][] | undefined {
    if (!raw) return undefined;
    const pairs: [string, string][] = [];
    for (const line of raw.trim().split(/\r?\n/)) {
      const idx = line.indexOf(":");
      if (idx === -1) continue;
      const name = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      if (name) pairs.push([name, redactHeader(name, value)]);
    }
    return pairs.length ? pairs : undefined;
  }

  function readXhrResponse(xhr: XMLHttpRequest): string | undefined {
    try {
      if (xhr.responseType === "" || xhr.responseType === "text") return xhr.responseText;
    } catch {
      // responseText throws for binary responseTypes; fall through.
    }
    try {
      if (xhr.responseType === "json" && xhr.response != null) return JSON.stringify(xhr.response);
    } catch {
      // Non-serializable response; skip.
    }
    return undefined;
  }

  function isTextBody(contentType: string | undefined): boolean {
    if (!contentType) return false;
    return /json|text|xml|javascript|x-www-form-urlencoded|graphql/i.test(contentType);
  }

  /** Headers whose values are dropped so recordings never persist raw secrets. */
  const REDACTED_HEADERS = new Set(["authorization", "proxy-authorization", "cookie", "set-cookie", "x-api-key"]);
  function redactHeader(name: string, value: string): string {
    return REDACTED_HEADERS.has(name.toLowerCase()) ? "«redacted»" : value;
  }

  interface Capped {
    text: string;
    truncated: boolean;
  }
  const MAX_BODY = 32 * 1024;
  function capBody(text: string | undefined): Capped | undefined {
    if (text === undefined) return undefined;
    if (text.length <= MAX_BODY) return { text, truncated: false };
    return { text: text.slice(0, MAX_BODY), truncated: true };
  }

  function markTruncated(entry: NetworkEntry, request: Capped | undefined, response: Capped | undefined): void {
    if (request?.truncated) (entry.bodyTruncated ??= {}).request = true;
    if (response?.truncated) (entry.bodyTruncated ??= {}).response = true;
  }
})();
