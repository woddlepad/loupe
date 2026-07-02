import * as React from "react";
import { createPortal } from "react-dom";
import type { ActionDescriptor, AnnotationStatus, NetworkEntry, PageErrorEntry } from "@loupe/core/model";
import { LibraryPicker } from "@loupe/core";
import type { LibraryItem } from "@loupe/core";
import {
  ArrowLeft,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Crop,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  Files,
  GripVertical,
  ImagePlus,
  Inbox,
  Library,
  Minus,
  MoreHorizontal,
  MousePointer,
  Pencil,
  Plus,
  Search,
  Trash2,
  Video,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  FileDataResult,
  GroupsResult,
  GroupSummary,
  ListResult,
  LoupeMessage,
  RecordingFileResult,
  RecordingsResult,
  ReferenceImageResult,
  ReferenceItem,
  ReferencesResult,
  SimpleResult,
  StoredAnnotation,
} from "./messages.js";
import { bridgeUrlForUrl, enabledActions, loadSettings } from "./settings.js";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  PortalContainerProvider,
  Spinner,
  Textarea,
  cn,
} from "@loupe/ui";

const CLAUDE_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 257"><path fill="currentColor" d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"/></svg>';

const OPENAI_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 260"><path fill="currentColor" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/></svg>';

const GITHUB_REPO_URL = "https://github.com/woddlepad/loupe";

/** Loupe brand mark — a magnifying glass with a lens highlight, matching the
 * extension icon. Distinct from the plain lucide `Search` glyph. */
const LOUPE_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2"/><path d="M7.3 8.6a3.8 3.8 0 0 1 2.6-2.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="m15.4 15.4 5.1 5.1" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';

const GITHUB_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/></svg>';

const PI_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6h16v2h-3v10h-2V8H9v10H7V8H4z"/></svg>';

// GitHub Copilot mark (via svgl.app).
const COPILOT_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 208"><path fill="currentColor" d="M205.3 31.4c14 14.8 20 35.2 22.5 63.6 6.6 0 12.8 1.5 17 7.2l7.8 10.6c2.2 3 3.4 6.6 3.4 10.4v28.7a12 12 0 0 1-4.8 9.5C215.9 187.2 172.3 208 128 208c-49 0-98.2-28.3-123.2-46.6a12 12 0 0 1-4.8-9.5v-28.7c0-3.8 1.2-7.4 3.4-10.5l7.8-10.5c4.2-5.7 10.4-7.2 17-7.2 2.5-28.4 8.4-48.8 22.5-63.6C77.3 3.2 112.6 0 127.6 0h.4c14.7 0 50.4 2.9 77.3 31.4ZM128 78.7c-3 0-6.5.2-10.3.6a27.1 27.1 0 0 1-6 12.1 45 45 0 0 1-32 13c-6.8 0-13.9-1.5-19.7-5.2-5.5 1.9-10.8 4.5-11.2 11-.5 12.2-.6 24.5-.6 36.8 0 6.1 0 12.3-.2 18.5 0 3.6 2.2 6.9 5.5 8.4C79.9 185.9 105 192 128 192s48-6 74.5-18.1a9.4 9.4 0 0 0 5.5-8.4c.3-18.4 0-37-.8-55.3-.4-6.6-5.7-9.1-11.2-11-5.8 3.7-13 5.1-19.7 5.1a45 45 0 0 1-32-12.9 27.1 27.1 0 0 1-6-12.1c-3.4-.4-6.9-.5-10.3-.6Zm-27 44c5.8 0 10.5 4.6 10.5 10.4v19.2a10.4 10.4 0 0 1-20.8 0V133c0-5.8 4.6-10.4 10.4-10.4Zm53.4 0c5.8 0 10.4 4.6 10.4 10.4v19.2a10.4 10.4 0 0 1-20.8 0V133c0-5.8 4.7-10.4 10.4-10.4Zm-73-94.4c-11.2 1.1-20.6 4.8-25.4 10-10.4 11.3-8.2 40.1-2.2 46.2A31.2 31.2 0 0 0 75 91.7c6.8 0 19.6-1.5 30.1-12.2 4.7-4.5 7.5-15.7 7.2-27-.3-9.1-2.9-16.7-6.7-19.9-4.2-3.6-13.6-5.2-24.2-4.3Zm69 4.3c-3.8 3.2-6.4 10.8-6.7 19.9-.3 11.3 2.5 22.5 7.2 27a41.7 41.7 0 0 0 30 12.2c8.9 0 17-2.9 21.3-7.2 6-6.1 8.2-34.9-2.2-46.3-4.8-5-14.2-8.8-25.4-9.9-10.6-1-20 .7-24.2 4.3ZM128 56c-2.6 0-5.6.2-9 .5.4 1.7.5 3.7.7 5.7 0 1.5 0 3-.2 4.5 3.2-.3 6-.3 8.5-.3 2.6 0 5.3 0 8.5.3-.2-1.6-.2-3-.2-4.5.2-2 .3-4 .7-5.7-3.4-.3-6.4-.5-9-.5Z"/></svg>';

/** Whether the page pointer drives normal interaction ("select") or the
 * drag-to-annotate overlay ("annotate"). */
export type LoupeMode = "select" | "annotate";

/** Imperative handle the content script uses to keep the toolbar in sync with
 * the overlay (e.g. reset to "select" when the overlay is dismissed with Esc). */
export interface ViewerApi {
  setMode: (mode: LoupeMode) => void;
}

export interface ViewerAppProps {
  onClose: () => void;
  panelRoot?: HTMLElement | null;
  /** Shadow-root container the page-overlay layer (pins, lightbox) portals into
   * when React is rooted inside the panel iframe. `null` renders it inline. */
  overlayContainer?: HTMLElement | null;
  panelEmbedded?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Reports the measured width of the minimized toolbar so the host iframe can
   * shrink to fit it exactly (no dead space on the right). */
  onCollapsedWidthChange?: (width: number) => void;
  onModeChange?: (mode: LoupeMode) => void;
  onReady?: (api: ViewerApi) => void;
}

type ViewerFilter = "review" | "page" | "all" | "library" | "recordings";

const VIEW_FILTER_SHORTCUTS: Record<string, ViewerFilter> = {
  n: "review",
  p: "page",
  a: "all",
  r: "recordings",
  l: "library",
};

/** Segmented Select / Annotate switch. `compact` drops the labels for the
 * minimized hovering toolbar. */
function ModeToolbar({
  mode,
  onModeChange,
  compact = false,
}: {
  mode: LoupeMode;
  onModeChange: (mode: LoupeMode) => void;
  compact?: boolean;
}) {
  return (
    <div data-loupe-panel-no-drag="" className="inline-flex items-center gap-0.5 rounded-lg border border-loupe-line bg-loupe-bg/60 p-0.5">
      <Button size="xs" variant={mode === "select" ? "default" : "ghost"} title="Select mode — interact with the page" onClick={() => onModeChange("select")}>
        <MousePointer className="h-3.5 w-3.5" />
        {compact ? null : "Select"}
      </Button>
      <Button size="xs" variant={mode === "annotate" ? "default" : "ghost"} title="Annotation mode — drag to add annotations" onClick={() => onModeChange("annotate")}>
        <Crop className="h-3.5 w-3.5" />
        {compact ? null : "Annotate"}
      </Button>
    </div>
  );
}

