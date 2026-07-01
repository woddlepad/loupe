/**
 * Shared reference-library picker. One component backs both the drag-select
 * overlay (annotate) and the viewer's annotation detail view, so the "attach a
 * capture" experience stays identical in both places.
 *
 * It renders as a centered modal via a portal into `container` (the editing
 * iframe body for the overlay, the shadow-root overlay mount for the viewer).
 * That container must carry the Loupe styles + `.dark`; defaulting to the host
 * `document.body` would render the modal completely unstyled. Portalling out of
 * the caller's layout is also deliberate: the overlay panel keeps a residual
 * transform after its entry animation, which would otherwise become the
 * containing block for a `position: fixed` child and shove the modal off-screen.
 */
import { useMemo, useState } from "react";
import type { ReactElement } from "react";
import { createPortal } from "react-dom";
import { ChevronRight, X } from "lucide-react";
import { C } from "./overlay-classes.js";
import type { LibraryItem } from "./selection.js";

export function LibraryPicker({
  items,
  onAttach,
  onClose,
  container,
}: {
  items: LibraryItem[];
  /** Resolve + attach the chosen capture. Throwing surfaces the message inline. */
  onAttach: (id: string) => Promise<void>;
  onClose: () => void;
  /** Portal target. Defaults to the current document body. */
  container?: HTMLElement | null;
}): ReactElement | null {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [attaching, setAttaching] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const groups = useMemo(() => filteredLibraryGroups(items, query), [items, query]);

  const toggleDomain = (domain: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(domain)) next.delete(domain);
      else next.add(domain);
      return next;
    });
  };

  const attach = async (item: LibraryItem) => {
    if (attaching) return;
    setAttaching(item.id);
    setError(null);
    try {
      await onAttach(item.id);
      onClose();
    } catch (e) {
      setAttaching(null);
      setError(e instanceof Error ? e.message : "Could not load this reference image.");
    }
  };

  const target = container ?? (typeof document !== "undefined" ? document.body : null);
  if (!target) return null;

  return createPortal(
    <div
      className={C.pickerWrap}
      data-loupe-library-popover=""
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={C.picker} onMouseDown={(e) => e.stopPropagation()}>
        <div className={C.pickerHeader}>
          <div>
            <div className={C.pickerTitle}>Reference library</div>
            <div className={C.pickerDescription}>Choose a capture to attach.</div>
          </div>
          <button type="button" className={C.pickerClose} title="Close library" onClick={onClose}>
            <X width={14} height={14} aria-hidden />
          </button>
        </div>
        <div className="border-b border-loupe-line p-3">
          <input
            className={C.pickerSearch}
            type="search"
            placeholder="Search library"
            value={query}
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              // Keep Enter/Escape from bubbling to any host submit / close handlers.
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
              } else if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }
            }}
          />
        </div>
        {error ? (
          <div className="rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[12px] text-loupe-fg">{error}</div>
        ) : null}
        <div className={C.pickerList}>
          {items.length === 0 ? (
            <div className="rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint">
              No saved references yet
            </div>
          ) : groups.length === 0 ? (
            <div className="rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint">
              No matches
            </div>
          ) : (
            groups.map(([domain, groupItems]) => {
              const isCollapsed = collapsed.has(domain);
              return (
                <section key={domain}>
                  <button type="button" className={C.pickerGroupButton} onClick={() => toggleDomain(domain)}>
                    <ChevronRight
                      width={13}
                      height={13}
                      style={{ transform: isCollapsed ? "" : "rotate(90deg)", transition: "transform 150ms ease" }}
                      aria-hidden
                    />
                    <span>{domain}</span>
                    <span className={C.pickerGroupCount}>{groupItems.length}</span>
                  </button>
                  {!isCollapsed ? (
                    <div className={C.pickerGrid}>
                      {groupItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={C.pickCell}
                          title={item.caption}
                          disabled={attaching !== null}
                          onClick={() => void attach(item)}
                        >
                          <div className={C.pickImgWrap}>
                            {/* Blurred cover fills the 16:9 frame; the contained copy on
                                top keeps the whole capture visible whatever its shape. */}
                            <img className={C.refImgBlur} src={item.thumbUrl} alt="" aria-hidden />
                            <img className={C.refImg} src={item.thumbUrl} alt="" />
                          </div>
                          <div className={C.pickText}>{item.caption || item.url || item.id}</div>
                          <div className={C.pickMeta}>
                            {attaching === item.id
                              ? "Attaching..."
                              : item.createdAt
                                ? captureDateLabel(item.createdAt)
                                : item.url || item.id}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>,
    target,
  );
}

// --- library grouping helpers ---

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
