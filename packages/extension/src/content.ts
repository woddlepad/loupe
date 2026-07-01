import {
  captureTarget,
  LoupeOverlay,
  type ActionDescriptor,
  type Annotation,
  type AnnotationTarget,
  type ComponentRef,
  type ConsoleEntry,
  type FlowRecorder,
  type LibraryItem,
  type LoupeOverlayDraft,
  type NetworkEntry,
  type PageErrorEntry,
  type RecordingEventMarker,
  type RecordingKeyframe,
} from "@loupe/core";
import overlayCssRaw from "./styles/overlay.gen.css";

// Resolve the self-hosted font placeholder to absolute extension URLs so the
// injected shadow-root stylesheet loads Geist locally (no CDN, GDPR-safe).
const overlayCss = overlayCssRaw.replaceAll("__LOUPE_ASSET__", chrome.runtime.getURL(""));
import type {
  ActionsResult,
  AnnotateResult,
  CaptureResult,
  GroupsResult,
  LoupeMessage,
  RecordingResult,
  ReferenceImageResult,
  ReferenceItem,
  ReferencesResult,
  ResolveResult,
  SimpleResult,
} from "./messages.js";
import { isProjectUrl } from "./origins.js";
import { bridgeUrlForUrl, enabledActions, loadSettings } from "./settings.js";
import { LoupeViewer } from "./viewer.js";
import type { LoupeMode } from "./viewer-app.js";

/**
 * Content script: mounts the annotate overlay and the viewer. On a project
 * origin it annotates against source; on a foreign site (e.g. Notion) it falls
 * into reference mode, saving the capture to the shared library.
 */

let overlay: LoupeOverlay | null = null;
let viewer: LoupeViewer | null = null;
let mode: "annotate" | "reference" = "annotate";
let bridgeUrl = "http://localhost:7337";
let activeRepoRoot = "";
const DRAFT_STORAGE_PREFIX = "loupeDraft:";
const DRAFT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

async function toggleAnnotate(): Promise<void> {
  viewer?.close();
  if (overlay?.active) {
    overlay.disable();
    return;
  }
  await startAnnotating(await loadDraft());
}

/**
 * Driven by the viewer's Select/Annotate toolbar. Annotation mode turns on the
 * drag-select overlay while keeping the (minimized) viewer toolbar in front so
 * the user can add several annotations and switch back to Select.
 */
function handleViewerMode(nextMode: LoupeMode): void {
  if (nextMode === "annotate") {
    void enterAnnotateFromViewer();
  } else {
    overlay?.disable();
  }
}

async function enterAnnotateFromViewer(): Promise<void> {
  if (!overlay?.active) await startAnnotating(await loadDraft());
  viewer?.bringToFront();
}

/** Overlay dismissed (Esc / toggle / submit) — snap the toolbar back to Select. */
function handleOverlayDisabled(): void {
  viewer?.setMode("select");
}

async function startAnnotating(draft: LoupeOverlayDraft | null = null): Promise<void> {
  const settings = await loadSettings();
  bridgeUrl = bridgeUrlForUrl(settings, location.href);
  activeRepoRoot = settings.activeRepoRoot ?? "";
  const routedOrigins = settings.bridgeRoutes.flatMap((route) => route.origins);
  mode = isProjectUrl(location.href, [...settings.projectOrigins, ...routedOrigins]) ? "annotate" : "reference";
  const restoreDraft = draft?.mode === mode ? draft : null;

  if (mode === "reference") {
    overlay = new LoupeOverlay({
      mode: "reference",
      stylesheet: overlayCss,
      generateId: newId,
      onSelectionCapture: copySelectionScreenshotToClipboard,
      draft: restoreDraft,
      onDraftChange: saveDraft,
      onSubmit: handleSubmit,
      onDisable: handleOverlayDisabled,
    });
  } else {
    const [actions, groups, lastGroup, library] = await Promise.all([
      fetchActions(),
      fetchGroups(),
      getLastGroup(),
      fetchLibrary(),
    ]);
    overlay = new LoupeOverlay({
      actions: enabledActions(actions, settings),
      groups,
      defaultGroup: lastGroup,
      createGroup,
      library,
      resolveLibraryImage,
      stylesheet: overlayCss,
      generateId: newId,
      captureTarget: captureTargetWithPageFrameworks,
      onSelectionCapture: copySelectionScreenshotToClipboard,
      draft: restoreDraft,
      onDraftChange: saveDraft,
      onSubmit: handleSubmit,
      onDisable: handleOverlayDisabled,
      // tabCapture + offscreen are Chrome-only; hide recording on other builds.
      recorder: navigator.userAgent.includes("Firefox") ? null : flowRecorder,
    });
  }
  overlay.enable();
}

