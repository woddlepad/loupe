/**
 * Offscreen document: the only extension context that can run `getUserMedia` +
 * `MediaRecorder` in MV3. The background worker hands it a `tabCapture` stream id
 * and drives start/stop/cancel; this turns the captured tab into a `video/webm`
 * data URL and hands it back.
 */

interface StartMsg { type: "offscreen-start"; streamId: string }
interface StopMsg { type: "offscreen-stop" }
interface CancelMsg { type: "offscreen-cancel" }
type OffscreenMsg = StartMsg | StopMsg | CancelMsg;

let recorder: MediaRecorder | null = null;
let stream: MediaStream | null = null;
let chunks: Blob[] = [];
let startedAt = "";
let startMs = 0;

chrome.runtime.onMessage.addListener((msg: OffscreenMsg, _sender, sendResponse) => {
  if (msg?.type === "offscreen-start") {
    startCapture(msg.streamId)
      .then(sendResponse)
      .catch((e) => sendResponse({ ok: false, error: String(e) }));
    return true;
  }
  if (msg?.type === "offscreen-stop") {
    stopCapture()
      .then(sendResponse)
      .catch((e) => sendResponse({ ok: false, error: String(e) }));
    return true;
  }
  if (msg?.type === "offscreen-cancel") {
    cancelCapture()
      .then(() => sendResponse({ ok: true }))
      .catch(() => sendResponse({ ok: true }));
    return true;
  }
  return undefined;
});

async function startCapture(streamId: string): Promise<{ ok: boolean; error?: string }> {
  if (recorder) await cancelCapture();
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      // The non-standard tabCapture constraints; cast through unknown for TS.
      mandatory: { chromeMediaSource: "tab", chromeMediaSourceId: streamId },
    } as unknown as MediaTrackConstraints,
  });
  chunks = [];
  const mimeType = pickMimeType();
  recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };
  recorder.start(1000);
  startedAt = new Date().toISOString();
  startMs = performance.now();
  return { ok: true };
}

async function stopCapture(): Promise<{ ok: boolean; error?: string; videoDataUrl?: string; durationMs?: number; startedAt?: string }> {
  const active = recorder;
  if (!active) return { ok: false, error: "not recording" };
  const blob = await new Promise<Blob>((resolve) => {
    active.onstop = () => resolve(new Blob(chunks, { type: active.mimeType || "video/webm" }));
    active.stop();
  });
  const durationMs = Math.round(performance.now() - startMs);
  teardown();
  return { ok: true, videoDataUrl: await blobToDataUrl(blob), durationMs, startedAt };
}

async function cancelCapture(): Promise<void> {
  try {
    if (recorder && recorder.state !== "inactive") recorder.stop();
  } catch {
    // ignore — we are discarding anyway
  }
  teardown();
}

function teardown(): void {
  stream?.getTracks().forEach((t) => t.stop());
  stream = null;
  recorder = null;
  chunks = [];
}

function pickMimeType(): string | undefined {
  const candidates = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
  for (const type of candidates) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return undefined;
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