export function ViewerApp({ onClose, panelRoot = null, overlayContainer = null, panelEmbedded = false, onCollapsedChange, onCollapsedWidthChange, onModeChange, onReady }: ViewerAppProps) {
  const [mode, setMode] = React.useState<LoupeMode>("select");
  const [annotations, setAnnotations] = React.useState<StoredAnnotation[]>([]);
  const [recordings, setRecordings] = React.useState<StoredAnnotation[]>([]);
  const [references, setReferences] = React.useState<ReferenceItem[]>([]);
  const [actions, setActions] = React.useState<ActionDescriptor[]>([]);
  const [groups, setGroups] = React.useState<GroupSummary[]>([]);
  const [author, setAuthor] = React.useState("me");
  const [bridgeUrl, setBridgeUrl] = React.useState("http://localhost:7337");
  const [repoRoot, setRepoRoot] = React.useState<string | undefined>(undefined);
  const [filter, setFilter] = React.useState<ViewerFilter>("review");
  const [query, setQuery] = React.useState("");
  const [viewMenuOpen, setViewMenuOpen] = React.useState(false);
  const [showResolved, setShowResolved] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [collapsed, setCollapsed] = React.useState(false);
  const [collapsedGroups, setCollapsedGroups] = React.useState<Set<string>>(() => new Set());
  const [hiddenGroups, setHiddenGroups] = React.useState<Set<string>>(() => new Set());
  const [focusedGroup, setFocusedGroup] = React.useState<string | null>(null);
  const [dragOverGroup, setDragOverGroup] = React.useState<string | null>(null);
  const [draggingGroupSlug, setDraggingGroupSlug] = React.useState<string | null>(null);
  const [previewGroupOrder, setPreviewGroupOrder] = React.useState<string[] | null>(null);
  // True while a drop is committing, so the trailing `dragend` cancel doesn't
  // clear the preview order out from under the in-flight reorder.
  const committingGroupOrderRef = React.useRef(false);
  const [lightbox, setLightbox] = React.useState<string | null>(null);
  const [addingGroup, setAddingGroup] = React.useState(false);
  const [, forceLayout] = React.useReducer((n: number) => n + 1, 0);
  const collapsedRef = React.useRef<HTMLDivElement>(null);

  // Measure the minimized toolbar and report its width so the host iframe can
  // fit it exactly instead of leaving empty space to the right.
  React.useLayoutEffect(() => {
    if (!collapsed || !panelEmbedded || !onCollapsedWidthChange) return;
    const el = collapsedRef.current;
    if (!el) return;
    const report = () => onCollapsedWidthChange(Math.ceil(el.getBoundingClientRect().width));
    report();
    const observer = new ResizeObserver(report);
    observer.observe(el);
    return () => observer.disconnect();
  }, [collapsed, panelEmbedded, onCollapsedWidthChange]);

  React.useEffect(() => {
    onCollapsedChange?.(collapsed);
  }, [collapsed, onCollapsedChange]);

  const setViewerCollapsed = React.useCallback(
    (value: React.SetStateAction<boolean>) => {
      setCollapsed((current) => {
        const next = typeof value === "function" ? (value as (current: boolean) => boolean)(current) : value;
        onCollapsedChange?.(next);
        return next;
      });
    },
    [onCollapsedChange],
  );

  const changeMode = React.useCallback(
    (next: LoupeMode) => {
      setMode(next);
      onModeChange?.(next);
      // Annotation mode hands the pointer to the drag-select overlay, so shrink
      // the panel down to the hovering toolbar while the user marks up the page.
      if (next === "annotate") setViewerCollapsed(true);
    },
    [onModeChange, setViewerCollapsed],
  );

  // Let the content script drive the toolbar back to "select" when the overlay
  // is dismissed outside the panel (Esc, toggle command, submit).
  React.useEffect(() => {
    onReady?.({ setMode: (next) => setMode(next) });
  }, [onReady]);

  const reload = React.useCallback(async () => {
    const [list, recordingList, referenceList, actionList, groupList, settings] = await Promise.all([
      chrome.runtime.sendMessage({ type: "list" } satisfies LoupeMessage) as Promise<ListResult>,
      chrome.runtime.sendMessage({ type: "recordings" } satisfies LoupeMessage) as Promise<RecordingsResult>,
      chrome.runtime.sendMessage({ type: "references" } satisfies LoupeMessage) as Promise<ReferencesResult>,
      fetchActions(),
      fetchGroups(),
      loadSettings(),
    ]);
    setAnnotations(list.ok ? list.annotations : []);
    setRecordings(recordingList.ok ? recordingList.recordings : []);
    setReferences(referenceList.ok ? referenceList.references : []);
    setActions(enabledActions(actionList, settings));
    setGroups(groupList);
    setAuthor(settings.author);
    setBridgeUrl(bridgeUrlForUrl(settings, location.href));
    setRepoRoot(settings.activeRepoRoot);
  }, []);

  React.useEffect(() => {
    void reload();
  }, [reload]);

  React.useEffect(() => {
    const update = () => forceLayout();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update, true);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update, true);
    };
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (eventPathHasAttribute(e, "data-loupe-library-popover")) return;
      // An open Radix layer (dropdown / select / dialog) owns Escape — let it
      // dismiss itself instead of tearing down the whole viewer. Its own
      // `onOpenChange` keeps our state (e.g. `viewMenuOpen`) in sync.
      if (
        panelRoot?.ownerDocument.querySelector(
          '[data-slot="dropdown-menu-content"][data-state="open"],[data-slot="select-content"][data-state="open"],[data-slot="dialog-content"][data-state="open"]',
        )
      ) {
        return;
      }
      e.preventDefault();
      e.stopImmediatePropagation();
      if (viewMenuOpen) setViewMenuOpen(false);
      else if (lightbox) setLightbox(null);
      // In annotate mode Esc hands back to Select (disabling the drag-select
      // overlay) rather than tearing down the whole viewer.
      else if (mode === "annotate") changeMode("select");
      else onClose();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [lightbox, onClose, viewMenuOpen, mode, changeMode, panelRoot]);

  React.useEffect(() => {
    const targetWindows = uniqueWindows([window, panelRoot?.ownerDocument.defaultView ?? null]);
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || collapsed || lightbox || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.isComposing) return;
      if (isTextEntryTarget(e.target)) return;
      const nextFilter = VIEW_FILTER_SHORTCUTS[e.key.toLowerCase()];
      if (!nextFilter) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      setFilter(nextFilter);
      setExpanded(null);
      setViewMenuOpen(false);
    };
    targetWindows.forEach((targetWindow) => targetWindow.addEventListener("keydown", onKey, true));
    return () => targetWindows.forEach((targetWindow) => targetWindow.removeEventListener("keydown", onKey, true));
  }, [collapsed, lightbox, panelRoot]);

  const pageAnnotations = React.useMemo(() => {
    const here = pageKey(location.href);
    return annotations.filter((a) => pageKey(a.url) === here);
  }, [annotations]);

  const reviewAnnotations = React.useMemo(() => annotations.filter((a) => a.status === "needs_review"), [annotations]);

  const scoped = React.useMemo(() => {
    if (filter === "library") return [];
    if (filter === "review") return reviewAnnotations;
    return filter === "all" ? annotations : pageAnnotations;
  }, [annotations, filter, pageAnnotations, reviewAnnotations]);

  const visible = React.useMemo(() => {
    const q = normalizeSearch(query);
    const base = showResolved ? scoped : scoped.filter((a) => a.status !== "resolved");
    return base.filter((a) => {
      const slug = a.groupSlug || groupSlugFor(a.group);
      if (hiddenGroups.has(slug)) return false;
      if (focusedGroup && slug !== focusedGroup) return false;
      return !q || annotationMatches(a, q);
    });
  }, [focusedGroup, hiddenGroups, query, scoped, showResolved]);

  const pageCount = React.useMemo(
    () => (showResolved ? pageAnnotations.length : pageAnnotations.filter((a) => a.status !== "resolved").length),
    [pageAnnotations, showResolved],
  );

  const reviewCount = reviewAnnotations.length;

  const allCount = React.useMemo(
    () => (showResolved ? annotations.length : annotations.filter((a) => a.status !== "resolved").length),
    [annotations, showResolved],
  );
  const libraryCount = references.length;
  const recordingCount = recordings.length;

  const allResolvedCount = annotations.filter((a) => a.status === "resolved").length;
  const scopedResolvedCount = scoped.filter((a) => a.status === "resolved").length;
  const viewOptions = React.useMemo<ViewerFilterOption[]>(
    () => [
      { value: "review", label: "Needs review", count: reviewCount, shortcut: "N", icon: Inbox },
      { value: "page", label: "This page", count: pageCount, shortcut: "P", icon: File },
      { value: "all", label: "All pages", count: allCount, shortcut: "A", icon: Files },
      { value: "recordings", label: "Recordings", count: recordingCount, shortcut: "R", icon: Video },
      { value: "library", label: "Library", count: libraryCount, shortcut: "L", icon: Library },
    ],
    [allCount, libraryCount, pageCount, recordingCount, reviewCount],
  );
  const selectedView = viewOptions.find((option) => option.value === filter) ?? viewOptions[0]!;
  const active = expanded ? annotations.find((a) => a.id === expanded) : undefined;
  const activeRecording = expanded ? recordings.find((r) => r.id === expanded) : undefined;
  const searching = normalizeSearch(query).length > 0;
  const baseGroupRows = React.useMemo(
    () =>
      groupsForViewer(visible, groups).filter(
        (row) =>
          !hiddenGroups.has(row.slug) &&
          (!focusedGroup || row.slug === focusedGroup) &&
          // While searching, drop groups with no matching annotations so empty
          // "drop here" shells don't clutter the results.
          (!searching || row.items.length > 0),
      ),
    [focusedGroup, hiddenGroups, searching, visible, groups],
  );
  const groupRows = React.useMemo(() => orderGroupRows(baseGroupRows, previewGroupOrder), [baseGroupRows, previewGroupOrder]);
  const groupVisibilityActive = focusedGroup !== null || hiddenGroups.size > 0;

  // FLIP: slide groups to their new slots when the order changes (during a
  // reorder drag or after a commit) instead of letting them jump.
  const listRef = React.useRef<HTMLDivElement>(null);
  useGroupReorderAnimation(listRef, groupRows.map((row) => row.slug).join("\n"));

  const ctx: ViewerContext = {
    annotations,
    references,
    actions,
    author,
    bridgeUrl,
    repoRoot,
    overlayContainer,
    expanded,
    collapsedGroups,
    dragOverGroup,
    draggingGroupSlug,
    focusedGroup,
    groupOrder: groupRows.map((row) => row.slug),
    showResolved,
    clearGroupVisibility: () => {
      setHiddenGroups(new Set());
      setFocusedGroup(null);
    },
    focusGroup: (slug) => {
      setHiddenGroups(new Set());
      setFocusedGroup(slug);
      if (active && active.groupSlug !== slug) setExpanded(null);
    },
    hideGroup: (slug) => {
      setHiddenGroups((current) => {
        const next = new Set(current);
        next.add(slug);
        return next;
      });
      setFocusedGroup((current) => (current === slug ? null : current));
      if (active?.groupSlug === slug) setExpanded(null);
    },
    setExpanded,
    setFilter,
    setCollapsed: setViewerCollapsed,
    setDragOverGroup,
    startGroupDrag: (slug) => {
      setDraggingGroupSlug(slug);
      setPreviewGroupOrder(baseGroupRows.map((row) => row.slug));
    },
    previewGroupReorder: (dragged, target, placement) => {
      if (dragged === target) return;
      setPreviewGroupOrder((current) => {
        const source = current ?? baseGroupRows.map((row) => row.slug);
        const next = reorderGroupSlugs(source, dragged, target, placement);
        return sameStringArray(source, next) ? current : next;
      });
      setDragOverGroup(target);
    },
    cancelGroupReorder: () => {
      // A drop commit is in progress (dragend fires right after drop); leave the
      // committed preview order in place so the rows don't snap back.
      if (committingGroupOrderRef.current) return;
      setDraggingGroupSlug(null);
      setPreviewGroupOrder(null);
      setDragOverGroup(null);
    },
    toggleGroup: (slug) =>
      setCollapsedGroups((current) => {
        const next = new Set(current);
        if (next.has(slug)) next.delete(slug);
        else next.add(slug);
        return next;
      }),
    setLightbox,
    moveAnnotation: async (id, group) => {
      const r = (await chrome.runtime.sendMessage({ type: "move-annotation", id, group } satisfies LoupeMessage)) as SimpleResult;
      if (r.ok) await reload();
    },
    commitGroupReorder: async (slugs) => {
      setDraggingGroupSlug(null);
      setDragOverGroup(null);
      if (sameStringArray(slugs, baseGroupRows.map((row) => row.slug))) {
        setPreviewGroupOrder(null);
        return;
      }
      committingGroupOrderRef.current = true;
      // Pin the dropped order until `groups` is refreshed to match, so the rows
      // never revert to the stale server order and re-animate. Clearing the
      // preview only after reload keeps the rendered order identical across the
      // handoff, so the FLIP effect sees no change.
      setPreviewGroupOrder(slugs);
      try {
        const r = (await chrome.runtime.sendMessage({ type: "reorder-groups", slugs } satisfies LoupeMessage)) as SimpleResult;
        if (r.ok) await reload();
      } finally {
        setPreviewGroupOrder(null);
        committingGroupOrderRef.current = false;
      }
    },
    reload,
  };

  const panel = (
    <>
      {collapsed ? (
        <div
          ref={collapsedRef}
          data-loupe-panel-drag=""
          className={cn(
            "flex h-12 w-fit items-center gap-1.5 rounded-xl border border-loupe-line bg-loupe-panel px-1.5 text-loupe-fg shadow-2xl shadow-black/50",
            panelEmbedded ? "cursor-grab active:cursor-grabbing" : "fixed right-3 top-3 z-[2147483646]",
          )}
        >
          <button
            type="button"
            data-loupe-panel-no-drag=""
            className="flex items-center gap-1.5 rounded-lg px-1 py-1 transition-colors hover:bg-white/5"
            onClick={() => setViewerCollapsed(false)}
            title="Show annotations"
          >
            <Logo />
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-loupe-accent px-1.5 text-[11px] font-semibold text-loupe-bg">
              {visible.length}
            </span>
          </button>
          <ModeToolbar mode={mode} onModeChange={changeMode} compact />
        </div>
      ) : (
        <section
          className={cn(
            "relative flex flex-col overflow-hidden rounded-2xl border border-loupe-line bg-loupe-panel text-[13px] text-loupe-fg shadow-2xl shadow-black/50",
            panelEmbedded ? "h-full w-full" : "fixed bottom-3 right-3 top-3 z-[2147483646] w-[420px]",
          )}
        >
          {panelEmbedded ? <ResizeHandles /> : null}
          <header
            className="flex min-h-12 shrink-0 cursor-grab items-center gap-2 border-b border-loupe-line px-3 py-2 active:cursor-grabbing"
            data-loupe-panel-drag=""
          >
            <div data-loupe-panel-no-drag="">
              <ViewFilterSelect
                options={viewOptions}
                selected={selectedView}
                value={filter}
                open={viewMenuOpen}
                onOpenChange={setViewMenuOpen}
                onValueChange={(value) => {
                  setFilter(value);
                  setExpanded(null);
                }}
              />
            </div>
            <div className="ml-auto" />
            <Button data-loupe-panel-no-drag="" variant="ghost" size="icon-sm" title="Collapse annotations" onClick={() => setViewerCollapsed(true)}>
              <Minus className="h-4 w-4" />
            </Button>
            <Button data-loupe-panel-no-drag="" variant="ghost" size="icon-sm" title="Close annotations" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </header>

          {filter === "library" ? (
            <div className="flex shrink-0 items-center gap-2 border-b border-loupe-line/70 px-3 py-2.5">
              <span className="text-[11px] text-loupe-muted">Reference captures, grouped by page.</span>
              <span className="ml-auto text-[11px] text-loupe-faint">{references.length}</span>
            </div>
          ) : filter === "recordings" && !activeRecording ? (
            <div className="flex shrink-0 items-center gap-2 border-b border-loupe-line/70 px-3 py-2.5">
              <span className="text-[11px] text-loupe-muted">Flow recordings with console + network logs.</span>
              <span className="ml-auto text-[11px] text-loupe-faint">{recordingCount}</span>
            </div>
          ) : !active && filter !== "recordings" ? (
            <div className="flex shrink-0 items-center gap-2 border-b border-loupe-line/70 px-3 py-2.5">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-loupe-faint" />
                <Input
                  className="h-8 pl-8"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search annotations"
                />
              </div>
              <ListActionsMenu
                visibleCount={visible.length}
                scopedCount={scoped.length}
                showResolved={showResolved}
                onToggleResolved={() => setShowResolved((v) => !v)}
                resolvedCount={allResolvedCount}
                onDeleteResolved={async () => {
                  const r = (await chrome.runtime.sendMessage({ type: "delete-resolved" } satisfies LoupeMessage)) as SimpleResult;
                  if (r.ok) {
                    setExpanded(null);
                    await reload();
                  }
                }}
                groupVisibilityActive={groupVisibilityActive}
                onShowAllGroups={ctx.clearGroupVisibility}
                onAddGroup={() => setAddingGroup(true)}
              />
            </div>
          ) : null}

          <div ref={listRef} className="flex-1 overflow-y-auto py-2">
            {addingGroup && !active && filter !== "recordings" && filter !== "library" ? (
              <AddGroupForm
                onDone={async () => {
                  setAddingGroup(false);
                  await reload();
                }}
                onCancel={() => setAddingGroup(false)}
              />
            ) : null}
            {active && filter !== "recordings" && filter !== "library" ? (
              <AnnotationDetailScreen annotation={active} ctx={ctx} />
            ) : filter === "recordings" ? (
              activeRecording ? (
                <RecordingDetailScreen recording={activeRecording} ctx={ctx} />
              ) : (
                <RecordingsTab recordings={recordings} ctx={ctx} />
              )
            ) : filter === "library" ? (
              <LibraryTab refs={references} ctx={ctx} />
            ) : groupRows.length === 0 ? (
              <div className="px-6 py-12 text-center text-[12px] text-loupe-faint">
                {scopedResolvedCount > 0 && !showResolved
                  ? "Only resolved annotations here"
                  : filter === "review" ? "No annotations need review" : filter === "page" ? "No annotations on this page yet" : "No annotations yet"}
              </div>
            ) : (
              groupRows.map((row) => (
                <AnnotationGroup key={row.slug} group={row.group} slug={row.slug} items={row.items} ctx={ctx} />
              ))
            )}
          </div>

          <BrandFooter />
        </section>
      )}
    </>
  );

  // React is rooted inside the panel iframe, so the panel renders inline and its
  // Radix menus portal within the same document (via PortalContainerProvider).
  // The page-overlay layer (pins + lightbox) has to live in the top document to
  // position over the page, so it portals out to `overlayContainer` (the shadow
  // mount). Falls back to inline rendering when there is no separate container.
  const overlay = (
    <>
      <Pins annotations={annotations} showResolved={showResolved} expanded={expanded} setExpanded={setExpanded} setFilter={setFilter} setCollapsed={setViewerCollapsed} />
      {lightbox ? <Lightbox src={lightbox} onClose={() => setLightbox(null)} /> : null}
    </>
  );

  return (
    <>
      <PortalContainerProvider value={panelRoot}>{panel}</PortalContainerProvider>
      {overlayContainer ? createPortal(overlay, overlayContainer) : overlay}
    </>
  );
}

