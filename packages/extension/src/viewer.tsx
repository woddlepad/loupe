import { createRoot, type Root } from "react-dom/client";
import { ViewerApp, type LoupeMode, type ViewerApi } from "./viewer-app.js";

const BASE = `:host{all:initial;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif}`;
const FRAME_BASE =
  "html,body{margin:0!important;width:100%!important;height:100%!important;overflow:hidden!important;background:transparent!important;background-color:transparent!important;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif!important;color-scheme:dark}";

/** Panel geometry (expanded), in viewport pixels. Persisted per site origin. */
interface PanelGeometry {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface PanelInteraction {
  type: "drag" | "resize";
  dir: string;
  cursor: string;
  startX: number;
  startY: number;
  startGeom: PanelGeometry;
  startCollapsedPos: { left: number; top: number };
}

// Radix layers (dropdown / select / dialog) that portal into the panel iframe.
// Used to detect an open layer so we can bridge outside-clicks into the frame.
const OPEN_LAYER_SELECTOR =
  '[data-slot="dropdown-menu-content"],[data-slot="dialog-content"],[data-slot="select-content"]';

const MARGIN = 12;
const MIN_WIDTH = 320;
const MIN_HEIGHT = 240;
const DEFAULT_WIDTH = 420;
// Pre-measurement fallback width for the minimized toolbar; the React panel
// reports its real (fitted) width via onCollapsedWidthChange right after mount.
const COLLAPSED_WIDTH = 180;
const COLLAPSED_HEIGHT = 48;

const RESIZE_CURSORS: Record<string, string> = {
  n: "ns-resize",
  s: "ns-resize",
  e: "ew-resize",
  w: "ew-resize",
  ne: "nesw-resize",
  sw: "nesw-resize",
  nw: "nwse-resize",
  se: "nwse-resize",
};

export class LoupeViewer {
  private host: HTMLDivElement | null = null;
  private root: ShadowRoot | null = null;
  private reactRoot: Root | null = null;
  private panelFrame: HTMLIFrameElement | null = null;
  private geometry: PanelGeometry | null = null;
  private collapsed = false;
  // Width of the minimized toolbar, measured by the React panel so the iframe
  // fits its content exactly. Falls back to the constant until first measured.
  private collapsedWidth = COLLAPSED_WIDTH;
  private interaction: PanelInteraction | null = null;
  // Set once the user drags/resizes, so a late storage read can't clobber it.
  private geometryTouched = false;
  // Position of the minimized toolbar once the user drags it, overriding the
  // position derived from the expanded geometry.
  private collapsedPos: { left: number; top: number } | null = null;
  private viewerApi: ViewerApi | null = null;
  private mode: LoupeMode = "select";

  constructor(
    private stylesheet: string,
    private onModeChange?: (mode: LoupeMode) => void,
  ) {}

  /** Push the toolbar back to a mode from outside the panel (e.g. Esc closed
   * the drag-select overlay). */
  setMode(mode: LoupeMode): void {
    this.mode = mode;
    this.viewerApi?.setMode(mode);
  }

  /** Re-stack the panel host above later-mounted overlays so the minimized
   * toolbar stays clickable while annotating. */
  bringToFront(): void {
    if (this.host) document.body.append(this.host);
  }

  get active(): boolean {
    return this.host !== null;
  }

  toggle(): void {
    this.active ? this.close() : void this.open();
  }

