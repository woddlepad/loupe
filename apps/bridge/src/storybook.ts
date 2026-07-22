import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { StorybookContext as CapturedStorybookContext } from "@loupe/core/model";
import type { StoredAnnotation } from "./store.js";

export interface StorybookContext {
  storyId: string;
  baseUrl?: string;
  storyFile?: string;
  componentSource?: string;
  exportName?: string;
}

export interface StoryShotOptions {
  repoRoot: string;
  target: string;
  annotation?: StoredAnnotation;
  output?: string;
  selector?: string;
  baseUrl?: string;
}

export interface StoryShotResult {
  storyId: string;
  url: string;
  output: string;
  selector?: string;
}

export function storybookContext(annotation: StoredAnnotation): StorybookContext | undefined {
  const value: unknown = annotation.storybook;
  if (!value || typeof value !== "object") return undefined;
  const meta = value as Record<string, unknown>;
  const storyId = stringValue(meta.storyId) ?? stringValue(meta.id);
  if (!storyId) return undefined;
  return {
    storyId,
    baseUrl: stringValue(meta.baseUrl) ?? stringValue(meta.url),
    storyFile: stringValue(meta.storyFile) ?? stringValue(meta.importPath),
    componentSource: stringValue(meta.componentSource) ?? stringValue(meta.sourceFile),
    exportName: stringValue(meta.exportName),
  };
}

export function resolveStorybookBaseUrl(repoRoot: string, annotation?: StoredAnnotation, override?: string): string {
  if (override) return normalizeBaseUrl(override);
  const annotationUrl = annotation ? storybookContext(annotation)?.baseUrl : undefined;
  if (annotationUrl) return normalizeBaseUrl(annotationUrl);
  if (process.env["LOUPE_STORYBOOK_URL"]) return normalizeBaseUrl(process.env["LOUPE_STORYBOOK_URL"]!);

  try {
    const config = JSON.parse(readFileSync(resolve(repoRoot, ".loupe/config.json"), "utf8")) as Record<string, unknown>;
    const storybook = config.storybook;
    if (typeof storybook === "string") return normalizeBaseUrl(storybook);
    if (storybook && typeof storybook === "object") {
      const values = storybook as Record<string, unknown>;
      const configured = stringValue(values.baseUrl) ?? stringValue(values.url);
      if (configured) return normalizeBaseUrl(configured);
      if (typeof values.port === "number") return `http://localhost:${values.port}`;
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw new Error(`could not read .loupe/config.json: ${String(error)}`);
  }
  return "http://localhost:6006";
}

export function storyUrl(baseUrl: string, storyId: string): string {
  const url = new URL("iframe.html", `${normalizeBaseUrl(baseUrl)}/`);
  url.searchParams.set("id", storyId);
  url.searchParams.set("viewMode", "story");
  return url.toString();
}

export function defaultStoryShotOutput(repoRoot: string, target: string, annotation?: StoredAnnotation): string {
  if (annotation) return resolve(repoRoot, annotation.dir, "story.png");
  return resolve(repoRoot, ".loupe/shots", `${target.replace(/[^a-zA-Z0-9._-]+/g, "-")}.png`);
}

export async function captureStory(options: StoryShotOptions): Promise<StoryShotResult> {
  const context = options.annotation ? storybookContext(options.annotation) : undefined;
  if (options.annotation && !context) throw new Error(`annotation ${options.annotation.id} was not captured from a Storybook story`);
  const storyId = context?.storyId ?? options.target;
  const baseUrl = resolveStorybookBaseUrl(options.repoRoot, options.annotation, options.baseUrl);
  const url = storyUrl(baseUrl, storyId);
  const output = resolve(options.output ?? defaultStoryShotOutput(options.repoRoot, storyId, options.annotation));
  mkdirSync(dirname(output), { recursive: true });

  let chromium: typeof import("playwright").chromium;
  try {
    const playwrightPackage = "playwright";
    ({ chromium } = await import(playwrightPackage));
  } catch {
    throw new Error("Story screenshots require Playwright. Reinstall Loupe, then run `pnpm exec playwright install chromium` if Chromium is not present.");
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (error) {
    throw new Error(`could not launch Playwright Chromium; run \`pnpm exec playwright install chromium\`. ${error instanceof Error ? error.message : String(error)}`);
  }
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15_000 });
    await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}" });
    await page.evaluate(async () => {
      await Promise.race([document.fonts.ready, new Promise((done) => setTimeout(done, 3_000))]);
      await new Promise<void>((done) => requestAnimationFrame(() => requestAnimationFrame(() => done())));
    });
    const storyRoot = page.locator("#storybook-root");
    await storyRoot.waitFor({ state: "visible" });
    await page.waitForFunction(() => {
      const root = document.querySelector("#storybook-root");
      return Boolean(root && root.childElementCount > 0 && root.getAttribute("aria-busy") !== "true");
    });
    if (options.selector) {
      const selected = page.locator(options.selector).first();
      await selected.waitFor({ state: "visible" });
      await selected.screenshot({ path: output, animations: "disabled" });
    } else {
      await storyRoot.screenshot({ path: output, animations: "disabled" });
    }
  } finally {
    await browser.close();
  }
  if (!existsSync(output)) throw new Error(`Playwright did not create ${output}`);
  return { storyId, url, output, ...(options.selector ? { selector: options.selector } : {}) };
}

