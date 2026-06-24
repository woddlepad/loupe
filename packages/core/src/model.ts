/**
 * The Loupe data model — the contract shared by the overlay (core), the
 * extension shell, and the bridge daemon. Keep it serializable: everything here
 * crosses a postMessage boundary and gets written to disk as JSON.
 */

/** A rectangle in CSS pixels, relative to the top-left of the viewport. */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** One link in the component ancestry (innermost first). */
export interface ComponentRef {
  /** `displayName || name` of the component, e.g. "Button". */
  name: string;
  /** Runtime that exposed this component hint, when known. */
  framework?: "react" | "vue" | string;
  /** Whether this is a host (DOM) element rather than a component. */
  host?: boolean;
}

/**
 * What we managed to learn about the element under the selection, from the DOM
 * and (when present) the React fiber tree. The bridge uses these signals to
 * resolve a source file.
 */
export interface AnnotationTarget {
  /** Tag name of the dominant element, e.g. "button". */
  tag: string;
  /** A best-effort stable CSS selector for the element. */
  selector: string;
  /** Trimmed, truncated text content — a strong disambiguator for the agent. */
  text: string;
  /** `data-*` attributes verbatim (data-slot, data-testid, data-variant, …). */
  dataAttributes: Record<string, string>;
  /** className string, as authored. */
  className: string;
  /** Component ancestry, innermost first. Empty if no supported framework was found. */
  componentChain: ComponentRef[];
}

/** A computed suggestion chip offered to the user before they write a note. */
export interface Suggestion {
  /** Stable key, e.g. "padding", "spacing", "typography". */
  kind: SuggestionKind;
  /** Human label shown on the chip, e.g. "fix padding". */
  label: string;
  /** Short rationale shown on hover / sent to the agent if selected. */
  detail: string;
}

export type SuggestionKind =
  | "padding"
  | "spacing"
  | "typography"
  | "alignment"
  | "contrast"
  | "radius"
  | "size";

/**
 * A complete annotation. The screenshot is attached by the extension as a base64
 * PNG data URL after the user submits, so it is optional at capture time.
 */
export interface Annotation {
  /** Stable id; the bridge derives the bundle directory name from it. */
  id: string;
  /** Page URL the annotation was made on. */
  url: string;
  /** Page title at capture time. */
  title: string;
  /** Selection rectangle in CSS pixels. */
  rect: Rect;
  /** Device pixel ratio, so the bridge can reason about the screenshot scale. */
  devicePixelRatio: number;
  /** Scroll offset at capture time, so a viewer can place pins in document space. */
  scroll?: { x: number; y: number };
  /** What was under the selection. */
  target: AnnotationTarget;
  /** Suggestions the user accepted (subset of what was offered). */
  acceptedSuggestions: Suggestion[];
  /** Free-form note. */
  note: string;
  /**
   * Reference images for comparison — e.g. a screenshot of the Notion section
   * you want this to look like. Carried as data URLs from the extension; the
   * bridge writes them into the bundle's refs/ and replaces dataUrl with file.
   */
  references?: AnnotationReference[];
  /** ISO-8601 creation time, stamped by the extension. */
  createdAt: string;
  /**
   * Optional group this annotation belongs to, e.g. "notes UI refactor". Keeps
   * a batch of related annotations together so they can be reviewed and sent to
   * an agent as a unit without mixing with unrelated work. Empty = "inbox".
   */
  group?: string;
  /** Lifecycle, advanced by the agent/teammate via comments. */
  status?: AnnotationStatus;
  /**
   * Thread of follow-ups. The agent appends here when it implements the change
   * and moves it to needs_review; teammates can reply or resolve it. Populated
   * when reading a bundle.
   */
  comments?: AnnotationComment[];
  /** base64 PNG data URL of the cropped screenshot (set by the background SW). */
  screenshotDataUrl?: string;
}

export type AnnotationStatus = "open" | "needs_review" | "resolved";

/** A reference image attached to an annotation ("make it look like this"). */
export interface AnnotationReference {
  /** Optional caption, e.g. "Notion section to match". */
  caption?: string;
  /** base64 data URL (extension side, before the bridge persists it). */
  dataUrl?: string;
  /** Filename within the bundle's refs/ dir (set by the bridge). */
  file?: string;
}

/** One follow-up on an annotation (from an agent or a person). */
export interface AnnotationComment {
  /** Who wrote it, e.g. "agent:claude" or a display name. */
  author: string;
  /** Markdown body. */
  body: string;
  /** ISO-8601 time. */
  createdAt: string;
  /** Optional status this comment moves the annotation to. */
  status?: AnnotationStatus;
}

/**
 * An action the user can route an annotation to (a button in the panel). The
 * bridge advertises the available set via `GET /actions`; the handler runs
 * server-side. Built-ins are "save" and the configured agents; integrations
 * (e.g. Linear) and custom `.loupe/actions/*.mjs` scripts add more.
 */
export interface ActionDescriptor {
  /** Stable id, e.g. "save", "claude", "linear". */
  id: string;
  /** Button label, e.g. "Save to repo", "Claude", "Create Linear issue". */
  label: string;
  /** Optional one-line hint shown on hover. */
  hint?: string;
}

/** The payload the extension POSTs to the bridge. */
export interface AnnotatePayload {
  annotation: Annotation;
  /** Action ids to run. The annotation is always written to the repo first. */
  actions: string[];
}
