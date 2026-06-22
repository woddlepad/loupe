import { createRoot, type Root } from "react-dom/client";
import { ViewerApp } from "./viewer-app.js";

const BASE = `:host{all:initial;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif}`;

export class LoupeViewer {
  private host: HTMLDivElement | null = null;
  private root: ShadowRoot | null = null;
  private reactRoot: Root | null = null;

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
    root.append(style, mount);
    document.body.append(host);

    this.host = host;
    this.root = root;
    this.reactRoot = createRoot(mount);
    this.reactRoot.render(<ViewerApp onClose={() => this.close()} />);

    window.addEventListener("keydown", this.onKey, true);
    for (const t of ["keyup", "keypress", "paste", "copy", "cut"]) {
      window.addEventListener(t, this.onContain, true);
    }
    for (const t of ["input", "beforeinput"]) host.addEventListener(t, this.stopBubble);
  }

  close(): void {
    window.removeEventListener("keydown", this.onKey, true);
    for (const t of ["keyup", "keypress", "paste", "copy", "cut"]) {
      window.removeEventListener(t, this.onContain, true);
    }
    this.reactRoot?.unmount();
    this.host?.remove();
    this.reactRoot = null;
    this.host = null;
    this.root = null;
  }

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
}