interface ViewerContext {
  annotations: StoredAnnotation[];
  references: ReferenceItem[];
  actions: ActionDescriptor[];
  author: string;
  bridgeUrl: string;
  repoRoot?: string;
  /** Shadow-root mount that carries the Loupe styles + `.dark`; full-page overlays (lightbox, library picker) portal here to position over the page while staying styled. Null when the viewer renders inline. */
  overlayContainer?: HTMLElement | null;
  expanded: string | null;
  collapsedGroups: Set<string>;
  dragOverGroup: string | null;
  draggingGroupSlug: string | null;
  focusedGroup: string | null;
  groupOrder: string[];
  showResolved: boolean;
  clearGroupVisibility: () => void;
  focusGroup: (slug: string) => void;
  hideGroup: (slug: string) => void;
  setExpanded: (id: string | null) => void;
  setFilter: (filter: ViewerFilter) => void;
  setCollapsed: (collapsed: boolean) => void;
  setDragOverGroup: (slug: string | null) => void;
  startGroupDrag: (slug: string) => void;
  previewGroupReorder: (dragged: string, target: string, placement: GroupDropPlacement) => void;
  cancelGroupReorder: () => void;
  toggleGroup: (slug: string) => void;
  setLightbox: (src: string | null) => void;
  moveAnnotation: (id: string, group: string) => Promise<void>;
  commitGroupReorder: (slugs: string[]) => Promise<void>;
  reload: () => Promise<void>;
}

type GroupDropPlacement = "before" | "after";

interface BridgeFileSource {
  dir: string;
  file: string;
}

