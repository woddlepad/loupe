import {
  AlignHorizontalSpaceAround,
  CaseSensitive,
  Check,
  ChevronDown,
  ChevronRight,
  Contrast,
  Archive,
  Library,
  Maximize2,
  Move,
  Plus,
  Rows3,
  Search,
  SquareRoundCorner,
  X,
  createElement as createLucideIcon,
  type IconNode,
} from "lucide";
import { captureTarget as defaultCaptureTarget, dominantElement, rectOf } from "./capture.js";
import type { ActionDescriptor, Annotation, AnnotationTarget, Rect, Suggestion, SuggestionKind } from "./model.js";
import { suggestionsFor } from "./suggestions.js";

const CLAUDE_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="257" preserveAspectRatio="xMidYMid" viewBox="0 0 256 257"><path fill="currentColor" d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"/></svg>';

const OPENAI_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="260" preserveAspectRatio="xMidYMid" viewBox="0 0 256 260"><path fill="#fff" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/></svg>';

const CLAUDE_COLOR = "#d97757";

const GITHUB_REPO_URL = "https://github.com/woddlepad/loupe";

const GITHUB_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/></svg>';

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
  acceptedKinds: SuggestionKind[];
  references: { dataUrl: string }[];
  updatedAt: string;
}

type Phase = "off" | "armed" | "dragging" | "editing";

// Minimal fallback so the overlay is usable even without the injected sheet.
const BASE = `:host{all:initial;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif}`;
const FRAME_BASE =
  "html,body{margin:0!important;width:100%!important;height:100%!important;background:transparent!important;background-color:transparent!important;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif!important;color-scheme:dark}";

