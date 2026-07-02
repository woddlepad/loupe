/**
 * The Loupe data model — the contract shared by the overlay (core), the
 * extension shell, and the bridge daemon. Keep it serializable: everything here
 * crosses a postMessage boundary and gets written to disk as JSON.
 */

/** A rectangle in CSS pixels, relative to the top-left of the viewport. */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** One link in the component ancestry (innermost first). */
export interface ComponentRef {
  /** `displayName || name` of the component, e.g. "Button". */
  name: string;
  /** Runtime that exposed this component hint, when known. */
  framework?: "react" | "vue" | string;
  /** Repo-relative source file hint injected by a build tool such as @loupe/vite. */
  sourcePath?: string;
  /** Whether this is a host (DOM) element rather than a component. */
  host?: boolean;
}

/**
 * What we managed to learn about the element under the selection, from the DOM
 * and (when present) the React fiber tree. The bridge uses these signals to
 * resolve a source file.
 */
export interface AnnotationTarget {
  /** Tag name of the dominant element, e.g. "button". */
  tag: string;
  /** A best-effort stable CSS selector for the element. */
  selector: string;
  /** Trimmed, truncated text content — a strong disambiguator for the agent. */
  text: string;
  /** `data-*` attributes verbatim (data-slot, data-testid, data-variant, …). */
  dataAttributes: Record<string, string>;
  /** className string, as authored. */
  className: string;
  /** Component ancestry, innermost first. Empty if no supported framework was found. */
  componentChain: ComponentRef[];
  /**
   * The anchor element's own bounding rect (viewport CSS pixels) at capture
   * time. Lets a viewer re-anchor the annotation to the live element — the
   * drawn selection's offset within this rect is layout-invariant, so pins can
   * follow the element through scroll, reflow, and responsive layout changes.
   */
  elementRect?: Rect;
}

/** One console call captured while a flow recording is running. */
export interface ConsoleEntry {
  level: "log" | "info" | "warn" | "error" | "debug";
  /** Flattened, stringified arguments. */
  text: string;
  /** Milliseconds since the recording started. */
  t: number;
}

/** One fetch/XHR request observed while a flow recording is running. */
export interface NetworkEntry {
  method: string;
  url: string;
  /** Response status, when the request completed. */
  status?: number;
  ok?: boolean;
  /** Round-trip duration in milliseconds. */
  durationMs?: number;
  /** "fetch" or "xhr". */
  kind: "fetch" | "xhr";
  /** Network/exception message when the request never completed. */
  error?: string;
  /** Request headers as `[name, value]` pairs (sensitive ones redacted). */
  requestHeaders?: [string, string][];
  /** Request body, when it was a readable string; truncated if oversized. */
  requestBody?: string;
  /** Response headers as `[name, value]` pairs. */
  responseHeaders?: [string, string][];
  /** Response content-type, surfaced for quick JSON/text detection. */
  responseContentType?: string;
  /** Response body text, when readable; truncated if oversized. */
  responseBody?: string;
  /** Whether the request/response body was cut off at the capture cap. */
  bodyTruncated?: { request?: boolean; response?: boolean };
  /** Milliseconds since the recording started. */
  t: number;
}

/** One uncaught error or unhandled rejection during a flow recording. */
export interface PageErrorEntry {
  kind: "error" | "unhandledrejection";
  message: string;
  stack?: string;
  /** Milliseconds since the recording started. */
  t: number;
}

/** One user interaction timestamp captured during a flow recording. */
export interface RecordingEventMarker {
  kind: "click" | "typing-start" | "typing-settled" | "key";
  /** Milliseconds since the recording started. */
  t: number;
  /** Short human label for the event, e.g. "click button Save". */
  label: string;
  /** Event coordinates in viewport CSS pixels, when pointer-based. */
  x?: number;
  y?: number;
  /** Keyboard key for non-text key events. */
  key?: string;
  /** Best-effort selector for the event target. */
  selector?: string;
  /** Best-effort target text/value summary. */
  text?: string;
}

/** A still PNG extracted from the recording video at an interaction timestamp. */
export interface RecordingKeyframe {
  /** Milliseconds into the flow represented by this image. */
  t: number;
  /** Human label explaining what interaction caused the frame. */
  label: string;
  /** The source event timestamp, when the frame is offset slightly after it. */
  eventT?: number;
  /** base64 data URL before persistence; omitted from saved metadata. */
  dataUrl?: string;
  /** File path within the recording bundle after persistence. */
  file?: string;
}

