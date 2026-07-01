import { Archive, Search, createElement as createLucideIcon, type IconNode } from "lucide";
import { createRoot, type Root } from "react-dom/client";
import { captureTarget as defaultCaptureTarget, dominantElement, rectOf } from "./capture.js";
import { editPanelElement, type LoupeEditPanelProps } from "./edit-panel.js";
import { C, GITHUB_LOGO_SVG, GITHUB_REPO_URL } from "./overlay-classes.js";
import type { ActionDescriptor, Annotation, AnnotationTarget, Rect, RecordingCapture } from "./model.js";

export interface LoupeOverlayOptions {
  /** Called when the user picks an action. Returns when delivery is done. */
  onSubmit: (annotation: Annotation, actionIds: string[]) => void | Promise<void>;
  /** Called once when the user finishes a click/drag selection. */
  onSelectionCapture?: (selection: { rect: Rect; devicePixelRatio: number }) => void | Promise<void>;
  /** Actions to render as buttons (advertised by the bridge). */
  actions?: ActionDescriptor[];
  /** Existing group names, offered as autocomplete in the group field. */
  groups?: string[];
  /** Pre-filled (sticky) group for the next annotation. */
  defaultGroup?: string;
  /** Create a group from the combobox before the annotation is submitted. */
  createGroup?: (group: string) => void | Promise<void>;
  /** Compiled stylesheet injected into the shadow root (Tailwind from the host). */
  stylesheet?: string;
  /**
   * "annotate" (default) on a project origin — full component capture + actions.
   * "reference" on a foreign site — capture a screenshot + note into the library.
   */
  mode?: "annotate" | "reference";
  /** Reference library items, offered via "from library" to avoid copy-paste. */
  library?: LibraryItem[];
  /** Resolve a library item's image to a data URL when the user picks it. */
  resolveLibraryImage?: (id: string) => Promise<string | null>;
  /** Id generator (the extension may supply a crypto-based one). */
  generateId?: () => string;
  /** Override target capture, e.g. when a browser extension needs page-world data. */
  captureTarget?: (element: Element) => AnnotationTarget | Promise<AnnotationTarget>;
  /** Draft to restore after a page reload or content-script remount. */
  draft?: LoupeOverlayDraft | null;
  /** Called whenever the in-progress annotation draft changes; null clears it. */
  onDraftChange?: (draft: LoupeOverlayDraft | null) => void | Promise<void>;
  /** Called when the overlay is disabled (Esc, toggle, or after submit). */
  onDisable?: () => void;
  /**
   * Flow recorder supplied by the host (the extension owns the browser capture
   * APIs). When present, the armed overlay offers "press R to record a flow":
   * `start()` begins capturing the tab + console/network, `stop()` resolves with
   * the assembled {@link RecordingCapture}, and `cancel()` discards an in-flight
   * recording. Omit it to disable recording entirely.
   */
  recorder?: FlowRecorder | null;
}

/** Host-provided screen + telemetry recorder driving the "press R" flow. */
export interface FlowRecorder {
  /** Begin capturing the tab video and buffering console/network/errors. */
  start(): Promise<void>;
  /** Stop and resolve with the assembled recording payload. */
  stop(): Promise<RecordingCapture>;
  /** Abort an in-flight recording and drop whatever was captured. */
  cancel(): void;
}

export interface LibraryItem {
  id: string;
  caption: string;
  url?: string;
  createdAt?: string;
  /** URL the overlay can render as a thumbnail (served by the bridge). */
  thumbUrl: string;
}

export interface LoupeOverlayDraft {
  mode: "annotate" | "reference";
  url: string;
  title: string;
  rect: Rect;
  devicePixelRatio: number;
  scroll: { x: number; y: number };
  note: string;
  group?: string;
  references: { dataUrl: string }[];
  updatedAt: string;
}

type Phase = "off" | "armed" | "dragging" | "editing" | "recording";

// Minimal fallback so the overlay is usable even without the injected sheet.
const BASE = `:host{all:initial;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif}`;
const FRAME_BASE =
  "html,body{margin:0!important;width:100%!important;height:100%!important;background:transparent!important;background-color:transparent!important;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif!important;color-scheme:dark}";

/** Static (per editing session) configuration for the React panel. */
interface EditSessionConfig {
  variant: "annotate" | "reference" | "recording";
  title: string;
  target: AnnotationTarget | null;
  crumbsText?: string;
  placeholder: string;
  panelWidth?: string;
  marquee: Rect | null;
  videoUrl?: string | null;
  screenshotUrl?: string | null;
  showGroup: boolean;
  showRefs: boolean;
  actions: ActionDescriptor[];
  defaultActionId: string;
  placement: "anchored" | "centered";
  onClose: () => void;
  buildAnnotation: () => Annotation;
}

export class LoupeOverlay {
  private opts: Required<LoupeOverlayOptions>;
  private host: HTMLDivElement | null = null;
  private root: ShadowRoot | null = null;
  private phase: Phase = "off";
  private start = { x: 0, y: 0 };
  private current: Rect = { x: 0, y: 0, width: 0, height: 0 };
  private refs: { dataUrl: string }[] = [];
  private renderNonce = 0;
  private hoveredEl: Element | null = null;
  private mouseDownEl: Element | null = null;
  private hoverCaptureNonce = 0;
  private draft: LoupeOverlayDraft | null;
  private suppressNextClick = false;
  private cursorStyle: HTMLStyleElement | null = null;
  private editingDocument: Document | null = null;
  private panelResizeObserver: ResizeObserver | null = null;
  private recording: RecordingCapture | null = null;
  private recordStartedAt = 0;
  private recordTimer: number | null = null;

  // --- React editing panel state (owned here; the panel is fully controlled) ---
  private editRoot: Root | null = null;
  private editPanelEl: HTMLElement | null = null;
  private editNote = "";
  private editGroup = "";
  private editError: string | null = null;
  private editSubmitting: string | null = null;
  private editRefsEnabled = false;
  /** Everything the panel needs that does not change during an editing session. */
  private editConfig: EditSessionConfig | null = null;

  constructor(options: LoupeOverlayOptions) {
    this.opts = {
      actions: [{ id: "save", label: "Save to repo" }],
      groups: [],
      defaultGroup: "",
      createGroup: async () => undefined,
      stylesheet: "",
      mode: "annotate",
      library: [],
      resolveLibraryImage: async () => null,
      generateId: defaultId,
      captureTarget: defaultCaptureTarget,
      draft: null,
      onDraftChange: () => {},
      onDisable: () => {},
      onSelectionCapture: async () => undefined,
      recorder: null,
      ...options,
    };
    this.draft = this.opts.draft;
    if (!this.opts.actions || this.opts.actions.length === 0) {
      this.opts.actions = [{ id: "save", label: "Save to repo" }];
    }
  }

