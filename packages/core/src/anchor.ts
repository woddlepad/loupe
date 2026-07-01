/**
 * Re-anchoring: given a saved annotation, work out where it should be drawn
 * *right now* by locating the live DOM element it was attached to, so pins and
 * highlights follow their component through scroll, reflow, and responsive
 * layout changes instead of sitting at the frozen coordinates from capture time.
 *
 * Everything here returns viewport CSS pixels, so callers place the overlay with
 * plain `fixed` positioning and no scroll math of their own.
 */

import { rectOf } from "./capture.js";
import type { Annotation, AnnotationTarget, Rect } from "./model.js";

export interface AnchoredRect extends Rect {
  /**
   * True when we re-anchored to the live DOM element; false when the element
   * could not be found and we fell back to the frozen document coordinates
   * captured at annotation time.
   */
  anchored: boolean;
}

/**
 * Where to draw {@link annotation} in the current layout, in viewport CSS
 * pixels. Prefers the live position of the anchor element; falls back to the
 * stored document coordinates (rect + capture-time scroll) when the element is
 * gone or predates the {@link AnnotationTarget.elementRect} field.
 */
export function resolveAnchorRect(annotation: Annotation): AnchoredRect {
  const el = findAnchorElement(annotation.target);
  const elementRect = annotation.target.elementRect;
  if (el && elementRect) {
    const live = rectOf(el);
    // The drawn selection's offset within the anchor element is layout-invariant
    // (both were measured in the same viewport frame), so re-apply it to wherever
    // the element sits now.
    return {
      x: live.x + (annotation.rect.x - elementRect.x),
      y: live.y + (annotation.rect.y - elementRect.y),
      width: annotation.rect.width,
      height: annotation.rect.height,
      anchored: true,
    };
  }
  const docX = annotation.rect.x + (annotation.scroll?.x ?? 0);
  const docY = annotation.rect.y + (annotation.scroll?.y ?? 0);
  return {
    x: docX - window.scrollX,
    y: docY - window.scrollY,
    width: annotation.rect.width,
    height: annotation.rect.height,
    anchored: false,
  };
}

/**
 * Best-effort recovery of the DOM element an annotation was attached to. Tries
 * the stored CSS selector first (its primary signal), then a bounded scan by
 * tag when the selector no longer matches, disambiguating by text and
 * `data-*`/class hints. Returns null when nothing plausible is found.
 */
export function findAnchorElement(target: AnnotationTarget): Element | null {
  const bySelector = candidatesFor(target.selector);
  if (bySelector.length === 1) return bySelector[0]!;
  if (bySelector.length > 1) return bestMatch(bySelector, target);

  // The selector went stale (reordered siblings, changed ids, …). Fall back to a
  // bounded scan of same-tag elements and require a real content match so we
  // never anchor to an arbitrary lookalike.
  if (!target.tag) return null;
  const byTag = candidatesFor(target.tag).slice(0, MAX_FALLBACK_SCAN);
  if (byTag.length === 0) return null;
  const scored = byTag
    .map((el) => ({ el, score: scoreCandidate(el, target) }))
    .sort((a, b) => b.score - a.score)[0]!;
  return scored.score >= MIN_FALLBACK_SCORE ? scored.el : null;
}

const MAX_FALLBACK_SCAN = 400;
const MIN_FALLBACK_SCORE = 2;

function candidatesFor(selector: string): Element[] {
  if (!selector) return [];
  let nodes: NodeListOf<Element>;
  try {
    nodes = document.querySelectorAll(selector);
  } catch {
    return []; // A selector the current DOM/engine rejects — treat as no match.
  }
  const out: Element[] = [];
  for (const el of nodes) {
    if (el === document.documentElement || el === document.body) continue;
    if (el.closest("[data-loupe-overlay]")) continue; // Never anchor to our own UI.
    out.push(el);
  }
  return out;
}

function bestMatch(candidates: Element[], target: AnnotationTarget): Element {
  return candidates
    .map((el) => ({ el, score: scoreCandidate(el, target) }))
    .sort((a, b) => b.score - a.score)[0]!.el;
}

/** Higher = more likely to be the original element. */
function scoreCandidate(el: Element, target: AnnotationTarget): number {
  let score = 0;
  if (el.tagName.toLowerCase() === target.tag) score += 1;

  if (target.text) {
    const text = (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 200);
    if (text === target.text) score += 3;
    else if (text && (text.includes(target.text) || target.text.includes(text))) score += 1;
  }

  for (const [name, value] of Object.entries(target.dataAttributes)) {
    if (el.getAttribute(name) === value) score += 2;
  }

  if (target.className && typeof el.className === "string") {
    const want = new Set(target.className.split(/\s+/).filter(Boolean));
    const have = new Set(el.className.split(/\s+/).filter(Boolean));
    let shared = 0;
    for (const c of want) if (have.has(c)) shared++;
    if (want.size > 0) score += (shared / want.size) * 2;
  }

  return score;
}
