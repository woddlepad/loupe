import type { AnnotatePayload, Rect } from "@loupe/core/model";
import type {
  ActionsResult,
  AnnotateResult,
  CaptureResult,
  GroupsResult,
  ListResult,
  LoupeMessage,
  ReferenceImageResult,
  ReferencesResult,
  ResolveResult,
  SimpleResult,
} from "./messages.js";
import { bridgeUrlForUrl, loadSettings } from "./settings.js";

/**
 * Background service worker: owns the privileged operations — screenshotting the
 * visible tab, cropping to the selection, and talking to the local bridge daemon
 * after the user grants temporary page access through activeTab.
 */

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-loupe") void toggleActiveTab("toggle");
  if (command === "toggle-view") void toggleActiveTab("toggle-view");
});

const RESTRICTED = ["chrome://", "chrome-extension://", "edge://", "about:", "https://chrome.google.com/webstore", "https://chromewebstore.google.com"];

/**
 * Send a toggle to the active tab's content script. If the content script isn't
 * there yet (e.g. the tab was open before the extension loaded), inject it on
 * demand and retry — so the user never has to manually reload the page.
 */
async function toggleActiveTab(type: "toggle" | "toggle-view"): Promise<{ ok: boolean; error?: string }> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return { ok: false, error: "no active tab" };
  if (tab.url && RESTRICTED.some((p) => tab.url!.startsWith(p))) {
    return { ok: false, error: "Loupe can't run on this page — open your app or any normal website." };
  }
  try {
    await chrome.tabs.sendMessage(tab.id, { type } satisfies LoupeMessage);
    return { ok: true };
  } catch {
    // Content script not present yet — inject it, then retry once.
    try {
      await injectLoupe(tab.id);
      await chrome.tabs.sendMessage(tab.id, { type } satisfies LoupeMessage);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: `couldn't start on this page: ${String(e)}` };
    }
  }
}

async function injectLoupe(tabId: number): Promise<void> {
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ["framework-inspector.js"],
    world: "MAIN",
  });
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ["content.js"],
  });
}