  get active(): boolean {
    return this.phase !== "off";
  }

  setChromeVisible(visible: boolean): void {
    if (this.host) this.host.style.display = visible ? "" : "none";
  }

  get selection(): { rect: Rect; devicePixelRatio: number } {
    return { rect: { ...this.current }, devicePixelRatio: window.devicePixelRatio || 1 };
  }

  toggle(): void {
    this.active ? this.disable() : this.enable();
  }

  enable(): void {
    if (this.active) return;
    this.mount();
    this.bindKeys();
    if (this.tryRestoreDraft()) return;
    this.arm();
  }

  disable(): void {
    const wasActive = this.phase !== "off";
    if (this.phase === "recording") {
      try {
        this.opts.recorder?.cancel();
      } catch (e) {
        console.warn("[loupe] recorder cancel failed", e);
      }
    }
    this.stopRecordTimer();
    this.recording = null;
    this.phase = "off";
    this.renderNonce++;
    this.editRefsEnabled = false;
    this.hoveredEl = null;
    this.mouseDownEl = null;
    this.hoverCaptureNonce++;
    this.draft = null;
    void this.opts.onDraftChange(null);
    this.setInspectCursor(false);
    this.unbindKeys();
    this.unmount();
    if (wasActive) this.opts.onDisable?.();
  }

  destroy(): void {
    this.disable();
  }

  // --- mounting ---

  private mount(): void {
    if (this.host) return;
    const host = document.createElement("div");
    host.setAttribute("data-loupe-overlay", "");
    const root = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = BASE + "\n" + this.opts.stylesheet;
    root.append(style);
    containEvents(host);
    document.body.append(host);
    this.host = host;
    this.root = root;
  }

  private unmount(): void {
    this.panelResizeObserver?.disconnect();
    this.panelResizeObserver = null;
    this.teardownEditPanel();
    this.editingDocument = null;
    this.host?.remove();
    this.host = null;
    this.root = null;
  }

  private clearLayer(): void {
    this.panelResizeObserver?.disconnect();
    this.panelResizeObserver = null;
    this.teardownEditPanel();
    this.editingDocument = null;
    if (!this.root) return;
    for (const node of Array.from(this.root.children)) {
      if (node.tagName !== "STYLE") node.remove();
    }
  }

  /** Unmount the React editing panel and drop its per-session handles. */
  private teardownEditPanel(): void {
    this.editRoot?.unmount();
    this.editRoot = null;
    this.editPanelEl = null;
    this.editConfig = null;
    this.editError = null;
    this.editSubmitting = null;
    this.editRefsEnabled = false;
  }

  // --- armed ---

  private arm(): void {
    this.phase = "armed";
    this.setInspectCursor(true);
    this.renderArmed();
  }

  private renderArmed(): void {
    this.moveHostTo(document.body);
    this.clearLayer();
    if (!this.root) return;
    const layer = el("div", { class: C.layer });
    layer.style.pointerEvents = "none";
    const inspectBox = el("div", { class: C.inspectBox, "data-loupe-inspect-box": "" });
    const inspectLabel = el("div", { class: C.inspectLabel, "data-loupe-inspect-label": "" });
    inspectBox.style.display = "none";
    inspectLabel.style.display = "none";
    const hint = el("div", { class: C.hint });
    const esc = el("b", { class: "text-loupe-fg font-semibold" }, "Esc");
    if (this.opts.recorder) {
      const rKey = el("b", { class: "text-loupe-fg font-semibold" }, "R");
      hint.append("click or drag a region · press ", rKey, " to record a flow · ", esc, " to cancel");
    } else {
      hint.append("click an element or drag a region · ", esc, " to cancel");
    }
    layer.append(inspectBox, inspectLabel, hint, renderBrandFooter("viewport"));
    layer.addEventListener("mousemove", this.onArmedMouseMove);
    layer.addEventListener("mousedown", this.onMouseDown);
    this.root.append(layer);
  }

  private onArmedMouseDown = (e: MouseEvent): void => {
    if (this.eventInOverlay(e)) {
      e.stopImmediatePropagation();
      return;
    }
    if (!this.active) return;
    // While recording, the user is driving the real app — let page events through.
    if (this.phase === "recording") return;
    if (this.phase !== "armed") {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    this.onMouseDown(e);
  };

  private onArmedMouseMoveMaster = (e: MouseEvent): void => {
    if (this.phase !== "armed" || this.eventInOverlay(e)) return;
    this.onArmedMouseMove(e);
  };

  private onMouseDown = (e: MouseEvent): void => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    this.mouseDownEl = this.elementAt(e.clientX, e.clientY) ?? this.hoveredEl;
    this.phase = "dragging";
    this.setInspectCursor(true);
    this.start = { x: e.clientX, y: e.clientY };
    this.current = { x: e.clientX, y: e.clientY, width: 0, height: 0 };
    window.addEventListener("pointermove", this.onMouseMove, true);
    window.addEventListener("pointerup", this.onMouseUp, true);
    window.addEventListener("mousemove", this.onMouseMove, true);
    window.addEventListener("mouseup", this.onMouseUp, true);
    this.renderDragging();
  };