function normalizeBaseUrl(value: string): string {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `http://${value}`;
  const url = new URL(withProtocol);
  url.pathname = url.pathname.replace(/\/(?:iframe\.html)?$/, "");
  url.search = "";
  url.hash = "";
  return url.toString().replace(/\/$/, "");
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

interface StoryIndexEntry {
  name?: unknown;
  importPath?: unknown;
  exportName?: unknown;
  componentPath?: unknown;
}

interface StoryIndex {
  entries?: Record<string, StoryIndexEntry>;
}

type Fetch = (input: string | URL, init?: RequestInit) => Promise<Response>;

export function storyIdFromUrl(pageUrl: string): string | undefined {
  let url: URL;
  try {
    url = new URL(pageUrl);
  } catch {
    return undefined;
  }

  if (url.pathname.endsWith("/iframe.html")) return stringValue(url.searchParams.get("id"));

  const managerPath = url.searchParams.get("path");
  return stringValue(managerPath?.match(/^\/story\/(.+)$/)?.[1]);
}

export async function resolveStorybookContext(
  pageUrl: string,
  componentSource: string | undefined,
  fetcher: Fetch = fetch,
  allowedOrigins?: string[],
): Promise<CapturedStorybookContext | undefined> {
  const storyId = storyIdFromUrl(pageUrl);
  if (!storyId) return undefined;
  if (allowedOrigins && !allowedOrigins.some((origin) => sameOrigin(pageUrl, origin))) return undefined;

  try {
    const response = await fetchStoryIndex(storyIndexUrl(pageUrl), fetcher);
    if (!response) return undefined;
    const entry = response.entries?.[storyId];
    const importPath = stringValue(entry?.importPath);
    const name = stringValue(entry?.name);
    if (!entry || !importPath || !name) return undefined;

    const exportName = stringValue(entry.exportName);
    const indexedComponent = stringValue(entry.componentPath)?.replace(/^\.\//, "");
    return {
      storyId,
      baseUrl: storybookBaseUrl(pageUrl),
      storyFile: importPath,
      importPath,
      name,
      ...(exportName ? { exportName } : {}),
      ...(indexedComponent || componentSource
        ? { componentSource: indexedComponent ?? componentSource }
        : {}),
    };
  } catch {
    return undefined;
  }
}

const indexCache = new Map<string, { expiresAt: number; value: Promise<StoryIndex | undefined> }>();

async function fetchStoryIndex(url: URL, fetcher: Fetch): Promise<StoryIndex | undefined> {
  const key = url.toString();
  if (fetcher === fetch) {
    const cached = indexCache.get(key);
    if (cached && cached.expiresAt > Date.now()) return cached.value;
  }
  const value = fetchStoryIndexUncached(url, fetcher);
  if (fetcher === fetch) indexCache.set(key, { expiresAt: Date.now() + 5_000, value });
  return value;
}

async function fetchStoryIndexUncached(url: URL, fetcher: Fetch): Promise<StoryIndex | undefined> {
  const response = await fetcher(url, { headers: { accept: "application/json" }, redirect: "manual", signal: AbortSignal.timeout(3000) });
  if (!response.ok) return undefined;
  const contentLength = Number(response.headers.get("content-length") ?? 0);
  if (contentLength > 5_000_000) return undefined;
  const bytes = await readBoundedBody(response, 5_000_000);
  if (!bytes) return undefined;
  return JSON.parse(new TextDecoder().decode(bytes)) as StoryIndex;
}

async function readBoundedBody(response: Response, limit: number): Promise<Uint8Array | undefined> {
  if (!response.body) return new Uint8Array(await response.arrayBuffer());
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        return undefined;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const joined = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    joined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return joined;
}

function sameOrigin(pageUrl: string, configuredOrigin: string): boolean {
  try {
    const normalized = /^https?:\/\//i.test(configuredOrigin) ? configuredOrigin : `http://${configuredOrigin}`;
    return new URL(pageUrl).origin === new URL(normalized).origin;
  } catch {
    return false;
  }
}

function storybookBaseUrl(pageUrl: string): string {
  const url = storyIndexUrl(pageUrl);
  url.pathname = url.pathname.slice(0, -"index.json".length);
  return url.toString().replace(/\/$/, "");
}

function storyIndexUrl(pageUrl: string): URL {
  const url = new URL(pageUrl);
  url.search = "";
  url.hash = "";
  if (url.pathname.endsWith("/iframe.html")) {
    url.pathname = `${url.pathname.slice(0, -"iframe.html".length)}index.json`;
  } else if (url.pathname.endsWith("/")) {
    url.pathname += "index.json";
  } else {
    url.pathname = `${url.pathname.slice(0, url.pathname.lastIndexOf("/") + 1)}index.json`;
  }
  return url;
}