  async open(): Promise<void> {
    if (this.active) return;
    const host = document.createElement("div");
    host.setAttribute("data-loupe-overlay", "");
    const root = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = BASE + "\n" + this.stylesheet;
    const mount = document.createElement("div");
    mount.className = "dark";
    const panelFrame = document.createElement("iframe");
    root.append(style, mount, panelFrame);
    document.body.append(host);
    const panel = this.mountPanelFrame(panelFrame);

    this.host = host;
    this.root = root;
    this.panelFrame = panelFrame;
    this.collapsed = false;
    this.geometry = this.defaultGeometry();
    this.applyGeometry();
    void this.loadGeometry();
    // Mount React directly inside the panel iframe's document (falling back to
    // the shadow-root `mount` only if the frame has no document). Keeping the
    // React root, the Radix menu portals, and focus management all in one
    // document is what makes the menus behave — a cross-document portal from the
    // shadow root into the iframe broke Radix (double-click to open, no
    // outside-click dismissal). The page-overlay layer (annotation pins,
    // lightbox) portals back out to `mount` so it can position over the page.
    this.reactRoot = createRoot(panel?.app ?? mount);
    this.reactRoot.render(
      <ViewerApp
        onClose={() => this.close()}
        panelRoot={panel?.portal ?? null}
        panelEmbedded={panel !== null}
        overlayContainer={panel ? mount : null}
        onCollapsedChange={this.setPanelCollapsed}
        onCollapsedWidthChange={this.setCollapsedWidth}
        onModeChange={(mode) => {
          this.mode = mode;
          this.onModeChange?.(mode);
        }}
        onReady={(api) => (this.viewerApi = api)}
      />,
    );

    window.addEventListener("keydown", this.onKey, true);
    window.addEventListener("resize", this.onWindowResize, true);
    window.addEventListener("pointerdown", this.onOutsidePointerDown, true);
    for (const t of ["keyup", "keypress", "paste", "copy", "cut"]) {
      window.addEventListener(t, this.onContain, true);
    }
    for (const t of CONTAINED_HOST_EVENTS) host.addEventListener(t, this.stopBubble);
  }

  close(): void {
    this.endInteraction();
    window.removeEventListener("keydown", this.onKey, true);
    window.removeEventListener("resize", this.onWindowResize, true);
    window.removeEventListener("pointerdown", this.onOutsidePointerDown, true);
    for (const t of ["keyup", "keypress", "paste", "copy", "cut"]) {
      window.removeEventListener(t, this.onContain, true);
    }
    if (this.host) {
      for (const t of CONTAINED_HOST_EVENTS) this.host.removeEventListener(t, this.stopBubble);
    }
    this.reactRoot?.unmount();
    this.host?.remove();
    this.reactRoot = null;
    this.panelFrame = null;
    this.host = null;
    this.root = null;
    this.geometry = null;
    this.collapsed = false;
    this.geometryTouched = false;
    this.collapsedPos = null;
    this.viewerApi = null;
    this.mode = "select";
  }

  private mountPanelFrame(frame: HTMLIFrameElement): { app: HTMLElement; portal: HTMLElement } | null {
    frame.setAttribute("title", "Loupe annotations panel");
    frame.setAttribute("aria-label", "Loupe annotations panel");
    frame.setAttribute("allowtransparency", "true");
    frame.style.cssText = [
      "position:fixed",
      "border:0",
      "background:transparent!important",
      "background-color:transparent!important",
      "z-index:2147483646",
      "color-scheme:dark",
    ].join(";");

    const doc = frame.contentDocument;
    if (!doc) return null;
    doc.open();
    doc.write("<!doctype html><html><head><title>Loupe annotations</title></head><body></body></html>");
    doc.close();
    // Loupe is dark-only: activate the preset's `.dark` token set so shadcn
    // atoms don't fall back to the light theme (invisible text, neon buttons).
    doc.documentElement.classList.add("dark");

    const style = doc.createElement("style");
    style.textContent = `${this.stylesheet}\n${FRAME_BASE}`;
    doc.head.append(style);
    doc.documentElement.style.setProperty("background", "transparent", "important");
    doc.body.style.setProperty("background", "transparent", "important");
    doc.defaultView?.addEventListener("keydown", this.onFrameKey, true);
    doc.addEventListener("pointerdown", this.onFramePointerDown, true);
    doc.addEventListener("pointerdown", this.onOutsidePointerDown, true);

    // Two separate children of <body>: `app` hosts the React root, `portal` is
    // the Radix menu portal target. They must be DISTINCT nodes — portalling a
    // Radix layer into the React root container itself makes React fire the
    // layer's capture handler for every event it processes at the root, so
    // DismissableLayer treats all outside pointerdowns as "inside" and never
    // dismisses. A dedicated sibling portal node avoids that entirely.
    const app = doc.createElement("div");
    app.style.cssText = "height:100%";
    const portal = doc.createElement("div");
    doc.body.append(app, portal);
    return { app, portal };
  }