chrome.runtime.onMessage.addListener((msg: LoupeMessage, sender, sendResponse) => {
  switch (msg.type) {
    case "popup-annotate":
      toggleActiveTab("toggle").then(sendResponse);
      return true;
    case "popup-view":
      toggleActiveTab("toggle-view").then(sendResponse);
      return true;
    case "actions":
      bridgeGet("/actions", senderUrl(sender))
        .then((b) => sendResponse({ ok: true, actions: b.actions } satisfies ActionsResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies ActionsResult));
      return true;
    case "groups":
      bridgeGet("/groups", senderUrl(sender))
        .then((b) => sendResponse({ ok: true, groups: b.groups } satisfies GroupsResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies GroupsResult));
      return true;
    case "list":
      bridgeGet("/annotations", senderUrl(sender))
        .then((b) => sendResponse({ ok: true, annotations: b.annotations } satisfies ListResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies ListResult));
      return true;
    case "comment":
      bridgePost(`/annotations/${encodeURIComponent(msg.id)}/comments`, msg.comment, senderUrl(sender))
        .then(() => sendResponse({ ok: true } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "update-annotation":
      bridgePost(`/annotations/${encodeURIComponent(msg.id)}/update`, msg.patch, senderUrl(sender))
        .then(() => sendResponse({ ok: true } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "add-reference":
      bridgePost(`/annotations/${encodeURIComponent(msg.id)}/references`, msg.reference, senderUrl(sender))
        .then(() => sendResponse({ ok: true } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "delete-annotation":
      deleteAnnotation(msg.id, senderUrl(sender))
        .then(() => sendResponse({ ok: true } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "delete-resolved":
      bridgePost("/annotations/resolved/delete", {}, senderUrl(sender))
        .then((b) => sendResponse({ ok: true, detail: String(b.count ?? 0) } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "create-group":
      bridgePost("/groups", { group: msg.group }, senderUrl(sender))
        .then((b) => sendResponse({ ok: true, detail: b.group?.slug } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "rename-group":
      bridgePost(`/groups/${encodeURIComponent(msg.slug)}/rename`, { group: msg.group }, senderUrl(sender))
        .then((b) => sendResponse({ ok: true, detail: String(b.count ?? 0) } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "delete-group":
      deleteGroup(msg.slug, senderUrl(sender))
        .then((b) => sendResponse({ ok: true, detail: String(b.count ?? 0) } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "move-annotation":
      bridgePost(`/annotations/${encodeURIComponent(msg.id)}/move`, { group: msg.group }, senderUrl(sender))
        .then(() => sendResponse({ ok: true } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "reorder-groups":
      bridgePost("/groups/reorder", { slugs: msg.slugs }, senderUrl(sender))
        .then(() => sendResponse({ ok: true } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "group-run":
      bridgePost(`/groups/${encodeURIComponent(msg.slug)}/run`, { action: msg.action }, senderUrl(sender))
        .then((b) => sendResponse({ ok: true, detail: b.detail } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "resolve-target":
      bridgePost("/resolve", { target: msg.target }, senderUrl(sender))
        .then((b) =>
          sendResponse({
            ok: true,
            source: b.source ?? null,
            candidates: b.candidates ?? [],
            method: b.method ?? "none",
          } satisfies ResolveResult),
        )
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies ResolveResult));
      return true;
    case "references":
      bridgeGet("/references", senderUrl(sender))
        .then((b) => sendResponse({ ok: true, references: b.references } satisfies ReferencesResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies ReferencesResult));
      return true;
    case "reference-image":
      bridgeGet(`/references/${encodeURIComponent(msg.id)}/image`, senderUrl(sender))
        .then((b) => sendResponse({ ok: true, dataUrl: b.dataUrl } satisfies ReferenceImageResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies ReferenceImageResult));
      return true;
    case "delete-reference":
      deleteReference(msg.id, senderUrl(sender))
        .then(() => sendResponse({ ok: true } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "delete-reference-page":
      bridgePost("/references/page/delete", { url: msg.url }, senderUrl(sender))
        .then((b) => sendResponse({ ok: true, detail: String(b.count ?? 0) } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "save-reference":
      bridgePost("/references", { annotation: msg.annotation }, msg.annotation.url || senderUrl(sender))
        .then((b) => sendResponse({ ok: true, detail: b.dir } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "capture":
      capture(msg.rect, msg.devicePixelRatio, sender.tab?.windowId)
        .then((dataUrl) => sendResponse({ ok: true, dataUrl } satisfies CaptureResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies CaptureResult));
      return true;
    case "annotate":
      deliver(msg.payload)
        .then((r) => sendResponse(r))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies AnnotateResult));
      return true;
    default:
      return undefined;
  }
});

async function capture(rect: Rect, dpr: number, windowId?: number): Promise<string> {
  const full = await chrome.tabs.captureVisibleTab(windowId ?? chrome.windows.WINDOW_ID_CURRENT, {
    format: "png",
  });
  const bitmap = await createImageBitmap(await (await fetch(full)).blob());

  const sx = Math.max(0, Math.round(rect.x * dpr));
  const sy = Math.max(0, Math.round(rect.y * dpr));
  const sw = Math.max(1, Math.round(rect.width * dpr));
  const sh = Math.max(1, Math.round(rect.height * dpr));

  const canvas = new OffscreenCanvas(sw, sh);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d context");
  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, sw, sh);
  bitmap.close();

  const blob = await canvas.convertToBlob({ type: "image/png" });
  return await blobToDataUrl(blob);
}

async function deliver(payload: AnnotatePayload): Promise<AnnotateResult> {
  const bridgeUrl = await bridgeUrlForPage(payload.annotation.url);
  let res: Response;
  try {
    res = await fetch(await bridgeRequestUrl("/annotate", payload.annotation.url), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, error: daemonHelp(bridgeUrl) };
  }
  if (!res.ok) return { ok: false, error: `bridge responded ${res.status}` };
  const body = (await res.json()) as {
    id: string;
    dir: string;
    results: Record<string, { ok: boolean; detail?: string; url?: string }>;
  };
  return { ok: true, id: body.id, dir: body.dir, results: body.results };
}

function daemonHelp(bridgeUrl: string): string {
  return [
    `Loupe daemon is not running at ${bridgeUrl}.`,
    "",
    "Install the Loupe CLI:",
    "  npm install -g @woddlepad/loupe",
    "  # or from a source checkout: pnpm install:cli",
    "",
    "Then in your app repo:",
    "  loupe init",
    "  loupe bridge",
    "",
    "Keep the extension bridge URL set to http://localhost:7337.",
  ].join("\n");
}

async function bridgeGet(path: string, pageUrl?: string): Promise<any> {
  const res = await fetch(await bridgeRequestUrl(path, pageUrl));
  if (!res.ok) throw new Error(`bridge responded ${res.status}`);
  return res.json();
}

async function bridgePost(path: string, body: unknown, pageUrl?: string): Promise<any> {
  const res = await fetch(await bridgeRequestUrl(path, pageUrl), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await responseError(res));
  return res.json();
}

async function deleteAnnotation(id: string, pageUrl?: string): Promise<void> {
  const path = `/annotations/${encodeURIComponent(id)}`;
  try {
    await bridgeDelete(path, pageUrl);
  } catch (deleteError) {
    try {
      await bridgePost(`${path}/delete`, {}, pageUrl);
    } catch (postError) {
      throw new Error(`${String(deleteError)}; fallback ${String(postError)}`);
    }
  }
}

async function deleteGroup(slug: string, pageUrl?: string): Promise<any> {
  const path = `/groups/${encodeURIComponent(slug)}`;
  try {
    return await bridgeDelete(path, pageUrl);
  } catch (deleteError) {
    try {
      return await bridgePost(`${path}/delete`, {}, pageUrl);
    } catch (postError) {
      throw new Error(`${String(deleteError)}; fallback ${String(postError)}`);
    }
  }
}

async function deleteReference(id: string, pageUrl?: string): Promise<void> {
  const path = `/references/${encodeURIComponent(id)}`;
  try {
    await bridgeDelete(path, pageUrl);
  } catch (deleteError) {
    try {
      await bridgePost(`${path}/delete`, {}, pageUrl);
    } catch (postError) {
      throw new Error(`${String(deleteError)}; fallback ${String(postError)}`);
    }
  }
}

async function bridgeDelete(path: string, pageUrl?: string): Promise<any> {
  const res = await fetch(await bridgeRequestUrl(path, pageUrl), { method: "DELETE" });
  if (!res.ok) throw new Error(await responseError(res));
  return res.json();
}

async function bridgeRequestUrl(path: string, pageUrl?: string): Promise<string> {
  const settings = await loadSettings();
  const base = bridgeUrlForUrl(settings, pageUrl);
  const url = new URL(path, base.endsWith("/") ? base : `${base}/`);
  if (pageUrl) url.searchParams.set("pageUrl", pageUrl);
  if (settings.activeRepoRoot) url.searchParams.set("repoRoot", settings.activeRepoRoot);
  return url.toString();
}

async function bridgeUrlForPage(pageUrl: string | undefined): Promise<string> {
  return bridgeUrlForUrl(await loadSettings(), pageUrl);
}

function senderUrl(sender: chrome.runtime.MessageSender): string | undefined {
  return sender.tab?.url;
}

async function responseError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { error?: string };
    return body.error ? `bridge responded ${res.status}: ${body.error}` : `bridge responded ${res.status}`;
  } catch {
    return `bridge responded ${res.status}`;
  }
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