function toggleView(): void {
  overlay?.disable();
  viewer ??= new LoupeViewer(overlayCss, handleViewerMode);
  viewer.toggle();
}

async function handleSubmit(annotation: Annotation, actionIds: string[]): Promise<void> {
  if (annotation.kind === "recording") return handleRecordingSubmit(annotation, actionIds);
  // Hide our own chrome so the screenshot is the page only, then capture.
  overlay?.setChromeVisible(false);
  await nextFrame();
  await nextFrame();
  const shot = (await chrome.runtime.sendMessage({
    type: "capture",
    rect: annotation.rect,
    devicePixelRatio: annotation.devicePixelRatio,
  } satisfies LoupeMessage)) as CaptureResult;
  overlay?.setChromeVisible(true);
  if (!shot.ok) throw new Error(`screenshot failed: ${shot.error}`);
  annotation.screenshotDataUrl = shot.dataUrl;

  const clipboardDetail = await copyAnnotationClipboardIfAvailable(annotation);

  if (mode === "reference") {
    const r = (await chrome.runtime.sendMessage({
      type: "save-reference",
      annotation,
    } satisfies LoupeMessage)) as SimpleResult;
    if (!r.ok) throw new Error(r.error);
    toast(`saved to library → ${r.detail ?? ""}\npull it into an annotation from your app${clipboardDetail ? `\n${clipboardDetail}` : ""}`);
    return;
  }

  await chrome.storage.local.set({ lastGroup: annotation.group ?? "" });
  const res = (await chrome.runtime.sendMessage({
    type: "annotate",
    payload: { annotation, actions: actionsWithSave(actionIds) },
  } satisfies LoupeMessage)) as AnnotateResult;
  if (!res.ok) throw new Error(res.error);
  const ran = Object.entries(res.results)
    .map(([id, r]) => `${id} ${r.ok ? "✓" : "✗"}${r.detail ? ` (${r.detail})` : ""}`)
    .join("  ·  ");
  toast(`${annotation.group ? `[${annotation.group}] ` : ""}saved → ${res.dir}${ran ? `\n${ran}` : ""}${clipboardDetail ? `\n${clipboardDetail}` : ""}`);
}

async function handleRecordingSubmit(annotation: Annotation, actionIds: string[]): Promise<void> {
  const res = (await chrome.runtime.sendMessage({
    type: "record",
    payload: { annotation, actions: actionsWithSave(actionIds) },
  } satisfies LoupeMessage)) as AnnotateResult;
  if (!res.ok) throw new Error(res.error);
  const ran = Object.entries(res.results)
    .map(([id, r]) => `${id} ${r.ok ? "✓" : "✗"}${r.detail ? ` (${r.detail})` : ""}`)
    .join("  ·  ");
  toast(`${annotation.group ? `[${annotation.group}] ` : ""}recording saved → ${res.dir}${ran ? `\n${ran}` : ""}`);
}

// --- flow recorder ---

const RECORD_CTL = "loupe:record-ctl";
const RECORD_COLLECT = "loupe:record-collect";
const RECORD_COLLECTED = "loupe:record-collected";
const MAX_RECORDING_EVENTS = 200;
const MAX_KEYFRAMES = 32;
const CLICK_FRAME_OFFSET_MS = 220;
const TYPING_SETTLE_MS = 650;

