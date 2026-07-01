/**
 * React editing panel for the Loupe drag-select overlay. Replaces the three
 * imperative `render*Editing` panels in `selection.ts` (annotate / reference /
 * recording) with a single component tree built from the shared `@loupe/ui`
 * atoms. The overlay owns all editing state and re-renders this tree via
 * `createRoot(frameDoc.body)`; every user change flows back through the callback
 * props so draft persistence and annotation building stay exactly as before.
 *
 * Pointer/geometry/capture logic stays in `selection.ts` — this file is purely
 * the panel's presentation + local UI affordances (searchable group combobox,
 * reference-image row, library picker).
 */
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import {
  Check,
  ChevronDown,
  ImagePlus,
  Library,
  X,
} from "lucide-react";
import { Button, PortalContainerProvider, Textarea } from "@loupe/ui";
import { C, GITHUB_LOGO_SVG, GITHUB_REPO_URL, LOUPE_LOGO_SVG } from "./overlay-classes.js";
import { LibraryPicker } from "./library-picker.js";
import type { ActionDescriptor, AnnotationTarget, Rect } from "./model.js";
import type { LibraryItem } from "./selection.js";

const CLAUDE_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="257" preserveAspectRatio="xMidYMid" viewBox="0 0 256 257"><path fill="currentColor" d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"/></svg>';

const OPENAI_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="260" preserveAspectRatio="xMidYMid" viewBox="0 0 256 260"><path fill="#fff" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/></svg>';

const PI_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6h16v2h-3v10h-2V8H9v10H7V8H4z"/></svg>';

// GitHub Copilot mark (via svgl.app).
const COPILOT_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 208"><path fill="currentColor" d="M205.3 31.4c14 14.8 20 35.2 22.5 63.6 6.6 0 12.8 1.5 17 7.2l7.8 10.6c2.2 3 3.4 6.6 3.4 10.4v28.7a12 12 0 0 1-4.8 9.5C215.9 187.2 172.3 208 128 208c-49 0-98.2-28.3-123.2-46.6a12 12 0 0 1-4.8-9.5v-28.7c0-3.8 1.2-7.4 3.4-10.5l7.8-10.5c4.2-5.7 10.4-7.2 17-7.2 2.5-28.4 8.4-48.8 22.5-63.6C77.3 3.2 112.6 0 127.6 0h.4c14.7 0 50.4 2.9 77.3 31.4ZM128 78.7c-3 0-6.5.2-10.3.6a27.1 27.1 0 0 1-6 12.1 45 45 0 0 1-32 13c-6.8 0-13.9-1.5-19.7-5.2-5.5 1.9-10.8 4.5-11.2 11-.5 12.2-.6 24.5-.6 36.8 0 6.1 0 12.3-.2 18.5 0 3.6 2.2 6.9 5.5 8.4C79.9 185.9 105 192 128 192s48-6 74.5-18.1a9.4 9.4 0 0 0 5.5-8.4c.3-18.4 0-37-.8-55.3-.4-6.6-5.7-9.1-11.2-11-5.8 3.7-13 5.1-19.7 5.1a45 45 0 0 1-32-12.9 27.1 27.1 0 0 1-6-12.1c-3.4-.4-6.9-.5-10.3-.6Zm-27 44c5.8 0 10.5 4.6 10.5 10.4v19.2a10.4 10.4 0 0 1-20.8 0V133c0-5.8 4.6-10.4 10.4-10.4Zm53.4 0c5.8 0 10.4 4.6 10.4 10.4v19.2a10.4 10.4 0 0 1-20.8 0V133c0-5.8 4.7-10.4 10.4-10.4Zm-73-94.4c-11.2 1.1-20.6 4.8-25.4 10-10.4 11.3-8.2 40.1-2.2 46.2A31.2 31.2 0 0 0 75 91.7c6.8 0 19.6-1.5 30.1-12.2 4.7-4.5 7.5-15.7 7.2-27-.3-9.1-2.9-16.7-6.7-19.9-4.2-3.6-13.6-5.2-24.2-4.3Zm69 4.3c-3.8 3.2-6.4 10.8-6.7 19.9-.3 11.3 2.5 22.5 7.2 27a41.7 41.7 0 0 0 30 12.2c8.9 0 17-2.9 21.3-7.2 6-6.1 8.2-34.9-2.2-46.3-4.8-5-14.2-8.8-25.4-9.9-10.6-1-20 .7-24.2 4.3ZM128 56c-2.6 0-5.6.2-9 .5.4 1.7.5 3.7.7 5.7 0 1.5 0 3-.2 4.5 3.2-.3 6-.3 8.5-.3 2.6 0 5.3 0 8.5.3-.2-1.6-.2-3-.2-4.5.2-2 .3-4 .7-5.7-3.4-.3-6.4-.5-9-.5Z"/></svg>';