  private defaultGeometry(): PanelGeometry {
    const width = Math.min(DEFAULT_WIDTH, Math.max(MIN_WIDTH, window.innerWidth - 2 * MARGIN));
    const height = Math.max(MIN_HEIGHT, window.innerHeight - 2 * MARGIN);
    const left = Math.max(MARGIN, window.innerWidth - width - MARGIN);
    return { left, top: MARGIN, width, height };
  }

  private clampGeometry(g: PanelGeometry): PanelGeometry {
    const maxWidth = Math.max(MIN_WIDTH, window.innerWidth - 2 * MARGIN);
    const maxHeight = Math.max(MIN_HEIGHT, window.innerHeight - 2 * MARGIN);
    const width = clamp(g.width, MIN_WIDTH, maxWidth);
    const height = clamp(g.height, MIN_HEIGHT, maxHeight);
    const left = clamp(g.left, MARGIN, Math.max(MARGIN, window.innerWidth - width - MARGIN));
    const top = clamp(g.top, MARGIN, Math.max(MARGIN, window.innerHeight - height - MARGIN));
    return { left, top, width, height };
  }

  private applyGeometry(): void {
    if (!this.panelFrame || !this.geometry) return;
    if (this.collapsed) {
      const derivedLeft = this.geometry.left + this.geometry.width - this.collapsedWidth;
      const pos = this.collapsedPos ?? { left: derivedLeft, top: this.geometry.top };
      const left = clamp(pos.left, MARGIN, Math.max(MARGIN, window.innerWidth - this.collapsedWidth - MARGIN));
      const top = clamp(pos.top, MARGIN, Math.max(MARGIN, window.innerHeight - COLLAPSED_HEIGHT - MARGIN));
      Object.assign(this.panelFrame.style, {
        left: `${left}px`,
        top: `${top}px`,
        right: "auto",
        bottom: "auto",
        width: `${this.collapsedWidth}px`,
        height: `${COLLAPSED_HEIGHT}px`,
      });
      return;
    }
    Object.assign(this.panelFrame.style, {
      left: `${this.geometry.left}px`,
      top: `${this.geometry.top}px`,
      right: "auto",
      bottom: "auto",
      width: `${this.geometry.width}px`,
      height: `${this.geometry.height}px`,
    });
  }

  private geometryStorageKey(): string {
    return `loupe:geometry:${location.origin}`;
  }

  private async loadGeometry(): Promise<void> {
    try {
      const key = this.geometryStorageKey();
      const stored = await chrome.storage.local.get(key);
      const saved = stored?.[key] as Partial<PanelGeometry> | undefined;
      // Skip if the user already started interacting or the panel closed.
      if (!this.panelFrame || this.interaction || this.geometryTouched || !saved) return;
      if ([saved.left, saved.top, saved.width, saved.height].some((n) => typeof n !== "number")) return;
      this.geometry = this.clampGeometry(saved as PanelGeometry);
      this.applyGeometry();
    } catch {
      // storage unavailable — keep the default geometry.
    }
  }

  private saveGeometry(): void {
    if (!this.geometry) return;
    try {
      void chrome.storage.local.set({ [this.geometryStorageKey()]: this.geometry });
    } catch {
      // ignore persistence failures.
    }
  }

  private onWindowResize = (): void => {
    if (!this.geometry) return;
    this.geometry = this.clampGeometry(this.geometry);
    this.applyGeometry();
  };

  private setPanelCollapsed = (collapsed: boolean): void => {
    if (!this.panelFrame) return;
    this.collapsed = collapsed;
    this.applyGeometry();
  };

  private setCollapsedWidth = (width: number): void => {
    const next = clamp(Math.round(width), 120, DEFAULT_WIDTH);
    if (next === this.collapsedWidth) return;
    this.collapsedWidth = next;
    if (this.collapsed) this.applyGeometry();
  };

  private stopBubble = (e: Event): void => {
    e.stopPropagation();
  };

