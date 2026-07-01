import type { AnnotatePayload, Rect } from "@loupe/core/model";
import type {
  ActionsResult,
  AnnotateResult,
  CaptureResult,
  GroupsResult,
  ListResult,
  LoupeMessage,
  RecordingFileResult,
  RecordingResult,
  RecordingsResult,
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

void chrome.storage.session
  ?.setAccessLevel?.({ accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS" })
  .catch((e) => console.warn("[loupe] could not expose session storage to content scripts", e));

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
    files: ["framework-inspector.js", "page-instrument.js"],
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
    case "recordings":
      bridgeGet("/recordings", senderUrl(sender))
        .then((b) => sendResponse({ ok: true, recordings: b.recordings } satisfies RecordingsResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies RecordingsResult));
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
    case "resolve-group":
      bridgePost(`/groups/${encodeURIComponent(msg.slug)}/resolve`, {}, senderUrl(sender))
        .then((b) => sendResponse({ ok: true, detail: String(b.count ?? 0) } satisfies SimpleResult))
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "annotation-run":
      bridgePost(`/annotations/${encodeURIComponent(msg.id)}/run`, { action: msg.action }, senderUrl(sender))
        .then((b) =>
          sendResponse(
            b.ok
              ? ({ ok: true, detail: b.detail } satisfies SimpleResult)
              : ({ ok: false, error: b.detail ?? "action failed" } satisfies SimpleResult),
          ),
        )
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
    case "recording-file":
      bridgeGet(`/recording-file?path=${encodeURIComponent(`${msg.dir}/${msg.file}`)}`, senderUrl(sender))
        .then((b) =>
          b.ok
            ? sendResponse({ ok: true, text: b.text, truncated: Boolean(b.truncated) } satisfies RecordingFileResult)
            : sendResponse({ ok: false, error: String(b.error ?? "not found") } satisfies RecordingFileResult),
        )
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies RecordingFileResult));
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
    case "start-recording":
      startRecording(sender.tab?.id)
        .then(sendResponse)
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies SimpleResult));
      return true;
    case "stop-recording":
      stopRecording()
        .then(sendResponse)
        .catch((e) => sendResponse({ ok: false, error: String(e) } satisfies RecordingResult));
      return true;
    case "cancel-recording":
      cancelRecording()
        .then(() => sendResponse({ ok: true } satisfies SimpleResult))
        .catch(() => sendResponse({ ok: true } satisfies SimpleResult));
      return true;
    case "record":
      deliverRecording(msg.payload)
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

// --- flow recording (tabCapture → offscreen MediaRecorder) ---

let recordingTabId: number | null = null;

/**
 * Begin recording the active tab. We grab a `tabCapture` stream id here (the
 * privileged context) and hand it to the offscreen document, which owns the
 * MediaRecorder. Requires the extension to have been invoked on the tab
 * (activeTab), which Loupe already holds once the overlay is open.
 */
async function startRecording(tabId: number | undefined): Promise<SimpleResult> {
  if (tabId === undefined) return { ok: false, error: "no active tab to record" };
  try {
    await ensureOffscreenDocument();
    const streamId = await getTabStreamId(tabId);
    const res = (await chrome.runtime.sendMessage({ type: "offscreen-start", streamId })) as
      | { ok: boolean; error?: string }
      | undefined;
    if (!res?.ok) {
      await closeOffscreenDocument();
      return { ok: false, error: res?.error ?? "offscreen recorder failed to start" };
    }
    recordingTabId = tabId;
    return { ok: true };
  } catch (e) {
    await closeOffscreenDocument();
    return { ok: false, error: recordingError(e) };
  }
}

async function stopRecording(): Promise<RecordingResult> {
  try {
    const res = (await chrome.runtime.sendMessage({ type: "offscreen-stop" })) as
      | { ok: boolean; error?: string; videoDataUrl?: string; durationMs?: number; startedAt?: string }
      | undefined;
    recordingTabId = null;
    await closeOffscreenDocument();
    if (!res?.ok) return { ok: false, error: res?.error ?? "recorder failed to stop" };
    return {
      ok: true,
      videoDataUrl: res.videoDataUrl,
      durationMs: res.durationMs ?? 0,
      startedAt: res.startedAt ?? new Date().toISOString(),
    };
  } catch (e) {
    recordingTabId = null;
    await closeOffscreenDocument();
    return { ok: false, error: String(e) };
  }
}

async function cancelRecording(): Promise<void> {
  recordingTabId = null;
  try {
    await chrome.runtime.sendMessage({ type: "offscreen-cancel" });
  } catch {
    // offscreen may already be gone
  }
  await closeOffscreenDocument();
}

function getTabStreamId(tabId: number): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.tabCapture.getMediaStreamId({ targetTabId: tabId }, (streamId) => {
      const err = chrome.runtime.lastError;
      if (err || !streamId) reject(new Error(err?.message ?? "could not capture this tab"));
      else resolve(streamId);
    });
  });
}

async function ensureOffscreenDocument(): Promise<void> {
  const has = await chrome.offscreen.hasDocument?.();
  if (has) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: [chrome.offscreen.Reason.USER_MEDIA],
    justification: "Record the active tab for a Loupe flow annotation.",
  });
}

async function closeOffscreenDocument(): Promise<void> {
  try {
    if (await chrome.offscreen.hasDocument?.()) await chrome.offscreen.closeDocument();
  } catch {
    // best-effort cleanup
  }
}

function recordingError(e: unknown): string {
  const message = e instanceof Error ? e.message : String(e);
  if (/invoked|gesture|activeTab/i.test(message)) {
    return `${message} — open the Loupe overlay (Alt+A) on this tab first, then press R.`;
  }
  return message;
}

async function deliverRecording(payload: AnnotatePayload): Promise<AnnotateResult> {
  const bridgeUrl = await bridgeUrlForPage(payload.annotation.url);
  let res: Response;
  try {
    res = await fetch(await bridgeRequestUrl("/record", payload.annotation.url), {
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
  url.searchParams.set("codexMode", settings.codexLaunchMode);
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
