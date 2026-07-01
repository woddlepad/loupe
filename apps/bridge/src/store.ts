import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import type { Annotation, AnnotationReference, AnnotationStatus } from "@loupe/core/model";
import type { SourceResolution } from "./resolve/index.js";

const ROOT = ".loupe/annotations";
const RECORDINGS_ROOT = ".loupe/recordings";
const GROUP_META = ".group.json";
const GROUP_ORDER = ".order.json";

export interface StoredAnnotation extends Annotation {
  /** Repo-relative bundle directory. */
  dir: string;
  /** Group slug (folder name), "inbox" when ungrouped. */
  groupSlug: string;
}

export interface GroupSummary {
  /** Display name (from the first annotation) or the slug. */
  group: string;
  slug: string;
  count: number;
  open: number;
}

interface GroupMeta {
  group: string;
}

/** Slug used as the group's folder name. */
export function groupSlug(group: string | undefined): string {
  const s = (group ?? "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return s || "inbox";
}

export interface StoredReference {
  id: string;
  url?: string;
  title?: string;
  note?: string;
  createdAt?: string;
  /** Repo-relative reference directory. */
  dir: string;
}

/** List the cross-site reference library at `.loupe/references/<id>/`. */
export function listReferences(repoRoot: string): StoredReference[] {
  const root = resolve(repoRoot, ".loupe/references");
  const out: StoredReference[] = [];
  for (const slug of safeReaddir(root)) {
    const absDir = join(root, slug);
    const meta = readMeta(absDir);
    if (!meta) continue;
    out.push({
      id: meta.id,
      url: meta.url,
      title: meta.title,
      note: meta.note,
      createdAt: meta.createdAt,
      dir: join(".loupe/references", slug),
    });
  }
  return out.sort((a, b) => ((a.createdAt ?? "") < (b.createdAt ?? "") ? 1 : -1));
}

/** Find a reference library item's absolute dir by id. */
export function findReferenceDir(repoRoot: string, id: string): string | undefined {
  const root = resolve(repoRoot, ".loupe/references");
  for (const slug of safeReaddir(root)) {
    const absDir = join(root, slug);
    if (readMeta(absDir)?.id === id) return absDir;
  }
  return undefined;
}

/** Read a reference library screenshot as a browser-ready data URL. */
export function referenceImageDataUrl(repoRoot: string, id: string): string | undefined {
  const absDir = findReferenceDir(repoRoot, id);
  if (!absDir) return undefined;
  const shot = join(absDir, "shot.png");
  if (!existsSync(shot)) return undefined;
  return `data:image/png;base64,${readFileSync(shot).toString("base64")}`;
}

/** Delete one reference library item by id. */
export function deleteReference(repoRoot: string, id: string): boolean {
  const absDir = findReferenceDir(repoRoot, id);
  if (!absDir) return false;
  rmSync(absDir, { recursive: true, force: true });
  return true;
}

/** Delete every reference library item captured from an exact page URL. */
export function deleteReferencesForUrl(repoRoot: string, url: string): number {
  const trimmed = url.trim();
  if (!trimmed) throw new Error("missing reference page url");
  let count = 0;
  for (const ref of listReferences(repoRoot)) {
    if (ref.url !== trimmed) continue;
    if (deleteReference(repoRoot, ref.id)) count++;
  }
  return count;
}

/** Walk `.loupe/annotations/<group>/<id>/` and read every bundle. */
export function listAnnotations(repoRoot: string): StoredAnnotation[] {
  const root = resolve(repoRoot, ROOT);
  const out: StoredAnnotation[] = [];
  for (const slug of safeReaddir(root)) {
    const groupDir = join(root, slug);
    for (const bundle of safeReaddir(groupDir)) {
      const absDir = join(groupDir, bundle);
      const meta = readMeta(absDir);
      if (!meta) continue;
      out.push({
        ...meta,
        groupSlug: slug,
        dir: join(ROOT, slug, bundle),
      });
    }
  }
  return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

/** Walk `.loupe/recordings/<group>/<id>/` and read every flow recording bundle. */
export function listRecordings(repoRoot: string): StoredAnnotation[] {
  const root = resolve(repoRoot, RECORDINGS_ROOT);
  const out: StoredAnnotation[] = [];
  for (const slug of safeReaddir(root)) {
    const groupDir = join(root, slug);
    for (const bundle of safeReaddir(groupDir)) {
      const absDir = join(groupDir, bundle);
      const meta = readMeta(absDir);
      if (!meta) continue;
      out.push({
        ...meta,
        groupSlug: slug,
        dir: join(RECORDINGS_ROOT, slug, bundle),
      });
    }
  }
  return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

/** One row per group with open/total counts. */
export function groupSummaries(repoRoot: string): GroupSummary[] {
  const root = resolve(repoRoot, ROOT);
  const bySlug = new Map<string, GroupSummary>();
  for (const slug of safeReaddir(root)) {
    const meta = readGroupMeta(join(root, slug));
    if (!meta) continue;
    bySlug.set(slug, {
      group: meta.group || slug,
      slug,
      count: 0,
      open: 0,
    });
  }
  for (const a of listAnnotations(repoRoot)) {
    const s = bySlug.get(a.groupSlug) ?? {
      group: a.group || a.groupSlug,
      slug: a.groupSlug,
      count: 0,
      open: 0,
    };
    s.count++;
    if (a.status !== "resolved") s.open++;
    bySlug.set(a.groupSlug, s);
  }
  const order = readGroupOrder(root);
  return [...bySlug.values()].sort((a, b) => {
    const ai = order.indexOf(a.slug);
    const bi = order.indexOf(b.slug);
    if (ai >= 0 || bi >= 0) return (ai >= 0 ? ai : Number.MAX_SAFE_INTEGER) - (bi >= 0 ? bi : Number.MAX_SAFE_INTEGER);
    return a.slug.localeCompare(b.slug);
  });
}

/** Create an empty annotation group so it can be used as a drop target. */
export function createGroup(repoRoot: string, group: string): GroupSummary {
  const cleanGroup = group.trim();
  if (!cleanGroup) throw new Error("missing group name");
  const root = resolve(repoRoot, ROOT);
  const slug = groupSlug(cleanGroup);
  const dir = join(root, slug);
  mkdirSync(dir, { recursive: true });
  writeGroupMeta(dir, { group: cleanGroup });
  writeGroupOrder(root, unique([...readGroupOrder(root), slug]));
  return { group: cleanGroup, slug, count: 0, open: 0 };
}

/** Persist the user-controlled group ordering. Unknown slugs are ignored. */
export function reorderGroups(repoRoot: string, slugs: string[]): string[] {
  const root = resolve(repoRoot, ROOT);
  const known = new Set(groupSummaries(repoRoot).map((g) => g.slug));
  const ordered = unique(slugs.filter((slug) => known.has(slug)));
  const rest = [...known].filter((slug) => !ordered.includes(slug)).sort();
  const next = [...ordered, ...rest];
  writeGroupOrder(root, next);
  return next;
}

/** Find a bundle's absolute dir by annotation id (scans annotations + recordings). */
export function findBundleDir(repoRoot: string, id: string): string | undefined {
  for (const base of [ROOT, RECORDINGS_ROOT]) {
    const root = resolve(repoRoot, base);
    for (const slug of safeReaddir(root)) {
      const groupDir = join(root, slug);
      for (const bundle of safeReaddir(groupDir)) {
        const absDir = join(groupDir, bundle);
        if (readMeta(absDir)?.id === id) return absDir;
      }
    }
  }
  return undefined;
}

/** Delete an annotation bundle by id. */
export function deleteAnnotation(repoRoot: string, id: string): boolean {
  const absDir = findBundleDir(repoRoot, id);
  if (!absDir) return false;
  rmSync(absDir, { recursive: true, force: true });
  return true;
}

/** Delete every resolved annotation bundle. */
export function deleteResolvedAnnotations(repoRoot: string): number {
  let count = 0;
  for (const a of listAnnotations(repoRoot)) {
    if (a.status !== "resolved") continue;
    if (deleteAnnotation(repoRoot, a.id)) count++;
  }
  return count;
}

/** Delete a group folder and every annotation bundle inside it. */
export function deleteGroup(repoRoot: string, slug: string): { deleted: boolean; count: number } {
  const root = resolve(repoRoot, ROOT);
  const dir = join(root, slug);
  if (!existsSync(dir)) return { deleted: false, count: 0 };
  const count = safeReaddir(dir).filter((bundle) => readMeta(join(dir, bundle))).length;
  rmSync(dir, { recursive: true, force: true });
  removeGroupFromOrder(root, slug);
  return { deleted: true, count };
}

/** Rename a group and move its annotation bundles to the matching slug folder. */
export function renameGroup(repoRoot: string, slug: string, group: string): number {
  const cleanGroup = group.trim();
  if (!cleanGroup) throw new Error("missing group name");
  const root = resolve(repoRoot, ROOT);
  const fromDir = join(root, slug);
  if (!existsSync(fromDir)) return 0;

  const nextSlug = groupSlug(cleanGroup);
  const toDir = join(root, nextSlug);
  mkdirSync(toDir, { recursive: true });
  writeGroupMeta(toDir, { group: cleanGroup });

  let count = 0;
  for (const bundle of safeReaddir(fromDir)) {
    const source = join(fromDir, bundle);
    const target = slug === nextSlug ? source : uniqueBundleDir(toDir, bundle);
    if (source !== target) renameSync(source, target);

    const meta = readMetaWithResolution(target);
    if (!meta) continue;
    const updated = { ...meta, group: cleanGroup };
    writeMeta(target, updated);
    rewriteNoteFile(target, updated);
    count++;
  }

  if (slug !== nextSlug) {
    try {
      rmSync(join(fromDir, GROUP_META), { force: true });
      rmSync(fromDir, { recursive: false });
    } catch {
      // Keep the old folder if something external placed files in it.
    }
  }
  replaceGroupInOrder(root, slug, nextSlug);
  return count;
}

/** Move a single annotation bundle to another group. */
export function moveAnnotationToGroup(repoRoot: string, id: string, group: string): boolean {
  const cleanGroup = group.trim();
  if (!cleanGroup) throw new Error("missing group name");
  const absDir = findBundleDir(repoRoot, id);
  if (!absDir) return false;
  const meta = readMetaWithResolution(absDir);
  if (!meta) return false;

  const root = resolve(repoRoot, ROOT);
  const nextSlug = groupSlug(cleanGroup);
  const targetGroupDir = join(root, nextSlug);
  const sourceSlug = basename(dirname(absDir));
  const sourceGroupDir = dirname(absDir);
  if (!readGroupMeta(sourceGroupDir)) writeGroupMeta(sourceGroupDir, { group: meta.group || sourceSlug });
  mkdirSync(targetGroupDir, { recursive: true });
  writeGroupMeta(targetGroupDir, { group: cleanGroup });
  writeGroupOrder(root, unique([...readGroupOrder(root), sourceSlug, nextSlug]));

  const targetDir = sourceSlug === nextSlug ? absDir : uniqueBundleDir(targetGroupDir, basename(absDir));
  if (targetDir !== absDir) renameSync(absDir, targetDir);

  const updated = { ...meta, group: cleanGroup };
  writeMeta(targetDir, updated);
  rewriteNoteFile(targetDir, updated);
  return true;
}

/** Update editable annotation fields without changing the bundle path. */
export function updateAnnotation(
  repoRoot: string,
  id: string,
  patch: { note?: string; status?: AnnotationStatus; label?: string },
): boolean {
  const absDir = findBundleDir(repoRoot, id);
  if (!absDir) return false;
  const meta = readMetaWithResolution(absDir);
  if (!meta) return false;
  const updated = {
    ...meta,
    ...(patch.note !== undefined ? { note: patch.note } : {}),
    ...(patch.status ? { status: patch.status } : {}),
    ...(patch.label !== undefined ? { label: patch.label.trim() || undefined } : {}),
  };
  writeMeta(absDir, updated);
  rewriteNoteFile(absDir, updated);
  return true;
}

/** Persist a new reference image onto an existing annotation bundle. */
export function addAnnotationReference(
  repoRoot: string,
  id: string,
  reference: Required<Pick<AnnotationReference, "dataUrl">> & Pick<AnnotationReference, "caption">,
): boolean {
  const absDir = findBundleDir(repoRoot, id);
  if (!absDir) return false;
  const meta = readMetaWithResolution(absDir);
  if (!meta) return false;
  const updated = appendReferenceFile(absDir, meta, reference);
  writeMeta(absDir, updated);
  rewriteNoteFile(absDir, updated);
  return true;
}

/**
 * Advance an annotation's lifecycle status. Agent-authored completions always
 * land in review instead of resolving the annotation on their own.
 */
export function setAnnotationStatus(
  repoRoot: string,
  id: string,
  status: AnnotationStatus,
  author?: string,
): boolean {
  const next = status === "resolved" && author?.trim().toLowerCase().startsWith("agent:") ? "needs_review" : status;
  return updateAnnotation(repoRoot, id, { status: next });
}

/** Mark every unresolved annotation in a group as resolved. Returns the count. */
export function resolveGroup(repoRoot: string, slug: string): number {
  let count = 0;
  for (const a of listAnnotations(repoRoot)) {
    if (a.groupSlug !== slug || a.status === "resolved") continue;
    if (updateAnnotation(repoRoot, a.id, { status: "resolved" })) count++;
  }
  return count;
}

function readMeta(absDir: string): Annotation | undefined {
  return readMetaWithResolution(absDir);
}

function readMetaWithResolution(absDir: string): (Annotation & { resolution?: SourceResolution }) | undefined {
  try {
    return JSON.parse(readFileSync(join(absDir, "meta.json"), "utf8")) as Annotation & { resolution?: SourceResolution };
  } catch {
    return undefined;
  }
}

function readGroupMeta(absDir: string): GroupMeta | undefined {
  try {
    return JSON.parse(readFileSync(join(absDir, GROUP_META), "utf8")) as GroupMeta;
  } catch {
    return undefined;
  }
}

function writeGroupMeta(absDir: string, meta: GroupMeta): void {
  writeFileSync(join(absDir, GROUP_META), JSON.stringify(meta, null, 2) + "\n");
}

function readGroupOrder(root: string): string[] {
  try {
    const raw = JSON.parse(readFileSync(join(root, GROUP_ORDER), "utf8")) as unknown;
    return Array.isArray(raw) ? raw.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeGroupOrder(root: string, slugs: string[]): void {
  mkdirSync(root, { recursive: true });
  writeFileSync(join(root, GROUP_ORDER), JSON.stringify(unique(slugs), null, 2) + "\n");
}

function replaceGroupInOrder(root: string, from: string, to: string): void {
  const current = readGroupOrder(root);
  if (current.length === 0) return;
  writeGroupOrder(root, unique(current.map((slug) => (slug === from ? to : slug))));
}

function removeGroupFromOrder(root: string, slug: string): void {
  const current = readGroupOrder(root);
  if (current.length === 0) return;
  writeGroupOrder(root, current.filter((item) => item !== slug));
}

function writeMeta(absDir: string, meta: Annotation & { resolution?: SourceResolution }): void {
  writeFileSync(join(absDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
}

function appendReferenceFile(
  absDir: string,
  annotation: Annotation & { resolution?: SourceResolution },
  reference: Required<Pick<AnnotationReference, "dataUrl">> & Pick<AnnotationReference, "caption">,
): Annotation & { resolution?: SourceResolution } {
  const decoded = decodeImage(reference.dataUrl);
  if (!decoded) throw new Error("expected an image data URL");

  mkdirSync(join(absDir, "refs"), { recursive: true });
  let index = (annotation.references ?? []).filter((ref) => ref.file).length + 1;
  let name = `refs/ref-${index}.${decoded.ext}`;
  while (existsSync(join(absDir, name))) {
    index++;
    name = `refs/ref-${index}.${decoded.ext}`;
  }
  writeFileSync(join(absDir, name), decoded.buffer);

  return {
    ...annotation,
    references: [...(annotation.references ?? []), { caption: reference.caption, file: name }],
  };
}

function rewriteNoteFile(absDir: string, a: Annotation & { resolution?: SourceResolution }): void {
  const r = a.resolution ?? { candidates: [], method: "none" as const };
  const chain = a.target.componentChain.map((c) => c.name).join(" › ") || "(no React component found)";
  const slot = a.target.dataAttributes["data-slot"];
  const candidates = r.candidates.length
    ? r.candidates.map((c) => `- \`${c}\``).join("\n")
    : "- _(unresolved - use the component name + selector + screenshot)_";
  const refImgs = (a.references ?? [])
    .filter((ref) => ref.file)
    .map((ref) => `![${ref.caption ?? "reference"}](./${ref.file})`)
    .join("\n");

  writeFileSync(
    join(absDir, "note.md"),
    [
      `# ${a.label?.trim() || `Annotation ${a.id}`}`,
      a.label?.trim() ? `\n_Annotation ${a.id}_` : "",
      "",
      existsSync(join(absDir, "shot.png")) ? "![screenshot](./shot.png)" : "_(no screenshot)_",
      "",
      `**Page:** ${a.title} - ${a.url}`,
      a.group ? `**Group:** ${a.group}` : "",
      `**Component:** ${chain}${slot ? `  ·  data-slot=\`${slot}\`` : ""}`,
      `**Source (${r.method}):** ${r.primary ? `\`${r.primary}\`` : "_unresolved_"}`,
      `**Selector:** \`${a.target.selector}\``,
      a.target.text ? `**Text:** "${a.target.text}"` : "",
      "",
      "## Source candidates",
      candidates,
      "",
      "## Note",
      a.note || "_(no free-form note)_",
      refImgs ? "\n## Reference images\n" + refImgs : "",
      "",
    ]
      .filter((line) => line !== undefined)
      .join("\n"),
  );
}

function decodeImage(dataUrl: string): { buffer: Buffer; ext: string } | null {
  const m = dataUrl.match(/^data:image\/([a-z0-9.+-]+);base64,(.+)$/i);
  if (!m) return null;
  const ext = m[1]!.toLowerCase().replace("jpeg", "jpg").replace("svg+xml", "svg");
  return { buffer: Buffer.from(m[2]!, "base64"), ext };
}

function safeReaddir(dir: string): string[] {
  try {
    return readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return [];
  }
}

function uniqueBundleDir(parent: string, bundle: string): string {
  let candidate = join(parent, bundle);
  if (!existsSync(candidate)) return candidate;
  let index = 2;
  while (existsSync(candidate)) {
    candidate = join(parent, `${bundle}-${index}`);
    index++;
  }
  return candidate;
}

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}