  private onMouseMove = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const x = Math.min(this.start.x, e.clientX);
    const y = Math.min(this.start.y, e.clientY);
    this.current = {
      x,
      y,
      width: Math.abs(e.clientX - this.start.x),
      height: Math.abs(e.clientY - this.start.y),
    };
    this.updateMarquee();
  };

  private onMouseUp = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopImmediatePropagation();
    window.removeEventListener("pointermove", this.onMouseMove, true);
    window.removeEventListener("pointerup", this.onMouseUp, true);
    window.removeEventListener("mousemove", this.onMouseMove, true);
    window.removeEventListener("mouseup", this.onMouseUp, true);
    if (this.current.width < 6 || this.current.height < 6) {
      const targetEl = this.elementAt(e.clientX, e.clientY) ?? this.mouseDownEl;
      this.mouseDownEl = null;
      if (targetEl) {
        this.current = rectOf(targetEl);
        this.suppressNextClick = true;
        window.addEventListener("click", this.onSuppressClick, true);
        this.enterEditingForElement(targetEl);
        return;
      }
      this.phase = "armed";
      this.renderArmed();
      return;
    }
    this.mouseDownEl = null;
    this.suppressNextClick = true;
    window.addEventListener("click", this.onSuppressClick, true);
    this.enterEditing();
  };

  private onSuppressClick = (e: MouseEvent): void => {
    if (!this.suppressNextClick) return;
    this.suppressNextClick = false;
    window.removeEventListener("click", this.onSuppressClick, true);
    e.preventDefault();
    e.stopImmediatePropagation();
  };

  private onArmedMouseMove = (e: MouseEvent): void => {
    if (this.phase !== "armed") return;
    const targetEl = this.elementAt(e.clientX, e.clientY);
    if (targetEl === this.hoveredEl) return;
    this.hoveredEl = targetEl;
    const nonce = ++this.hoverCaptureNonce;
    const box = this.root?.querySelector<HTMLElement>("[data-loupe-inspect-box]");
    const label = this.root?.querySelector<HTMLElement>("[data-loupe-inspect-label]");
    if (!targetEl || !box || !label) {
      this.updateInspectHighlight(null);
      return;
    }
    this.updateInspectHighlight({ rect: rectOf(targetEl), label: this.elementLabel(targetEl) });
    void Promise.resolve(this.opts.captureTarget(targetEl))
      .then((target) => {
        if (nonce !== this.hoverCaptureNonce || this.phase !== "armed" || this.hoveredEl !== targetEl) return;
        this.updateInspectHighlight({ rect: rectOf(targetEl), label: targetLabel(target) });
      })
      .catch(() => {
        // The click path will still do the full capture; hover labels are best-effort.
      });
  };

  private elementAt(x: number, y: number): Element | null {
    return this.withHostHidden(() => {
      const hit = document.elementFromPoint(x, y);
      if (!hit || hit === document.documentElement || hit === document.body) return null;
      if (hit.closest("[data-loupe-overlay]")) return null;
      return hit;
    });
  }

  private elementLabel(el: Element): string {
    const fallback = el.tagName.toLowerCase();
    return fallback ? `<${fallback}>` : "element";
  }

  private updateInspectHighlight(target: { rect: Rect; label: string } | null): void {
    const box = this.root?.querySelector<HTMLElement>("[data-loupe-inspect-box]");
    const label = this.root?.querySelector<HTMLElement>("[data-loupe-inspect-label]");
    if (!box || !label) return;

    if (!target || target.rect.width <= 0 || target.rect.height <= 0) {
      box.style.display = "none";
      label.style.display = "none";
      return;
    }

    const { rect } = target;
    Object.assign(box.style, {
      display: "",
      left: `${rect.x}px`,
      top: `${rect.y}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
    label.textContent = target.label;
    label.style.display = "";
    label.style.left = `${Math.max(8, rect.x)}px`;
    label.style.top = `${labelTop(rect)}px`;
    const labelWidth = label.getBoundingClientRect().width;
    label.style.left = `${Math.min(Math.max(8, rect.x), window.innerWidth - labelWidth - 8)}px`;
  }

  private renderDragging(): void {
    this.clearLayer();
    if (!this.root) return;
    const layer = el("div", { class: C.layer });
    layer.style.pointerEvents = "none";
    layer.append(el("div", { class: C.dim }));
    layer.append(el("div", { class: C.marquee, "data-marquee": "" }));
    layer.append(renderBrandFooter("viewport"));
    this.root.append(layer);
    this.updateMarquee();
  }

  private updateMarquee(): void {
    const m = this.root?.querySelector<HTMLElement>("[data-marquee]");
    if (!m) return;
    m.style.left = `${this.current.x}px`;
    m.style.top = `${this.current.y}px`;
    m.style.width = `${this.current.width}px`;
    m.style.height = `${this.current.height}px`;
  }

  // --- editing ---

  private enterEditing(): void {
    this.phase = "editing";
    this.setInspectCursor(false);
    const targetEl = this.withHostHidden(() => dominantElement(this.current));
    if (!targetEl) {
      this.phase = "armed";
      this.renderArmed();
      return;
    }
    this.refs = [];
    this.editNote = "";
    this.editGroup = this.opts.defaultGroup;
    this.reportDraft();
    void this.opts.onSelectionCapture(this.selection);
    void this.renderEditing(targetEl, ++this.renderNonce);
  }

  private enterEditingForElement(targetEl: Element): void {
    this.phase = "editing";
    this.setInspectCursor(false);
    this.hoveredEl = null;
    this.hoverCaptureNonce++;
    this.refs = [];
    this.editNote = "";
    this.editGroup = this.opts.defaultGroup;
    this.reportDraft();
    void this.opts.onSelectionCapture(this.selection);
    void this.renderEditing(targetEl, ++this.renderNonce);
  }

  // --- recording ---

  private async startRecording(): Promise<void> {
    const recorder = this.opts.recorder;
    if (!recorder || this.phase !== "armed") return;
    this.phase = "recording";
    this.hoveredEl = null;
    this.hoverCaptureNonce++;
    this.setInspectCursor(false);
    this.recording = null;
    this.recordStartedAt = Date.now();
    this.renderRecording("starting");
    try {
      await recorder.start();
    } catch (e) {
      console.error("[loupe] recording failed to start", e);
      if (this.phase === "recording") this.renderRecording("error", e instanceof Error ? e.message : String(e));
      return;
    }
    // The user may have cancelled (Esc) while the capture prompt was open.
    if (this.phase !== "recording") return;
    this.recordStartedAt = Date.now();
    this.renderRecording("active");
    this.startRecordTimer();
  }

  private async stopRecording(): Promise<void> {
    const recorder = this.opts.recorder;
    if (!recorder || this.phase !== "recording") return;
    this.stopRecordTimer();
    this.renderRecording("processing");
    let capture: RecordingCapture;
    try {
      capture = await recorder.stop();
    } catch (e) {
      console.error("[loupe] recording failed to stop", e);
      if (this.phase === "recording") this.renderRecording("error", e instanceof Error ? e.message : String(e));
      return;
    }
    if (this.phase !== "recording") return;
    this.recording = capture;
    this.enterRecordingEditing();
  }

  private startRecordTimer(): void {
    this.stopRecordTimer();
    this.recordTimer = window.setInterval(() => this.updateRecordTime(), 250);
  }

  private stopRecordTimer(): void {
    if (this.recordTimer !== null) {
      window.clearInterval(this.recordTimer);
      this.recordTimer = null;
    }
  }

  private updateRecordTime(): void {
    const time = this.root?.querySelector<HTMLElement>("[data-loupe-rec-time]");
    if (time) time.textContent = formatDuration(Date.now() - this.recordStartedAt);
  }

  private renderRecording(state: "starting" | "active" | "processing" | "error", message?: string): void {
    this.moveHostTo(document.body);
    this.clearLayer();
    if (!this.root) return;
    const layer = el("div", { class: C.layer });
    layer.style.pointerEvents = "none";
    layer.style.cursor = "default";

    const keyframes = el("style");
    keyframes.textContent = "@keyframes loupe-rec-pulse{0%,100%{opacity:1}50%{opacity:0.3}}";
    layer.append(keyframes);

    const pill = el("div");
    pill.style.cssText = RECORD_PILL_CSS;

    const dot = el("span");
    dot.style.cssText = "width:10px;height:10px;border-radius:9999px;background:#ff5c5c;flex-shrink:0";

    if (state === "error") {
      dot.style.background = "#ffb020";
      pill.append(dot, el("span", {}, message ? `recording failed: ${message}` : "recording failed"));
      const dismiss = recordPillButton("Dismiss");
      dismiss.addEventListener("click", () => this.disable());
      pill.append(dismiss);
    } else if (state === "processing") {
      const spin = el("span", { class: "loupe-spin" });
      spin.style.cssText = "flex-shrink:0";
      pill.append(spin, el("span", {}, "processing recording…"));
    } else if (state === "starting") {
      const spin = el("span", { class: "loupe-spin" });
      spin.style.cssText = "flex-shrink:0";
      pill.append(spin, el("span", {}, "starting recording…"));
    } else {
      dot.style.animation = "loupe-rec-pulse 1.2s ease-in-out infinite";
      pill.append(dot, el("span", { "data-loupe-rec-time": "" }, "0:00"));
      const label = el("span", {}, "recording this tab");
      label.style.color = "rgba(248,248,248,0.55)";
      pill.append(label);
      const stop = recordPillButton("Stop");
      stop.addEventListener("click", () => void this.stopRecording());
      pill.append(stop);
      const hint = el("span", {}, "R / Esc");
      hint.style.cssText = "color:rgba(248,248,248,0.4);font-size:11px";
      pill.append(hint);
    }

    layer.append(pill);
    this.root.append(layer);
  }

  private enterRecordingEditing(): void {
    this.phase = "editing";
    this.refs = [];
    this.editNote = "";
    this.editGroup = this.opts.defaultGroup;
    this.renderRecordingEditing(++this.renderNonce);
  }

  private renderRecordingEditing(nonce: number): void {
    if (nonce !== this.renderNonce || this.phase !== "editing") return;
    this.moveHostTo(document.body);
    this.clearLayer();
    if (!this.root) return;

    const frameDoc = this.mountEditingFrame();
    if (!frameDoc) return;

    this.editRefsEnabled = false;
    this.editError = null;
    this.editSubmitting = null;
    this.editConfig = {
      variant: "recording",
      title: "Flow recording",
      target: null,
      crumbsText: recordingSummary(this.recording),
      placeholder: "what happens in this flow / what's wrong…",
      panelWidth: "min(360px, calc(100vw - 24px))",
      marquee: null,
      videoUrl: this.recording?.videoDataUrl ?? null,
      showGroup: true,
      showRefs: false,
      actions: actionLast(this.opts.actions, "save"),
      defaultActionId: "save",
      placement: "centered",
      onClose: () => this.disable(),
      buildAnnotation: () => this.buildRecordingAnnotation(),
    };
    this.editRoot = createRoot(frameDoc.body);
    this.renderEditPanel();
  }

  private buildRecordingAnnotation(): Annotation {
    const group = this.editGroup.trim();
    return {
      id: this.opts.generateId(),
      url: location.href,
      title: document.title,
      rect: { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight },
      devicePixelRatio: window.devicePixelRatio || 1,
      scroll: { x: window.scrollX, y: window.scrollY },
      target: { tag: "body", selector: "body", text: "", dataAttributes: {}, className: "", componentChain: [] },
      note: this.editNote.trim(),
      references: [],
      createdAt: nowIso(),
      group: group || undefined,
      status: "open",
      kind: "recording",
      ...(this.recording ? { recording: this.recording } : {}),
    };
  }

  private tryRestoreDraft(): boolean {
    if (!this.draft || this.draft.mode !== this.opts.mode) return false;
    this.phase = "editing";
    this.current = { ...this.draft.rect };
    this.refs = this.draft.references.map((r) => ({ dataUrl: r.dataUrl }));
    this.editNote = this.draft.note;
    this.editGroup = this.draft.group ?? this.opts.defaultGroup;
    const targetEl = this.withHostHidden(() => dominantElement(this.current));
    if (!targetEl) {
      this.arm();
      return true;
    }
    void this.renderEditing(targetEl, ++this.renderNonce);
    return true;
  }

  private withHostHidden<T>(fn: () => T): T {
    const display = this.host?.style.display ?? "";
    if (this.host) this.host.style.display = "none";
    try {
      return fn();
    } finally {
      if (this.host) this.host.style.display = display;
    }
  }

  private setInspectCursor(on: boolean): void {
    if (!on) {
      this.cursorStyle?.remove();
      this.cursorStyle = null;
      document.documentElement.removeAttribute("data-loupe-inspecting");
      return;
    }
    if (this.cursorStyle) return;
    const style = document.createElement("style");
    style.setAttribute("data-loupe-cursor", "");
    style.textContent = "html[data-loupe-inspecting], html[data-loupe-inspecting] * { cursor: crosshair !important; }";
    document.documentElement.setAttribute("data-loupe-inspecting", "");
    document.head.append(style);
    this.cursorStyle = style;
  }

  private async renderEditing(targetEl: Element, nonce: number): Promise<void> {
    const target = await this.opts.captureTarget(targetEl);
    if (nonce !== this.renderNonce || this.phase !== "editing") return;

    this.moveHostTo(document.body);
    this.clearLayer();
    if (!this.root) return;

    const frameDoc = this.mountEditingFrame();
    if (!frameDoc) return;

    const isRef = this.opts.mode === "reference";
    // Pasted images are attached to the annotate panel's reference row.
    this.editRefsEnabled = !isRef;
    this.editError = null;
    this.editSubmitting = null;
    this.editConfig = {
      variant: isRef ? "reference" : "annotate",
      title: isRef
        ? document.title || location.host
        : crumbTitle(target.componentChain.map((c) => c.name), target.tag),
      target: isRef ? null : target,
      crumbsText: isRef ? `reference · ${location.host}` : undefined,
      placeholder: isRef ? "what this shows / what to match…" : "what's wrong / what to change…",
      marquee: { ...this.current },
      showGroup: !isRef,
      showRefs: !isRef,
      actions: isRef
        ? [{ id: "reference", label: "Save to library", hint: "save this capture as a reference" }]
        : actionLast(this.opts.actions, "save"),
      defaultActionId: isRef ? "reference" : "save",
      placement: "anchored",
      onClose: () => {
        this.draft = null;
        void this.opts.onDraftChange(null);
        this.arm();
      },
      buildAnnotation: () => this.buildAnnotation(target),
    };
    this.editRoot = createRoot(frameDoc.body);
    this.renderEditPanel();
    this.reportDraft();
  }

  /** (Re)render the React editing panel from the overlay-owned state. */
  private renderEditPanel(): void {
    if (!this.editRoot || !this.editConfig || !this.editingDocument) return;
    const cfg = this.editConfig;
    const props: LoupeEditPanelProps = {
      variant: cfg.variant,
      title: cfg.title,
      target: cfg.target,
      crumbsText: cfg.crumbsText,
      placeholder: cfg.placeholder,
      panelWidth: cfg.panelWidth,
      marquee: cfg.marquee,
      videoUrl: cfg.videoUrl,
      screenshotUrl: cfg.screenshotUrl,
      note: this.editNote,
      onNoteChange: (value) => {
        this.editNote = value;
        this.reportDraft();
        this.renderEditPanel();
      },
      showGroup: cfg.showGroup,
      groups: this.opts.groups,
      group: this.editGroup,
      onGroupChange: (value) => {
        this.editGroup = value;
        this.reportDraft();
        this.renderEditPanel();
      },
      onCreateGroup: async (name) => {
        const exists = this.opts.groups.some((g) => g.trim().toLowerCase() === name.toLowerCase());
        if (!exists) {
          await this.opts.createGroup(name);
          this.opts.groups = [...this.opts.groups, name];
        }
      },
      showRefs: cfg.showRefs,
      refs: this.refs.map((r) => ({ dataUrl: r.dataUrl })),
      onAddFiles: (files) => {
        for (const f of files) void this.addRef(f);
      },
      onRemoveRef: (index) => {
        this.refs.splice(index, 1);
        this.reportDraft();
        this.renderEditPanel();
      },
      library: this.opts.library,
      resolveLibraryImage: this.opts.resolveLibraryImage,
      onAttachLibraryImage: (dataUrl) => this.addRefDataUrl(dataUrl),
      actions: cfg.actions,
      defaultActionId: cfg.defaultActionId,
      submittingActionId: this.editSubmitting,
      onSubmit: (actionId) => this.editSubmitAction(actionId),
      error: this.editError,
      onClose: cfg.onClose,
      panelRef: this.handlePanelRef,
      portalContainer: this.editingDocument.body,
    };
    this.editRoot.render(editPanelElement(props));
  }

  /** Stable ref callback so panel geometry is placed once per mount. */
  private handlePanelRef = (el: HTMLElement | null): void => {
    this.editPanelEl = el;
    if (!el || !this.editConfig) return;
    // Keep the panel's own overflow scroll from chaining out to the page.
    el.style.overscrollBehavior = "contain";
    if (this.editConfig.placement === "centered") this.trackCenteredPanelPlacement(el);
    else this.trackPanelPlacement(el);
  };

  /** Send the annotation for one action, disabling the panel + surfacing errors. */
  private async editSubmitAction(actionId: string): Promise<void> {
    if (this.editSubmitting || !this.editConfig) return;
    this.editSubmitting = actionId;
    this.editError = null;
    this.renderEditPanel();
    const annotation = this.editConfig.buildAnnotation();
    const isRecording = this.editConfig.variant === "recording";
    try {
      await this.opts.onSubmit(annotation, [actionId]);
      this.disable();
    } catch (err) {
      this.editSubmitting = null;
      this.editError = err instanceof Error ? err.message : String(err);
      this.renderEditPanel();
      console.error(isRecording ? "[loupe] recording action failed" : "[loupe] action failed", err);
    }
  }

  private trackPanelPlacement(panel: HTMLElement): void {
    this.panelResizeObserver?.disconnect();
    const place = () => {
      if (!panel.isConnected || this.phase !== "editing") return;
      placePanel(panel, this.current);
    };
    place();
    requestAnimationFrame(place);
    this.panelResizeObserver = new ResizeObserver(place);
    this.panelResizeObserver.observe(panel);
  }

  private trackCenteredPanelPlacement(panel: HTMLElement): void {
    this.panelResizeObserver?.disconnect();
    const place = () => {
      if (!panel.isConnected || this.phase !== "editing") return;
      placeCenteredPanel(panel);
    };
    place();
    requestAnimationFrame(place);
    this.panelResizeObserver = new ResizeObserver(place);
    this.panelResizeObserver.observe(panel);
  }

  /** Read an image file to a data URL and attach it as a reference thumbnail. */
  private async addRef(file: File): Promise<void> {
    if (!file.type.startsWith("image/")) return;
    this.addRefDataUrl(await fileToDataUrl(file));
  }

  private addRefDataUrl(dataUrl: string): void {
    this.refs.push({ dataUrl });
    this.reportDraft();
    this.renderEditPanel();
  }

  private buildAnnotation(target: AnnotationTarget): Annotation {
    const group = this.editGroup.trim();
    return {
      id: this.opts.generateId(),
      url: location.href,
      title: document.title,
      rect: { ...this.current },
      devicePixelRatio: window.devicePixelRatio || 1,
      scroll: { x: window.scrollX, y: window.scrollY },
      target,
      note: this.editNote.trim(),
      references: this.refs.map((r) => ({ dataUrl: r.dataUrl })),
      createdAt: nowIso(),
      group: group || undefined,
      status: "open",
    };
  }

  private reportDraft(): void {
    if (this.phase !== "editing") return;
    const note = this.editNote.trim();
    const group = this.editGroup.trim();
    this.draft = {
      mode: this.opts.mode,
      url: location.href,
      title: document.title,
      rect: { ...this.current },
      devicePixelRatio: window.devicePixelRatio || 1,
      scroll: { x: window.scrollX, y: window.scrollY },
      note,
      group: group || undefined,
      references: this.refs.map((r) => ({ dataUrl: r.dataUrl })),
      updatedAt: nowIso(),
    };
    void this.opts.onDraftChange(this.draft);
  }

  // --- event containment (capture phase) ---

  private bindKeys(): void {
    window.addEventListener("keydown", this.onKeyMaster, true);
    window.addEventListener("mousemove", this.onArmedMouseMoveMaster, true);
    window.addEventListener("mousedown", this.onArmedMouseDown, true);
    window.addEventListener("pointerdown", this.onOverlayPointerStartMaster, true);
    window.addEventListener("touchstart", this.onOverlayPointerStartMaster, true);
    window.addEventListener("click", this.onOverlayClickMaster, true);
    window.addEventListener("wheel", this.onScrollLock, { capture: true, passive: false });
    window.addEventListener("touchmove", this.onScrollLock, { capture: true, passive: false });
    for (const t of CONTAINED) window.addEventListener(t, this.onEventMaster, true);
  }

  private unbindKeys(): void {
    window.removeEventListener("keydown", this.onKeyMaster, true);
    window.removeEventListener("mousemove", this.onArmedMouseMoveMaster, true);
    window.removeEventListener("mousedown", this.onArmedMouseDown, true);
    window.removeEventListener("pointerdown", this.onOverlayPointerStartMaster, true);
    window.removeEventListener("touchstart", this.onOverlayPointerStartMaster, true);
    window.removeEventListener("click", this.onOverlayClickMaster, true);
    window.removeEventListener("wheel", this.onScrollLock, true);
    window.removeEventListener("touchmove", this.onScrollLock, true);
    window.removeEventListener("pointermove", this.onMouseMove, true);
    window.removeEventListener("pointerup", this.onMouseUp, true);
    window.removeEventListener("mousemove", this.onMouseMove, true);
    window.removeEventListener("mouseup", this.onMouseUp, true);
    window.removeEventListener("click", this.onSuppressClick, true);
    for (const t of CONTAINED) window.removeEventListener(t, this.onEventMaster, true);
  }

  // The marquee and preview panel are positioned in viewport coordinates, so
  // scrolling the page while a region is being dragged or previewed would
  // detach them from the captured element. Lock page scroll during those
  // phases, but let the overlay's own panel scroll (e.g. an overflowing note).
  private onScrollLock = (e: Event): void => {
    if (this.phase !== "dragging" && this.phase !== "editing") return;
    if (this.eventInOverlay(e)) return;
    if (e.cancelable) e.preventDefault();
  };

  /** True when the event was dispatched to something inside our overlay. */
  private eventInOverlay(e: Event): boolean {
    return this.host !== null && e.composedPath().includes(this.host);
  }

  private onKeyMaster = (e: KeyboardEvent): void => {
    if (e.key === "Escape" && this.active) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this.disable();
      return;
    }
    // "R" toggles flow recording from the armed overlay (and stops it again).
    // Ignore it while a field is focused so typed "r"s never start a recording.
    if (
      (e.key === "r" || e.key === "R") &&
      this.opts.recorder &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.altKey &&
      !isTextEntryTarget(e)
    ) {
      if (this.phase === "armed") {
        e.preventDefault();
        e.stopImmediatePropagation();
        void this.startRecording();
        return;
      }
      if (this.phase === "recording") {
        e.preventDefault();
        e.stopImmediatePropagation();
        void this.stopRecording();
        return;
      }
    }
    // Stop the page (capture + bubble) from seeing keys typed in our fields.
    // We never preventDefault, so the focused field still receives the input.
    if (this.eventInOverlay(e)) e.stopImmediatePropagation();
  };

  private moveHostTo(parent: HTMLElement): void {
    if (!this.host || this.host.parentElement === parent) return;
    parent.append(this.host);
  }

  private mountEditingFrame(): Document | null {
    if (!this.root) return null;
    const frame = document.createElement("iframe");
    frame.setAttribute("title", "Loupe annotation editor");
    frame.setAttribute("aria-label", "Loupe annotation editor");
    frame.setAttribute("allowtransparency", "true");
    frame.style.cssText = [
      "position:fixed",
      "inset:0",
      "width:100vw",
      "height:100vh",
      "border:0",
      "background:transparent!important",
      "background-color:transparent!important",
      "z-index:2147483647",
      "color-scheme:dark",
    ].join(";");
    this.root.append(frame);

    const doc = frame.contentDocument;
    if (!doc) return null;
    doc.open();
    doc.write("<!doctype html><html><head><title>Loupe editor</title></head><body></body></html>");
    doc.close();

    // Loupe is dark-only: activate the preset's `.dark` token set so the shadcn
    // atoms don't fall back to the light theme (invisible text / neon buttons).
    doc.documentElement.classList.add("dark");

    const style = doc.createElement("style");
    style.textContent = `${this.opts.stylesheet}\n${FRAME_BASE}`;
    doc.head.append(style);
    doc.documentElement.style.setProperty("background", "transparent", "important");
    doc.body.style.setProperty("background", "transparent", "important");
    doc.defaultView?.addEventListener("keydown", this.onFrameKeyDown, true);
    doc.defaultView?.addEventListener("paste", this.onFramePaste, true);
    // The editor iframe covers the whole viewport, so wheel/touch scrolls over
    // its transparent areas would otherwise chain through to the page and drag
    // the marquee out of alignment. Lock them here; the panel scrolls its own
    // overflow via overscroll-behavior:contain (see handlePanelRef).
    doc.defaultView?.addEventListener("wheel", this.onFrameScrollLock, { capture: true, passive: false });
    doc.defaultView?.addEventListener("touchmove", this.onFrameScrollLock, { capture: true, passive: false });
    this.editingDocument = doc;
    return doc;
  }

  private onFrameScrollLock = (e: Event): void => {
    const panel = this.editPanelEl;
    const target = e.target as Node | null;
    const overScrollablePanel =
      !!panel && !!target && panel.contains(target) && panel.scrollHeight > panel.clientHeight;
    if (overScrollablePanel) return;
    if (e.cancelable) e.preventDefault();
  };

  private onFrameKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== "Escape" || !this.active) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    this.disable();
  };

  private onFramePaste = (e: ClipboardEvent): void => {
    this.handlePaste(e);
  };

  private onEventMaster = (e: Event): void => {
    if (!this.eventInOverlay(e)) return;
    if (e.type.startsWith("focus") || e.type === "blur") this.debugEvent(`window:${e.type}`, e);
    e.stopImmediatePropagation();
    if (e.type === "paste") this.handlePaste(e as ClipboardEvent);
  };

  private onOverlayPointerStartMaster = (e: Event): void => {
    if (!this.active) return;
    if (this.eventInOverlay(e)) {
      e.stopImmediatePropagation();
      focusOverlayTarget(e);
      return;
    }
    // While recording, the user is driving the real app — let page events through.
    if (this.phase === "recording") return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (this.phase !== "armed" || typeof PointerEvent === "undefined" || !(e instanceof PointerEvent) || e.button !== 0) return;
    this.onMouseDown(e);
  };

  private onOverlayClickMaster = (e: MouseEvent): void => {
    if (!this.active || !this.eventInOverlay(e)) return;
    e.stopImmediatePropagation();
    activateOverlayTarget(e);
  };

  private handlePaste(e: ClipboardEvent): void {
    const images = Array.from(e.clipboardData?.items ?? []).filter((it) =>
      it.type.startsWith("image/"),
    );
    // Text/transcription paste: do nothing — the field's default paste inserts it.
    if (images.length === 0 || !this.editRefsEnabled) return;
    e.preventDefault();
    for (const it of images) {
      const file = it.getAsFile();
      if (file) void this.addRef(file);
    }
  }

  private debugEvent(label: string, e: Event): void {
    if (!debugEnabled()) return;
    const path = e.composedPath();
    const target = path[0];
    console.info("[loupe:event]", label, {
      type: e.type,
      eventPhase: e.eventPhase,
      defaultPrevented: e.defaultPrevented,
      target: describeEventTarget(target),
      retargetedTarget: describeEventTarget(e.target),
      path: path.slice(0, 8).map(describeEventTarget),
      documentActive: describeEventTarget(document.activeElement),
      shadowActive: describeEventTarget(this.root?.activeElement ?? null),
      isTextEntry: isTextEntryTarget(e),
    });
  }
}

const CONTAINED = ["keyup", "keypress", "paste", "copy", "cut", "focusin", "focusout", "blur"];
const CONTAINED_HOST_EVENTS = [
  "pointerdown",
  "pointerup",
  "mousedown",
  "mouseup",
  "click",
  "dblclick",
  "touchstart",
  "touchend",
  "focusin",
  "focusout",
  "blur",
];

// --- helpers ---

function el(tag: string, attrs: Record<string, string> = {}, text?: string): HTMLElement {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderBrandFooter(kind: "viewport" | "panel"): HTMLElement {
  const wrap = el("div", { class: kind === "viewport" ? C.brandViewport : C.brandPanel });
  const brand = el("div", { class: C.brandText });
  const mark = el("span", { class: C.brandMark });
  mark.append(lucide(Search, 12));
  brand.append(mark, el("span", {}, "Powered by Loupe"));

  const github = el("button", { class: C.github, type: "button", title: "Open Loupe on GitHub" }) as HTMLButtonElement;
  github.append(svgFromString(GITHUB_LOGO_SVG, 14), el("span", {}, "GitHub"));
  github.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(GITHUB_REPO_URL, "_blank", "noopener,noreferrer");
  });

  wrap.append(brand, github);
  return wrap;
}

function lucide(iconNode: IconNode, size: number): SVGElement {
  const svg = createLucideIcon(iconNode, {
    width: String(size),
    height: String(size),
    "aria-hidden": "true",
    focusable: "false",
    "stroke-width": "2.2",
  });
  svg.style.flexShrink = "0";
  return svg;
}

function svgFromString(svg: string, size: number): SVGElement {
  const parsed = new DOMParser().parseFromString(svg.trim(), "image/svg+xml");
  const icon = parsed.documentElement as unknown as SVGElement | null;
  if (!icon) return lucide(Archive, size);
  icon.setAttribute("width", String(size));
  icon.setAttribute("height", String(size));
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("focusable", "false");
  icon.style.flexShrink = "0";
  return icon;
}

function actionLast(actions: ActionDescriptor[], actionId: string): ActionDescriptor[] {
  const action = actions.find((item) => item.id === actionId);
  const rest = actions.filter((item) => item.id !== actionId);
  return action ? [...rest, action] : rest;
}

function placePanel(panel: HTMLElement, rect: Rect): void {
  const margin = 12;
  const frameViewport = panel.ownerDocument.defaultView;
  const viewportWidth = frameViewport?.innerWidth || window.innerWidth;
  const viewportHeight = frameViewport?.innerHeight || window.innerHeight;
  const width = panel.offsetWidth || 340;
  const availableHeight = Math.max(160, viewportHeight - margin * 2);

  let left = rect.x + rect.width + margin;
  if (left + width + margin > viewportWidth) {
    const leftSide = rect.x - width - margin;
    left = leftSide >= margin ? leftSide : clamp(rect.x, margin, viewportWidth - width - margin);
  }

  // offsetHeight is the layout height; getBoundingClientRect would shrink with
  // the panel's scale-in animation and mis-place a tall panel near the edges.
  const naturalHeight = panel.scrollHeight || panel.offsetHeight || 300;
  const panelHeight = Math.min(naturalHeight, availableHeight);
  const fitsAligned = rect.y + panelHeight + margin <= viewportHeight;
  let top = rect.y;
  if (!fitsAligned) {
    const aboveTop = rect.y - panelHeight - margin;
    top = aboveTop >= margin
      ? aboveTop
      : clamp(rect.y + rect.height - panelHeight, margin, viewportHeight - panelHeight - margin);
  }

  if (naturalHeight > panelHeight) {
    panel.style.maxHeight = `${panelHeight}px`;
    panel.style.overflowY = "auto";
  } else {
    panel.style.maxHeight = "";
    panel.style.overflowY = "visible";
  }

  panel.style.left = `${left}px`;
  panel.style.top = `${top}px`;

  const renderedWidth = panel.offsetWidth || width;
  const renderedHeight = panel.offsetHeight || panelHeight;
  if (top + renderedHeight + margin > viewportHeight) {
    panel.style.top = `${clamp(viewportHeight - renderedHeight - margin, margin, viewportHeight - renderedHeight - margin)}px`;
  }
  if (left + renderedWidth + margin > viewportWidth) {
    panel.style.left = `${clamp(viewportWidth - renderedWidth - margin, margin, viewportWidth - renderedWidth - margin)}px`;
  }
}

function placeCenteredPanel(panel: HTMLElement): void {
  const margin = 12;
  const frameViewport = panel.ownerDocument.defaultView;
  const viewportWidth = frameViewport?.innerWidth || window.innerWidth;
  const viewportHeight = frameViewport?.innerHeight || window.innerHeight;
  const availableHeight = Math.max(180, viewportHeight - margin * 2);
  const naturalHeight = panel.scrollHeight || panel.offsetHeight || 300;
  const panelHeight = Math.min(naturalHeight, availableHeight);
  const width = panel.offsetWidth || 360;

  panel.style.position = "fixed";
  panel.style.left = `${Math.round(Math.max(margin, (viewportWidth - width) / 2))}px`;
  panel.style.top = `${Math.round(Math.max(margin, (viewportHeight - panelHeight) / 2))}px`;
  panel.style.transform = "none";
  panel.style.maxHeight = `${panelHeight}px`;
  panel.style.overflowY = naturalHeight > panelHeight ? "auto" : "visible";
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function labelTop(rect: Rect): number {
  const labelHeight = 22;
  if (rect.y >= labelHeight + 8) return rect.y - labelHeight - 4;
  return Math.min(window.innerHeight - labelHeight - 8, rect.y + rect.height + 4);
}

function targetLabel(target: AnnotationTarget): string {
  return crumbTitle(target.componentChain.map((c) => c.name), target.tag);
}

function crumbTitle(chain: string[], tag: string): string {
  if (chain.length === 0) return `<${tag}>`;
  return chain.slice(0, 2).reverse().join(" › ");
}

function defaultId(): string {
  return Math.floor(Math.random() * 0xfffff)
    .toString(16)
    .padStart(5, "0");
}

function nowIso(): string {
  return new Date().toISOString();
}

const RECORD_PILL_CSS = [
  "position:fixed",
  "bottom:18px",
  "left:50%",
  "transform:translateX(-50%)",
  "display:flex",
  "align-items:center",
  "gap:10px",
  "max-width:calc(100vw - 24px)",
  "box-sizing:border-box",
  "flex-wrap:wrap",
  "justify-content:center",
  "padding:8px 14px",
  "border-radius:9999px",
  "background:#101010",
  "color:#f8f8f8",
  "font:13px ui-sans-serif,system-ui,sans-serif",
  "box-shadow:0 12px 40px rgba(0,0,0,0.5)",
  "border:1px solid rgba(255,255,255,0.1)",
  "pointer-events:auto",
  "z-index:2147483647",
].join(";");

function recordPillButton(label: string): HTMLButtonElement {
  const btn = el("button", { type: "button" }, label) as HTMLButtonElement;
  btn.style.cssText = [
    "appearance:none",
    "border:0",
    "border-radius:9999px",
    "padding:4px 12px",
    "background:#f8f8f8",
    "color:#101010",
    "font:600 12px ui-sans-serif,system-ui,sans-serif",
    "cursor:pointer",
  ].join(";");
  return btn;
}

function formatDuration(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function recordingSummary(rec: RecordingCapture | null): string {
  if (!rec) return "flow recording";
  const failures = rec.errors.length + rec.network.filter((n) => n.error || (n.status ?? 0) >= 400).length;
  const parts = [
    formatDuration(rec.durationMs),
    `${rec.console.length} console`,
    `${rec.network.length} request${rec.network.length === 1 ? "" : "s"}`,
  ];
  if (failures > 0) parts.push(`${failures} error${failures === 1 ? "" : "s"}`);
  return parts.join(" · ");
}

/**
 * Stop overlay interaction events from reaching the host page. Without this,
 * events bubbling out of the shadow root are retargeted to the host element, so
 * the page's global shortcuts and outside-click handlers can fire against Loupe
 * UI. Editing interactions happen inside an iframe, so they do not bubble into
 * the host page; this catches the remaining host-level events around the frame.
 * We only stop propagation (never the default action), so the browser can still
 * deliver interactions to the iframe normally.
 */
function containEvents(host: HTMLElement): void {
  // Keyboard + clipboard are contained in the capture phase by the overlay's
  // key master; here we stop the remaining events from leaking after the
  // overlay or iframe has handled them.
  const stop = (e: Event) => e.stopPropagation();
  for (const type of ["input", "beforeinput", ...CONTAINED_HOST_EVENTS, "auxclick", "contextmenu"]) {
    host.addEventListener(type, stop);
  }
}

function focusOverlayTarget(event: Event): void {
  const focusable = event.composedPath().find((node): node is HTMLElement => {
    if (!(node instanceof HTMLElement)) return false;
    if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement || node instanceof HTMLSelectElement) return true;
    if (node.isContentEditable) return true;
    return node.tabIndex >= 0;
  });
  focusable?.focus({ preventScroll: true });
}

function activateOverlayTarget(event: MouseEvent): void {
  const target = event.composedPath().find((node): node is HTMLElement => {
    if (!(node instanceof HTMLElement)) return false;
    if (node instanceof HTMLButtonElement || node instanceof HTMLAnchorElement) return true;
    if (node instanceof HTMLInputElement) return ["button", "checkbox", "radio", "file", "submit"].includes(node.type);
    return false;
  });
  target?.dispatchEvent(new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    composed: false,
    button: event.button,
    clientX: event.clientX,
    clientY: event.clientY,
  }));
}

function isTextEntryTarget(e: Event): boolean {
  return textEntryTarget(e) !== null;
}

function textEntryTarget(e: Event): HTMLElement | null {
  const target = e.composedPath()[0];
  if (target instanceof HTMLTextAreaElement) return target;
  if (target instanceof HTMLInputElement && !["button", "checkbox", "color", "file", "hidden", "image", "radio", "range", "reset", "submit"].includes(target.type)) {
    return target;
  }
  if (target instanceof HTMLElement && target.isContentEditable) return target;
  return null;
}

function debugEnabled(): boolean {
  try {
    return localStorage.getItem("loupe:debug") !== "0";
  } catch {
    return true;
  }
}

function describeEventTarget(target: EventTarget | null | undefined): string {
  if (!target) return "null";
  if (target === window) return "window";
  if (target instanceof ShadowRoot) return "#shadow-root";
  if (!(target instanceof Element)) return target.constructor?.name ?? String(target);
  const parts = [target.tagName.toLowerCase()];
  if (target.id) parts.push(`#${target.id}`);
  if (target.getAttribute("data-loupe-overlay") !== null) parts.push("[data-loupe-overlay]");
  if (target instanceof HTMLTextAreaElement) parts.push("textarea");
  if (target instanceof HTMLInputElement) parts.push(`input:${target.type}`);
  return parts.join("");
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