/**
 * The recorder handed to the overlay. The background owns the tab video capture;
 * the MAIN-world page instrument owns console/network/error buffering. We start
 * both, then merge the video and telemetry into one RecordingCapture on stop.
 */
const flowRecorder: FlowRecorder = {
  async start(): Promise<void> {
    const res = (await chrome.runtime.sendMessage({ type: "start-recording" } satisfies LoupeMessage)) as SimpleResult;
    if (!res.ok) throw new Error(res.error);
    instrumentControl("start");
    startInteractionTimeline();
  },
  async stop() {
    const events = stopInteractionTimeline();
    let res: RecordingResult;
    try {
      res = (await chrome.runtime.sendMessage({ type: "stop-recording" } satisfies LoupeMessage)) as RecordingResult;
    } catch (e) {
      await collectInstrumentation();
      throw e;
    }
    const telemetry = await collectInstrumentation();
    if (!res.ok) throw new Error(res.error);
    const keyframes = await extractKeyframesFromRecording(res.videoDataUrl, events, res.durationMs);
    return {
      startedAt: res.startedAt,
      durationMs: res.durationMs,
      videoDataUrl: res.videoDataUrl,
      console: telemetry.console,
      network: telemetry.network,
      errors: telemetry.errors,
      events,
      keyframes,
    };
  },
  cancel(): void {
    stopInteractionTimeline();
    instrumentControl("reset");
    void chrome.runtime.sendMessage({ type: "cancel-recording" } satisfies LoupeMessage);
  },
};

let interactionRecording = false;
let interactionStartMs = 0;
let interactionEvents: RecordingEventMarker[] = [];
let typingTimer: number | null = null;
let typingTarget: EventTarget | null = null;

function startInteractionTimeline(): void {
  stopInteractionTimeline();
  interactionRecording = true;
  interactionStartMs = performance.now();
  interactionEvents = [];
  window.addEventListener("click", onRecordingClick, true);
  window.addEventListener("keydown", onRecordingKeyDown, true);
  window.addEventListener("input", onRecordingInput, true);
}

function stopInteractionTimeline(): RecordingEventMarker[] {
  if (!interactionRecording && interactionEvents.length === 0) return [];
  flushTypingSettled();
  interactionRecording = false;
  window.removeEventListener("click", onRecordingClick, true);
  window.removeEventListener("keydown", onRecordingKeyDown, true);
  window.removeEventListener("input", onRecordingInput, true);
  const events = interactionEvents.slice();
  interactionEvents = [];
  return events;
}

function onRecordingClick(e: MouseEvent): void {
  if (!interactionRecording || isLoupeEventTarget(e.target)) return;
  const target = e.target instanceof Element ? e.target : null;
  pushRecordingEvent({
    kind: "click",
    t: recordingNow(),
    label: `click ${describeEventTarget(target)}`,
    x: Math.round(e.clientX),
    y: Math.round(e.clientY),
    selector: selectorForEventTarget(target),
    text: textForEventTarget(target),
  });
}

function onRecordingKeyDown(e: KeyboardEvent): void {
  if (!interactionRecording || isLoupeEventTarget(e.target) || isModifierOnlyKey(e)) return;
  const target = e.target instanceof Element ? e.target : null;
  if (isEditableEventTarget(target)) {
    if (typingTarget !== e.target) {
      flushTypingSettled();
      typingTarget = e.target;
      pushRecordingEvent({
        kind: "typing-start",
        t: recordingNow(),
        label: `before typing in ${describeEventTarget(target)}`,
        selector: selectorForEventTarget(target),
        text: textForEventTarget(target),
      });
    }
    scheduleTypingSettled();
    return;
  }
  pushRecordingEvent({
    kind: "key",
    t: recordingNow(),
    label: `key ${e.key} on ${describeEventTarget(target)}`,
    key: e.key,
    selector: selectorForEventTarget(target),
    text: textForEventTarget(target),
  });
}

function onRecordingInput(e: Event): void {
  if (!interactionRecording || isLoupeEventTarget(e.target)) return;
  if (isEditableEventTarget(e.target instanceof Element ? e.target : null)) scheduleTypingSettled();
}

