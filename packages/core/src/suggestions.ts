import type { Suggestion } from "./model.js";

/**
 * Offer a small set of suggestion chips by inspecting computed styles. These are
 * *hints* the user can accept to enrich the note — never auto-fixes. The goal is
 * to surface the kinds of nits people actually file ("padding's off", "type
 * scale is wrong") so the note can be one tap instead of a sentence.
 */
export function suggestionsFor(el: Element): Suggestion[] {
  const cs = getComputedStyle(el);
  const out: Suggestion[] = [];

  // Padding that isn't on a 4px grid is a common design-system slip.
  const pads = ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]
    .map((p) => parseFloat(cs[p as keyof CSSStyleDeclaration] as string) || 0);
  if (pads.some((p) => p > 0 && p % 4 !== 0)) {
    out.push({
      kind: "padding",
      label: "fix padding",
      detail: `padding ${pads.map((p) => `${p}px`).join(" ")} isn't on the 4px grid`,
    });
  } else if (asymmetric(pads[0]!, pads[2]!) || asymmetric(pads[1]!, pads[3]!)) {
    out.push({
      kind: "padding",
      label: "fix padding",
      detail: `padding looks asymmetric (${pads.map((p) => `${p}px`).join(" ")})`,
    });
  }

  // Gap / margins between siblings — spacing rhythm.
  const gap = parseFloat(cs.gap) || 0;
  if (gap > 0 && gap % 4 !== 0) {
    out.push({ kind: "spacing", label: "fix spacing", detail: `gap ${gap}px isn't on the 4px grid` });
  }

  // Typography: odd font-size or a line-height that's too tight/loose.
  const fontSize = parseFloat(cs.fontSize) || 0;
  const lineHeight = parseFloat(cs.lineHeight) || 0;
  if (fontSize > 0 && fontSize % 1 !== 0) {
    out.push({ kind: "typography", label: "fix typography", detail: `font-size ${fontSize}px is fractional` });
  } else if (lineHeight > 0 && fontSize > 0) {
    const ratio = lineHeight / fontSize;
    if (ratio < 1.1 || ratio > 2) {
      out.push({
        kind: "typography",
        label: "fix typography",
        detail: `line-height ratio ${ratio.toFixed(2)} looks off for ${fontSize}px text`,
      });
    }
  }

  // Border radius that isn't a token-ish value.
  const radius = parseFloat(cs.borderTopLeftRadius) || 0;
  if (radius > 0 && radius % 2 !== 0 && radius !== 9999) {
    out.push({ kind: "radius", label: "fix radius", detail: `border-radius ${radius}px is unusual` });
  }

  // Text contrast against its own background (cheap WCAG-ish check).
  const contrast = contrastRatio(cs.color, effectiveBackground(el));
  if (contrast !== null && contrast < 4.5) {
    out.push({
      kind: "contrast",
      label: "fix contrast",
      detail: `text/background contrast ~${contrast.toFixed(1)}:1 (below 4.5:1)`,
    });
  }

  // Always offer the generic "move / restructure" affordances at the end.
  out.push({ kind: "alignment", label: "fix alignment", detail: "alignment within the layout looks off" });
  out.push({ kind: "size", label: "fix size", detail: "the element's size/proportions look off" });

  return dedupe(out);
}

function asymmetric(a: number, b: number): boolean {
  return Math.abs(a - b) > 1 && (a > 0 || b > 0);
}

function dedupe(list: Suggestion[]): Suggestion[] {
  const seen = new Set<string>();
  return list.filter((s) => (seen.has(s.kind) ? false : (seen.add(s.kind), true)));
}

/** Walk up to find the first non-transparent background color. */
function effectiveBackground(el: Element): string {
  let node: Element | null = el;
  while (node) {
    const bg = getComputedStyle(node).backgroundColor;
    const rgb = parseColor(bg);
    if (rgb && rgb.a > 0) return bg;
    node = node.parentElement;
  }
  return "rgb(255, 255, 255)";
}

interface Rgb {
  r: number;
  g: number;
  b: number;
  a: number;
}

function parseColor(value: string): Rgb | null {
  const m = value.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1]!.split(",").map((p) => parseFloat(p.trim()));
  return { r: parts[0] ?? 0, g: parts[1] ?? 0, b: parts[2] ?? 0, a: parts[3] ?? 1 };
}

function relativeLuminance({ r, g, b }: Rgb): number {
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrastRatio(fg: string, bg: string): number | null {
  const a = parseColor(fg);
  const b = parseColor(bg);
  if (!a || !b) return null;
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}
