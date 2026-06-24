import { createRoot, type Root } from "react-dom/client";
import { ViewerApp } from "./viewer-app.js";

const BASE = `:host{all:initial;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif}`;
const FRAME_BASE =
  "html,body{margin:0!important;width:100%!important;height:100%!important;overflow:hidden!important;background:transparent!important;background-color:transparent!important;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif!important;color-scheme:dark}";

export class LoupeViewer {
  private host: HTMLDivElement | null = null;
  private root: ShadowRoot | null = null;
  private reactRoot: Root | null = null;
  private panelFrame: HTMLIFrameElement | null = null;

  constructor(private stylesheet: string) {}

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
    const panelFrame = document.createElement("iframe");
    root.append(style, mount, panelFrame);
    document.body.append(host);
    const panelRoot = this.mountPanelFrame(panelFrame);

    this.host = host;
    this.root = root;
    this.panelFrame = panelFrame;
    this.reactRoot = createRoot(mount);
    this.reactRoot.render(
      <ViewerApp
        onClose={() => this.close()}
        panelRoot={panelRoot}
        panelEmbedded={panelRoot !== null}
        onCollapsedChange={this.setPanelCollapsed}
      />,
    );

    window.addEventListener("keydown", this.onKey, true);
    for (const t of ["keyup", "keypress", "paste", "copy", "cut"]) {
      window.addEventListener(t, this.onContain, true);
    }
    for (const t of CONTAINED_HOST_EVENTS) host.addEventListener(t, this.stopBubble);
  }

  close(): void {
    window.removeEventListener("keydown", this.onKey, true);
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
  }

  private mountPanelFrame(frame: HTMLIFrameElement): HTMLElement | null {
    frame.setAttribute("title", "Loupe annotations panel");
    frame.setAttribute("aria-label", "Loupe annotations panel");
    frame.setAttribute("allowtransparency", "true");
    frame.style.cssText = [
      "position:fixed",
      "right:12px",
      "top:12px",
      "width:420px",
      "height:calc(100vh - 24px)",
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

    const style = doc.createElement("style");
    style.textContent = `${this.stylesheet}\n${FRAME_BASE}`;
    doc.head.append(style);
    doc.documentElement.style.setProperty("background", "transparent", "important");
    doc.body.style.setProperty("background", "transparent", "important");
    doc.defaultView?.addEventListener("keydown", this.onFrameKey, true);
    return doc.body;
  }

  private setPanelCollapsed = (collapsed: boolean): void => {
    if (!this.panelFrame) return;
    Object.assign(this.panelFrame.style, collapsed
      ? { width: "88px", height: "48px" }
      : { width: "420px", height: "calc(100vh - 24px)" });
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

  private onFrameKey = (e: KeyboardEvent): void => {
    if (!this.active || e.key !== "Escape") return;
    e.preventDefault();
    e.stopImmediatePropagation();
    this.close();
  };
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
