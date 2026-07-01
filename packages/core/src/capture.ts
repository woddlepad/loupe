import type { AnnotationTarget, Rect } from "./model.js";
import { componentChainFor } from "./framework-adapter.js";

/** Collect every `data-*` attribute on an element as a plain record. */
function dataAttributes(el: Element): Record<string, string> {
  const out: Record<string, string> = {};
  for (const attr of Array.from(el.attributes)) {
    if (attr.name.startsWith("data-")) out[attr.name] = attr.value;
  }
  return out;
}

/**
 * Build a best-effort, reasonably stable CSS selector for an element: prefer an
 * id, then a `data-testid`/`data-slot`, otherwise walk up to 4 ancestors using
 * tag + nth-of-type. This is for human/agent orientation, not guaranteed unique.
 */
export function cssSelector(el: Element): string {
  if (el.id) return `#${CSS.escape(el.id)}`;

  const testid = el.getAttribute("data-testid");
  if (testid) return `[data-testid="${cssEscapeAttr(testid)}"]`;

  const parts: string[] = [];
  let node: Element | null = el;
  let depth = 0;
  while (node && node.nodeType === 1 && depth < 4 && node !== document.body) {
    let part = node.tagName.toLowerCase();
    const parent = node.parentElement;
    if (parent) {
      const sameTag = Array.from(parent.children).filter(
        (c) => c.tagName === node!.tagName,
      );
      if (sameTag.length > 1) {
        part += `:nth-of-type(${sameTag.indexOf(node) + 1})`;
      }
    }
    parts.unshift(part);
    node = node.parentElement;
    depth++;
  }
  return parts.join(" > ");
}

function cssEscapeAttr(value: string): string {
  return value.replace(/["\\]/g, "\\$&");
}

/** Rect of an element relative to the viewport, in CSS pixels. */
export function rectOf(el: Element): Rect {
  const r = el.getBoundingClientRect();
  return { x: r.x, y: r.y, width: r.width, height: r.height };
}

/**
 * Rank candidate elements intersecting a selection rectangle and return the
 * "dominant" one. Tight selections should land on controls; broad selections
 * should land on the region that explains the drawn rectangle, not the first
 * small child inside it.
 */
export function dominantElement(selection: Rect, root: ParentNode = document): Element | null {
  const all = Array.from(root.querySelectorAll<HTMLElement>("*"));
  const selectionArea = Math.max(1, selection.width * selection.height);
  let best: { el: Element; score: number } | null = null;

  for (const el of all) {
    if (isPageShell(el)) continue;
    if (isOverlayChrome(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;

    const overlap = intersectionArea(selection, r);
    if (overlap <= 0) continue;

    const elArea = r.width * r.height;
    const containment = overlap / elArea; // how much of the element is selected
    const coverage = overlap / selectionArea; // how much of the selection this element explains
    if (containment < 0.45 && coverage < 0.35) continue;

    const areaFit = Math.min(elArea, selectionArea) / Math.max(elArea, selectionArea);
    let score = coverage * 140 + containment * 45 + areaFit * 25;
    if (coverage < 0.08) score -= 30;
    if (el.hasAttribute("data-slot") || el.hasAttribute("data-testid")) score += 8;
    if (isRegionTag(el.tagName) || isRegionRole(el.getAttribute("role"))) score += 8;
    if (isMeaningfulTag(el.tagName) && coverage > 0.2) score += 4;
    score += Math.min(20, depthOf(el)) * 0.1;

    if (!best || score > best.score) best = { el, score };
  }

  return best?.el ?? null;
}

function isMeaningfulTag(tag: string): boolean {
  return ["BUTTON", "A", "INPUT", "SELECT", "TEXTAREA", "LABEL", "IMG", "SVG"].includes(tag);
}

function isRegionTag(tag: string): boolean {
  return ["ARTICLE", "ASIDE", "DIALOG", "FIELDSET", "FORM", "HEADER", "MAIN", "NAV", "SECTION"].includes(tag);
}

function isRegionRole(role: string | null): boolean {
  return role !== null && ["dialog", "form", "main", "menu", "navigation", "region", "tabpanel"].includes(role);
}

function isPageShell(el: Element): boolean {
  return el === document.documentElement || el === document.body;
}

function depthOf(el: Element): number {
  let depth = 0;
  for (let node = el.parentElement; node; node = node.parentElement) depth++;
  return depth;
}

/** Skip Loupe's own overlay nodes when hit-testing. */
function isOverlayChrome(el: Element): boolean {
  return el.closest("[data-loupe-overlay]") !== null;
}

function intersectionArea(a: Rect, b: DOMRect): number {
  const x = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
  const y = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
  return x * y;
}

/** Build the full AnnotationTarget for an element. */
export function captureTarget(el: Element): AnnotationTarget {
  const text = (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 200);
  return {
    tag: el.tagName.toLowerCase(),
    selector: cssSelector(el),
    text,
    dataAttributes: dataAttributes(el),
    className: typeof el.className === "string" ? el.className : "",
    componentChain: componentChainFor(el),
    elementRect: rectOf(el),
  };
}