  private onContain = (e: Event): void => {
    if (this.host && e.composedPath().includes(this.host)) e.stopImmediatePropagation();
  };

  private onKey = (e: KeyboardEvent): void => {
    if (!this.active) return;
    if (this.host && e.composedPath().includes(this.host)) e.stopImmediatePropagation();
  };

  // Dismiss any open Radix layer (dropdown / select / dialog) when the user
  // presses outside it. Radix's own pointerdown-outside detection does not fire
  // for menus portalled into the panel iframe (its listener, registered via a
  // deferred `setTimeout`, never takes effect across the iframe/React-root
  // boundary), but its synchronous Escape handling does. So we detect the
  // outside press ourselves and route it through Escape — the dismissal path
  // that reliably works. Registered on both the iframe document (in-panel
  // presses) and the top window (presses on the host page / shadow chrome).
  private onOutsidePointerDown = (e: Event): void => {
    if (!this.active) return;
    const doc = this.panelFrame?.contentDocument;
    if (!doc) return;
    const openLayers = Array.from(doc.querySelectorAll(OPEN_LAYER_SELECTOR)).filter(
      (el) => el.getAttribute("data-state") === "open",
    );
    if (!openLayers.length) return;
    const path = e.composedPath();
    // A press inside an open layer, or on any menu trigger, is handled by Radix.
    if (openLayers.some((el) => path.includes(el))) return;
    if (path.some((n) => n instanceof Element && n.closest("[data-slot$='-trigger']"))) return;
    doc.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }));
  };

  private onFrameKey = (e: KeyboardEvent): void => {
    if (!this.active || e.key !== "Escape") return;
    // Let an open Radix layer (dropdown menu / dialog / select) handle its own
    // Escape-to-dismiss instead of tearing down the whole panel.
    const doc = this.panelFrame?.contentDocument;
    if (doc?.querySelector(OPEN_LAYER_SELECTOR)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    // In annotate mode Esc returns to Select (disabling the overlay) rather than
    // closing the viewer.
    if (this.mode === "annotate") this.setMode("select");
    else this.close();
  };

  private onFramePointerDown = (e: PointerEvent): void => {
    if (e.button !== 0 || !this.panelFrame || !this.geometry) return;
    const target = eventTargetElement(e.target);

    const resizeHandle = target?.closest("[data-loupe-panel-resize]");
    if (resizeHandle) {
      const dir = resizeHandle.getAttribute("data-loupe-panel-resize") ?? "se";
      this.beginInteraction(e, "resize", dir, RESIZE_CURSORS[dir] ?? "nwse-resize");
      return;
    }

    if (target?.closest("[data-loupe-panel-no-drag]")) return;
    if (!target?.closest("[data-loupe-panel-drag]")) return;
    this.beginInteraction(e, "drag", "", "grabbing");
  };

  private beginInteraction(e: PointerEvent, type: "drag" | "resize", dir: string, cursor: string): void {
    if (!this.panelFrame || !this.geometry) return;
    e.preventDefault();
    e.stopPropagation();
    this.geometryTouched = true;
    const point = this.panelDragPoint(e);
    this.interaction = {
      type,
      dir,
      cursor,
      startX: point.x,
      startY: point.y,
      startGeom: { ...this.geometry },
      startCollapsedPos: this.collapsedPos ?? {
        left: this.geometry.left + this.geometry.width - this.collapsedWidth,
        top: this.geometry.top,
      },
    };
    this.setPanelDragChrome(cursor);
    const frameWindow = this.panelFrame.contentWindow;
    window.addEventListener("pointermove", this.onPointerMove, true);
    window.addEventListener("pointerup", this.onPointerUp, true);
    window.addEventListener("pointercancel", this.onPointerUp, true);
    frameWindow?.addEventListener("pointermove", this.onPointerMove, true);
    frameWindow?.addEventListener("pointerup", this.onPointerUp, true);
    frameWindow?.addEventListener("pointercancel", this.onPointerUp, true);
  }

  private onPointerMove = (e: PointerEvent): void => {
    if (!this.panelFrame || !this.interaction) return;
    e.preventDefault();
    const point = this.panelDragPoint(e);
    const dx = point.x - this.interaction.startX;
    const dy = point.y - this.interaction.startY;
    if (this.collapsed && this.interaction.type === "drag") {
      // Dragging the minimized toolbar moves it independently of the expanded
      // panel geometry.
      const start = this.interaction.startCollapsedPos;
      this.collapsedPos = {
        left: clamp(start.left + dx, MARGIN, Math.max(MARGIN, window.innerWidth - this.collapsedWidth - MARGIN)),
        top: clamp(start.top + dy, MARGIN, Math.max(MARGIN, window.innerHeight - COLLAPSED_HEIGHT - MARGIN)),
      };
      this.applyGeometry();
      return;
    }
    this.geometry =
      this.interaction.type === "drag"
        ? this.dragGeometry(this.interaction.startGeom, dx, dy)
        : this.resizeGeometry(this.interaction.startGeom, this.interaction.dir, dx, dy);
    this.applyGeometry();
  };

  private dragGeometry(start: PanelGeometry, dx: number, dy: number): PanelGeometry {
    const left = clamp(start.left + dx, MARGIN, Math.max(MARGIN, window.innerWidth - start.width - MARGIN));
    const top = clamp(start.top + dy, MARGIN, Math.max(MARGIN, window.innerHeight - start.height - MARGIN));
    return { left, top, width: start.width, height: start.height };
  }

  private resizeGeometry(start: PanelGeometry, dir: string, dx: number, dy: number): PanelGeometry {
    let { left, top, width, height } = start;
    if (dir.includes("e")) {
      width = clamp(start.width + dx, MIN_WIDTH, window.innerWidth - start.left - MARGIN);
    }
    if (dir.includes("w")) {
      const right = start.left + start.width;
      width = clamp(start.width - dx, MIN_WIDTH, right - MARGIN);
      left = right - width;
    }
    if (dir.includes("s")) {
      height = clamp(start.height + dy, MIN_HEIGHT, window.innerHeight - start.top - MARGIN);
    }
    if (dir.includes("n")) {
      const bottom = start.top + start.height;
      height = clamp(start.height - dy, MIN_HEIGHT, bottom - MARGIN);
      top = bottom - height;
    }
    return { left, top, width, height };
  }

  private onPointerUp = (): void => {
    if (this.interaction) this.saveGeometry();
    this.endInteraction();
  };

  private endInteraction(): void {
    this.setPanelDragChrome(null);
    const frameWindow = this.panelFrame?.contentWindow;
    this.interaction = null;
    window.removeEventListener("pointermove", this.onPointerMove, true);
    window.removeEventListener("pointerup", this.onPointerUp, true);
    window.removeEventListener("pointercancel", this.onPointerUp, true);
    frameWindow?.removeEventListener("pointermove", this.onPointerMove, true);
    frameWindow?.removeEventListener("pointerup", this.onPointerUp, true);
    frameWindow?.removeEventListener("pointercancel", this.onPointerUp, true);
  }

  private panelDragPoint(e: PointerEvent): { x: number; y: number } {
    const frameWindow = this.panelFrame?.contentWindow;
    if (this.panelFrame && e.view === frameWindow) {
      const rect = this.panelFrame.getBoundingClientRect();
      return { x: rect.left + e.clientX, y: rect.top + e.clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  private setPanelDragChrome(cursor: string | null): void {
    document.documentElement.style.cursor = cursor ?? "";
    document.documentElement.style.userSelect = cursor ? "none" : "";
    const frameDocument = this.panelFrame?.contentDocument;
    if (!frameDocument) return;
    frameDocument.documentElement.style.cursor = cursor ?? "";
    frameDocument.documentElement.style.userSelect = cursor ? "none" : "";
    frameDocument.body.style.cursor = cursor ?? "";
    frameDocument.body.style.userSelect = cursor ? "none" : "";
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function eventTargetElement(target: EventTarget | null): Element | null {
  return target && typeof (target as Element).closest === "function" ? (target as Element) : null;
}

const CONTAINED_HOST_EVENTS = [
  "input",
  "beforeinput",
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