function scheduleTypingSettled(): void {
  if (typingTimer !== null) window.clearTimeout(typingTimer);
  typingTimer = window.setTimeout(flushTypingSettled, TYPING_SETTLE_MS);
}

function flushTypingSettled(): void {
  if (typingTimer !== null) {
    window.clearTimeout(typingTimer);
    typingTimer = null;
  }
  if (!typingTarget) return;
  const target = typingTarget instanceof Element ? typingTarget : null;
  typingTarget = null;
  pushRecordingEvent({
    kind: "typing-settled",
    t: recordingNow(),
    label: `after typing in ${describeEventTarget(target)}`,
    selector: selectorForEventTarget(target),
    text: textForEventTarget(target),
  });
}

function pushRecordingEvent(event: RecordingEventMarker): void {
  if (interactionEvents.length >= MAX_RECORDING_EVENTS) return;
  interactionEvents.push(event);
}

function recordingNow(): number {
  return Math.max(0, Math.round(performance.now() - interactionStartMs));
}

function isLoupeEventTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest("[data-loupe-overlay]"));
}

function isModifierOnlyKey(e: KeyboardEvent): boolean {
  return ["Shift", "Control", "Alt", "Meta", "CapsLock"].includes(e.key);
}

function isEditableEventTarget(target: Element | null): boolean {
  if (!target) return false;
  if (target instanceof HTMLTextAreaElement) return true;
  if (target instanceof HTMLInputElement) {
    const type = target.type.toLowerCase();
    return !["button", "checkbox", "color", "file", "hidden", "image", "radio", "range", "reset", "submit"].includes(type);
  }
  return target instanceof HTMLElement && target.isContentEditable;
}

function describeEventTarget(target: Element | null): string {
  if (!target) return "page";
  const text = textForEventTarget(target);
  const testId = target.getAttribute("data-testid");
  const slot = target.getAttribute("data-slot");
  const name = target.getAttribute("aria-label") || target.getAttribute("name") || target.getAttribute("placeholder");
  const tag = target.tagName.toLowerCase();
  const detail = text || testId || slot || name;
  return detail ? `${tag} "${detail}"` : tag;
}

function textForEventTarget(target: Element | null): string | undefined {
  if (!target) return undefined;
  let text = "";
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    text = target.value || target.placeholder || target.name || "";
  } else {
    text = target.textContent ?? "";
  }
  text = text.replace(/\s+/g, " ").trim();
  if (!text) return undefined;
  return text.length <= 120 ? text : `${text.slice(0, 119)}…`;
}

function selectorForEventTarget(target: Element | null): string | undefined {
  if (!target) return undefined;
  const id = target.id ? `#${cssEscape(target.id)}` : "";
  if (id) return id;
  const testId = target.getAttribute("data-testid");
  if (testId) return `[data-testid="${cssEscape(testId)}"]`;
  const slot = target.getAttribute("data-slot");
  if (slot) return `[data-slot="${cssEscape(slot)}"]`;
  return target.tagName.toLowerCase();
}