const C = {
  layer: "fixed inset-0 z-[2147483646] cursor-crosshair",
  dim: "fixed inset-0 bg-black/25 loupe-animate-fade",
  marquee:
    "fixed rounded-[4px] border border-loupe-accent/80 bg-loupe-accent/10 shadow-[0_0_0_1px_rgba(0,0,0,0.35)] pointer-events-none",
  inspectBox:
    "fixed rounded-[4px] border border-loupe-accent/90 bg-loupe-accent/10 shadow-[0_0_0_1px_rgba(0,0,0,0.35)] pointer-events-none",
  inspectLabel:
    "fixed max-w-[min(360px,calc(100vw-24px))] truncate rounded-md bg-loupe-fg px-2 py-1 text-[11px] font-semibold leading-none text-loupe-bg shadow-lg shadow-black/30 ring-1 ring-black/20 pointer-events-none",
  hint: "fixed left-1/2 top-3 -translate-x-1/2 rounded-loupe bg-loupe-bg/95 border border-loupe-line text-loupe-fg text-[12px] px-3 py-1.5 shadow-2xl shadow-black/50",
  panel:
    "fixed w-[340px] rounded-loupe bg-loupe-panel/95 border border-loupe-line text-loupe-fg shadow-2xl shadow-black/50 p-3 text-[13px] loupe-animate-panel",
  close:
    "absolute right-2 top-2 w-7 h-7 grid place-items-center rounded-md text-loupe-muted hover:text-loupe-fg hover:bg-white/5 cursor-pointer transition-colors",
  title: "text-[13px] font-semibold leading-tight",
  crumbs: "text-[11px] text-loupe-muted mt-1 break-words leading-snug",
  chips: "flex flex-wrap gap-1.5 mt-2.5",
  chip: "inline-flex items-center gap-1.5 rounded-full border border-loupe-line bg-loupe-elev/50 text-loupe-muted text-[12px] px-2.5 py-1 cursor-pointer select-none transition-colors hover:bg-loupe-elev data-[on=true]:bg-loupe-accent/15 data-[on=true]:border-loupe-accent/40 data-[on=true]:text-loupe-fg",
  textarea:
    "mt-2.5 w-full box-border min-h-[64px] resize-y rounded-lg bg-loupe-bg/80 border border-loupe-line text-loupe-fg text-[13px] p-2 outline-none transition-colors focus:border-loupe-accent/60 placeholder:text-loupe-faint",
  groupCombo: "relative mt-2",
  groupComboButton:
    "flex h-8 w-full box-border items-center justify-between gap-2 rounded-lg bg-loupe-bg/80 border border-loupe-line px-2 text-left text-[12px] text-loupe-fg transition-colors hover:bg-loupe-elev focus:outline-none focus:border-loupe-accent/60 cursor-pointer",
  groupComboPlaceholder: "text-loupe-faint",
  groupComboPopover:
    "absolute left-0 right-0 top-[calc(100%+4px)] z-[1] overflow-hidden rounded-lg border border-loupe-line bg-loupe-panel shadow-2xl shadow-black/50",
  groupComboSearchWrap: "p-1.5 border-b border-loupe-line",
  groupComboSearch:
    "w-full box-border rounded-md bg-loupe-bg/80 border border-loupe-line text-loupe-fg text-[12px] px-2 py-1.5 outline-none transition-colors focus:border-loupe-accent/60 placeholder:text-loupe-faint",
  groupComboMenu: "max-h-40 overflow-y-auto p-1",
  groupComboItem:
    "w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] text-loupe-muted hover:bg-white/5 hover:text-loupe-fg cursor-pointer",
  groupComboCheck: "ml-auto text-loupe-fg opacity-0",
  groupComboCheckSelected: "ml-auto text-loupe-fg opacity-100",
  groupComboCreate:
    "w-full rounded-md border-t border-loupe-line px-2 py-1.5 text-left text-[12px] text-loupe-fg hover:bg-white/5 cursor-pointer",
  refsRow: "flex items-center gap-1.5 mt-2 flex-wrap",
  refThumb:
    "relative w-12 h-12 rounded-md border border-loupe-line overflow-hidden group/ref bg-loupe-bg",
  refImg: "w-full h-full object-cover",
  refRemove:
    "absolute top-0.5 right-0.5 w-4 h-4 grid place-items-center rounded bg-black/70 text-white text-[10px] leading-none opacity-0 group-hover/ref:opacity-100 cursor-pointer",
  addRef:
    "w-12 h-12 rounded-md border border-dashed border-loupe-line-strong text-loupe-faint hover:text-loupe-fg hover:border-loupe-accent/50 grid place-items-center text-[18px] cursor-pointer transition-colors",
  libBtn:
    "h-12 px-2.5 inline-flex items-center gap-1.5 rounded-md border border-loupe-line bg-loupe-bg/70 text-loupe-muted hover:text-loupe-fg hover:border-loupe-line-strong text-[11px] cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50",
  pickerWrap: "fixed inset-0 z-[2147483647] grid place-items-center bg-black/70 p-4 text-loupe-fg",
  picker:
    "flex max-h-[min(760px,calc(100vh-2rem))] w-[min(920px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl bg-loupe-panel border border-loupe-line shadow-2xl shadow-black/60",
  pickerHeader: "flex items-start gap-3 border-b border-loupe-line px-4 py-3",
  pickerTitle: "text-[13px] font-semibold leading-none",
  pickerDescription: "mt-1 text-[11px] text-loupe-muted",
  pickerClose:
    "ml-auto h-7 w-7 grid place-items-center rounded-lg text-loupe-muted hover:bg-white/5 hover:text-loupe-fg cursor-pointer transition-colors",
  pickerSearch:
    "w-full box-border rounded-md bg-loupe-bg/80 border border-loupe-line text-loupe-fg text-[12px] px-2 py-1.5 outline-none transition-colors focus:border-loupe-accent/60 placeholder:text-loupe-faint",
  pickerList: "flex-1 overflow-y-auto p-3 space-y-4",
  pickerGroupButton:
    "w-full flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[11px] font-medium text-loupe-muted hover:bg-white/5 hover:text-loupe-fg cursor-pointer",
  pickerGroupCount: "ml-auto text-loupe-faint",
  pickerGrid: "grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2",
  pickCell:
    "overflow-hidden rounded-xl border border-loupe-line bg-loupe-bg/70 text-left hover:border-loupe-line-strong hover:bg-white/[0.04] cursor-pointer p-0 transition-all active:scale-[0.99] disabled:opacity-50",
  pickImgWrap: "aspect-[16/9] border-b border-loupe-line bg-black/40",
  pickText: "p-2.5 text-[12px] font-medium text-loupe-fg leading-snug line-clamp-1",
  pickMeta: "px-2.5 pb-2.5 text-[10.5px] text-loupe-faint leading-snug line-clamp-1",
  actions: "flex flex-col gap-1.5 mt-2.5",
  error:
    "hidden mt-2.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-2 text-[12px] leading-snug text-loupe-fg whitespace-pre-line",
  primary:
    "w-full inline-flex items-center justify-center gap-2 rounded-lg bg-loupe-fg hover:bg-white text-loupe-bg font-semibold text-[13px] px-3 py-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-default",
  secondary:
    "w-full inline-flex items-center justify-center gap-2 rounded-lg bg-loupe-bg hover:bg-loupe-elev border border-loupe-line text-loupe-fg text-[13px] px-3 py-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-default",
  footer: "flex items-center mt-2",
  cancel:
    "text-loupe-muted hover:text-loupe-fg text-[12px] px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer transition-colors",
  brandViewport:
    "fixed bottom-3 left-1/2 z-[2147483647] flex -translate-x-1/2 items-center gap-3 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] pointer-events-auto",
  brandPanel:
    "mt-3 flex items-center justify-between gap-3 border-t border-loupe-line pt-2.5 text-loupe-muted",
  brandText: "inline-flex items-center gap-1.5 text-[11px] font-medium",
  brandMark:
    "grid h-5 w-5 place-items-center rounded-full border border-current text-current",
  github:
    "inline-flex h-7 items-center gap-1.5 rounded-md border border-current bg-transparent px-2 text-[11px] font-semibold text-current transition-colors hover:text-loupe-fg focus:outline-none focus:ring-1 focus:ring-loupe-accent/70 cursor-pointer",
  code: "text-loupe-fg/90 font-mono",
};