const CLAUDE_COLOR = "#d97757";

export interface EditPanelReference {
  dataUrl: string;
}

export interface LoupeEditPanelProps {
  variant: "annotate" | "reference" | "recording";
  title: string;
  /** Structured target for annotate crumbs (component chain / data-slot / text). */
  target?: AnnotationTarget | null;
  /** Plain-text crumbs for reference / recording. */
  crumbsText?: string;
  placeholder: string;
  /** Overrides the default panel width (recording panel is slightly wider). */
  panelWidth?: string;
  /** Marquee outline drawn for anchored (annotate / reference) panels. */
  marquee?: Rect | null;

  screenshotUrl?: string | null;
  videoUrl?: string | null;

  note: string;
  onNoteChange: (value: string) => void;

  // Group selector (annotate + recording).
  showGroup?: boolean;
  groups: string[];
  group: string;
  onGroupChange: (value: string) => void;
  onCreateGroup: (name: string) => void | Promise<void>;

  // Reference-image row (annotate).
  showRefs?: boolean;
  refs?: EditPanelReference[];
  onAddFiles?: (files: File[]) => void;
  onRemoveRef?: (index: number) => void;
  library?: LibraryItem[];
  resolveLibraryImage?: (id: string) => Promise<string | null>;
  onAttachLibraryImage?: (dataUrl: string) => void;

  // Actions.
  actions: ActionDescriptor[];
  defaultActionId: string;
  submittingActionId?: string | null;
  onSubmit: (actionId: string) => void | Promise<void>;
  error?: string | null;

  onClose: () => void;

  /** Ref to the outer panel element so the overlay can run geometry placement. */
  panelRef?: (el: HTMLElement | null) => void;
  /** Frame body used as the Radix portal target for any portalled sub-menus. */
  portalContainer: HTMLElement;
}

/** Wrap the panel so any portalled `@loupe/ui` layer targets the editing iframe. */
export function editPanelElement(props: LoupeEditPanelProps): ReactElement {
  return (
    <PortalContainerProvider value={props.portalContainer}>
      <LoupeEditPanel {...props} />
    </PortalContainerProvider>
  );
}

export function LoupeEditPanel(props: LoupeEditPanelProps): ReactElement {
  const {
    variant,
    title,
    target,
    crumbsText,
    placeholder,
    panelWidth,
    marquee,
    screenshotUrl,
    videoUrl,
    note,
    onNoteChange,
    showGroup,
    groups,
    group,
    onGroupChange,
    onCreateGroup,
    showRefs,
    refs,
    onAddFiles,
    onRemoveRef,
    library,
    resolveLibraryImage,
    onAttachLibraryImage,
    actions,
    defaultActionId,
    submittingActionId,
    onSubmit,
    error,
    onClose,
    panelRef,
  } = props;

  const submitting = submittingActionId != null;
  const hasDefault = actions.some((a) => a.id === defaultActionId);

  const onPanelKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (
      e.key !== "Enter" ||
      e.shiftKey ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.nativeEvent.isComposing ||
      !(e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement)
    ) {
      return;
    }
    if (!hasDefault || submitting) return;
    e.preventDefault();
    void onSubmit(defaultActionId);
  };

  return (
    <div className={C.layer} style={{ cursor: "default" }}>
      <div className={C.dim} />
      {marquee ? (
        <div
          className={C.marquee}
          style={{ left: marquee.x, top: marquee.y, width: marquee.width, height: marquee.height }}
        />
      ) : null}

      <div ref={panelRef} className={C.panel} style={panelWidth ? { width: panelWidth } : undefined} onKeyDown={onPanelKeyDown}>
        <button
          type="button"
          className={C.close}
          title={variant === "recording" ? "discard recording" : "cancel"}
          onClick={onClose}
        >
          <X width={15} height={15} aria-hidden />
        </button>

        <div className={C.title}>{title}</div>
        <div className={C.crumbs}>{target ? <Crumbs target={target} /> : crumbsText}</div>

        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            playsInline
            muted
            style={{ marginTop: 10, width: "100%", borderRadius: 8, background: "#000", maxHeight: 200 }}
          />
        ) : null}
        {screenshotUrl ? (
          <img
            src={screenshotUrl}
            alt=""
            style={{ marginTop: 10, width: "100%", borderRadius: 8, background: "#000", maxHeight: 200, objectFit: "contain" }}
          />
        ) : null}

        <Textarea
          className="mt-2.5 resize-y text-[13px]"
          placeholder={placeholder}
          value={note}
          autoFocus
          onChange={(e) => onNoteChange(e.target.value)}
        />

        {showGroup ? (
          <GroupCombobox groups={groups} value={group} onChange={onGroupChange} onCreate={onCreateGroup} />
        ) : null}

        {showRefs ? (
          <RefsRow
            refs={refs ?? []}
            onAddFiles={onAddFiles}
            onRemoveRef={onRemoveRef}
            library={library ?? []}
            resolveLibraryImage={resolveLibraryImage}
            onAttach={onAttachLibraryImage}
            portalContainer={props.portalContainer}
          />
        ) : null}

        {error ? (
          <div className="mt-2.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-2 text-[12px] leading-snug text-loupe-fg whitespace-pre-line">
            {error}
          </div>
        ) : null}

        <div className={C.actions}>
          {actions.map((a) => {
            const isDefault = a.id === defaultActionId;
            return (
              <Button
                key={a.id}
                type="button"
                variant={isDefault ? "default" : "secondary"}
                className="w-full"
                loading={submittingActionId === a.id}
                disabled={submitting && submittingActionId !== a.id}
                title={a.hint}
                onClick={() => void onSubmit(a.id)}
              >
                <ActionIcon action={a} />
                <span>{actionLabel(a)}</span>
              </Button>
            );
          })}
        </div>

        <BrandFooter />
      </div>
    </div>
  );
}