function cssEscape(value: string): string {
  return typeof CSS !== "undefined" && CSS.escape ? CSS.escape(value) : value.replace(/["\\]/g, "\\$&");
}

async function extractKeyframesFromRecording(
  videoDataUrl: string | undefined,
  events: RecordingEventMarker[],
  durationMs: number,
): Promise<RecordingKeyframe[]> {
  if (!videoDataUrl || events.length === 0) return [];
  const targets = keyframeTargets(events, durationMs);
  if (targets.length === 0) return [];
  try {
    return await renderVideoFrames(videoDataUrl, targets);
  } catch (e) {
    console.warn("[loupe] keyframe extraction failed", e);
    return [];
  }
}

function keyframeTargets(events: RecordingEventMarker[], durationMs: number): RecordingKeyframe[] {
  const duration = Math.max(0, durationMs);
  const frames: RecordingKeyframe[] = [];
  for (const event of events) {
    if (frames.length >= MAX_KEYFRAMES) break;
    const offset = event.kind === "click" || event.kind === "key" ? CLICK_FRAME_OFFSET_MS : 0;
    const t = clampFrameTime(event.t + offset, duration);
    if (frames.some((f) => Math.abs(f.t - t) < 180)) continue;
    frames.push({
      t,
      eventT: event.t,
      label: frameLabel(event),
    });
  }
  return frames;
}

function frameLabel(event: RecordingEventMarker): string {
  if (event.kind === "click") return `after ${event.label}`;
  if (event.kind === "key") return `after ${event.label}`;
  return event.label;
}

function clampFrameTime(ms: number, durationMs: number): number {
  if (durationMs <= 0) return Math.max(0, ms);
  return Math.max(0, Math.min(ms, Math.max(0, durationMs - 80)));
}

async function renderVideoFrames(videoDataUrl: string, frames: RecordingKeyframe[]): Promise<RecordingKeyframe[]> {
  const video = document.createElement("video");
  video.preload = "auto";
  video.muted = true;
  video.playsInline = true;
  video.src = videoDataUrl;
  video.style.cssText = "position:fixed;left:-99999px;top:-99999px;width:1px;height:1px;opacity:0;pointer-events:none";
  document.body.append(video);
  try {
    await waitForVideoMetadata(video);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, video.videoWidth);
    canvas.height = Math.max(1, video.videoHeight);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no 2d context");
    const rendered: RecordingKeyframe[] = [];
    for (const frame of frames) {
      await seekVideo(video, frame.t / 1000);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      rendered.push({ ...frame, dataUrl: canvas.toDataURL("image/png") });
    }
    return rendered;
  } finally {
    video.remove();
  }
}

function waitForVideoMetadata(video: HTMLVideoElement): Promise<void> {
  if (video.readyState >= HTMLMediaElement.HAVE_METADATA && video.videoWidth > 0) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => done(new Error("video metadata timeout")), 4000);
    function done(error?: Error): void {
      window.clearTimeout(timeout);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("error", onError);
      error ? reject(error) : resolve();
    }
    function onLoaded(): void {
      done();
    }
    function onError(): void {
      done(new Error("video failed to load"));
    }
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("error", onError);
    video.load();
  });
}

function seekVideo(video: HTMLVideoElement, seconds: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => done(new Error("video seek timeout")), 4000);
    function done(error?: Error): void {
      window.clearTimeout(timeout);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
      error ? reject(error) : resolve();
    }
    function onSeeked(): void {
      done();
    }
    function onError(): void {
      done(new Error("video seek failed"));
    }
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);
    video.currentTime = seconds;
  });
}

function instrumentControl(action: "start" | "stop" | "reset"): void {
  window.dispatchEvent(new CustomEvent(RECORD_CTL, { detail: { action } }));
}

/** Stop buffering and pull the captured console/network/errors from the page. */
function collectInstrumentation(): Promise<{
  console: ConsoleEntry[];
  network: NetworkEntry[];
  errors: PageErrorEntry[];
}> {
  instrumentControl("stop");
  const id = crypto.randomUUID();
  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => done({ console: [], network: [], errors: [] }), 600);

    function onCollected(event: Event): void {
      const detail = (event as CustomEvent<{ id?: string; console?: ConsoleEntry[]; network?: NetworkEntry[]; errors?: PageErrorEntry[] }>).detail;
      if (detail?.id !== id) return;
      done({ console: detail.console ?? [], network: detail.network ?? [], errors: detail.errors ?? [] });
    }

    function done(data: { console: ConsoleEntry[]; network: NetworkEntry[]; errors: PageErrorEntry[] }): void {
      window.clearTimeout(timeout);
      window.removeEventListener(RECORD_COLLECTED, onCollected);
      resolve(data);
    }

    window.addEventListener(RECORD_COLLECTED, onCollected);
    window.dispatchEvent(new CustomEvent(RECORD_COLLECT, { detail: { id } }));
  });
}

