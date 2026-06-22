import * as React from "react";
import { createPortal } from "react-dom";
import type { ActionDescriptor } from "@loupe/core/model";
import {
  ArrowUp,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Eye,
  EyeOff,
  GripVertical,
  ImagePlus,
  Library,
  MessageSquare,
  MoreHorizontal,
  PanelRightClose,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import type { GroupsResult, GroupSummary, ListResult, LoupeMessage, ReferenceItem, ReferencesResult, SimpleResult, StoredAnnotation } from "./messages.js";
import { bridgeUrlForUrl, loadSettings } from "./settings.js";
import {
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "./ui.js";
import { cn } from "./lib/cn.js";

const CLAUDE_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 257"><path fill="currentColor" d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"/></svg>';

const OPENAI_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 260"><path fill="currentColor" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/></svg>';

const GITHUB_REPO_URL = "https://github.com/woddlepad/loupe";

const GITHUB_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/></svg>';

export interface ViewerAppProps {
  onClose: () => void;
}

export function ViewerApp({ onClose }: ViewerAppProps) {
  const [annotations, setAnnotations] = React.useState<StoredAnnotation[]>([]);
  const [actions, setActions] = React.useState<ActionDescriptor[]>([]);
  const [groups, setGroups] = React.useState<GroupSummary[]>([]);
  const [author, setAuthor] = React.useState("me");
  const [bridgeUrl, setBridgeUrl] = React.useState("http://localhost:7337");
  const [repoRoot, setRepoRoot] = React.useState<string | undefined>(undefined);
  const [filter, setFilter] = React.useState<"page" | "all">("page");
  const [showResolved, setShowResolved] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [collapsed, setCollapsed] = React.useState(false);
  const [collapsedGroups, setCollapsedGroups] = React.useState<Set<string>>(() => new Set());
  const [hiddenGroups, setHiddenGroups] = React.useState<Set<string>>(() => new Set());
  const [focusedGroup, setFocusedGroup] = React.useState<string | null>(null);
  const [dragOverGroup, setDragOverGroup] = React.useState<string | null>(null);
  const [draggingGroupSlug, setDraggingGroupSlug] = React.useState<string | null>(null);
  const [previewGroupOrder, setPreviewGroupOrder] = React.useState<string[] | null>(null);
  const [lightbox, setLightbox] = React.useState<string | null>(null);
  const [, forceLayout] = React.useReducer((n: number) => n + 1, 0);

  const reload = React.useCallback(async () => {
    const [list, actionList, groupList, settings] = await Promise.all([
      chrome.runtime.sendMessage({ type: "list" } satisfies LoupeMessage) as Promise<ListResult>,
      fetchActions(),
      fetchGroups(),
      loadSettings(),
    ]);
    setAnnotations(list.ok ? list.annotations : []);
    setActions(actionList);
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
      e.preventDefault();
      e.stopImmediatePropagation();
      if (lightbox) setLightbox(null);
      else onClose();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [lightbox, onClose]);

  const pageAnnotations = React.useMemo(() => {
    const here = pageKey(location.href);
    return annotations.filter((a) => pageKey(a.url) === here);
  }, [annotations]);

  const scoped = React.useMemo(() => (filter === "all" ? annotations : pageAnnotations), [annotations, filter, pageAnnotations]);

  const visible = React.useMemo(() => {
    const base = showResolved ? scoped : scoped.filter((a) => a.status !== "resolved");
    return base.filter((a) => {
      const slug = a.groupSlug || groupSlugFor(a.group);
      if (hiddenGroups.has(slug)) return false;
      return !focusedGroup || slug === focusedGroup;
    });
  }, [focusedGroup, hiddenGroups, scoped, showResolved]);

  const pageCount = React.useMemo(
    () => (showResolved ? pageAnnotations.length : pageAnnotations.filter((a) => a.status !== "resolved").length),
    [pageAnnotations, showResolved],
  );

  const allCount = React.useMemo(
    () => (showResolved ? annotations.length : annotations.filter((a) => a.status !== "resolved").length),
    [annotations, showResolved],
  );

  const allResolvedCount = annotations.filter((a) => a.status === "resolved").length;
  const scopedResolvedCount = scoped.filter((a) => a.status === "resolved").length;
  const active = expanded ? annotations.find((a) => a.id === expanded) : undefined;
  const baseGroupRows = React.useMemo(
    () => groupsForViewer(visible, groups).filter((row) => !hiddenGroups.has(row.slug) && (!focusedGroup || row.slug === focusedGroup)),
    [focusedGroup, hiddenGroups, visible, groups],
  );
  const groupRows = React.useMemo(() => orderGroupRows(baseGroupRows, previewGroupOrder), [baseGroupRows, previewGroupOrder]);
  const groupVisibilityActive = focusedGroup !== null || hiddenGroups.size > 0;

  // FLIP: slide groups to their new slots when the order changes (during a
  // reorder drag or after a commit) instead of letting them jump.
  const listRef = React.useRef<HTMLDivElement>(null);
  useGroupReorderAnimation(listRef, groupRows.map((row) => row.slug).join("\n"));

  const ctx: ViewerContext = {
    annotations,
    actions,
    author,
    bridgeUrl,
    repoRoot,
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
    setCollapsed,
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
      setPreviewGroupOrder(null);
      setDragOverGroup(null);
      if (sameStringArray(slugs, baseGroupRows.map((row) => row.slug))) return;
      const r = (await chrome.runtime.sendMessage({ type: "reorder-groups", slugs } satisfies LoupeMessage)) as SimpleResult;
      if (r.ok) await reload();
    },
    reload,
  };

  return (
    <>
      {collapsed ? (
        <button
          type="button"
          className="fixed right-3 top-3 z-[2147483646] flex h-12 items-center gap-2 rounded-xl border border-loupe-line bg-loupe-panel/95 px-2 text-loupe-fg shadow-2xl shadow-black/50 transition-all hover:border-loupe-line-strong active:scale-[0.98]"
          onClick={() => setCollapsed(false)}
          title="Show annotations"
        >
          <Logo />
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-loupe-accent px-1.5 text-[11px] font-semibold text-loupe-bg">
            {visible.length}
          </span>
        </button>
      ) : (
        <section className="fixed bottom-3 right-3 top-3 z-[2147483646] flex w-[420px] flex-col overflow-hidden rounded-2xl border border-loupe-line bg-loupe-panel/95 text-[13px] text-loupe-fg shadow-2xl shadow-black/50">
          <header className="flex min-h-12 shrink-0 items-center gap-2 border-b border-loupe-line px-3 py-2">
            <div className="flex items-center gap-1 rounded-xl border border-loupe-line bg-loupe-bg/60 p-1">
              <SegmentButton active={filter === "page"} count={pageCount} onClick={() => setFilter("page")}>This page</SegmentButton>
              <SegmentButton active={filter === "all"} count={allCount} onClick={() => setFilter("all")}>All pages</SegmentButton>
            </div>
            <div className="ml-auto" />
            <Button variant="ghost" size="icon" title="Collapse annotations" onClick={() => setCollapsed(true)}>
              <PanelRightClose className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Close annotations" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </header>

          <div className="flex shrink-0 items-center gap-2 border-b border-loupe-line/70 px-3 py-2.5">
            <Button variant="secondary" size="xs" onClick={() => {
              setShowResolved((v) => !v);
              if (showResolved && active?.status === "resolved") setExpanded(null);
            }}>
              {showResolved ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {showResolved ? "Hide resolved" : "Show resolved"}
            </Button>
            {allResolvedCount > 0 ? (
              <DeleteResolvedButton count={allResolvedCount} onDone={async () => {
                setExpanded(null);
                await reload();
              }} />
            ) : null}
            {groupVisibilityActive ? (
              <Button variant="secondary" size="xs" onClick={ctx.clearGroupVisibility}>
                <Eye className="h-3.5 w-3.5" />
                Show all groups
              </Button>
            ) : null}
            <span className="ml-auto text-[11px] text-loupe-faint">{visible.length}/{scoped.length}</span>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto py-2">
            {groupRows.length === 0 ? (
              <div className="px-6 py-12 text-center text-[12px] text-loupe-faint">
                {scopedResolvedCount > 0 && !showResolved
                  ? "Only resolved annotations here"
                  : filter === "page" ? "No annotations on this page yet" : "No annotations yet"}
              </div>
            ) : (
              groupRows.map((row) => (
                <AnnotationGroup key={row.slug} group={row.group} slug={row.slug} items={row.items} ctx={ctx} />
              ))
            )}
            <AddGroupDialog onDone={reload} />
          </div>

          <BrandFooter />
        </section>
      )}

      <Pins annotations={annotations} showResolved={showResolved} expanded={expanded} setExpanded={setExpanded} setFilter={setFilter} setCollapsed={setCollapsed} />
      {lightbox ? <Lightbox src={lightbox} onClose={() => setLightbox(null)} /> : null}
    </>
  );
}

interface ViewerContext {
  annotations: StoredAnnotation[];
  actions: ActionDescriptor[];
  author: string;
  bridgeUrl: string;
  repoRoot?: string;
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
  setFilter: (filter: "page" | "all") => void;
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
          className="flex min-w-0 items-center gap-1.5 rounded-lg px-1 py-1 text-left transition-colors hover:bg-white/5"
          onClick={() => ctx.toggleGroup(slug)}
        >
          <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 transition-transform", !collapsed && "rotate-90")} />
          <span className="truncate text-[12px] font-medium text-loupe-muted">{group}</span>
          <span className="shrink-0">{open}/{items.length}</span>
        </button>
        <GroupActionsMenu
          className="ml-auto"
          actions={sendable}
          disabled={sendingAction !== null}
          itemCount={items.length}
          focused={ctx.focusedGroup === slug}
          sentAction={sentAction}
          sendingAction={sendingAction}
          onClearFocus={ctx.clearGroupVisibility}
          onDelete={() => setDeleteOpen(true)}
          onFocus={() => ctx.focusGroup(slug)}
          onHide={() => ctx.hideGroup(slug)}
          onRename={() => setRenameOpen(true)}
          onSend={(actionId) => void sendGroup(actionId)}
        />
      </div>
      <RenameGroupDialog open={renameOpen} onOpenChange={setRenameOpen} slug={slug} group={group} onDone={ctx.reload} />
      <DeleteGroupDialog
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
        <div className="space-y-1 px-2">
          {items.map((a) => <AnnotationRow key={a.id} annotation={a} ctx={ctx} />)}
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-loupe-line px-3 py-4 text-center text-[11px] text-loupe-faint">
              Drop annotations here
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function AddGroupDialog({ onDone }: { onDone: () => Promise<void> }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (open) setValue("");
  }, [open]);

  async function addGroup() {
    const group = value.trim();
    if (!group) return;
    setSaving(true);
    const r = (await chrome.runtime.sendMessage({ type: "create-group", group } satisfies LoupeMessage)) as SimpleResult;
    setSaving(false);
    if (r.ok) {
      setValue("");
      setOpen(false);
      await onDone();
    }
  }

  return (
    <>
      <div className="mx-2 mt-3 border-t border-loupe-line/70 pt-2">
        <Button type="button" variant="secondary" size="xs" className="w-full" onClick={() => setOpen(true)}>
          <Plus className="h-3.5 w-3.5" />
          Add group
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[min(92vw,380px)]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void addGroup();
            }}
          >
            <DialogHeader>
              <DialogTitle>New group</DialogTitle>
              <DialogDescription>Create an empty group for annotations.</DialogDescription>
            </DialogHeader>
            <div className="px-5 py-4">
              <Input autoFocus value={value} onChange={(e) => setValue(e.target.value)} placeholder="Group name" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary" size="xs" className="min-w-20">Cancel</Button>
              </DialogClose>
              <Button type="submit" variant="primary" size="xs" className="min-w-20" disabled={saving || !value.trim()}>
                {saving ? "Adding..." : "OK"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

function RenameGroupDialog({
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,380px)]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void rename();
          }}
        >
          <DialogHeader>
            <DialogTitle>Rename group</DialogTitle>
            <DialogDescription>Update the group label and its Loupe folder slug.</DialogDescription>
          </DialogHeader>
          <div className="px-5 py-4">
            <Input autoFocus value={value} onChange={(e) => setValue(e.target.value)} placeholder="Group name" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" size="xs" className="min-w-20">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="primary" size="xs" className="min-w-20" disabled={saving || !value.trim()}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteGroupDialog({
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,400px)]">
        <DialogHeader>
          <DialogTitle>Delete group</DialogTitle>
          <DialogDescription>
            {count > 0
              ? `Delete "${group}" and its ${count} annotation${count === 1 ? "" : "s"}.`
              : `Delete the empty "${group}" group.`}
          </DialogDescription>
        </DialogHeader>
        {error ? <div className="mx-5 mt-4 rounded-lg border border-red-400/25 bg-red-500/10 px-3 py-2 text-[12px] text-red-100">{error}</div> : null}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" size="xs" className="min-w-20">Cancel</Button>
          </DialogClose>
          <Button type="button" variant="danger" size="xs" className="min-w-20" disabled={deleting} onClick={() => void deleteGroup()}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function GroupActionsMenu({
  actions,
  className,
  disabled,
  focused,
  itemCount,
  sentAction,
  sendingAction,
  onClearFocus,
  onDelete,
  onFocus,
  onHide,
  onRename,
  onSend,
}: {
  actions: ActionDescriptor[];
  className?: string;
  disabled?: boolean;
  focused: boolean;
  itemCount: number;
  sentAction: string | null;
  sendingAction: string | null;
  onClearFocus: () => void;
  onDelete: () => void;
  onFocus: () => void;
  onHide: () => void;
  onRename: () => void;
  onSend: (action: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState<{ left: number; top: number } | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  const updateMenuPosition = React.useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const triggerRect = trigger.getBoundingClientRect();
    const menuRect = menuRef.current?.getBoundingClientRect();
    const margin = 8;
    const gap = 6;
    const width = menuRect?.width || 192;
    const height = menuRect?.height || 224;
    const left = Math.min(Math.max(margin, triggerRect.right - width), window.innerWidth - width - margin);
    const below = triggerRect.bottom + gap;
    const top = below + height <= window.innerHeight - margin
      ? below
      : Math.max(margin, triggerRect.top - height - gap);
    setMenuPosition({ left, top });
  }, []);

  React.useLayoutEffect(() => {
    if (!open) {
      setMenuPosition(null);
      return;
    }
    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition, true);
    window.addEventListener("scroll", updateMenuPosition, true);
    return () => {
      window.removeEventListener("resize", updateMenuPosition, true);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [open, updateMenuPosition]);

  React.useEffect(() => {
    if (!open) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      const path = event.composedPath();
      if (menuRef.current && path.includes(menuRef.current)) return;
      if (triggerRef.current && path.includes(triggerRef.current)) return;
      setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", closeOnOutsidePointer, true);
    window.addEventListener("keydown", closeOnEscape, true);
    return () => {
      window.removeEventListener("pointerdown", closeOnOutsidePointer, true);
      window.removeEventListener("keydown", closeOnEscape, true);
    };
  }, [open]);

  function choose(callback: () => void) {
    setOpen(false);
    callback();
  }

  const rootNode = triggerRef.current?.getRootNode();
  const portalRoot = rootNode instanceof ShadowRoot ? rootNode : null;
  const menu = open ? (
    <div
      ref={menuRef}
      role="menu"
      className="fixed z-[2147483647] w-48 overflow-hidden rounded-lg border border-loupe-line bg-loupe-panel p-1 text-loupe-fg shadow-2xl shadow-black/50"
      style={menuPosition ? menuPosition : { visibility: "hidden" }}
      onClick={(e) => e.stopPropagation()}
    >
      <MenuItem onSelect={() => choose(onHide)} icon={<EyeOff className="h-3.5 w-3.5" />}>
        Hide on this page
      </MenuItem>
      <MenuItem
        onSelect={() => choose(focused ? onClearFocus : onFocus)}
        icon={<Eye className="h-3.5 w-3.5" />}
      >
        {focused ? "Show all groups" : "Focus this group"}
      </MenuItem>
      <div className="my-1 h-px bg-loupe-line/80" />
      <MenuItem onSelect={() => choose(onRename)} icon={<Pencil className="h-3.5 w-3.5" />}>
        Rename
      </MenuItem>
      <MenuItem onSelect={() => choose(onDelete)} icon={<Trash2 className="h-3.5 w-3.5" />} tone="danger">
        Delete
      </MenuItem>
      {actions.length > 0 ? <div className="my-1 h-px bg-loupe-line/80" /> : null}
      {actions.map((a) => {
        const sending = sendingAction === a.id;
        const sent = sentAction === a.id;
        return (
          <MenuItem
            key={a.id}
            disabled={disabled || itemCount === 0}
            icon={<ProviderIcon action={a} colored />}
            onSelect={() => choose(() => onSend(a.id))}
          >
            {sending ? `Sending to ${displayActionLabel(a)}...` : sent ? `Sent to ${displayActionLabel(a)}` : `Send to ${displayActionLabel(a)}`}
          </MenuItem>
        );
      })}
    </div>
  ) : null;

  return (
    <div className={cn("relative", className)} onClick={(e) => e.stopPropagation()}>
      <Button
        ref={triggerRef}
        type="button"
        size="icon"
        variant="ghost"
        className={cn("h-7 w-7 opacity-0 transition-all focus-visible:opacity-100 group-hover:opacity-100", open && "opacity-100")}
        title="More group actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      {menu && portalRoot ? createPortal(menu, portalRoot) : null}
    </div>
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
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      className={cn(
        "flex h-8 w-full items-center gap-2 rounded-lg px-2 text-left text-[12px] outline-none transition-colors",
        "disabled:pointer-events-none disabled:opacity-45",
        tone === "normal" && "text-loupe-muted hover:bg-loupe-elev hover:text-loupe-fg focus-visible:bg-loupe-elev focus-visible:text-loupe-fg",
        tone === "danger" && "text-loupe-muted hover:bg-red-500/10 hover:text-red-200 focus-visible:bg-red-500/10 focus-visible:text-red-200",
      )}
      onClick={onSelect}
    >
      <span className="grid h-4 w-4 shrink-0 place-items-center">{icon}</span>
      <span className="min-w-0 truncate">{children}</span>
    </button>
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
  return null;
}

function providerColorClass(action: ActionDescriptor | undefined): string {
  const label = `${action?.id ?? ""} ${action?.label ?? ""}`.toLowerCase();
  if (label.includes("claude")) return "text-[#d97757]";
  if (label.includes("codex") || label.includes("openai")) return "text-loupe-fg";
  return "text-loupe-muted";
}

function AnnotationRow({ annotation, ctx }: { annotation: StoredAnnotation; ctx: ViewerContext }) {
  const isExpanded = ctx.expanded === annotation.id;
  const resolved = annotation.status === "resolved";
  const comments = annotation.comments?.length ?? 0;
  const thumb = fileUrl(ctx.bridgeUrl, annotation.dir, "shot.png", { pageUrl: location.href, repoRoot: ctx.repoRoot });
  const otherPage = pageKey(annotation.url) !== pageKey(location.href);

  return (
    <article
      draggable
      className={cn(
        "rounded-xl border border-transparent bg-transparent transition-colors hover:bg-white/[0.04]",
        isExpanded && "border-loupe-line bg-white/[0.04]",
      )}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("application/x-loupe-annotation-id", annotation.id);
      }}
      onDragEnd={() => ctx.setDragOverGroup(null)}
    >
      <button
        type="button"
        className="flex w-full items-start gap-2 p-2 text-left"
        onClick={() => ctx.setExpanded(isExpanded ? null : annotation.id)}
      >
        <img src={thumb} alt="" className="h-11 w-14 shrink-0 rounded-lg border border-loupe-line bg-loupe-bg object-cover" onError={(e) => e.currentTarget.remove()} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12.5px] font-medium text-loupe-fg">{componentCrumb(annotation)}</div>
          {annotation.note ? <div className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-loupe-muted">{annotation.note}</div> : null}
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <Badge tone={resolved ? "resolved" : "open"}>{resolved ? "Resolved" : "Open"}</Badge>
            <Badge><MessageSquare className="h-3 w-3" />{comments}</Badge>
            {otherPage ? <Badge>{hostLabel(annotation.url)}</Badge> : null}
          </div>
        </div>
        <Button
          variant="secondary"
          size="icon"
          title={otherPage ? "Open annotation page" : "Jump to annotation"}
          onClick={(e) => {
            e.stopPropagation();
            jumpToAnnotation(annotation, ctx);
          }}
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </button>
      {isExpanded ? <AnnotationDetail annotation={annotation} ctx={ctx} /> : null}
    </article>
  );
}