function Crumbs({ target }: { target: AnnotationTarget }): ReactElement {
  const parts: ReactNode[] = [];
  let hasContent = false;
  const separator = () => {
    if (hasContent) parts.push(<span key={`sep-${parts.length}`}> · </span>);
    hasContent = true;
  };

  if (target.componentChain.length) {
    separator();
    target.componentChain.forEach((c, index) => {
      if (index > 0) parts.push(<span key={`arrow-${index}`}> › </span>);
      parts.push(
        <code key={`comp-${index}`} className={C.code}>
          {c.name}
        </code>,
      );
    });
  }
  const slot = target.dataAttributes["data-slot"];
  if (slot) {
    separator();
    parts.push(
      <span key="slot">
        data-slot=
        <code className={C.code}>{slot}</code>
      </span>,
    );
  }
  if (target.text) {
    separator();
    parts.push(<span key="text">{`"${target.text.slice(0, 48)}"`}</span>);
  }
  if (!hasContent) {
    parts.push(
      <code key="selector" className={C.code}>
        {target.selector}
      </code>,
    );
  }
  return <>{parts}</>;
}

function GroupCombobox({
  groups,
  value,
  onChange,
  onCreate,
}: {
  groups: string[];
  value: string;
  onChange: (value: string) => void;
  onCreate: (name: string) => void | Promise<void>;
}): ReactElement {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const sorted = useMemo(
    () => [...new Set(groups.map((g) => g.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [groups],
  );

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const selected = value.trim();
  const close = () => setOpen(false);
  const openMenu = () => {
    setQuery("");
    setOpen(true);
  };
  const select = (g: string) => {
    onChange(g);
    close();
    triggerRef.current?.focus();
  };
  const trimmed = query.trim();
  const matches = sorted.filter((g) => g.toLowerCase().includes(trimmed.toLowerCase()));
  const exact = sorted.some((g) => g.toLowerCase() === trimmed.toLowerCase());
  const createAndSelect = async () => {
    if (!trimmed) return;
    if (!exact) await onCreate(trimmed);
    select(trimmed);
  };

  return (
    <div className={C.groupCombo}>
      <button
        ref={triggerRef}
        type="button"
        className={C.groupComboButton}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        title="Select group"
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={(e) => {
          if (e.key !== "ArrowDown" && e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          openMenu();
        }}
      >
        <span className={selected ? "" : C.groupComboPlaceholder}>{selected || "Select a group"}</span>
        <ChevronDown width={14} height={14} style={{ flexShrink: 0 }} aria-hidden />
      </button>
      {open ? (
        <div className={C.groupComboPopover} onMouseDown={(e) => e.preventDefault()}>
          <div className={C.groupComboSearchWrap}>
            <input
              ref={searchRef}
              className={C.groupComboSearch}
              type="search"
              placeholder="Search groups"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => setTimeout(close, 120)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  void createAndSelect();
                }
                if (e.key === "Escape") {
                  e.preventDefault();
                  e.stopPropagation();
                  close();
                  triggerRef.current?.focus();
                }
              }}
            />
          </div>
          <div className={C.groupComboMenu} role="listbox">
            {matches.map((g) => (
              <button
                key={g}
                type="button"
                role="option"
                aria-selected={g === selected}
                className={C.groupComboItem}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(g)}
              >
                <span>{g}</span>
                <Check
                  width={13}
                  height={13}
                  className={g === selected ? C.groupComboCheckSelected : C.groupComboCheck}
                  aria-hidden
                />
              </button>
            ))}
            {trimmed && !exact ? (
              <button
                type="button"
                className={C.groupComboCreate}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => void createAndSelect()}
              >
                {`Create "${trimmed}"`}
              </button>
            ) : null}
            {matches.length === 0 && !(trimmed && !exact) ? (
              <div className="px-2 py-1.5 text-[12px] text-loupe-faint">No groups</div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RefsRow({
  refs,
  onAddFiles,
  onRemoveRef,
  library,
  resolveLibraryImage,
  onAttach,
  portalContainer,
}: {
  refs: EditPanelReference[];
  onAddFiles?: (files: File[]) => void;
  onRemoveRef?: (index: number) => void;
  library: LibraryItem[];
  resolveLibraryImage?: (id: string) => Promise<string | null>;
  onAttach?: (dataUrl: string) => void;
  portalContainer?: HTMLElement | null;
}): ReactElement {
  const [pickerOpen, setPickerOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className={C.refsRow}>
        <Button type="button" variant="outline" size="sm" title="Add reference image (or paste)" onClick={() => fileRef.current?.click()}>
          <ImagePlus width={14} height={14} aria-hidden />
          <span>Add ref</span>
        </Button>
        {library.length > 0 ? (
          <Button type="button" variant="outline" size="sm" onClick={() => setPickerOpen(true)}>
            <Library width={14} height={14} aria-hidden />
            <span>From library</span>
          </Button>
        ) : null}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length) onAddFiles?.(files);
            e.target.value = "";
          }}
        />
        {refs.map((ref, i) => (
          <div key={i} className={C.refThumb}>
            <img className={C.refImgBlur} src={ref.dataUrl} alt="" aria-hidden />
            <img className={C.refImg} src={ref.dataUrl} alt="" />
            <button type="button" className={C.refRemove} onClick={() => onRemoveRef?.(i)}>
              ✕
            </button>
          </div>
        ))}
      </div>
      {pickerOpen && resolveLibraryImage ? (
        <LibraryPicker
          items={library}
          container={portalContainer}
          onAttach={async (id) => {
            const dataUrl = await resolveLibraryImage(id);
            if (!dataUrl) throw new Error("Could not load this reference image.");
            onAttach?.(dataUrl);
          }}
          onClose={() => setPickerOpen(false)}
        />
      ) : null}
    </>
  );
}

function BrandFooter(): ReactElement {
  return (
    <div className={C.brandPanel}>
      <div className={C.brandText}>
        <span className={C.brandMark}>
          <RawSvg svg={LOUPE_LOGO_SVG} size={12} />
        </span>
        <span>Powered by Loupe</span>
      </div>
      <button
        type="button"
        className={C.github}
        title="Open Loupe on GitHub"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(GITHUB_REPO_URL, "_blank", "noopener,noreferrer");
        }}
      >
        <RawSvg svg={GITHUB_LOGO_SVG} size={14} />
        <span>GitHub</span>
      </button>
    </div>
  );
}