function actionsWithSave(actionIds: string[]): string[] {
  if (actionIds.length === 0 || actionIds.includes("save")) return unique(actionIds);
  return ["save", ...unique(actionIds)];
}

function unique(ids: string[]): string[] {
  return [...new Set(ids)];
}

async function fetchActions(): Promise<ActionDescriptor[]> {
  const res = (await chrome.runtime.sendMessage({ type: "actions" } satisfies LoupeMessage)) as ActionsResult;
  return res.ok ? res.actions : [{ id: "save", label: "Save to repo" }, { id: "claude", label: "Claude" }];
}

async function fetchGroups(): Promise<string[]> {
  const res = (await chrome.runtime.sendMessage({ type: "groups" } satisfies LoupeMessage)) as GroupsResult;
  return res.ok ? res.groups.map((group) => group.group) : [];
}

async function createGroup(group: string): Promise<void> {
  const res = (await chrome.runtime.sendMessage({ type: "create-group", group } satisfies LoupeMessage)) as SimpleResult;
  if (!res.ok) throw new Error(res.error);
}

async function fetchLibrary(): Promise<LibraryItem[]> {
  const res = (await chrome.runtime.sendMessage({ type: "references" } satisfies LoupeMessage)) as ReferencesResult;
  if (!res.ok) return [];
  return res.references.map((r: ReferenceItem) => ({
    id: r.id,
    caption: r.title || r.note || r.url || r.id,
    url: r.url,
    createdAt: r.createdAt,
    thumbUrl: refImageUrl(r.dir),
  }));
}

async function resolveLibraryImage(id: string): Promise<string | null> {
  const res = (await chrome.runtime.sendMessage({ type: "reference-image", id } satisfies LoupeMessage)) as ReferenceImageResult;
  return res.ok ? res.dataUrl : null;
}

function refImageUrl(dir: string): string {
  const url = new URL("/file", bridgeUrl);
  url.searchParams.set("path", `${dir}/shot.png`);
  url.searchParams.set("pageUrl", location.href);
  if (activeRepoRoot) url.searchParams.set("repoRoot", activeRepoRoot);
  return url.toString();
}

async function getLastGroup(): Promise<string> {
  const { lastGroup } = await chrome.storage.local.get({ lastGroup: "" });
  return lastGroup as string;
}

async function loadDraft(): Promise<LoupeOverlayDraft | null> {
  const key = draftStorageKey(location.href);
  try {
    const stored = await draftStorageGet(key);
    const draft = stored[key];
    if (!isFreshDraft(draft)) {
      await draftStorageRemove(key);
      return null;
    }
    return draft;
  } catch (e) {
    console.warn("[loupe] draft load failed", e);
    return null;
  }
}

async function saveDraft(draft: LoupeOverlayDraft | null): Promise<void> {
  const key = draftStorageKey(draft?.url ?? location.href);
  try {
    if (!draft) {
      await draftStorageRemove(key);
      return;
    }
    await draftStorageSet({ [key]: draft });
  } catch (e) {
    console.warn("[loupe] draft save failed", e);
  }
}

async function draftStorageGet(key: string): Promise<Record<string, unknown>> {
  try {
    return await chrome.storage.session.get(key);
  } catch {
    return await chrome.storage.local.get(key);
  }
}

async function draftStorageSet(value: Record<string, LoupeOverlayDraft>): Promise<void> {
  try {
    await chrome.storage.session.set(value);
  } catch {
    await chrome.storage.local.set(value);
  }
}

async function draftStorageRemove(key: string): Promise<void> {
  try {
    await chrome.storage.session.remove(key);
  } catch {
    await chrome.storage.local.remove(key);
  }
}

function draftStorageKey(url: string): string {
  return `${DRAFT_STORAGE_PREFIX}${urlWithoutHash(url)}`;
}

