/**
 * Tailwind class-name map + brand constants shared between the imperative
 * overlay layers (armed / dragging / recording) in `selection.ts` and the React
 * editing panel in `edit-panel.tsx`. Kept in a plain `.ts` module so Tailwind's
 * `@source` scan picks the class strings up regardless of which file uses them.
 */

export const GITHUB_REPO_URL = "https://github.com/woddlepad/loupe";

/** Loupe brand mark — a magnifying glass with a lens highlight, matching the
 * extension icon. Distinct from the plain lucide `Search` glyph. */
export const LOUPE_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2"/><path d="M7.3 8.6a3.8 3.8 0 0 1 2.6-2.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="m15.4 15.4 5.1 5.1" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';

export const GITHUB_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/></svg>';

export const C = {
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
    "fixed box-border w-[min(340px,calc(100vw-24px))] rounded-loupe bg-loupe-panel/95 border border-loupe-line text-loupe-fg shadow-2xl shadow-black/50 p-3 text-[13px] loupe-animate-panel",
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