export class LoupeOverlay {
  private opts: Required<LoupeOverlayOptions>;
  private host: HTMLDivElement | null = null;
  private root: ShadowRoot | null = null;
  private phase: Phase = "off";
  private start = { x: 0, y: 0 };
  private current: Rect = { x: 0, y: 0, width: 0, height: 0 };
  private accepted = new Set<SuggestionKind>();
  private offered: Suggestion[] = [];
  private refs: { dataUrl: string }[] = [];
  private currentRefsRow: HTMLElement | null = null;
  private currentFileAnchor: HTMLElement | null = null;
  private renderNonce = 0;
  private hoveredEl: Element | null = null;
  private mouseDownEl: Element | null = null;
  private hoverCaptureNonce = 0;
  private draft: LoupeOverlayDraft | null;
  private suppressNextClick = false;
  private cursorStyle: HTMLStyleElement | null = null;
  private editingDocument: Document | null = null;
  private noteTextarea: HTMLTextAreaElement | null = null;
  private panelResizeObserver: ResizeObserver | null = null;

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
      onSelectionCapture: async () => undefined,
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
    this.phase = "off";
    this.renderNonce++;
    this.accepted.clear();
    this.offered = [];
    this.currentRefsRow = null;
    this.currentFileAnchor = null;
    this.hoveredEl = null;
    this.mouseDownEl = null;
    this.hoverCaptureNonce++;
    this.draft = null;
    void this.opts.onDraftChange(null);
    this.setInspectCursor(false);
    this.unbindKeys();
    this.unmount();
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
    this.noteTextarea?.remove();
    this.noteTextarea = null;
    this.editingDocument = null;
    this.host?.remove();
    this.host = null;
    this.root = null;
  }

  private clearLayer(): void {
    this.panelResizeObserver?.disconnect();
    this.panelResizeObserver = null;
    this.noteTextarea?.remove();
    this.noteTextarea = null;
    this.editingDocument = null;
    this.currentRefsRow = null;
    this.currentFileAnchor = null;
    if (!this.root) return;
    for (const node of Array.from(this.root.children)) {
      if (node.tagName !== "STYLE") node.remove();
    }
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
    hint.append("click an element or drag a region · ", esc, " to cancel");
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
    this.accepted.clear();
    this.refs = [];
    this.offered = this.withHostHidden(() => suggestionsFor(targetEl));
    this.reportDraft();
    void this.opts.onSelectionCapture(this.selection);
    void this.renderEditing(targetEl, ++this.renderNonce);
  }

  private enterEditingForElement(targetEl: Element): void {
    this.phase = "editing";
    this.setInspectCursor(false);
    this.hoveredEl = null;
    this.hoverCaptureNonce++;
    this.accepted.clear();
    this.refs = [];
    this.offered = this.withHostHidden(() => suggestionsFor(targetEl));
    this.reportDraft();
    void this.opts.onSelectionCapture(this.selection);
    void this.renderEditing(targetEl, ++this.renderNonce);
  }

  private tryRestoreDraft(): boolean {
    if (!this.draft || this.draft.mode !== this.opts.mode) return false;
    this.phase = "editing";
    this.current = { ...this.draft.rect };
    this.accepted = new Set(this.draft.acceptedKinds);
    this.refs = this.draft.references.map((r) => ({ dataUrl: r.dataUrl }));
    const targetEl = this.withHostHidden(() => dominantElement(this.current));
    if (!targetEl) {
      this.arm();
      return true;
    }
    this.offered = this.withHostHidden(() => suggestionsFor(targetEl));
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

    const layer = el("div", { class: C.layer });
    layer.style.cursor = "default";
    layer.append(el("div", { class: C.dim }));

    const marquee = el("div", { class: C.marquee });
    Object.assign(marquee.style, {
      left: `${this.current.x}px`,
      top: `${this.current.y}px`,
      width: `${this.current.width}px`,
      height: `${this.current.height}px`,
    });
    layer.append(marquee);

    const isRef = this.opts.mode === "reference";
    const panel = el("div", { class: C.panel });
    placePanel(panel, this.current);

    const close = el("button", { class: C.close, type: "button", title: "cancel" }) as HTMLButtonElement;
    setButtonContent(close, X, "", 15);
    close.addEventListener("click", () => {
      this.draft = null;
      void this.opts.onDraftChange(null);
      this.arm();
    });
    panel.append(close);

    const title = el("div", { class: C.title });
    title.textContent = isRef
      ? document.title || location.host
      : crumbTitle(target.componentChain.map((c) => c.name), target.tag);
    panel.append(title);

    const crumbs = el("div", { class: C.crumbs });
    if (isRef) crumbs.textContent = `reference · ${location.host}`;
    else appendCrumbs(crumbs, target);
    panel.append(crumbs);

    if (!isRef) {
      const chips = el("div", { class: C.chips });
      for (const s of this.offered) {
        const chip = el("button", {
          class: C.chip,
          type: "button",
          "data-on": this.accepted.has(s.kind) ? "true" : "false",
        });
        setButtonContent(chip as HTMLButtonElement, suggestionIcon(s.kind), s.label, 12);
        chip.title = s.detail;
        chip.addEventListener("click", () => {
          const on = chip.getAttribute("data-on") === "true";
          chip.setAttribute("data-on", on ? "false" : "true");
          on ? this.accepted.delete(s.kind) : this.accepted.add(s.kind);
          this.reportDraft();
        });
        chips.append(chip);
      }
      panel.append(chips);
    }

    const textarea = el("textarea", {
      class: C.textarea,
      "data-loupe-note": "",
    }) as HTMLTextAreaElement;
    textarea.placeholder = isRef
      ? "what this shows / what to match…"
      : "what's wrong / what to change…";
    textarea.value = this.draft?.note ?? "";
    textarea.addEventListener("input", () => this.reportDraft());
    this.noteTextarea = textarea;
    panel.append(textarea);

    const refsRow = el("div", { class: C.refsRow });
    if (!isRef) {
      panel.append(this.renderGroupCombobox());

      // Reference images: paste a screenshot, pick a file, or pull from the library.
      const fileInput = el("input", { type: "file", accept: "image/*" }) as HTMLInputElement;
      fileInput.style.display = "none";
      fileInput.multiple = true;
      fileInput.addEventListener("change", async () => {
        for (const f of Array.from(fileInput.files ?? [])) await this.addRef(f, refsRow, fileInput);
        fileInput.value = "";
      });
      const addBtn = el("button", { class: C.addRef, type: "button", title: "add reference image (or paste)" });
      setButtonContent(addBtn as HTMLButtonElement, Plus, "", 16);
      addBtn.addEventListener("click", () => fileInput.click());
      refsRow.append(addBtn, fileInput);
      for (const ref of this.refs) this.renderRefThumb(ref, refsRow, fileInput);

      if (this.opts.library.length > 0) {
        const libBtn = el("button", { class: C.libBtn, type: "button" }) as HTMLButtonElement;
        setButtonContent(libBtn, Library, "from library", 13);
        libBtn.addEventListener("click", () => this.openLibraryPicker(refsRow, fileInput));
        refsRow.append(libBtn);
      }
      panel.append(refsRow);

      // Pasted images are handled by the capture-phase master (handlePaste).
      this.currentRefsRow = refsRow;
      this.currentFileAnchor = fileInput;
    }

    const error = el("div", { class: C.error, "data-loupe-error": "" });

    const submit = async (actionId: string, btn: HTMLButtonElement): Promise<void> => {
      if (btn.disabled) return;
      const buttons = Array.from(panel.querySelectorAll<HTMLButtonElement>("button"));
      buttons.forEach((b) => (b.disabled = true));
      error.textContent = "";
      error.classList.add("hidden");
      const prev = btn.dataset["loupeLabel"] ?? btn.textContent ?? "";
      setButtonLabel(btn, "sending…");
      const annotation = this.buildAnnotation(target);
      try {
        await this.opts.onSubmit(annotation, [actionId]);
        this.disable();
      } catch (err) {
        buttons.forEach((b) => (b.disabled = false));
        setButtonLabel(btn, prev || "retry");
        error.textContent = err instanceof Error ? err.message : String(err);
        error.classList.remove("hidden");
        console.error("[loupe] action failed", err);
      }
    };

    const actionList = isRef
      ? [{ id: "reference", label: "Save to library", hint: "save this capture as a reference" }]
      : actionLast(this.opts.actions, "save");
    const actions = el("div", { class: C.actions });
    let defaultButton: HTMLButtonElement | null = null;
    const defaultActionId = isRef ? "reference" : "save";
    actionList.forEach((action, i) => {
      const b = el("button", {
        class: action.id === defaultActionId ? C.primary : C.secondary,
        type: "button",
      }) as HTMLButtonElement;
      setButtonContent(b, actionIcon(action), actionLabel(action), 14);
      if (action.hint) b.title = action.hint;
      b.addEventListener("click", () => void submit(action.id, b));
      if (action.id === defaultActionId) defaultButton = b;
      actions.append(b);
    });
    panel.append(error);
    panel.append(actions);
    panel.append(renderBrandFooter("panel"));
    panel.addEventListener("keydown", (e) => {
      if (
        e.key !== "Enter" ||
        e.shiftKey ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        e.isComposing ||
        !(e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement)
      ) {
        return;
      }
      if (!defaultButton) return;
      e.preventDefault();
      void submit(defaultActionId, defaultButton);
    });

    layer.append(panel);
    frameDoc.body.append(layer);
    this.trackPanelPlacement(panel);
    this.reportDraft();
    setTimeout(() => textarea.focus(), 0);
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

  /** Read an image file to a data URL, store it, and render a thumbnail chip. */
  private async addRef(file: File, row: HTMLElement, before: HTMLElement): Promise<void> {
    if (!file.type.startsWith("image/")) return;
    this.addRefDataUrl(await fileToDataUrl(file), row, before);
  }

  private addRefDataUrl(dataUrl: string, row: HTMLElement, before: HTMLElement): void {
    const ref = { dataUrl };
    this.refs.push(ref);
    this.renderRefThumb(ref, row, before);
    this.reportDraft();
  }

  private renderRefThumb(ref: { dataUrl: string }, row: HTMLElement, before: HTMLElement): void {
    const thumb = el("div", { class: C.refThumb });
    const img = el("img", { class: C.refImg, src: ref.dataUrl }) as HTMLImageElement;
    const remove = el("button", { class: C.refRemove, type: "button" }, "✕");
    remove.addEventListener("click", () => {
      this.refs = this.refs.filter((r) => r !== ref);
      thumb.remove();
      this.reportDraft();
    });
    thumb.append(img, remove);
    row.insertBefore(thumb, before);
  }

  private renderGroupCombobox(): HTMLElement {
    const wrap = el("div", { class: C.groupCombo });
    const value = el("input", {
      id: "loupe-group",
      type: "hidden",
    }) as HTMLInputElement;
    value.value = this.draft?.group ?? this.opts.defaultGroup;
    const trigger = el("button", {
      class: C.groupComboButton,
      type: "button",
      role: "combobox",
      "aria-expanded": "false",
      "aria-haspopup": "listbox",
      "aria-controls": "loupe-group-listbox",
      title: "Select group",
    }) as HTMLButtonElement;
    const triggerLabel = el("span", { "data-loupe-combo-label": "" });
    const updateTrigger = () => {
      const label = value.value.trim();
      triggerLabel.textContent = label || "Select a group";
      triggerLabel.className = label ? "" : C.groupComboPlaceholder;
    };
    trigger.append(triggerLabel, lucide(ChevronDown, 14));
    const popover = el("div", { class: C.groupComboPopover });
    popover.style.display = "none";
    const searchWrap = el("div", { class: C.groupComboSearchWrap });
    const search = el("input", {
      class: C.groupComboSearch,
      type: "search",
      placeholder: "Search groups",
      autocomplete: "off",
    }) as HTMLInputElement;
    const menu = el("div", { class: C.groupComboMenu, id: "loupe-group-listbox", role: "listbox" });
    searchWrap.append(search);
    popover.append(searchWrap, menu);

    const groups = () => [...new Set(this.opts.groups.map((g) => g.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    const close = () => {
      popover.style.display = "none";
      trigger.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      search.value = "";
      render();
      popover.style.display = "";
      trigger.setAttribute("aria-expanded", "true");
      search.focus();
    };
    const select = (group: string) => {
      value.value = group;
      updateTrigger();
      close();
      this.reportDraft();
      trigger.focus();
    };
    const createAndSelect = async () => {
      const group = search.value.trim();
      if (!group) return;
      if (!groups().some((item) => item.toLowerCase() === group.toLowerCase())) {
        await this.opts.createGroup(group);
        this.opts.groups = [...groups(), group];
      }
      select(group);
    };
    const render = () => {
      const query = search.value.toLowerCase().trim();
      const selected = value.value.trim();
      const matches = groups().filter((group) => group.toLowerCase().includes(query));
      menu.replaceChildren();
      for (const group of matches) {
        const item = el("button", {
          class: C.groupComboItem,
          type: "button",
          role: "option",
          "aria-selected": group === selected ? "true" : "false",
        }) as HTMLButtonElement;
        const check = lucide(Check, 13);
        check.setAttribute("class", group === selected ? C.groupComboCheckSelected : C.groupComboCheck);
        item.append(el("span", {}, group), check);
        item.addEventListener("mousedown", (event) => event.preventDefault());
        item.addEventListener("click", () => select(group));
        menu.append(item);
      }
      const exact = groups().some((group) => group.toLowerCase() === search.value.trim().toLowerCase());
      if (search.value.trim() && !exact) {
        const create = el("button", { class: C.groupComboCreate, type: "button" }, `Create "${search.value.trim()}"`) as HTMLButtonElement;
        create.addEventListener("mousedown", (event) => event.preventDefault());
        create.addEventListener("click", () => void createAndSelect());
        menu.append(create);
      }
      if (menu.childNodes.length === 0) {
        menu.append(el("div", { class: "px-2 py-1.5 text-[12px] text-loupe-faint" }, "No groups"));
      }
    };

    trigger.addEventListener("click", () => {
      if (popover.style.display === "none") open();
      else close();
    });
    search.addEventListener("input", render);
    search.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        void createAndSelect();
      }
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        close();
        trigger.focus();
      }
    });
    search.addEventListener("blur", () => setTimeout(close, 120));
    popover.addEventListener("mousedown", (event) => event.preventDefault());
    updateTrigger();

    trigger.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown" && event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      open();
    });

    wrap.append(value, trigger, popover);
    return wrap;
  }

  /** Floating grid of library references; picking one attaches its image. */
  private openLibraryPicker(row: HTMLElement, before: HTMLElement): void {
    const existing = this.queryUi("[data-loupe-picker]");
    if (existing) {
      existing.remove();
      return;
    }
    const wrap = el("div", { class: C.pickerWrap, "data-loupe-picker": "" });
    const pick = el("div", { class: C.picker });
    const header = el("div", { class: C.pickerHeader });
    const heading = el("div");
    heading.append(el("div", { class: C.pickerTitle }, "Reference library"), el("div", { class: C.pickerDescription }, "Choose a capture to attach."));
    header.append(heading);
    const close = el("button", { class: C.pickerClose, type: "button", title: "Close library" }) as HTMLButtonElement;
    setButtonContent(close, X, "", 14);
    close.addEventListener("click", () => wrap.remove());
    header.append(close);

    const searchWrap = el("div", { class: "border-b border-loupe-line p-3" });
    const search = el("input", {
      class: C.pickerSearch,
      type: "search",
      placeholder: "Search library",
    }) as HTMLInputElement;
    searchWrap.append(search);
    const list = el("div", { class: C.pickerList });
    const collapsed = new Set<string>();
    let attaching: string | null = null;
    const error = el("div", { class: "hidden rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[12px] text-loupe-fg" });

    const render = () => {
      list.replaceChildren();
      const groups = filteredLibraryGroups(this.opts.library, search.value);
      if (this.opts.library.length === 0) {
        list.append(el("div", { class: "rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint" }, "No saved references yet"));
        return;
      }
      if (groups.length === 0) {
        list.append(el("div", { class: "rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint" }, "No matches"));
        return;
      }
      for (const [domain, items] of groups) {
        const section = el("section");
        const header = el("button", { class: C.pickerGroupButton, type: "button" }) as HTMLButtonElement;
        const chevron = lucide(ChevronRight, 13);
        const isCollapsed = collapsed.has(domain);
        chevron.style.transform = isCollapsed ? "" : "rotate(90deg)";
        chevron.style.transition = "transform 150ms ease";
        header.append(
          chevron,
          el("span", {}, domain),
          el("span", { class: C.pickerGroupCount }, String(items.length)),
        );
        header.addEventListener("click", () => {
          if (collapsed.has(domain)) collapsed.delete(domain);
          else collapsed.add(domain);
          render();
        });
        section.append(header);
        if (!isCollapsed) {
          const grid = el("div", { class: C.pickerGrid });
          for (const item of items) {
            const cell = el("button", { class: C.pickCell, type: "button", title: item.caption }) as HTMLButtonElement;
            cell.disabled = attaching !== null;
            const imageWrap = el("div", { class: C.pickImgWrap });
            imageWrap.append(el("img", { class: C.refImg, src: item.thumbUrl, alt: "" }));
            cell.append(
              imageWrap,
              el("div", { class: C.pickText }, item.caption || item.url || item.id),
              el("div", { class: C.pickMeta }, attaching === item.id ? "Attaching..." : item.createdAt ? captureDateLabel(item.createdAt) : item.url || item.id),
            );
            cell.addEventListener("click", async () => {
              if (attaching) return;
              attaching = item.id;
              error.classList.add("hidden");
              render();
              const dataUrl = await this.opts.resolveLibraryImage(item.id);
              if (dataUrl) {
                this.addRefDataUrl(dataUrl, row, before);
                wrap.remove();
                return;
              }
              attaching = null;
              error.textContent = "Could not load this reference image.";
              error.classList.remove("hidden");
              render();
            });
            grid.append(cell);
          }
          section.append(grid);
        }
        list.append(section);
      }
    };

    search.addEventListener("input", render);
    wrap.addEventListener("mousedown", (event) => {
      if (event.target === wrap) wrap.remove();
    });
    pick.addEventListener("mousedown", (event) => event.stopPropagation());
    pick.append(header, searchWrap, error, list);
    wrap.append(pick);
    this.root?.append(wrap);
    render();
    search.focus();
  }

  private buildAnnotation(target: AnnotationTarget): Annotation {
    const group = this.queryUi<HTMLInputElement>("#loupe-group")?.value.trim() ?? "";
    return {
      id: this.opts.generateId(),
      url: location.href,
      title: document.title,
      rect: { ...this.current },
      devicePixelRatio: window.devicePixelRatio || 1,
      scroll: { x: window.scrollX, y: window.scrollY },
      target,
      acceptedSuggestions: this.offered.filter((s) => this.accepted.has(s.kind)),
      note: this.noteTextarea?.value.trim() ?? "",
      references: this.refs.map((r) => ({ dataUrl: r.dataUrl })),
      createdAt: nowIso(),
      group: group || undefined,
      status: "open",
    };
  }

  private reportDraft(): void {
    if (this.phase !== "editing") return;
    const note = this.noteTextarea?.value.trim() ?? this.draft?.note ?? "";
    const group = this.queryUi<HTMLInputElement>("#loupe-group")?.value.trim() ?? this.draft?.group ?? "";
    this.draft = {
      mode: this.opts.mode,
      url: location.href,
      title: document.title,
      rect: { ...this.current },
      devicePixelRatio: window.devicePixelRatio || 1,
      scroll: { x: window.scrollX, y: window.scrollY },
      note,
      group: group || undefined,
      acceptedKinds: [...this.accepted],
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
    for (const t of CONTAINED) window.addEventListener(t, this.onEventMaster, true);
  }

  private unbindKeys(): void {
    window.removeEventListener("keydown", this.onKeyMaster, true);
    window.removeEventListener("mousemove", this.onArmedMouseMoveMaster, true);
    window.removeEventListener("mousedown", this.onArmedMouseDown, true);
    window.removeEventListener("pointerdown", this.onOverlayPointerStartMaster, true);
    window.removeEventListener("touchstart", this.onOverlayPointerStartMaster, true);
    window.removeEventListener("click", this.onOverlayClickMaster, true);
    window.removeEventListener("pointermove", this.onMouseMove, true);
    window.removeEventListener("pointerup", this.onMouseUp, true);
    window.removeEventListener("mousemove", this.onMouseMove, true);
    window.removeEventListener("mouseup", this.onMouseUp, true);
    window.removeEventListener("click", this.onSuppressClick, true);
    for (const t of CONTAINED) window.removeEventListener(t, this.onEventMaster, true);
  }

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
    // Stop the page (capture + bubble) from seeing keys typed in our fields.
    // We never preventDefault, so the focused field still receives the input.
    if (this.eventInOverlay(e)) e.stopImmediatePropagation();
  };

  private moveHostTo(parent: HTMLElement): void {
    if (!this.host || this.host.parentElement === parent) return;
    parent.append(this.host);
  }

  private queryUi<T extends Element>(selector: string): T | null {
    return (this.editingDocument ?? this.root)?.querySelector<T>(selector) ?? null;
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

    const style = doc.createElement("style");
    style.textContent = `${this.opts.stylesheet}\n${FRAME_BASE}`;
    doc.head.append(style);
    doc.documentElement.style.setProperty("background", "transparent", "important");
    doc.body.style.setProperty("background", "transparent", "important");
    doc.defaultView?.addEventListener("keydown", this.onFrameKeyDown, true);
    doc.defaultView?.addEventListener("paste", this.onFramePaste, true);
    this.editingDocument = doc;
    return doc;
  }

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
    if (images.length === 0 || !this.currentRefsRow || !this.currentFileAnchor) return;
    e.preventDefault();
    for (const it of images) {
      const file = it.getAsFile();
      if (file) void this.addRef(file, this.currentRefsRow, this.currentFileAnchor);
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

type IconSource = IconNode | SVGElement | null;

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

function setButtonContent(btn: HTMLButtonElement, iconNode: IconSource, label: string, size = 14): void {
  btn.dataset["loupeLabel"] = label;
  const nodes: Node[] = [];
  if (iconNode) nodes.push(Array.isArray(iconNode) ? lucide(iconNode, size) : iconNode);
  if (label) {
    const span = el("span", { "data-loupe-label": "" }, label);
    nodes.push(span);
  }
  btn.replaceChildren(...nodes);
}

function setButtonLabel(btn: HTMLButtonElement, label: string): void {
  btn.dataset["loupeLabel"] = label;
  const labelEl = btn.querySelector<HTMLElement>("[data-loupe-label]");
  if (labelEl) {
    labelEl.textContent = label;
  } else {
    btn.textContent = label;
  }
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

function suggestionIcon(kind: SuggestionKind): IconNode {
  switch (kind) {
    case "padding":
      return Rows3;
    case "spacing":
      return AlignHorizontalSpaceAround;
    case "typography":
      return CaseSensitive;
    case "alignment":
      return Move;
    case "contrast":
      return Contrast;
    case "radius":
      return SquareRoundCorner;
    case "size":
      return Maximize2;
  }
}

function filteredLibraryGroups(items: LibraryItem[], query: string): Array<[string, LibraryItem[]]> {
  const q = normalizeSearch(query);
  const map = new Map<string, LibraryItem[]>();
  for (const item of items) {
    const domain = libraryItemDomain(item);
    const domainMatch = normalizeSearch(domain).includes(q);
    const itemMatch = libraryItemMatches(item, q);
    if (q && !domainMatch && !itemMatch) continue;
    (map.get(domain) ?? map.set(domain, []).get(domain)!).push(item);
  }
  return [...map.entries()]
    .map(([domain, groupItems]) => [domain, [...groupItems].sort((a, b) => newestTime(b) - newestTime(a))] as [string, LibraryItem[]])
    .sort(([, a], [, b]) => newestTime(b[0]) - newestTime(a[0]));
}

function libraryItemMatches(item: LibraryItem, query: string): boolean {
  if (!query) return true;
  return [item.caption, item.url, item.id].some((value) => normalizeSearch(value).includes(query));
}

function libraryItemDomain(item: LibraryItem): string {
  if (!item.url) return "Unknown";
  try {
    return new URL(item.url).hostname.replace(/^www\./, "") || "Unknown";
  } catch {
    return "Unknown";
  }
}

function normalizeSearch(value: string | undefined): string {
  return (value ?? "").toLowerCase().trim();
}

function newestTime(item: LibraryItem | undefined): number {
  const time = Date.parse(item?.createdAt ?? "");
  return Number.isNaN(time) ? 0 : time;
}

function captureDateLabel(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return `Captured ${date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`;
}

function providerLogo(svg: string, size: number): SVGElement {
  return svgFromString(svg, size) ?? lucide(Archive, size);
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

function actionIcon(action: ActionDescriptor): IconSource {
  const id = action.id.toLowerCase();
  const label = action.label.toLowerCase();
  if (id === "save" || id === "reference" || label.includes("save")) return null;
  if (id.includes("claude") || label.includes("claude")) {
    const icon = providerLogo(CLAUDE_LOGO_SVG, 15);
    icon.style.color = CLAUDE_COLOR;
    return icon;
  }
  if (id.includes("openai") || id.includes("codex") || label.includes("openai") || label.includes("codex")) {
    return providerLogo(OPENAI_LOGO_SVG, 15);
  }
  return null;
}

function actionLabel(action: ActionDescriptor): string {
  const cleaned = action.label.replace(/^\s*(?:→|->|➜|›|»)\s*/, "").trim();
  return capitalizeFirst(cleaned || action.id);
}

function actionLast(actions: ActionDescriptor[], actionId: string): ActionDescriptor[] {
  const action = actions.find((item) => item.id === actionId);
  const rest = actions.filter((item) => item.id !== actionId);
  return action ? [...rest, action] : rest;
}

function capitalizeFirst(label: string): string {
  const i = label.search(/[A-Za-z]/);
  if (i < 0) return label;
  return label.slice(0, i) + label[i]!.toUpperCase() + label.slice(i + 1);
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

function appendCrumbs(root: HTMLElement, target: AnnotationTarget): void {
  let hasContent = false;
  const separator = () => {
    if (hasContent) root.append(" · ");
    hasContent = true;
  };

  if (target.componentChain.length) {
    separator();
    target.componentChain.forEach((c, index) => {
      if (index > 0) root.append(" › ");
      root.append(el("code", { class: C.code }, c.name));
    });
  }
  const slot = target.dataAttributes["data-slot"];
  if (slot) {
    separator();
    root.append("data-slot=", el("code", { class: C.code }, slot));
  }
  if (target.text) {
    separator();
    root.append(`"${target.text.slice(0, 48)}"`);
  }
  if (!hasContent) root.append(el("code", { class: C.code }, target.selector));
}

function defaultId(): string {
  return Math.floor(Math.random() * 0xfffff)
    .toString(16)
    .padStart(5, "0");
}

function nowIso(): string {
  return new Date().toISOString();
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