function useBridgeFileDataUrl(source: BridgeFileSource | null | undefined): {
  src: string | null;
  failed: boolean;
  loading: boolean;
} {
  const key = source ? `${source.dir}\n${source.file}` : "";
  const [state, setState] = React.useState<{ src: string | null; failed: boolean; loading: boolean }>({
    src: null,
    failed: false,
    loading: false,
  });

  React.useEffect(() => {
    if (!source) {
      setState({ src: null, failed: true, loading: false });
      return;
    }

    let cancelled = false;
    setState({ src: null, failed: false, loading: true });
    void (chrome.runtime.sendMessage({
      type: "file-data-url",
      dir: source.dir,
      file: source.file,
    } satisfies LoupeMessage) as Promise<FileDataResult>)
      .then((result) => {
        if (cancelled) return;
        setState(result.ok ? { src: result.dataUrl, failed: false, loading: false } : { src: null, failed: true, loading: false });
      })
      .catch(() => {
        if (!cancelled) setState({ src: null, failed: true, loading: false });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}

interface ViewerFilterOption {
  value: ViewerFilter;
  label: string;
  count: number;
  shortcut: string;
  icon: LucideIcon;
}

function ViewFilterSelect({
  options,
  selected,
  value,
  open,
  onOpenChange,
  onValueChange,
}: {
  options: ViewerFilterOption[];
  selected: ViewerFilterOption;
  value: ViewerFilter;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onValueChange: (value: ViewerFilter) => void;
}) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Annotation view"
          className="flex h-8 w-[190px] items-center justify-between gap-2 rounded-xl border border-loupe-line bg-loupe-bg/70 px-2.5 text-[12px] text-loupe-fg outline-none transition-colors hover:border-loupe-line-strong"
        >
          <ViewFilterLabel option={selected} />
          <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-70" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[220px]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={cn(option.value === value && "bg-foreground/5 text-foreground")}
            onSelect={() => onValueChange(option.value)}
          >
            <option.icon className="h-4 w-4 shrink-0 text-loupe-muted" />
            <span className="min-w-0 flex-1 truncate">{option.label}</span>
            <span className="grid h-5 min-w-6 place-items-center rounded-md border border-loupe-line bg-white/10 px-1.5 text-[10px] font-semibold leading-none text-loupe-muted">
              {option.count}
            </span>
            <span className="ml-auto w-4 text-right text-[10px] text-loupe-faint">{option.shortcut}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const RESIZE_HANDLES: { dir: string; className: string }[] = [
  { dir: "n", className: "left-3 right-3 top-0 h-1.5 cursor-ns-resize" },
  { dir: "s", className: "left-3 right-3 bottom-0 h-1.5 cursor-ns-resize" },
  { dir: "e", className: "top-3 bottom-3 right-0 w-1.5 cursor-ew-resize" },
  { dir: "w", className: "top-3 bottom-3 left-0 w-1.5 cursor-ew-resize" },
  { dir: "nw", className: "top-0 left-0 h-3 w-3 cursor-nwse-resize" },
  { dir: "ne", className: "top-0 right-0 h-3 w-3 cursor-nesw-resize" },
  { dir: "sw", className: "bottom-0 left-0 h-3 w-3 cursor-nesw-resize" },
  { dir: "se", className: "bottom-0 right-0 h-3 w-3 cursor-nwse-resize" },
];

// Invisible drag targets on the panel edges/corners. The pointer math lives in
// viewer.tsx (LoupeViewer), which resizes the host iframe on pointerdown.
function ResizeHandles() {
  return (
    <>
      {RESIZE_HANDLES.map((handle) => (
        <div
          key={handle.dir}
          data-loupe-panel-no-drag=""
          data-loupe-panel-resize={handle.dir}
          className={cn("absolute z-[2147483647]", handle.className)}
        />
      ))}
    </>
  );
}

function ViewFilterLabel({ option }: { option: ViewerFilterOption }) {
  return (
    <span className="flex min-w-0 flex-1 items-center gap-2">
      <option.icon className="h-4 w-4 shrink-0 opacity-80" />
      <span className="min-w-0 flex-1 truncate">{option.label}</span>
      <span className="grid h-5 min-w-6 place-items-center rounded-md border border-loupe-line bg-white/10 px-1.5 text-[10px] font-semibold leading-none text-loupe-muted">
        {option.count}
      </span>
    </span>
  );
}

function AnnotationGroup({ group, slug, items, ctx }: { group: string; slug: string; items: StoredAnnotation[]; ctx: ViewerContext }) {
  const open = items.filter((a) => a.status !== "resolved").length;
  const collapsed = ctx.collapsedGroups.has(slug);
  const sendable = ctx.actions.filter((a) => a.id !== "save");
  const [renameOpen, setRenameOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [sendingAction, setSendingAction] = React.useState<string | null>(null);
  const [sentAction, setSentAction] = React.useState<string | null>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);

  async function sendGroup(actionId: string) {
    if (!actionId || items.length === 0) return;
    setSendingAction(actionId);
    setSentAction(null);
    const r = (await chrome.runtime.sendMessage({
      type: "group-run",
      slug,
      action: actionId,
    } satisfies LoupeMessage)) as SimpleResult;
    setSendingAction(null);
    if (r.ok) setSentAction(actionId);
  }

  async function resolveAll() {
    if (open === 0) return;
    const r = (await chrome.runtime.sendMessage({ type: "resolve-group", slug } satisfies LoupeMessage)) as SimpleResult;
    if (r.ok) {
      if (ctx.expanded && items.some((a) => a.id === ctx.expanded)) ctx.setExpanded(null);
      await ctx.reload();
    }
  }

  return (
    <div
      className={cn("pb-1 transition-colors", ctx.dragOverGroup === slug && "bg-loupe-accent/5")}
      onDragOver={(e) => {
        if (!hasLoupeDragData(e)) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const groupSlug = ctx.draggingGroupSlug || e.dataTransfer.getData("application/x-loupe-group-slug");
        if (groupSlug) ctx.previewGroupReorder(groupSlug, slug, groupDropPlacement(e));
        else ctx.setDragOverGroup(slug);
      }}
      onDragLeave={(e) => {
        const nextTarget = e.relatedTarget;
        if (!(nextTarget instanceof Node) || !e.currentTarget.contains(nextTarget)) ctx.setDragOverGroup(null);
      }}
      onDrop={(e) => {
        e.preventDefault();
        const annotationId = e.dataTransfer.getData("application/x-loupe-annotation-id");
        const groupSlug = e.dataTransfer.getData("application/x-loupe-group-slug");
        ctx.setDragOverGroup(null);
        if (annotationId) void ctx.moveAnnotation(annotationId, group);
        else if (groupSlug) {
          const slugs = reorderGroupSlugs(ctx.groupOrder, groupSlug, slug, groupDropPlacement(e));
          void ctx.commitGroupReorder(slugs);
        }
      }}
      data-loupe-group-slug={slug}
    >
      <div ref={headerRef} className="group flex items-center gap-2 px-3.5 pb-1.5 pt-3 text-[11px] text-loupe-faint">
        <button
          type="button"
          draggable
          className="grid h-6 w-5 shrink-0 cursor-grab place-items-center rounded-md text-loupe-faint opacity-0 transition-all hover:bg-white/5 hover:text-loupe-muted focus-visible:opacity-100 group-hover:opacity-100 active:cursor-grabbing"
          title="Drag to reorder group"
          onDragStart={(e) => {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("application/x-loupe-group-slug", slug);
            // Drag the whole group header as the preview, not just the grip.
            const headerEl = headerRef.current;
            if (headerEl) {
              const rect = headerEl.getBoundingClientRect();
              e.dataTransfer.setDragImage(headerEl, e.clientX - rect.left, e.clientY - rect.top);
            }
            ctx.startGroupDrag(slug);
          }}
          onDragEnd={() => ctx.cancelGroupReorder()}
        >
          <GripVertical className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg px-1 py-1 text-left transition-colors hover:bg-white/5"
          onClick={() => ctx.toggleGroup(slug)}
        >
          <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 transition-transform", !collapsed && "rotate-90")} />
          <span className="truncate text-[12px] font-medium text-loupe-muted">{group}</span>
          <span className="ml-auto shrink-0">{open}/{items.length}</span>
        </button>
        <GroupActionsMenu
          className="ml-auto"
          actions={sendable}
          disabled={sendingAction !== null}
          itemCount={items.length}
          openCount={open}
          focused={ctx.focusedGroup === slug}
          sentAction={sentAction}
          sendingAction={sendingAction}
          onClearFocus={ctx.clearGroupVisibility}
          onDelete={() => setDeleteOpen(true)}
          onFocus={() => ctx.focusGroup(slug)}
          onHide={() => ctx.hideGroup(slug)}
          onRename={() => setRenameOpen(true)}
          onResolveAll={() => void resolveAll()}
          onSend={(actionId) => void sendGroup(actionId)}
        />
      </div>
      <RenameGroupForm open={renameOpen} onOpenChange={setRenameOpen} slug={slug} group={group} onDone={ctx.reload} />
      <DeleteGroupConfirm
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        slug={slug}
        group={group}
        count={items.length}
        onDone={async () => {
          ctx.clearGroupVisibility();
          ctx.setExpanded(null);
          await ctx.reload();
        }}
      />
      {!collapsed ? (
        <div className="space-y-2 px-2">
          {items.map((a) => <AnnotationRow key={a.id} annotation={a} ctx={ctx} />)}
          {items.length === 0 ? (
            <div className="px-3 py-2 text-[11px] text-loupe-faint">No annotations here yet</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function AddGroupForm({ onDone, onCancel }: { onDone: () => Promise<void>; onCancel: () => void }) {
  const [value, setValue] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  async function addGroup() {
    const group = value.trim();
    if (!group) return;
    setSaving(true);
    const r = (await chrome.runtime.sendMessage({ type: "create-group", group } satisfies LoupeMessage)) as SimpleResult;
    setSaving(false);
    if (r.ok) {
      setValue("");
      await onDone();
    }
  }

  return (
    <div className="mx-2 mb-2">
      <form
        className="rounded-xl border border-loupe-line bg-loupe-bg/50 p-2"
        onSubmit={(e) => {
          e.preventDefault();
          void addGroup();
        }}
      >
        <Input autoFocus value={value} onChange={(e) => setValue(e.target.value)} placeholder="Group name" onKeyDown={(e) => e.key === "Escape" && onCancel()} />
        <div className="mt-2 flex items-center justify-end gap-1.5">
          <Button type="button" variant="outline" size="xs" onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="default" size="xs" loading={saving} disabled={!value.trim()}>
            OK
          </Button>
        </div>
      </form>
    </div>
  );
}

function RenameGroupForm({
  group,
  onDone,
  onOpenChange,
  open,
  slug,
}: {
  group: string;
  onDone: () => Promise<void>;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  slug: string;
}) {
  const [value, setValue] = React.useState(group);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (open) setValue(group);
  }, [group, open]);

  async function rename() {
    const next = value.trim();
    if (!next || next === group) {
      onOpenChange(false);
      return;
    }
    setSaving(true);
    const r = (await chrome.runtime.sendMessage({
      type: "rename-group",
      slug,
      group: next,
    } satisfies LoupeMessage)) as SimpleResult;
    setSaving(false);
    if (r.ok) {
      onOpenChange(false);
      await onDone();
    }
  }

  if (!open) return null;

  return (
    <form
      className="mx-2 mb-1 rounded-xl border border-loupe-line bg-loupe-bg/50 p-2"
      onSubmit={(e) => {
        e.preventDefault();
        void rename();
      }}
    >
      <Input autoFocus value={value} onChange={(e) => setValue(e.target.value)} placeholder="Group name" />
      <div className="mt-2 flex items-center justify-end gap-1.5">
        <Button type="button" variant="outline" size="xs" onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button type="submit" variant="default" size="xs" loading={saving} disabled={!value.trim()}>
          Save
        </Button>
      </div>
    </form>
  );
}

function DeleteGroupConfirm({
  count,
  group,
  onDone,
  onOpenChange,
  open,
  slug,
}: {
  count: number;
  group: string;
  onDone: () => Promise<void>;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  slug: string;
}) {
  const [deleting, setDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) setError(null);
  }, [open]);

  async function deleteGroup() {
    if (deleting) return;
    setError(null);
    setDeleting(true);
    try {
      const r = (await chrome.runtime.sendMessage({
        type: "delete-group",
        slug,
      } satisfies LoupeMessage)) as SimpleResult;
      if (!r.ok) {
        setError(r.error || "Could not delete this group.");
        return;
      }
      onOpenChange(false);
      await onDone();
    } catch (e) {
      setError(String(e));
    } finally {
      setDeleting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="mx-2 mb-1 rounded-xl border border-white/15 bg-white/5 p-2 text-[12px] text-loupe-muted">
      <div>
        {count > 0
          ? `Delete "${group}" and its ${count} annotation${count === 1 ? "" : "s"}?`
          : `Delete the empty "${group}" group?`}
      </div>
      {error ? <div className="mt-2 rounded-lg border border-red-400/25 bg-red-500/10 px-2 py-1.5 text-red-100">{error}</div> : null}
      <div className="mt-2 flex items-center justify-end gap-1.5">
        <Button type="button" variant="outline" size="xs" onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button type="button" variant="destructive" size="xs" loading={deleting} onClick={() => void deleteGroup()}>
          Delete
        </Button>
      </div>
    </div>
  );
}

function GroupActionsMenu({
  actions,
  className,
  disabled,
  focused,
  itemCount,
  openCount,
  sentAction,
  sendingAction,
  onClearFocus,
  onDelete,
  onFocus,
  onHide,
  onRename,
  onResolveAll,
  onSend,
}: {
  actions: ActionDescriptor[];
  className?: string;
  disabled?: boolean;
  focused: boolean;
  itemCount: number;
  openCount: number;
  sentAction: string | null;
  sendingAction: string | null;
  onClearFocus: () => void;
  onDelete: () => void;
  onFocus: () => void;
  onHide: () => void;
  onRename: () => void;
  onResolveAll: () => void;
  onSend: (action: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className={cn(
            "opacity-70 transition-all hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100",
            open && "opacity-100",
            className,
          )}
          title="More group actions"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <MenuItem onSelect={onHide} icon={<EyeOff className="h-3.5 w-3.5" />}>
          Hide on this page
        </MenuItem>
        <MenuItem onSelect={focused ? onClearFocus : onFocus} icon={<Eye className="h-3.5 w-3.5" />}>
          {focused ? "Show all groups" : "Focus this group"}
        </MenuItem>
        <DropdownMenuSeparator />
        <MenuItem disabled={openCount === 0} onSelect={onResolveAll} icon={<CircleCheck className="h-3.5 w-3.5" />}>
          {openCount > 0 ? `Resolve all (${openCount})` : "Resolve all"}
        </MenuItem>
        <MenuItem onSelect={onRename} icon={<Pencil className="h-3.5 w-3.5" />}>
          Rename
        </MenuItem>
        <MenuItem onSelect={onDelete} icon={<Trash2 className="h-3.5 w-3.5" />} tone="danger">
          Delete
        </MenuItem>
        {actions.length > 0 ? <DropdownMenuSeparator /> : null}
        {actions.map((a) => {
          const sending = sendingAction === a.id;
          const sent = sentAction === a.id;
          return (
            <MenuItem
              key={a.id}
              disabled={disabled || itemCount === 0}
              icon={sending ? <Spinner className="h-3.5 w-3.5" /> : <ProviderIcon action={a} colored />}
              onSelect={() => onSend(a.id)}
            >
              {sending ? `Sending to ${displayActionLabel(a)}` : sent ? `Sent to ${displayActionLabel(a)}` : `Send to ${displayActionLabel(a)}`}
            </MenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ListActionsMenu({
  visibleCount,
  scopedCount,
  showResolved,
  onToggleResolved,
  resolvedCount,
  onDeleteResolved,
  groupVisibilityActive,
  onShowAllGroups,
  onAddGroup,
}: {
  visibleCount: number;
  scopedCount: number;
  showResolved: boolean;
  onToggleResolved: () => void;
  resolvedCount: number;
  onDeleteResolved: () => void | Promise<void>;
  groupVisibilityActive: boolean;
  onShowAllGroups: () => void;
  onAddGroup: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="icon-sm" title="More options">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <div className="px-2 py-1.5 text-[11px] text-loupe-faint">{visibleCount} of {scopedCount} shown</div>
        <DropdownMenuSeparator />
        <MenuItem onSelect={onAddGroup} icon={<Plus className="h-3.5 w-3.5" />}>
          Add group
        </MenuItem>
        <DropdownMenuSeparator />
        <MenuItem onSelect={onToggleResolved} icon={showResolved ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}>
          {showResolved ? "Hide resolved" : "Show resolved"}
        </MenuItem>
        {groupVisibilityActive ? (
          <MenuItem onSelect={onShowAllGroups} icon={<Eye className="h-3.5 w-3.5" />}>
            Show all groups
          </MenuItem>
        ) : null}
        {resolvedCount > 0 ? (
          <>
            <DropdownMenuSeparator />
            <MenuItem onSelect={() => void onDeleteResolved()} icon={<Trash2 className="h-3.5 w-3.5" />} tone="danger">
              Delete resolved ({resolvedCount})
            </MenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MenuItem({
  children,
  disabled,
  icon,
  onSelect,
  tone = "normal",
}: {
  children: React.ReactNode;
  disabled?: boolean;
  icon: React.ReactNode;
  onSelect: () => void;
  tone?: "normal" | "danger";
}) {
  return (
    <DropdownMenuItem
      disabled={disabled}
      variant={tone === "danger" ? "destructive" : "default"}
      onSelect={() => onSelect()}
    >
      <span className="grid h-4 w-4 shrink-0 place-items-center">{icon}</span>
      <span className="min-w-0 truncate">{children}</span>
    </DropdownMenuItem>
  );
}

function ProviderIcon({ action, colored = false }: { action: ActionDescriptor | undefined; colored?: boolean }) {
  const svg = providerLogoSvg(action);
  if (svg) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-[15px] w-[15px] shrink-0 items-center justify-center [&>svg]:block [&>svg]:h-[15px] [&>svg]:w-[15px]",
          colored && providerColorClass(action),
        )}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }
  return <ArrowUp className="h-3.5 w-3.5 shrink-0" />;
}

function providerLogoSvg(action: ActionDescriptor | undefined): string | null {
  const label = `${action?.id ?? ""} ${action?.label ?? ""}`.toLowerCase();
  if (label.includes("claude")) return CLAUDE_LOGO_SVG;
  if (label.includes("codex") || label.includes("openai")) return OPENAI_LOGO_SVG;
  if (label.includes("copilot")) return COPILOT_LOGO_SVG;
  if (isPi(action)) return PI_LOGO_SVG;
  return null;
}

function providerColorClass(action: ActionDescriptor | undefined): string {
  const label = `${action?.id ?? ""} ${action?.label ?? ""}`.toLowerCase();
  if (label.includes("claude")) return "text-[#d97757]";
  if (label.includes("codex") || label.includes("openai")) return "text-loupe-fg";
  if (label.includes("copilot") || isPi(action)) return "text-loupe-fg";
  return "text-loupe-muted";
}

/** Match the Pi provider without colliding with unrelated ids containing "pi". */
function isPi(action: ActionDescriptor | undefined): boolean {
  return action?.id === "pi" || action?.label?.toLowerCase() === "pi";
}

/** Failure-aware preview image for a card: a large 16:9 thumbnail that opens the
 * lightbox on click. Shared by annotations and library references so both read
 * as the same kind of thing. */
function CardMedia({ source, title, onOpen }: { source: BridgeFileSource; title?: string; onOpen: (src: string) => void }) {
  const { src, failed, loading } = useBridgeFileDataUrl(source);
  if (failed) {
    return (
      <div className="grid aspect-video w-full place-items-center border-b border-loupe-line bg-loupe-bg/60 px-4 text-center text-[11px] text-loupe-faint">
        Image could not be loaded
      </div>
    );
  }
  return (
    <button
      type="button"
      className="relative block aspect-video w-full overflow-hidden border-b border-loupe-line bg-black/40 transition-opacity hover:opacity-95"
      onClick={() => {
        if (src) onOpen(src);
      }}
      title={title ?? "Open image"}
    >
      {/* Blurred cover fills the frame; the contained copy on top keeps the whole
          capture visible regardless of its aspect ratio. */}
      {src ? (
        <>
          <img src={src} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl" />
          <img src={src} alt="" className="absolute inset-0 h-full w-full object-contain" />
        </>
      ) : (
        <span className="absolute inset-0 grid place-items-center text-loupe-faint">{loading ? <Spinner className="h-4 w-4" /> : null}</span>
      )}
    </button>
  );
}

/** The unified card used across the annotation list and the library. Large
 * preview image on top, a title/note body, and an Open + More footer. Every list
 * (annotations, references) renders through this so the views match. */
function ItemCard({
  imageSource,
  imageTitle,
  onImageOpen,
  title,
  note,
  badges,
  onBodyClick,
  bodyTitle,
  openLabel = "Open",
  openTitle,
  onOpen,
  more,
  active = false,
  draggable = false,
  onDragStart,
  onDragEnd,
  onContextMenu,
}: {
  imageSource: BridgeFileSource;
  imageTitle?: string;
  onImageOpen: (src: string) => void;
  title: string;
  note?: string;
  badges?: React.ReactNode;
  onBodyClick?: () => void;
  bodyTitle?: string;
  openLabel?: string;
  openTitle?: string;
  onOpen?: () => void;
  more?: React.ReactNode;
  active?: boolean;
  draggable?: boolean;
  onDragStart?: React.DragEventHandler<HTMLElement>;
  onDragEnd?: React.DragEventHandler<HTMLElement>;
  onContextMenu?: React.MouseEventHandler<HTMLElement>;
}) {
  const body = (
    <>
      <div className="truncate text-[12.5px] font-medium text-loupe-fg">{title}</div>
      {note ? <div className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-loupe-muted">{note}</div> : null}
    </>
  );
  return (
    <article
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onContextMenu={onContextMenu}
      className={cn(
        "overflow-hidden rounded-xl border bg-transparent transition-colors",
        active ? "border-loupe-line bg-white/[0.04]" : "border-loupe-line/60 hover:bg-white/[0.04]",
      )}
    >
      <CardMedia source={imageSource} title={imageTitle} onOpen={onImageOpen} />
      <div className="space-y-2 p-2.5">
        {onBodyClick ? (
          <button type="button" className="block w-full min-w-0 rounded-md text-left" onClick={onBodyClick} title={bodyTitle}>
            {body}
          </button>
        ) : (
          <div className="min-w-0">{body}</div>
        )}
        {badges ? <div className="flex flex-wrap items-center gap-1.5">{badges}</div> : null}
        <div className="flex items-center gap-1.5">
          {onOpen ? (
            <Button variant="outline" size="xs" title={openTitle} onClick={onOpen}>
              <ExternalLink className="h-3.5 w-3.5" />
              {openLabel}
            </Button>
          ) : null}
          {more ? <div className="ml-auto">{more}</div> : null}
        </div>
      </div>
    </article>
  );
}

function useAnnotationActions(annotation: StoredAnnotation, ctx: ViewerContext) {
  const [busy, setBusy] = React.useState(false);

  async function send(actionId: string) {
    if (busy) return;
    setBusy(true);
    await chrome.runtime.sendMessage({ type: "annotation-run", id: annotation.id, action: actionId } satisfies LoupeMessage);
    setBusy(false);
  }

  async function setStatus(status: AnnotationStatus) {
    const r = (await chrome.runtime.sendMessage({ type: "update-annotation", id: annotation.id, patch: { status } } satisfies LoupeMessage)) as SimpleResult;
    if (r.ok) await ctx.reload();
  }

  async function remove() {
    const r = (await chrome.runtime.sendMessage({ type: "delete-annotation", id: annotation.id } satisfies LoupeMessage)) as SimpleResult;
    if (r.ok) {
      if (ctx.expanded === annotation.id) ctx.setExpanded(null);
      await ctx.reload();
    }
  }

  return { busy, send, setStatus, remove };
}

/** The full set of per-annotation menu entries, shared by the card's More button
 * and the right-click context menu. */
function AnnotationMenuItems({ annotation, ctx }: { annotation: StoredAnnotation; ctx: ViewerContext }) {
  const sendable = ctx.actions.filter((a) => a.id !== "save");
  const { busy, send, setStatus, remove } = useAnnotationActions(annotation, ctx);
  const otherPage = pageKey(annotation.url) !== pageKey(location.href);

  return (
    <>
      <MenuItem onSelect={() => jumpToAnnotation(annotation, ctx)} icon={<ExternalLink className="h-3.5 w-3.5" />}>
        {otherPage ? "Open annotation page" : "Jump to annotation"}
      </MenuItem>
      <MenuItem onSelect={() => ctx.setExpanded(annotation.id)} icon={<Pencil className="h-3.5 w-3.5" />}>
        Edit details
      </MenuItem>
      <MenuItem
        onSelect={() => void setStatus(annotation.status === "resolved" ? "open" : "resolved")}
        icon={<CircleCheck className="h-3.5 w-3.5" />}
      >
        {annotation.status === "resolved" ? "Reopen" : "Resolve"}
      </MenuItem>
      <MenuItem onSelect={() => void remove()} icon={<Trash2 className="h-3.5 w-3.5" />} tone="danger">
        Delete
      </MenuItem>
      {sendable.length > 0 ? <DropdownMenuSeparator /> : null}
      {sendable.map((a) => (
        <MenuItem key={a.id} disabled={busy} onSelect={() => void send(a.id)} icon={<ProviderIcon action={a} colored />}>
          Send to {displayActionLabel(a)}
        </MenuItem>
      ))}
    </>
  );
}

/** The card's "More" button — a dropdown fronting the shared annotation actions. */
function AnnotationMoreButton({ annotation, ctx }: { annotation: StoredAnnotation; ctx: ViewerContext }) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size="icon-sm" title="More actions" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <AnnotationMenuItems annotation={annotation} ctx={ctx} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** The card's "More" button for a library reference. */
function ReferenceMoreButton({ refItem, deleting, onDelete }: { refItem: ReferenceItem; deleting: boolean; onDelete: () => void }) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size="icon-sm" title="More actions" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {refItem.url ? (
          <MenuItem onSelect={() => window.open(refItem.url, "_blank", "noopener,noreferrer")} icon={<ExternalLink className="h-3.5 w-3.5" />}>
            Open source page
          </MenuItem>
        ) : null}
        <MenuItem disabled={deleting} onSelect={onDelete} icon={<Trash2 className="h-3.5 w-3.5" />} tone="danger">
          Delete
        </MenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AnnotationRow({ annotation, ctx }: { annotation: StoredAnnotation; ctx: ViewerContext }) {
  const isExpanded = ctx.expanded === annotation.id;
  const otherPage = pageKey(annotation.url) !== pageKey(location.href);
  const [menuAnchor, setMenuAnchor] = React.useState<{ x: number; y: number } | null>(null);

  return (
    <>
      {menuAnchor ? (
        <AnnotationRowMenu annotation={annotation} ctx={ctx} anchor={menuAnchor} onClose={() => setMenuAnchor(null)} />
      ) : null}
      <ItemCard
        active={isExpanded}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("application/x-loupe-annotation-id", annotation.id);
        }}
        onDragEnd={() => ctx.setDragOverGroup(null)}
        onContextMenu={(e) => {
          e.preventDefault();
          setMenuAnchor({ x: e.clientX, y: e.clientY });
        }}
        imageSource={{ dir: annotation.dir, file: "shot.png" }}
        imageTitle="Open annotation image"
        onImageOpen={(src) => ctx.setLightbox(src)}
        title={annotationHeadline(annotation)}
        note={annotation.note || undefined}
        bodyTitle="Edit details"
        onBodyClick={() => ctx.setExpanded(annotation.id)}
        badges={
          <>
            <StatusBadge status={annotation.status} />
            {otherPage ? <Badge variant="outline">{hostLabel(annotation.url)}</Badge> : null}
          </>
        }
        openLabel={otherPage ? "Open page" : "Jump"}
        openTitle={otherPage ? "Open annotation page" : "Jump to annotation"}
        onOpen={() => jumpToAnnotation(annotation, ctx)}
        more={<AnnotationMoreButton annotation={annotation} ctx={ctx} />}
      />
    </>
  );
}

/** Right-click menu for an annotation row: same send / resolve / delete actions
 * as the detail view, reachable straight from the overview. Anchored to the
 * cursor via a zero-size virtual trigger so Radix handles positioning. */
function AnnotationRowMenu({
  annotation,
  ctx,
  anchor,
  onClose,
}: {
  annotation: StoredAnnotation;
  ctx: ViewerContext;
  anchor: { x: number; y: number };
  onClose: () => void;
}) {
  return (
    <DropdownMenu open onOpenChange={(next) => { if (!next) onClose(); }}>
      <DropdownMenuTrigger asChild>
        <span aria-hidden className="pointer-events-none fixed" style={{ left: anchor.x, top: anchor.y, width: 0, height: 0 }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={2} className="w-52">
        <AnnotationMenuItems annotation={annotation} ctx={ctx} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AnnotationDetailScreen({ annotation, ctx }: { annotation: StoredAnnotation; ctx: ViewerContext }) {
  const [sendingAction, setSendingAction] = React.useState<string | null>(null);
  const [sentAction, setSentAction] = React.useState<string | null>(null);
  const sendable = ctx.actions.filter((a) => a.id !== "save");

  async function sendAnnotation(actionId: string) {
    if (!actionId) return;
    setSendingAction(actionId);
    setSentAction(null);
    const r = (await chrome.runtime.sendMessage({
      type: "annotation-run",
      id: annotation.id,
      action: actionId,
    } satisfies LoupeMessage)) as SimpleResult;
    setSendingAction(null);
    if (r.ok) setSentAction(actionId);
  }

  return (
    <div className="px-2 pb-2">
      <div className="sticky top-0 z-10 -mx-2 -mt-2 mb-2 flex items-center gap-2 border-b border-loupe-line/70 bg-loupe-panel px-3 pb-2 pt-2">
        <Button variant="ghost" size="icon-sm" title="Back to annotations" onClick={() => ctx.setExpanded(null)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12.5px] font-medium text-loupe-fg">{annotationHeadline(annotation)}</div>
          <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
            <StatusBadge status={annotation.status} />
            <Badge variant="outline">{annotation.group || "Inbox"}</Badge>
          </div>
        </div>
        <AnnotationActionsMenu
          actions={sendable}
          disabled={sendingAction !== null}
          sentAction={sentAction}
          sendingAction={sendingAction}
          onSend={(actionId) => void sendAnnotation(actionId)}
        />
      </div>
      <AnnotationHeroImage source={{ dir: annotation.dir, file: "shot.png" }} onOpen={(src) => ctx.setLightbox(src)} />
      <AnnotationDetail annotation={annotation} ctx={ctx} />
    </div>
  );
}

function AnnotationHeroImage({ source, onOpen }: { source: BridgeFileSource; onOpen: (src: string) => void }) {
  const { src, failed, loading } = useBridgeFileDataUrl(source);
  return (
    <div className="mb-2 overflow-hidden rounded-xl border border-loupe-line bg-loupe-bg">
      {failed ? (
        <div className="grid min-h-28 place-items-center px-4 py-8 text-center text-[12px] text-loupe-faint">
          Annotation image could not be loaded
        </div>
      ) : (
        <button
          type="button"
          className="block w-full text-left transition-colors hover:bg-white/[0.03]"
          onClick={() => {
            if (src) onOpen(src);
          }}
          title="Open annotation image"
        >
          {src ? (
            <img src={src} alt="Annotation screenshot" className="max-h-72 w-full bg-loupe-bg object-contain" />
          ) : (
            <span className="grid min-h-28 place-items-center text-loupe-faint">{loading ? <Spinner className="h-4 w-4" /> : null}</span>
          )}
        </button>
      )}
    </div>
  );
}

function BridgeThumbnailButton({
  source,
  title,
  className,
  imageClassName = "h-full w-full object-contain",
  blurredBackdrop = false,
  onOpen,
}: {
  source: BridgeFileSource;
  title?: string;
  className: string;
  imageClassName?: string;
  blurredBackdrop?: boolean;
  onOpen: (src: string) => void;
}) {
  const { src, failed, loading } = useBridgeFileDataUrl(source);
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (src) onOpen(src);
      }}
      title={title}
    >
      {src ? (
        <>
          {blurredBackdrop ? <img src={src} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover blur-lg" /> : null}
          <img src={src} alt="" className={imageClassName} />
        </>
      ) : failed ? (
        <span className="absolute inset-0 grid place-items-center px-2 text-center text-[10px] text-loupe-faint">Image unavailable</span>
      ) : (
        <span className="absolute inset-0 grid place-items-center text-loupe-faint">{loading ? <Spinner className="h-3.5 w-3.5" /> : null}</span>
      )}
    </button>
  );
}

function AnnotationActionsMenu({
  actions,
  disabled,
  sentAction,
  sendingAction,
  onSend,
}: {
  actions: ActionDescriptor[];
  disabled?: boolean;
  sentAction: string | null;
  sendingAction: string | null;
  onSend: (action: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          title="Send annotation"
          disabled={actions.length === 0}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {actions.map((a) => {
          const sending = sendingAction === a.id;
          const sent = sentAction === a.id;
          return (
            <MenuItem
              key={a.id}
              disabled={disabled}
              icon={sending ? <Spinner className="h-3.5 w-3.5" /> : <ProviderIcon action={a} colored />}
              onSelect={() => onSend(a.id)}
            >
              {sending ? `Sending to ${displayActionLabel(a)}` : sent ? `Sent to ${displayActionLabel(a)}` : `Send to ${displayActionLabel(a)}`}
            </MenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AnnotationDetail({ annotation, ctx }: { annotation: StoredAnnotation; ctx: ViewerContext }) {
  const [note, setNote] = React.useState(annotation.note ?? "");
  const [label, setLabel] = React.useState(annotation.label ?? "");
  const [saving, setSaving] = React.useState(false);
  const [refNotice, setRefNotice] = React.useState<{ tone: "ok" | "error" | "muted"; text: string } | null>(null);
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const meta = annotation as StoredAnnotation & { resolution?: { primary?: string } };

  const savedNote = annotation.note ?? "";
  const savedLabel = annotation.label ?? "";
  const dirty = note !== savedNote;
  const labelDirty = label !== savedLabel;

  async function save() {
    setSaving(true);
    const r = (await chrome.runtime.sendMessage({
      type: "update-annotation",
      id: annotation.id,
      patch: { note },
    } satisfies LoupeMessage)) as SimpleResult;
    setSaving(false);
    if (r.ok) await ctx.reload();
  }

  async function saveLabel() {
    setSaving(true);
    const r = (await chrome.runtime.sendMessage({
      type: "update-annotation",
      id: annotation.id,
      patch: { label },
    } satisfies LoupeMessage)) as SimpleResult;
    setSaving(false);
    if (r.ok) await ctx.reload();
  }

  // Auto-save the note on a short debounce so there's no explicit Save button.
  React.useEffect(() => {
    if (!dirty) return;
    const timer = setTimeout(() => void save(), 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note, dirty]);

  React.useEffect(() => {
    if (!labelDirty) return;
    const timer = setTimeout(() => void saveLabel(), 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label, labelDirty]);

  async function setStatus(status: AnnotationStatus) {
    const r = (await chrome.runtime.sendMessage({
      type: "update-annotation",
      id: annotation.id,
      patch: { status },
    } satisfies LoupeMessage)) as SimpleResult;
    if (r.ok) await ctx.reload();
  }

  async function addReference(dataUrl: string, caption: string) {
    setRefNotice({ tone: "muted", text: "Attaching reference..." });
    const r = (await chrome.runtime.sendMessage({
      type: "add-reference",
      id: annotation.id,
      reference: { caption, dataUrl },
    } satisfies LoupeMessage)) as SimpleResult;
    if (!r.ok) {
      const message = r.error || "couldn't attach reference";
      setRefNotice({ tone: "error", text: message });
      throw new Error(message);
    }
    await ctx.reload();
    setRefNotice({ tone: "ok", text: "Reference attached" });
  }

  const thumbs = (annotation.references ?? []).map((r) => r.file).filter((f): f is string => Boolean(f));

  return (
    <div className="border-t border-loupe-line px-2 pb-2 pt-2">
      {thumbs.length > 0 ? (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {thumbs.map((file) => (
            <BridgeThumbnailButton
              key={file}
              source={{ dir: annotation.dir, file }}
              className="relative h-16 w-24 overflow-hidden rounded-lg border border-loupe-line bg-loupe-bg"
              blurredBackdrop
              onOpen={(src) => ctx.setLightbox(src)}
            />
          ))}
        </div>
      ) : null}
      {meta.resolution?.primary ? <div className="mb-2 break-all font-mono text-[11px] text-loupe-faint">{meta.resolution.primary}</div> : null}
      <Input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder={componentCrumb(annotation)}
        className="mb-1.5 font-medium"
      />
      <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Annotation note..." />
      <div className="mt-1 h-3.5 text-right text-[10.5px] text-loupe-faint">
        {saving ? "Saving…" : dirty ? "Editing…" : null}
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
          const picked = e.currentTarget.files?.[0];
          if (!picked) return;
          try {
            await addReference(await fileToDataUrl(picked), picked.name);
            e.currentTarget.value = "";
          } catch {
            // addReference already surfaced the error inline.
          }
        }} />
        <Button variant="outline" size="xs" onClick={() => fileRef.current?.click()}><ImagePlus className="h-3.5 w-3.5" />Add ref</Button>
        <LibraryReferencePicker
          container={ctx.overlayContainer}
          refs={ctx.references}
          onAttach={async (ref) => {
            const image = (await chrome.runtime.sendMessage({ type: "reference-image", id: ref.id } satisfies LoupeMessage)) as ReferenceImageResult;
            if (!image.ok) throw new Error(image.error);
            await addReference(image.dataUrl, ref.note || ref.title || "library reference");
          }}
        />
      </div>
      {refNotice ? (
        <div
          className={cn(
            "mt-1.5 rounded-md border px-2 py-1 text-[11px]",
            refNotice.tone === "ok" && "border-loupe-accent/25 bg-loupe-accent/10 text-loupe-muted",
            refNotice.tone === "error" && "border-white/25 bg-white/10 text-loupe-fg",
            refNotice.tone === "muted" && "border-loupe-line bg-loupe-bg/60 text-loupe-faint",
          )}
        >
          {refNotice.text}
        </div>
      ) : null}
      <div className="mt-2 flex flex-col gap-1.5">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            if (annotation.status === "resolved") {
              void setStatus("open");
            } else {
              // Resolving is the end of working an annotation — drop back to the
              // list rather than leaving the reviewer stranded on the detail view.
              void setStatus("resolved").then(() => ctx.setExpanded(null));
            }
          }}
        >
          {annotation.status === "resolved" ? "Reopen" : <><CircleCheck className="h-4 w-4" />Resolve</>}
        </Button>
        <DeleteAnnotationButton
          full
          annotation={annotation}
          onDone={async () => {
            ctx.setExpanded(null);
            await ctx.reload();
          }}
        />
      </div>
    </div>
  );
}

interface RecordingMeta {
  startedAt?: string;
  durationMs?: number;
  video?: string | null;
  counts?: { console?: number; network?: number; errors?: number; failedRequests?: number; events?: number; keyframes?: number };
  keyframes?: { t?: number; label?: string; file?: string }[];
  files?: { console?: string; network?: string; errors?: string; events?: string; keyframes?: string[] };
}

function recordingMetaOf(a: StoredAnnotation): RecordingMeta {
  return (a as StoredAnnotation & { recording?: RecordingMeta }).recording ?? {};
}

function RecordingsTab({ recordings, ctx }: { recordings: StoredAnnotation[]; ctx: ViewerContext }) {
  const visible = ctx.showResolved ? recordings : recordings.filter((r) => r.status !== "resolved");
  if (recordings.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-[12px] text-loupe-faint">
        No flow recordings yet — press <span className="font-semibold text-loupe-muted">R</span> while capturing to record one.
      </div>
    );
  }
  if (visible.length === 0) {
    return <div className="px-6 py-12 text-center text-[12px] text-loupe-faint">Only resolved recordings here</div>;
  }
  return (
    <div className="space-y-2 px-2">
      {visible.map((rec) => (
        <RecordingCard key={rec.id} recording={rec} ctx={ctx} />
      ))}
    </div>
  );
}

function RecordingCard({ recording, ctx }: { recording: StoredAnnotation; ctx: ViewerContext }) {
  const meta = recordingMetaOf(recording);
  const counts = meta.counts ?? {};
  const failed = counts.failedRequests ?? 0;
  const errors = counts.errors ?? 0;
  const videoSrc = fileUrl(ctx.bridgeUrl, recording.dir, meta.video || "recording.webm", { pageUrl: location.href, repoRoot: ctx.repoRoot });
  const keyframes = recordingKeyframes(meta);

  return (
    <article className="overflow-hidden rounded-xl border border-transparent bg-transparent transition-colors hover:bg-white/[0.04]">
      <RecordingPreview
        videoSrc={videoSrc}
        hasVideo={Boolean(meta.video)}
        keyframes={keyframes}
        recordingDir={recording.dir}
        ctx={ctx}
      />
      <button type="button" className="flex w-full items-start gap-2 p-2 text-left" onClick={() => ctx.setExpanded(recording.id)}>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12.5px] font-medium text-loupe-fg">{recording.title || hostLabel(recording.url)}</div>
          {recording.note ? <div className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-loupe-muted">{recording.note}</div> : null}
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <StatusBadge status={recording.status} />
            {meta.durationMs ? <Badge variant="outline">{formatClock(meta.durationMs)}</Badge> : null}
            <Badge variant="outline">{counts.console ?? 0} console</Badge>
            <Badge variant="outline">{counts.network ?? 0} net</Badge>
            {errors + failed > 0 ? <Badge variant="outline" className="text-amber-300">{errors + failed} error{errors + failed === 1 ? "" : "s"}</Badge> : null}
          </div>
        </div>
        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-loupe-faint" />
      </button>
    </article>
  );
}

function RecordingDetailScreen({ recording, ctx }: { recording: StoredAnnotation; ctx: ViewerContext }) {
  const meta = recordingMetaOf(recording);
  const files = meta.files ?? {};
  const videoSrc = fileUrl(ctx.bridgeUrl, recording.dir, meta.video || "recording.webm", { pageUrl: location.href, repoRoot: ctx.repoRoot });
  const keyframes = recordingKeyframes(meta);
  const [selectedRequest, setSelectedRequest] = React.useState<number | null>(null);

  const [sendingAction, setSendingAction] = React.useState<string | null>(null);
  const [sentAction, setSentAction] = React.useState<string | null>(null);
  const sendable = ctx.actions.filter((a) => a.id !== "save");

  const network = useRecordingFile(recording.dir, files.network ?? "network.jsonl");
  const consoleLog = useRecordingFile(recording.dir, files.console ?? "console.log");
  const errorLog = useRecordingFile(recording.dir, files.errors ?? "errors.jsonl");

  const requests = React.useMemo(() => parseJsonl<NetworkEntry>(network.text), [network.text]);
  const consoleEntries = React.useMemo(() => parseConsoleLog(consoleLog.text), [consoleLog.text]);
  const errorEntries = React.useMemo(() => parseJsonl<PageErrorEntry>(errorLog.text), [errorLog.text]);

  async function sendRecording(actionId: string) {
    if (!actionId) return;
    setSendingAction(actionId);
    setSentAction(null);
    const r = (await chrome.runtime.sendMessage({ type: "annotation-run", id: recording.id, action: actionId } satisfies LoupeMessage)) as SimpleResult;
    setSendingAction(null);
    if (r.ok) setSentAction(actionId);
  }

  const activeRequest = selectedRequest !== null ? requests[selectedRequest] : undefined;

  return (
    <div className="px-2 pb-2">
      <div className="sticky top-0 z-10 -mx-2 -mt-2 mb-2 flex items-center gap-2 border-b border-loupe-line/70 bg-loupe-panel px-3 pb-2 pt-2">
        <Button
          variant="ghost"
          size="icon-sm"
          title={activeRequest ? "Back to recording" : "Back to recordings"}
          onClick={() => (activeRequest ? setSelectedRequest(null) : ctx.setExpanded(null))}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12.5px] font-medium text-loupe-fg">
            {activeRequest ? `${activeRequest.method} ${hostLabel(activeRequest.url)}` : recording.title || hostLabel(recording.url)}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
            <StatusBadge status={recording.status} />
            {meta.durationMs ? <Badge variant="outline">{formatClock(meta.durationMs)}</Badge> : null}
          </div>
        </div>
        {!activeRequest ? (
          <AnnotationActionsMenu
            actions={sendable}
            disabled={sendingAction !== null}
            sentAction={sentAction}
            sendingAction={sendingAction}
            onSend={(actionId) => void sendRecording(actionId)}
          />
        ) : null}
      </div>

      {activeRequest ? (
        <NetworkRequestDetail request={activeRequest} />
      ) : (
        <>
          <div className="mb-2 overflow-hidden rounded-xl border border-loupe-line bg-loupe-bg">
            <RecordingPreview videoSrc={videoSrc} hasVideo={Boolean(meta.video)} keyframes={keyframes} recordingDir={recording.dir} ctx={ctx} />
          </div>
          <div className="mb-2 break-all font-mono text-[11px] text-loupe-faint">{recording.url}</div>
          <RecordingNoteEditor recording={recording} ctx={ctx} />
          <RecordingTelemetry
            requests={requests}
            requestsState={network}
            consoleEntries={consoleEntries}
            consoleState={consoleLog}
            errorEntries={errorEntries}
            errorState={errorLog}
            onOpenRequest={(index) => setSelectedRequest(index)}
          />
        </>
      )}
    </div>
  );
}

function RecordingNoteEditor({ recording, ctx }: { recording: StoredAnnotation; ctx: ViewerContext }) {
  const [note, setNote] = React.useState(recording.note ?? "");
  const [saving, setSaving] = React.useState(false);
  const savedNote = recording.note ?? "";
  const dirty = note !== savedNote;

  async function save() {
    setSaving(true);
    const r = (await chrome.runtime.sendMessage({ type: "update-annotation", id: recording.id, patch: { note } } satisfies LoupeMessage)) as SimpleResult;
    setSaving(false);
    if (r.ok) await ctx.reload();
  }

  async function setStatus(status: AnnotationStatus) {
    const r = (await chrome.runtime.sendMessage({ type: "update-annotation", id: recording.id, patch: { status } } satisfies LoupeMessage)) as SimpleResult;
    if (r.ok) await ctx.reload();
  }

  React.useEffect(() => {
    if (!dirty) return;
    const timer = setTimeout(() => void save(), 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note, dirty]);

  return (
    <div>
      <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Recording note..." />
      <div className="mt-1 h-3.5 text-right text-[10.5px] text-loupe-faint">{saving ? "Saving…" : dirty ? "Editing…" : null}</div>
      <div className="mt-1 flex flex-col gap-1.5">
        <Button variant="outline" className="w-full" onClick={() => void setStatus(recording.status === "resolved" ? "open" : "resolved")}>
          {recording.status === "resolved" ? "Reopen" : <><CircleCheck className="h-4 w-4" />Resolve</>}
        </Button>
        <DeleteAnnotationButton
          full
          annotation={recording}
          onDone={async () => {
            ctx.setExpanded(null);
            await ctx.reload();
          }}
        />
      </div>
    </div>
  );
}

type FileState = { text: string | null; loading: boolean; error: string | null };

function RecordingTelemetry({
  requests,
  requestsState,
  consoleEntries,
  consoleState,
  errorEntries,
  errorState,
  onOpenRequest,
}: {
  requests: NetworkEntry[];
  requestsState: FileState;
  consoleEntries: ParsedConsoleEntry[];
  consoleState: FileState;
  errorEntries: PageErrorEntry[];
  errorState: FileState;
  onOpenRequest: (index: number) => void;
}) {
  type Tab = "network" | "console" | "errors";
  const [tab, setTab] = React.useState<Tab>("network");
  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "network", label: "Network", count: requests.length },
    { key: "console", label: "Console", count: consoleEntries.length },
    { key: "errors", label: "Errors", count: errorEntries.length },
  ];

  return (
    <div className="mt-3 border-t border-loupe-line pt-2">
      <div className="mb-2 flex items-center gap-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] transition-colors",
              tab === t.key ? "bg-white/[0.08] text-loupe-fg" : "text-loupe-muted hover:bg-white/[0.04]",
            )}
          >
            {t.label}
            <span className="grid h-4 min-w-4 place-items-center rounded-full bg-white/10 px-1 text-[10px] text-loupe-faint">{t.count}</span>
          </button>
        ))}
      </div>
      {tab === "network" ? (
        <NetworkRequestList requests={requests} state={requestsState} onOpen={onOpenRequest} />
      ) : tab === "console" ? (
        <ConsoleLogList entries={consoleEntries} state={consoleState} />
      ) : (
        <ErrorLogList entries={errorEntries} state={errorState} />
      )}
    </div>
  );
}

function statusTone(entry: NetworkEntry): string {
  if (entry.error || (entry.status ?? 0) >= 500) return "text-red-300";
  if ((entry.status ?? 0) >= 400) return "text-amber-300";
  if ((entry.status ?? 0) >= 300) return "text-sky-300";
  return "text-loupe-muted";
}

function NetworkRequestList({ requests, state, onOpen }: { requests: NetworkEntry[]; state: FileState; onOpen: (index: number) => void }) {
  if (state.loading) return <TelemetryHint>Loading network log…</TelemetryHint>;
  if (state.error) return <TelemetryHint>Couldn't load network log: {state.error}</TelemetryHint>;
  if (requests.length === 0) return <TelemetryHint>No network requests captured.</TelemetryHint>;
  return (
    <div className="flex flex-col gap-0.5">
      {requests.map((r, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onOpen(i)}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-white/[0.05]"
        >
          <span className={cn("w-11 shrink-0 font-mono text-[10.5px] font-semibold", statusTone(r))}>{r.error ? "ERR" : r.status ?? "—"}</span>
          <span className="w-10 shrink-0 font-mono text-[10.5px] text-loupe-faint">{r.method}</span>
          <span className="min-w-0 flex-1 truncate text-[11.5px] text-loupe-fg" title={r.url}>{shortPath(r.url)}</span>
          {typeof r.durationMs === "number" ? <span className="shrink-0 font-mono text-[10px] text-loupe-faint">{r.durationMs}ms</span> : null}
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-loupe-faint" />
        </button>
      ))}
    </div>
  );
}

function NetworkRequestDetail({ request }: { request: NetworkEntry }) {
  const rows: [string, string][] = [
    ["Method", request.method],
    ["Status", request.error ? `error — ${request.error}` : String(request.status ?? "—")],
    ["Type", request.kind],
    ["Duration", typeof request.durationMs === "number" ? `${request.durationMs} ms` : "—"],
    ["At", `${(request.t / 1000).toFixed(1)}s into the flow`],
  ];
  if (request.responseContentType) rows.push(["Content-Type", request.responseContentType]);
  const captureless = !request.requestHeaders && !request.responseHeaders && request.requestBody === undefined && request.responseBody === undefined;

  return (
    <div className="flex flex-col gap-3 pb-2">
      <div className="break-all rounded-lg border border-loupe-line bg-loupe-bg px-2.5 py-2 font-mono text-[11px] text-loupe-fg">
        <span className={cn("font-semibold", statusTone(request))}>{request.error ? "ERR" : request.status ?? ""}</span> {request.method} {request.url}
      </div>
      <DetailSection title="General">
        <KeyValueTable rows={rows} />
      </DetailSection>
      {captureless ? (
        <TelemetryHint>
          Headers and bodies weren't captured for this request. Re-record the flow to capture full request/response detail.
        </TelemetryHint>
      ) : null}
      <DetailSection title="Request headers">
        {request.requestHeaders?.length ? <KeyValueTable rows={request.requestHeaders} mono /> : <TelemetryHint>No request headers.</TelemetryHint>}
      </DetailSection>
      <DetailSection title="Request body">
        <BodyBlock body={request.requestBody} truncated={request.bodyTruncated?.request} contentType={headerValue(request.requestHeaders, "content-type")} />
      </DetailSection>
      <DetailSection title="Response headers">
        {request.responseHeaders?.length ? <KeyValueTable rows={request.responseHeaders} mono /> : <TelemetryHint>No response headers.</TelemetryHint>}
      </DetailSection>
      <DetailSection title="Response body">
        <BodyBlock body={request.responseBody} truncated={request.bodyTruncated?.response} contentType={request.responseContentType} />
      </DetailSection>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-[11px] font-semibold tracking-wide text-loupe-faint">{title}</div>
      {children}
    </div>
  );
}

function KeyValueTable({ rows, mono = false }: { rows: [string, string][]; mono?: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg border border-loupe-line">
      {rows.map(([key, value], i) => (
        <div key={`${key}-${i}`} className={cn("flex gap-2 px-2.5 py-1.5 text-[11px]", i > 0 && "border-t border-loupe-line/60")}>
          <span className="w-32 shrink-0 break-words font-mono text-loupe-faint">{key}</span>
          <span className={cn("min-w-0 flex-1 break-all text-loupe-fg", mono && "font-mono")}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function BodyBlock({ body, truncated, contentType }: { body: string | undefined; truncated?: boolean; contentType?: string }) {
  if (body === undefined) return <TelemetryHint>Not captured.</TelemetryHint>;
  if (body === "") return <TelemetryHint>Empty body.</TelemetryHint>;
  const pretty = prettyBody(body, contentType);
  return (
    <div>
      <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-all rounded-lg border border-loupe-line bg-loupe-bg px-2.5 py-2 font-mono text-[11px] leading-relaxed text-loupe-fg">
        {pretty}
      </pre>
      {truncated ? <div className="mt-1 text-[10.5px] text-loupe-faint">Truncated at capture cap.</div> : null}
    </div>
  );
}

function ConsoleLogList({ entries, state }: { entries: ParsedConsoleEntry[]; state: FileState }) {
  if (state.loading) return <TelemetryHint>Loading console log…</TelemetryHint>;
  if (state.error) return <TelemetryHint>Couldn't load console log: {state.error}</TelemetryHint>;
  if (entries.length === 0) return <TelemetryHint>No console output captured.</TelemetryHint>;
  return (
    <div className="flex flex-col gap-0.5">
      {entries.map((e, i) => (
        <div key={i} className="flex gap-2 rounded-md px-2 py-1 font-mono text-[11px]">
          {e.t ? <span className="w-10 shrink-0 text-loupe-faint">{e.t}</span> : null}
          <span className={cn("w-10 shrink-0", consoleTone(e.level))}>{e.level}</span>
          <span className="min-w-0 flex-1 whitespace-pre-wrap break-all text-loupe-fg">{e.text}</span>
        </div>
      ))}
    </div>
  );
}

function ErrorLogList({ entries, state }: { entries: PageErrorEntry[]; state: FileState }) {
  if (state.loading) return <TelemetryHint>Loading errors…</TelemetryHint>;
  if (state.error) return <TelemetryHint>Couldn't load errors: {state.error}</TelemetryHint>;
  if (entries.length === 0) return <TelemetryHint>No errors during the flow.</TelemetryHint>;
  return (
    <div className="flex flex-col gap-1.5">
      {entries.map((e, i) => (
        <div key={i} className="rounded-lg border border-loupe-line bg-loupe-bg px-2.5 py-2">
          <div className="flex items-center gap-2 text-[11px]">
            <CircleAlert className="h-3.5 w-3.5 shrink-0 text-red-300" />
            <span className="font-medium text-loupe-fg">{e.kind}</span>
            <span className="ml-auto font-mono text-[10px] text-loupe-faint">{(e.t / 1000).toFixed(1)}s</span>
          </div>
          <div className="mt-1 whitespace-pre-wrap break-all font-mono text-[11px] text-loupe-fg">{e.message}</div>
          {e.stack ? <div className="mt-1 whitespace-pre-wrap break-all font-mono text-[10px] text-loupe-faint">{e.stack}</div> : null}
        </div>
      ))}
    </div>
  );
}

function TelemetryHint({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-loupe-line/60 bg-loupe-bg/50 px-2.5 py-2 text-[11px] text-loupe-faint">{children}</div>;
}

interface ParsedConsoleEntry {
  level: string;
  text: string;
  t?: string;
}

function useRecordingFile(dir: string, file: string | undefined): FileState {
  const [state, setState] = React.useState<FileState>({ text: null, loading: Boolean(file), error: null });
  React.useEffect(() => {
    if (!file) {
      setState({ text: null, loading: false, error: null });
      return;
    }
    let cancelled = false;
    setState({ text: null, loading: true, error: null });
    void (chrome.runtime.sendMessage({ type: "recording-file", dir, file } satisfies LoupeMessage) as Promise<RecordingFileResult>)
      .then((r) => {
        if (cancelled) return;
        if (r.ok) setState({ text: r.text, loading: false, error: null });
        else setState({ text: null, loading: false, error: r.error });
      })
      .catch((e) => {
        if (!cancelled) setState({ text: null, loading: false, error: String(e) });
      });
    return () => {
      cancelled = true;
    };
  }, [dir, file]);
  return state;
}

function parseJsonl<T>(text: string | null): T[] {
  if (!text) return [];
  const out: T[] = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    try {
      out.push(JSON.parse(line) as T);
    } catch {
      // Skip malformed lines rather than dropping the whole log.
    }
  }
  return out;
}

function parseConsoleLog(text: string | null): ParsedConsoleEntry[] {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const m = /^\[([^\]]+)\]\s+(\w+)\s+([\s\S]*)$/.exec(line);
      if (m) return { t: m[1], level: m[2]!.toLowerCase(), text: m[3]! };
      return { level: "log", text: line };
    });
}

function consoleTone(level: string): string {
  if (level === "error") return "text-red-300";
  if (level === "warn") return "text-amber-300";
  if (level === "debug") return "text-loupe-faint";
  return "text-loupe-muted";
}

function headerValue(headers: [string, string][] | undefined, name: string): string | undefined {
  return headers?.find(([key]) => key.toLowerCase() === name.toLowerCase())?.[1];
}

function prettyBody(body: string, contentType?: string): string {
  const looksJson = (contentType && /json/i.test(contentType)) || /^\s*[[{]/.test(body);
  if (looksJson) {
    try {
      return JSON.stringify(JSON.parse(body), null, 2);
    } catch {
      // Not valid JSON; show raw.
    }
  }
  return body;
}

function shortPath(url: string): string {
  try {
    const u = new URL(url, location.href);
    return `${u.pathname}${u.search}` || u.href;
  } catch {
    return url;
  }
}

function formatClock(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, "0")}`;
}

function RecordingPreview({
  ctx,
  keyframes,
  recordingDir,
  videoSrc,
  hasVideo = true,
}: {
  ctx: ViewerContext;
  keyframes: { t?: number; label?: string; file: string }[];
  recordingDir: string;
  videoSrc: string;
  hasVideo?: boolean;
}) {
  const [videoFailed, setVideoFailed] = React.useState(false);
  const firstFrame = keyframes[0];

  if (hasVideo && !videoFailed) {
    return (
      <video
        src={videoSrc}
        controls
        preload="metadata"
        className="aspect-video w-full border-b border-loupe-line bg-black"
        onError={() => setVideoFailed(true)}
      />
    );
  }

  if (firstFrame) {
    return (
      <BridgeThumbnailButton
        source={{ dir: recordingDir, file: firstFrame.file }}
        className="relative block aspect-video w-full border-b border-loupe-line bg-black text-left"
        title={firstFrame.label || "Open recording keyframe"}
        onOpen={(src) => ctx.setLightbox(src)}
      />
    );
  }

  return (
    <div className="grid aspect-video w-full place-items-center border-b border-loupe-line bg-black/40 px-4 text-center text-[11px] text-loupe-faint">
      No video or keyframes captured
    </div>
  );
}

function recordingKeyframes(meta: RecordingMeta): { t?: number; label?: string; file: string }[] {
  const detailed = (meta.keyframes ?? []).filter((frame): frame is { t?: number; label?: string; file: string } => Boolean(frame.file));
  if (detailed.length > 0) return detailed;
  return (meta.files?.keyframes ?? []).map((file) => ({ file }));
}

function LibraryTab({ refs, ctx }: { refs: ReferenceItem[]; ctx: ViewerContext }) {
  const [query, setQuery] = React.useState("");
  const [deleting, setDeleting] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [collapsed, setCollapsed] = React.useState<Set<string>>(() => new Set());
  const groups = React.useMemo(() => filterReferencesByPage(refs, query), [refs, query]);

  function toggle(url: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  }

  async function deleteItem(ref: ReferenceItem) {
    setDeleting(ref.id);
    setError(null);
    const r = (await chrome.runtime.sendMessage({ type: "delete-reference", id: ref.id } satisfies LoupeMessage)) as SimpleResult;
    setDeleting(null);
    if (!r.ok) {
      setError(r.error || "couldn't delete reference");
      return;
    }
    await ctx.reload();
  }

  async function deletePage(url: string) {
    setDeleting(url);
    setError(null);
    const r = (await chrome.runtime.sendMessage({ type: "delete-reference-page", url } satisfies LoupeMessage)) as SimpleResult;
    setDeleting(null);
    if (!r.ok) {
      setError(r.error || "couldn't delete page references");
      return;
    }
    await ctx.reload();
  }

  return (
    <div className="pb-2">
      <div className="px-2 pb-1">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-loupe-faint" />
          <Input className="h-8 pl-8" value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search library" />
        </div>
        {error ? (
          <div className="mt-2 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[12px] text-loupe-fg">{error}</div>
        ) : null}
      </div>
      {refs.length === 0 ? (
        <div className="px-6 py-12 text-center text-[12px] text-loupe-faint">No saved references yet</div>
      ) : groups.length === 0 ? (
        <div className="px-6 py-12 text-center text-[12px] text-loupe-faint">No matches</div>
      ) : (
        groups.map((group) => {
          const isCollapsed = collapsed.has(group.url);
          return (
            <div key={group.url} className="pb-1">
              <div className="group flex items-center gap-2 px-3.5 pb-1.5 pt-3 text-[11px] text-loupe-faint">
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg px-1 py-1 text-left transition-colors hover:bg-white/5"
                  onClick={() => toggle(group.url)}
                  title={group.url}
                >
                  <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 transition-transform", !isCollapsed && "rotate-90")} />
                  <span className="truncate text-[12px] font-medium text-loupe-muted">{group.title || hostLabel(group.url)}</span>
                  <span className="shrink-0">{group.items.length}</span>
                </button>
                <LibrarySectionMenu className="ml-auto" disabled={deleting !== null} onDeletePage={() => void deletePage(group.url)} />
              </div>
              {!isCollapsed ? (
                <div className="space-y-2 px-2">
                  {group.items.map((ref) => (
                    <ItemCard
                      key={ref.id}
                      imageSource={{ dir: ref.dir, file: "shot.png" }}
                      imageTitle="Open reference image"
                      onImageOpen={(src) => ctx.setLightbox(src)}
                      title={ref.note || ref.title || "Untitled reference"}
                      badges={<Badge variant="outline">{formatCaptureDate(ref.createdAt)}</Badge>}
                      openTitle="Open source page"
                      onOpen={ref.url ? () => window.open(ref.url, "_blank", "noopener,noreferrer") : undefined}
                      more={<ReferenceMoreButton refItem={ref} deleting={deleting === ref.id} onDelete={() => void deleteItem(ref)} />}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
}

/** Section-level "More" menu for a library page group, matching the annotation
 * group actions menu. */
function LibrarySectionMenu({ className, disabled, onDeletePage }: { className?: string; disabled?: boolean; onDeletePage: () => void }) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className={cn(
            "opacity-70 transition-all hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100",
            open && "opacity-100",
            className,
          )}
          title="More section actions"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <MenuItem disabled={disabled} onSelect={onDeletePage} icon={<Trash2 className="h-3.5 w-3.5" />} tone="danger">
          Delete page references
        </MenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LibraryReferencePicker({
  container,
  refs,
  onAttach,
}: {
  /** Portal target for the picker modal — the shadow-root overlay mount so it stays styled. */
  container?: HTMLElement | null;
  refs: ReferenceItem[];
  onAttach: (ref: ReferenceItem) => Promise<void>;
}) {
  const [open, setOpen] = React.useState(false);
  const [thumbs, setThumbs] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    let cancelled = false;
    setThumbs({});
    for (const ref of refs) {
      void (chrome.runtime.sendMessage({ type: "reference-image", id: ref.id } satisfies LoupeMessage) as Promise<ReferenceImageResult>)
        .then((image) => {
          if (!cancelled && image.ok) setThumbs((current) => ({ ...current, [ref.id]: image.dataUrl }));
        })
        .catch(() => undefined);
    }
    return () => {
      cancelled = true;
    };
  }, [refs]);

  const items = React.useMemo<LibraryItem[]>(
    () =>
      refs.map((ref) => ({
        id: ref.id,
        caption: ref.note || ref.title || "Untitled reference",
        url: ref.url,
        createdAt: ref.createdAt,
        thumbUrl: thumbs[ref.id] ?? "",
      })),
    [refs, thumbs],
  );

  return (
    <>
      <Button type="button" variant="outline" size="xs" aria-expanded={open} onClick={() => setOpen(true)}>
        <Library className="h-3.5 w-3.5" />
        From library
      </Button>
      {open ? (
        <LibraryPicker
          items={items}
          container={container}
          onClose={() => setOpen(false)}
          onAttach={async (id) => {
            const ref = refs.find((r) => r.id === id);
            if (!ref) return;
            await onAttach(ref);
          }}
        />
      ) : null}
    </>
  );
}

function DeleteAnnotationButton({ annotation, onDone, full = false }: { annotation: StoredAnnotation; onDone: () => Promise<void>; full?: boolean }) {
  const [deleting, setDeleting] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);
  const size = full ? "default" : "xs";
  return (
    <div className={cn("flex items-center gap-1.5", full ? "w-full" : "ml-auto")}>
      {confirming ? (
        <Button type="button" variant="outline" size={size} className={cn(full && "flex-1")} onClick={() => setConfirming(false)}>
          Cancel
        </Button>
      ) : null}
      <Button
        variant="destructive"
        size={size}
        className={cn(full && "flex-1")}
        loading={deleting}
        onClick={async () => {
          if (!confirming) {
            setConfirming(true);
            return;
          }
          setDeleting(true);
          const r = (await chrome.runtime.sendMessage({ type: "delete-annotation", id: annotation.id } satisfies LoupeMessage)) as SimpleResult;
          setDeleting(false);
          setConfirming(false);
          if (r.ok) await onDone();
        }}
      >
        {deleting ? null : <Trash2 className="h-3.5 w-3.5" />}{confirming ? "Confirm" : "Delete"}
      </Button>
    </div>
  );
}

function Pins({
  annotations,
  showResolved,
  expanded,
  setExpanded,
  setFilter,
  setCollapsed,
}: {
  annotations: StoredAnnotation[];
  showResolved: boolean;
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  setFilter: (filter: ViewerFilter) => void;
  setCollapsed: (collapsed: boolean) => void;
}) {
  const here = pageKey(location.href);
  const onPage = annotations.filter((a) => pageKey(a.url) === here && (showResolved || a.status !== "resolved"));
  return (
    <>
      {onPage.map((a, i) => {
        const docX = a.rect.x + (a.scroll?.x ?? 0);
        const docY = a.rect.y + (a.scroll?.y ?? 0);
        return (
          <button
            key={a.id}
            type="button"
            className={cn(
              "fixed z-[2147483645] grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-[11px] font-semibold shadow-lg shadow-black/45 ring-2 transition-colors",
              expanded === a.id
                ? "border-amber-200/80 bg-amber-300 text-black ring-amber-400/35"
                : "border-white/35 bg-loupe-bg/95 text-loupe-fg ring-white/35",
            )}
            style={{ left: docX - window.scrollX, top: docY - window.scrollY }}
            onClick={() => {
              setExpanded(a.id);
              setFilter("page");
              setCollapsed(false);
            }}
          >
            {i + 1}
          </button>
        );
      })}
      {expanded ? <SelectionRect annotation={annotations.find((a) => a.id === expanded)} /> : null}
    </>
  );
}

function SelectionRect({ annotation }: { annotation: StoredAnnotation | undefined }) {
  if (!annotation || pageKey(annotation.url) !== pageKey(location.href)) return null;
  const docX = annotation.rect.x + (annotation.scroll?.x ?? 0);
  const docY = annotation.rect.y + (annotation.scroll?.y ?? 0);
  return (
    <div
      className="pointer-events-none fixed z-[2147483644] rounded border border-amber-300/90 bg-amber-300/15 shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_0_0_4px_rgba(251,191,36,0.12)]"
      style={{
        left: docX - window.scrollX,
        top: docY - window.scrollY,
        width: annotation.rect.width,
        height: annotation.rect.height,
      }}
    />
  );
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[2147483647] grid place-items-center bg-black/80 p-6" onClick={onClose}>
      <Button className="fixed right-4 top-4 bg-white/10" variant="ghost" size="icon-sm" onClick={onClose}><X className="h-4 w-4" /></Button>
      <img src={src} alt="annotation screenshot" className="max-h-full max-w-full rounded-lg border border-loupe-line bg-loupe-bg object-contain shadow-2xl shadow-black/50" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

function LoupeMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-flex items-center justify-center [&>svg]:h-full [&>svg]:w-full", className)}
      dangerouslySetInnerHTML={{ __html: LOUPE_LOGO_SVG }}
    />
  );
}

function Logo() {
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-lg border border-loupe-line bg-loupe-elev/85">
      <LoupeMark className="h-4 w-4 text-loupe-muted" />
    </span>
  );
}

function statusLabel(status: AnnotationStatus | undefined): string {
  if (status === "needs_review") return "Needs review";
  if (status === "resolved") return "Resolved";
  return "Open";
}

function StatusBadge({ status }: { status: AnnotationStatus | undefined }) {
  if (status === "needs_review")
    return (
      <Badge variant="outline" title="Needs review" className="text-amber-300">
        <CircleAlert className="h-3 w-3" />
      </Badge>
    );
  return <Badge variant="outline">{statusLabel(status)}</Badge>;
}

function BrandFooter() {
  return (
    <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-loupe-line px-3 py-2 text-loupe-muted">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium">
        <span className="grid h-5 w-5 shrink-0 place-items-center overflow-hidden rounded-full border border-loupe-line bg-loupe-elev/85">
          <LoupeMark className="h-3 w-3" />
        </span>
        Powered by Loupe
      </span>
      <Button
        variant="outline"
        size="xs"
        title="Open Loupe on GitHub"
        onClick={() => window.open(GITHUB_REPO_URL, "_blank", "noopener,noreferrer")}
      >
        <span className="grid h-3.5 w-3.5 place-items-center" dangerouslySetInnerHTML={{ __html: GITHUB_LOGO_SVG }} />
        GitHub
      </Button>
    </footer>
  );
}

/**
 * FLIP animation: record each group's vertical position before a reorder, then
 * after React commits the new order, invert the delta and transition to zero so
 * the rows slide into place instead of snapping.
 */
function useGroupReorderAnimation(listRef: React.RefObject<HTMLDivElement | null>, orderKey: string) {
  const positions = React.useRef<Map<string, number>>(new Map());

  React.useLayoutEffect(() => {
    const container = listRef.current;
    if (!container) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(container.querySelectorAll<HTMLElement>(":scope > [data-loupe-group-slug]"));
    const next = new Map<string, number>();
    for (const node of nodes) {
      const slug = node.getAttribute("data-loupe-group-slug");
      if (!slug) continue;
      const top = node.getBoundingClientRect().top;
      next.set(slug, top);
      const prev = positions.current.get(slug);
      if (prev === undefined || prev === top) continue;
      const delta = prev - top;
      node.style.transition = "none";
      node.style.transform = `translateY(${delta}px)`;
      requestAnimationFrame(() => {
        node.style.transition = "transform 200ms cubic-bezier(0.2, 0, 0, 1)";
        node.style.transform = "";
      });
    }
    positions.current = next;
  }, [listRef, orderKey]);
}

function jumpToAnnotation(annotation: StoredAnnotation, ctx: ViewerContext) {
  if (pageKey(annotation.url) !== pageKey(location.href)) {
    location.href = annotation.url;
    return;
  }
  ctx.setFilter("page");
  ctx.setExpanded(annotation.id);
  ctx.setCollapsed(false);
  window.scrollTo({ top: Math.max(0, annotation.rect.y + (annotation.scroll?.y ?? 0) - 96), behavior: "smooth" });
}

async function fetchActions(): Promise<ActionDescriptor[]> {
  const res = (await chrome.runtime.sendMessage({ type: "actions" } satisfies LoupeMessage)) as
    | { ok: true; actions: ActionDescriptor[] }
    | { ok: false };
  return res.ok ? res.actions : [];
}

async function fetchGroups(): Promise<GroupSummary[]> {
  const res = (await chrome.runtime.sendMessage({ type: "groups" } satisfies LoupeMessage)) as GroupsResult;
  return res.ok ? res.groups : [];
}

interface ViewerGroup {
  group: string;
  slug: string;
  items: StoredAnnotation[];
}

function groupsForViewer(items: StoredAnnotation[], summaries: GroupSummary[]): ViewerGroup[] {
  const map = new Map<string, ViewerGroup>();
  for (const summary of summaries) {
    map.set(summary.slug, { group: summary.group, slug: summary.slug, items: [] });
  }
  for (const a of items) {
    const slug = a.groupSlug || groupSlugFor(a.group);
    const existing = map.get(slug);
    if (existing) {
      existing.items.push(a);
    } else {
      map.set(slug, { group: a.group || slug, slug, items: [a] });
    }
  }
  return [...map.values()];
}

function orderGroupRows(rows: ViewerGroup[], order: string[] | null): ViewerGroup[] {
  if (!order) return rows;
  const bySlug = new Map(rows.map((row) => [row.slug, row]));
  const ordered = order.map((slug) => bySlug.get(slug)).filter((row): row is ViewerGroup => Boolean(row));
  const missing = rows.filter((row) => !order.includes(row.slug));
  return [...ordered, ...missing];
}

function reorderGroupSlugs(slugs: string[], dragged: string, target: string, placement: GroupDropPlacement): string[] {
  if (dragged === target || !slugs.includes(dragged) || !slugs.includes(target)) return slugs;
  const withoutDragged = slugs.filter((slug) => slug !== dragged);
  const targetIndex = withoutDragged.indexOf(target);
  if (targetIndex < 0) return slugs;
  const insertIndex = placement === "after" ? targetIndex + 1 : targetIndex;
  return [...withoutDragged.slice(0, insertIndex), dragged, ...withoutDragged.slice(insertIndex)];
}

function groupDropPlacement(event: React.DragEvent<HTMLElement>): GroupDropPlacement {
  const rect = event.currentTarget.getBoundingClientRect();
  return event.clientY > rect.top + rect.height / 2 ? "after" : "before";
}

function sameStringArray(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function groupSlugFor(group: string | undefined): string {
  const slug = (group ?? "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return slug || "inbox";
}

function hasLoupeDragData(event: React.DragEvent): boolean {
  const types = Array.from(event.dataTransfer.types);
  return types.includes("application/x-loupe-annotation-id") || types.includes("application/x-loupe-group-slug");
}


interface ReferencePageGroup {
  url: string;
  title: string;
  items: ReferenceItem[];
}

function filterReferencesByPage(refs: ReferenceItem[], query: string): ReferencePageGroup[] {
  const q = normalizeSearch(query);
  const map = new Map<string, ReferencePageGroup>();
  for (const ref of refs) {
    const url = ref.url || "Unknown source";
    const pageMatch = normalizeSearch(url).includes(q) || normalizeSearch(ref.title).includes(q) || normalizeSearch(hostLabel(ref.url)).includes(q);
    if (q && !pageMatch && !referenceMatches(ref, q)) continue;
    const existing = map.get(url) ?? { url, title: ref.title || hostLabel(ref.url), items: [] };
    if (!existing.title && ref.title) existing.title = ref.title;
    existing.items.push(ref);
    map.set(url, existing);
  }
  return [...map.values()]
    .map((group) => ({ ...group, items: sortReferencesByCapture(group.items) }))
    .sort((a, b) => referenceTime(b.items[0]) - referenceTime(a.items[0]));
}

function sortReferencesByCapture(refs: ReferenceItem[]): ReferenceItem[] {
  return [...refs].sort((a, b) => referenceTime(b) - referenceTime(a));
}

function referenceMatches(ref: ReferenceItem, query: string): boolean {
  if (!query) return true;
  return [ref.note, ref.title, ref.url, ref.id, ref.createdAt].some((value) => normalizeSearch(value).includes(query));
}

function referenceTime(ref: ReferenceItem | undefined): number {
  const time = Date.parse(ref?.createdAt ?? "");
  return Number.isNaN(time) ? 0 : time;
}

function normalizeSearch(value: string | undefined): string {
  return (value ?? "").toLowerCase().trim();
}

function formatCaptureDate(iso: string | undefined): string {
  if (!iso) return "Capture date unknown";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Capture date unknown";
  return date.toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

function componentCrumb(a: StoredAnnotation): string {
  return a.target.componentChain.map((c) => c.name).join(" › ") || a.target.tag;
}

/** The card headline: the human/agent-authored title when set, else the component crumb. */
function annotationHeadline(a: StoredAnnotation): string {
  return a.label?.trim() || componentCrumb(a);
}

function annotationMatches(a: StoredAnnotation, query: string): boolean {
  if (!query) return true;
  return [a.label, a.note, componentCrumb(a), a.group, a.groupSlug, a.title, hostLabel(a.url), a.target.text].some((value) =>
    normalizeSearch(value ?? undefined).includes(query),
  );
}

export function fileUrl(
  bridgeUrl: string,
  dir: string,
  file: string,
  route: { pageUrl?: string; repoRoot?: string } = {},
): string {
  const url = new URL("/file", bridgeUrl.endsWith("/") ? bridgeUrl : `${bridgeUrl}/`);
  url.searchParams.set("path", `${dir}/${file}`);
  if (route.pageUrl) url.searchParams.set("pageUrl", route.pageUrl);
  if (route.repoRoot) url.searchParams.set("repoRoot", route.repoRoot);
  return url.toString();
}

function pageKey(url: string | undefined): string {
  return (url ?? "").split("#")[0] ?? "";
}

function displayActionLabel(action: ActionDescriptor): string {
  const cleaned = action.label.replace(/^\s*(?:→|->|➜|›|»)\s*/, "").trim() || action.id;
  const i = cleaned.search(/[A-Za-z]/);
  if (i < 0) return cleaned;
  return cleaned.slice(0, i) + cleaned[i]!.toUpperCase() + cleaned.slice(i + 1);
}

function compactLabel(value: string, limit: number): string {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length <= limit ? text : `${text.slice(0, limit - 3)}...`;
}

function eventPathHasAttribute(event: Event, attribute: string): boolean {
  return event.composedPath().some((node) => hasElementAttribute(node, attribute));
}

function isTextEntryTarget(target: EventTarget | null): boolean {
  if (!isElementLike(target)) return false;
  if (Boolean((target as HTMLElement).isContentEditable)) return true;
  const tag = target.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select";
}

function hasElementAttribute(node: EventTarget, attribute: string): boolean {
  return isElementLike(node) && node.hasAttribute(attribute);
}

function isElementLike(node: EventTarget | null): node is Element {
  return !!node && typeof (node as Element).tagName === "string" && typeof (node as Element).hasAttribute === "function";
}

function uniqueWindows(windows: (Window | null)[]): Window[] {
  return [...new Set(windows.filter((targetWindow): targetWindow is Window => targetWindow !== null))];
}

function hostLabel(url: string | undefined): string {
  try {
    return new URL(url ?? "").host;
  } catch {
    return "other page";
  }
}

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const s = Math.max(0, (Date.now() - then) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