/**
 * Everything captured during a flow recording: the screen video plus the
 * console output, network activity, and errors that happened alongside it, so an
 * agent can diagnose the flow from the machine-readable logs, not just the video.
 */
export interface RecordingCapture {
  /** ISO-8601 time the recording started. */
  startedAt: string;
  /** Total recording length in milliseconds. */
  durationMs: number;
  /** base64 `data:video/webm` URL of the captured tab (set by the offscreen recorder). */
  videoDataUrl?: string;
  console: ConsoleEntry[];
  network: NetworkEntry[];
  errors: PageErrorEntry[];
  /** User interaction timeline used to correlate logs/video/keyframes. */
  events?: RecordingEventMarker[];
  /** PNG stills extracted from the final video at important interaction times. */
  keyframes?: RecordingKeyframe[];
}

/**
 * A complete annotation. The screenshot is attached by the extension as a base64
 * PNG data URL after the user submits, so it is optional at capture time.
 */
export interface Annotation {
  /** Stable id; the bridge derives the bundle directory name from it. */
  id: string;
  /** Page URL the annotation was made on. */
  url: string;
  /** Page title at capture time. */
  title: string;
  /**
   * Short human-readable name for the annotation, shown as its headline in the
   * viewer and used to browse a backlog. Empty at capture time (the viewer falls
   * back to the component crumb); the human or a dispatched agent sets it to
   * something descriptive once the intent of the change is clear.
   */
  label?: string;
  /** Selection rectangle in CSS pixels. */
  rect: Rect;
  /** Device pixel ratio, so the bridge can reason about the screenshot scale. */
  devicePixelRatio: number;
  /** Scroll offset at capture time, so a viewer can place pins in document space. */
  scroll?: { x: number; y: number };
  /** What was under the selection. */
  target: AnnotationTarget;
  /** Free-form note. */
  note: string;
  /**
   * Reference images for comparison — e.g. a screenshot of the Notion section
   * you want this to look like. Carried as data URLs from the extension; the
   * bridge writes them into the bundle's refs/ and replaces dataUrl with file.
   */
  references?: AnnotationReference[];
  /** ISO-8601 creation time, stamped by the extension. */
  createdAt: string;
  /**
   * Optional group this annotation belongs to, e.g. "notes UI refactor". Keeps
   * a batch of related annotations together so they can be reviewed and sent to
   * an agent as a unit without mixing with unrelated work. Empty = "inbox".
   */
  group?: string;
  /** Lifecycle, advanced by the agent/teammate via status updates. */
  status?: AnnotationStatus;
  /** base64 PNG data URL of the cropped screenshot (set by the background SW). */
  screenshotDataUrl?: string;
  /**
   * What kind of capture this is. "region" (default) is the classic drag-select
   * annotation; "recording" is a flow recording that carries a {@link RecordingCapture}.
   */
  kind?: "region" | "recording";
  /** Flow recording payload — present only when `kind` is "recording". */
  recording?: RecordingCapture;
}

export type AnnotationStatus = "open" | "needs_review" | "resolved";

/** A reference image attached to an annotation ("make it look like this"). */
export interface AnnotationReference {
  /** Optional caption, e.g. "Notion section to match". */
  caption?: string;
  /** base64 data URL (extension side, before the bridge persists it). */
  dataUrl?: string;
  /** Filename within the bundle's refs/ dir (set by the bridge). */
  file?: string;
}

/**
 * An action the user can route an annotation to (a button in the panel). The
 * bridge advertises the available set via `GET /actions`; the handler runs
 * server-side. Built-ins are "save" and the configured agents; integrations
 * (e.g. Linear) and custom `.loupe/actions/*.mjs` scripts add more.
 */
export interface ActionDescriptor {
  /** Stable id, e.g. "save", "claude", "linear". */
  id: string;
  /** Button label, e.g. "Save to repo", "Claude", "Create Linear issue". */
  label: string;
  /** Optional one-line hint shown on hover. */
  hint?: string;
}

/** The payload the extension POSTs to the bridge. */
export interface AnnotatePayload {
  annotation: Annotation;
  /** Action ids to run. The annotation is always written to the repo first. */
  actions: string[];
}