function AnnotationDetail({ annotation, ctx }: { annotation: StoredAnnotation; ctx: ViewerContext }) {
  const [note, setNote] = React.useState(annotation.note ?? "");
  const [reply, setReply] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [commenting, setCommenting] = React.useState(false);
  const [refs, setRefs] = React.useState<ReferenceItem[]>([]);
  const [refNotice, setRefNotice] = React.useState<{ tone: "ok" | "error" | "muted"; text: string } | null>(null);
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const meta = annotation as StoredAnnotation & { resolution?: { primary?: string } };

  React.useEffect(() => {
    let alive = true;
    void chrome.runtime.sendMessage({ type: "references" } satisfies LoupeMessage).then((res: ReferencesResult) => {
      if (alive && res.ok) setRefs(res.references);
    });
    return () => {
      alive = false;
    };
  }, []);

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

  async function post(body: string, status?: "open" | "resolved") {
    if (!body) return;
    setCommenting(true);
    const r = (await chrome.runtime.sendMessage({
      type: "comment",
      id: annotation.id,
      comment: { author: ctx.author, body, createdAt: new Date().toISOString(), ...(status ? { status } : {}) },
    } satisfies LoupeMessage)) as SimpleResult;
    setCommenting(false);
    if (r.ok) {
      setReply("");
      await ctx.reload();
    }
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
          {thumbs.map((file) => {
            const src = fileUrl(ctx.bridgeUrl, annotation.dir, file, { pageUrl: location.href, repoRoot: ctx.repoRoot });
            return (
              <button key={file} type="button" className="h-16 overflow-hidden rounded-lg border border-loupe-line bg-loupe-bg" onClick={() => ctx.setLightbox(src)}>
                <img src={src} alt="" className="h-full w-auto object-cover" />
              </button>
            );
          })}
        </div>
      ) : null}
      {meta.resolution?.primary ? <div className="mb-2 break-all font-mono text-[11px] text-loupe-faint">{meta.resolution.primary}</div> : null}
      <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Annotation note..." />
      <div className="mt-2 flex items-center gap-1.5">
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
        <Button variant="secondary" size="xs" onClick={() => fileRef.current?.click()}><ImagePlus className="h-3.5 w-3.5" />Add ref</Button>
        <LibraryReferenceDialog
          bridgeUrl={ctx.bridgeUrl}
          repoRoot={ctx.repoRoot}
          refs={refs}
          onAttach={async (ref) => {
            await addReference(
              await urlToDataUrl(fileUrl(ctx.bridgeUrl, ref.dir, "shot.png", { pageUrl: location.href, repoRoot: ctx.repoRoot })),
              ref.note || ref.title || "library reference",
            );
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
      <div className="mt-2 space-y-1.5">
        {(annotation.comments ?? []).map((comment, index) => (
          <div key={`${comment.createdAt}-${index}`} className="rounded-xl border border-loupe-line bg-loupe-bg/60 px-2.5 py-1.5">
            <div className="mb-0.5 text-[10.5px] text-loupe-faint">{comment.author} · {timeAgo(comment.createdAt)}{comment.status ? ` · ${comment.status}` : ""}</div>
            <div className="whitespace-pre-wrap text-[12px] leading-snug text-loupe-fg/90">{comment.body}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <Input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="comment..." onKeyDown={(e) => {
          if (e.key === "Enter") void post(reply);
        }} />
        <Button
          variant="secondary"
          size="icon"
          className="shrink-0"
          disabled={commenting || !reply.trim()}
          onClick={() => void post(reply)}
          aria-label={commenting ? "Sending comment" : "Comment"}
          title="Comment"
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <Button className="w-20" variant="primary" size="xs" disabled={saving} onClick={() => void save()}>{saving ? "Saving..." : "Save"}</Button>
        <Button className="w-20" variant="secondary" size="xs" onClick={() => void post(annotation.status === "resolved" ? "reopened" : "resolved", annotation.status === "resolved" ? "open" : "resolved")}>
          {annotation.status === "resolved" ? "Reopen" : "Resolve"}
        </Button>
        <DeleteAnnotationButton annotation={annotation} onDone={async () => {
          ctx.setExpanded(null);
          await ctx.reload();
        }} />
      </div>
    </div>
  );
}

function LibraryReferenceDialog({
  bridgeUrl,
  repoRoot,
  refs,
  onAttach,
}: {
  bridgeUrl: string;
  repoRoot?: string;
  refs: ReferenceItem[];
  onAttach: (ref: ReferenceItem) => Promise<void>;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [collapsedDomains, setCollapsedDomains] = React.useState<Set<string>>(() => new Set());
  const [attaching, setAttaching] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const popoverRef = React.useRef<HTMLDivElement | null>(null);
  const grouped = React.useMemo(() => filterReferencesByDomain(refs, query), [refs, query]);

  React.useEffect(() => {
    if (!open) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!popoverRef.current) return;
      if (!event.composedPath().includes(popoverRef.current)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("pointerdown", closeOnOutsidePointer, true);
    window.addEventListener("keydown", closeOnEscape, true);
    return () => {
      window.removeEventListener("pointerdown", closeOnOutsidePointer, true);
      window.removeEventListener("keydown", closeOnEscape, true);
    };
  }, [open]);

  async function attach(ref: ReferenceItem) {
    setAttaching(ref.id);
    setError(null);
    try {
      await onAttach(ref);
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setAttaching(null);
    }
  }

  function toggleDomain(domain: string) {
    setCollapsedDomains((current) => {
      const next = new Set(current);
      if (next.has(domain)) next.delete(domain);
      else next.add(domain);
      return next;
    });
  }

  return (
    <div ref={popoverRef} className="relative" data-loupe-library-popover={open ? "" : undefined}>
      <Button
        type="button"
        variant="secondary"
        size="xs"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Library className="h-3.5 w-3.5" />
        From library
      </Button>
      {open ? (
        <div
          className="fixed inset-0 z-[2147483647] grid place-items-center bg-black/70 p-4 text-loupe-fg"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="flex max-h-[min(760px,calc(100vh-2rem))] w-[min(920px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-loupe-line bg-loupe-panel shadow-2xl shadow-black/60">
            <div className="flex items-start gap-3 border-b border-loupe-line px-4 py-3">
              <div className="min-w-0">
                <div className="text-[13px] font-semibold leading-none">Reference library</div>
                <div className="mt-1 text-[11px] text-loupe-muted">Choose a capture to attach.</div>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto h-7 w-7" title="Close library" onClick={() => setOpen(false)}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="border-b border-loupe-line p-3">
              <Input
                className="h-8"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search library"
              />
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {error ? (
                <div className="mb-3 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[12px] text-loupe-fg">
                  {error}
                </div>
              ) : null}
              {refs.length === 0 ? (
                <div className="rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint">
                  No saved references yet
                </div>
              ) : grouped.length === 0 ? (
                <div className="rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint">
                  No matches
                </div>
              ) : (
                <div className="space-y-4">
                  {grouped.map(([domain, items]) => (
                    <section key={domain} className="space-y-2">
                      <button
                        type="button"
                        className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-[11px] font-medium text-loupe-muted transition-colors hover:bg-white/5 hover:text-loupe-fg"
                        onClick={() => toggleDomain(domain)}
                      >
                        <ChevronRight
                          className={cn(
                            "h-3.5 w-3.5 shrink-0 transition-transform",
                            (query.trim() || !collapsedDomains.has(domain)) && "rotate-90",
                          )}
                        />
                        <span>{domain}</span>
                        <span className="ml-auto text-loupe-faint">{items.length}</span>
                      </button>
                      {query.trim() || !collapsedDomains.has(domain) ? <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {items.map((ref) => {
                          const src = fileUrl(bridgeUrl, ref.dir, "shot.png", { pageUrl: location.href, repoRoot });
                          return (
                            <button
                              key={ref.id}
                              type="button"
                              className="group overflow-hidden rounded-xl border border-loupe-line bg-loupe-bg/70 text-left transition-all hover:border-loupe-line-strong hover:bg-white/[0.04] active:scale-[0.99]"
                              onClick={() => void attach(ref)}
                              disabled={attaching !== null}
                            >
                              <div className="aspect-[16/9] border-b border-loupe-line bg-black/40">
                                <img src={src} alt="" className="h-full w-full object-cover" />
                              </div>
                              <div className="space-y-1 p-2.5">
                                <div className="line-clamp-1 text-[12px] font-medium text-loupe-fg">
                                  {ref.note || ref.title || "Untitled reference"}
                                </div>
                                <div className="line-clamp-1 text-[10.5px] text-loupe-faint">{ref.url || ref.id}</div>
                                <div className="pt-1 text-[11px] font-medium text-loupe-muted group-hover:text-loupe-fg">
                                  {attaching === ref.id ? "Attaching..." : "Attach"}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div> : null}
                    </section>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DeleteAnnotationButton({ annotation, onDone }: { annotation: StoredAnnotation; onDone: () => Promise<void> }) {
  const [deleting, setDeleting] = React.useState(false);
  return (
    <Button
      className="ml-auto min-w-20"
      variant="danger"
      size="xs"
      disabled={deleting}
      onClick={async () => {
        if (!window.confirm("Delete this annotation?")) return;
        setDeleting(true);
        const r = (await chrome.runtime.sendMessage({ type: "delete-annotation", id: annotation.id } satisfies LoupeMessage)) as SimpleResult;
        setDeleting(false);
        if (r.ok) await onDone();
      }}
    >
      <Trash2 className="h-3.5 w-3.5" />{deleting ? "Deleting..." : "Delete"}
    </Button>
  );
}

function DeleteResolvedButton({ count, onDone }: { count: number; onDone: () => Promise<void> }) {
  const [deleting, setDeleting] = React.useState(false);
  return (
    <Button
      variant="danger"
      size="xs"
      disabled={deleting}
      onClick={async () => {
        if (!window.confirm(`Delete ${count} resolved annotation${count === 1 ? "" : "s"}?`)) return;
        setDeleting(true);
        const r = (await chrome.runtime.sendMessage({ type: "delete-resolved" } satisfies LoupeMessage)) as SimpleResult;
        setDeleting(false);
        if (r.ok) await onDone();
      }}
    >
      <Trash2 className="h-3.5 w-3.5" />{deleting ? "Deleting..." : "Delete resolved"}
    </Button>
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
  setFilter: (filter: "page" | "all") => void;
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
      <Button className="fixed right-4 top-4 bg-white/10" variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
      <img src={src} alt="annotation screenshot" className="max-h-full max-w-full rounded-lg border border-loupe-line bg-loupe-bg object-contain shadow-2xl shadow-black/50" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

function SegmentButton({ active, children, count, onClick }: { active: boolean; children: React.ReactNode; count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-[11px] text-loupe-muted transition-all hover:text-loupe-fg active:scale-[0.98]",
        active && "bg-loupe-elev text-loupe-fg",
      )}
      onClick={onClick}
    >
      <span>{children}</span>
      <span
        className={cn(
          "grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-semibold leading-none",
          active ? "bg-loupe-fg text-loupe-bg" : "border border-loupe-line-strong bg-white/10 text-loupe-muted",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function Logo() {
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-lg border border-loupe-line bg-loupe-elev/85">
      <Search className="h-4 w-4 text-loupe-muted" />
    </span>
  );
}

function BrandFooter() {
  return (
    <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-loupe-line px-3 py-2 text-loupe-muted">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium">
        <span className="grid h-5 w-5 shrink-0 place-items-center overflow-hidden rounded-full border border-loupe-line bg-loupe-elev/85">
          <Search className="h-3 w-3" />
        </span>
        Powered by Loupe
      </span>
      <button
        type="button"
        title="Open Loupe on GitHub"
        className="inline-flex h-7 items-center gap-1.5 rounded-md border border-loupe-line bg-transparent px-2 text-[11px] font-semibold text-loupe-muted transition-colors hover:border-loupe-line-strong hover:text-loupe-fg"
        onClick={() => window.open(GITHUB_REPO_URL, "_blank", "noopener,noreferrer")}
      >
        <span className="grid h-3.5 w-3.5 place-items-center" dangerouslySetInnerHTML={{ __html: GITHUB_LOGO_SVG }} />
        GitHub
      </button>
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

function filterReferencesByDomain(refs: ReferenceItem[], query: string): Array<[string, ReferenceItem[]]> {
  const q = normalizeSearch(query);
  const map = new Map<string, ReferenceItem[]>();
  for (const ref of refs) {
    const key = hostLabel(ref.url);
    const domainMatch = normalizeSearch(key).includes(q);
    const refMatch = [ref.note, ref.title, ref.url, ref.id].some((value) => normalizeSearch(value).includes(q));
    if (q && !domainMatch && !refMatch) continue;
    (map.get(key) ?? map.set(key, []).get(key)!).push(ref);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function normalizeSearch(value: string | undefined): string {
  return (value ?? "").toLowerCase().trim();
}

function componentCrumb(a: StoredAnnotation): string {
  return a.target.componentChain.map((c) => c.name).join(" › ") || a.target.tag;
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
  return event.composedPath().some((node) => node instanceof HTMLElement && node.hasAttribute(attribute));
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

async function urlToDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`reference image responded ${res.status}`);
  return fileToDataUrl(new File([await res.blob()], "reference.png"));
}