function ActionIcon({ action }: { action: ActionDescriptor }): ReactElement | null {
  const id = action.id.toLowerCase();
  const label = action.label.toLowerCase();
  if (id === "save" || id === "reference" || label.includes("save")) return null;
  if (id.includes("claude") || label.includes("claude")) return <RawSvg svg={CLAUDE_LOGO_SVG} size={15} color={CLAUDE_COLOR} />;
  if (id.includes("openai") || id.includes("codex") || label.includes("openai") || label.includes("codex"))
    return <RawSvg svg={OPENAI_LOGO_SVG} size={15} />;
  if (id.includes("copilot") || label.includes("copilot")) return <RawSvg svg={COPILOT_LOGO_SVG} size={15} />;
  if (id === "pi" || label === "pi") return <RawSvg svg={PI_LOGO_SVG} size={15} />;
  return null;
}

function RawSvg({ svg, size, color }: { svg: string; size: number; color?: string }): ReactElement {
  return (
    <span
      aria-hidden
      style={{ display: "inline-flex", flexShrink: 0, color, width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: sizedSvg(svg, size) }}
    />
  );
}

function sizedSvg(svg: string, size: number): string {
  return svg.replace(/\swidth="[^"]*"/, ` width="${size}"`).replace(/\sheight="[^"]*"/, ` height="${size}"`);
}

function actionLabel(action: ActionDescriptor): string {
  const cleaned = action.label.replace(/^\s*(?:→|->|➜|›|»)\s*/, "").trim();
  return capitalizeFirst(cleaned || action.id);
}

function capitalizeFirst(label: string): string {
  const i = label.search(/[A-Za-z]/);
  if (i < 0) return label;
  return label.slice(0, i) + label[i]!.toUpperCase() + label.slice(i + 1);
}