function isFreshDraft(value: unknown): value is LoupeOverlayDraft {
  if (!value || typeof value !== "object") return false;
  const draft = value as Partial<LoupeOverlayDraft>;
  if (draftStorageKey(draft.url ?? "") !== draftStorageKey(location.href)) return false;
  if (draft.mode !== "annotate" && draft.mode !== "reference") return false;
  if (!draft.rect || !Array.isArray(draft.references) || !Array.isArray(draft.acceptedKinds)) return false;
  const updatedAt = Date.parse(draft.updatedAt ?? "");
  return Number.isFinite(updatedAt) && Date.now() - updatedAt < DRAFT_MAX_AGE_MS;
}

function urlWithoutHash(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    return u.href;
  } catch {
    return url;
  }
}

function newId(): string {
  return crypto.randomUUID().slice(0, 8);
}

async function captureTargetWithPageFrameworks(el: Element): Promise<AnnotationTarget> {
  const target = captureTarget(el);
  if (target.componentChain.length > 0) return target;
  const componentChain = await inspectPageFrameworks(el);
  return componentChain.length > 0 ? { ...target, componentChain } : target;
}

const FRAMEWORK_INSPECT_ATTR = "data-loupe-inspect-id";
const FRAMEWORK_INSPECT_REQUEST = "loupe:inspect-framework-request";
const FRAMEWORK_INSPECT_RESPONSE = "loupe:inspect-framework-response";

function inspectPageFrameworks(el: Element): Promise<ComponentRef[]> {
  const id = `loupe-${crypto.randomUUID()}`;
  el.setAttribute(FRAMEWORK_INSPECT_ATTR, id);

  return new Promise((resolve) => {
    const timeout = window.setTimeout(done, 200, []);

    function onResponse(event: Event): void {
      const detail = (event as CustomEvent<FrameworkInspectResponse>).detail;
      if (detail?.id !== id) return;
      done(Array.isArray(detail.componentChain) ? detail.componentChain : []);
    }

    function done(componentChain: ComponentRef[]): void {
      window.clearTimeout(timeout);
      window.removeEventListener(FRAMEWORK_INSPECT_RESPONSE, onResponse);
      if (el.getAttribute(FRAMEWORK_INSPECT_ATTR) === id) el.removeAttribute(FRAMEWORK_INSPECT_ATTR);
      resolve(componentChain.filter((c) => typeof c.name === "string" && c.name.length > 0));
    }

    window.addEventListener(FRAMEWORK_INSPECT_RESPONSE, onResponse);
    window.dispatchEvent(new CustomEvent(FRAMEWORK_INSPECT_REQUEST, { detail: { id } }));
  });
}

interface FrameworkInspectResponse {
  id: string;
  componentChain?: ComponentRef[];
}

chrome.runtime.onMessage.addListener((msg: LoupeMessage) => {
  if (msg.type === "toggle") void toggleAnnotate();
  if (msg.type === "toggle-view") toggleView();
});

function nextFrame(): Promise<void> {
  return new Promise((r) => requestAnimationFrame(() => r()));
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function copySelectionScreenshotToClipboard(selection: { rect: Annotation["rect"]; devicePixelRatio: number }): Promise<void> {
  const activeOverlay = overlay;
  try {
    activeOverlay?.setChromeVisible(false);
    await nextFrame();
    await nextFrame();
    const shot = (await chrome.runtime.sendMessage({
      type: "capture",
      rect: selection.rect,
      devicePixelRatio: selection.devicePixelRatio,
    } satisfies LoupeMessage)) as CaptureResult;
    if (!shot.ok) throw new Error(`screenshot failed: ${shot.error}`);
    await writeScreenshotToClipboard(shot.dataUrl);
  } catch (e) {
    console.warn("[loupe] automatic screenshot clipboard copy failed", e);
  } finally {
    activeOverlay?.setChromeVisible(true);
  }
}

async function copyAnnotationClipboard(annotation: Annotation): Promise<string> {
  const resolution = await resolveTarget(annotation);
  const prompt = agentPromptText(annotation, resolution);
  if (annotation.screenshotDataUrl) {
    try {
      await writeScreenshotToClipboard(annotation.screenshotDataUrl, prompt);
      return "copied screenshot + prompt";
    } catch (e) {
      console.warn("[loupe] screenshot clipboard copy failed", e);
    }
  }
  if (!navigator.clipboard?.writeText) throw new Error("clipboard unavailable");
  await navigator.clipboard.writeText(prompt);
  return "copied agent prompt";
}

async function copyAnnotationClipboardIfAvailable(annotation: Annotation): Promise<string | null> {
  try {
    return await copyAnnotationClipboard(annotation);
  } catch (e) {
    console.warn("[loupe] automatic clipboard copy failed", e);
    return null;
  }
}

async function writeScreenshotToClipboard(dataUrl: string, text?: string): Promise<void> {
  if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
    throw new Error("image clipboard unavailable");
  }
  const png = await dataUrlToPngBlob(dataUrl);
  if (text) {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": png,
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);
      return;
    } catch {
      // Some browsers only accept image/png for programmatic image writes.
    }
  }
  await navigator.clipboard.write([new ClipboardItem({ "image/png": png })]);
}

async function dataUrlToPngBlob(dataUrl: string): Promise<Blob> {
  const blob = await (await fetch(dataUrl)).blob();
  if (blob.type === "image/png") return blob;
  return new Blob([await blob.arrayBuffer()], { type: "image/png" });
}

async function resolveTarget(annotation: Annotation): Promise<ResolveContext | null> {
  if (mode !== "annotate") return null;
  try {
    const res = (await chrome.runtime.sendMessage({
      type: "resolve-target",
      target: annotation.target,
    } satisfies LoupeMessage)) as ResolveResult;
    if (!res.ok) return null;
    return {
      source: res.source,
      candidates: res.candidates,
      method: res.method,
    };
  } catch {
    return null;
  }
}

interface ResolveContext {
  source: string | null;
  candidates: string[];
  method: string;
}

function agentPromptText(annotation: Annotation, resolution: ResolveContext | null): string {
  const component = annotation.target.componentChain.map((c) => c.name).join(" > ") || annotation.target.tag;
  const lines = [
    "Implement this Loupe UI annotation.",
    "",
    `Annotation id: ${annotation.id}`,
    annotation.group ? `Group: ${annotation.group}` : "",
    `Component: ${component}`,
  ].filter(Boolean);
  if (annotation.target.dataAttributes["data-slot"]) {
    lines.push(`Slot: ${annotation.target.dataAttributes["data-slot"]}`);
  }
  if (annotation.target.dataAttributes["data-testid"]) {
    lines.push(`Test id: ${annotation.target.dataAttributes["data-testid"]}`);
  }
  lines.push(`Selector: ${annotation.target.selector}`);
  if (annotation.target.className) lines.push(`Class: ${annotation.target.className}`);
  if (resolution?.source) {
    lines.push(`Source: ${resolution.source}`);
  } else if (resolution?.candidates.length) {
    lines.push(`Possible sources: ${resolution.candidates.join(", ")}`);
  } else {
    lines.push("Source: unresolved");
  }
  lines.push(`Page: ${annotation.title}`, `URL: ${annotation.url}`);
  if (annotation.note) lines.push("", "Requested change:", annotation.note);
  if (annotation.target.text) lines.push("", `Selected text: ${annotation.target.text}`);
  lines.push("", "Use the Loupe screenshot/reference bundle if this was saved to the repo.");
  return lines.join("\n");
}

function toast(text: string): void {
  const host = document.createElement("div");
  host.setAttribute("data-loupe-overlay", "");
  const root = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = `
    .t { position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
         background: #101010; color: #f8f8f8; padding: 9px 14px; border-radius: 12px;
         font: 13px ui-sans-serif, system-ui, sans-serif; z-index: 2147483647; white-space: pre-line;
         box-shadow: 0 12px 40px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.08);
         box-sizing: border-box; max-width: min(440px, calc(100vw - 32px)); overflow-wrap: anywhere; }`;
  const toastEl = document.createElement("div");
  toastEl.className = "t";
  toastEl.textContent = text;
  root.append(style, toastEl);
  document.body.append(host);
  setTimeout(() => host.remove(), 4200);
}
