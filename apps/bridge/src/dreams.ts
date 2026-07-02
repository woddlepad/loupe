import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, extname, join, resolve, sep } from "node:path";

const DREAMS_ROOT = ".loupe/dreams";
const META_FILE = "dream.json";
const PLAN_FILE = "plan.mdx";
const CANVAS_FILE = "canvas.mdx";
const PROTOTYPE_FILE = "prototype.mdx";
const PROTOTYPE_HTML = "prototype.html";
const REPORT_FILE = "report.md";
export const MAX_DREAM_GOAL_CHARS = 4000;

export type DreamStatus = "planned" | "approved" | "running" | "needs_review" | "done";

export interface DreamMeta {
  id: string;
  title: string;
  goal?: string;
  summary?: string;
  status?: DreamStatus;
  priority?: number;
  recommended?: boolean;
  branch?: string;
  createdAt: string;
  updatedAt: string;
  source?: string;
  visualPlan?: {
    skill?: string;
    mode?: "local-files" | "hosted" | string;
  };
}

export interface DreamFiles {
  plan?: string;
  canvas?: string;
  prototype?: string;
  prototypeHtml?: string;
  report?: string;
  images: string[];
}

export interface DreamSummary extends DreamMeta {
  dir: string;
  files: DreamFiles;
}

export interface DreamDetail extends DreamSummary {
  content: {
    plan?: string;
    canvas?: string;
    prototype?: string;
    report?: string;
  };
}

export interface DreamWriteInput {
  id?: string;
  title: string;
  goal?: string;
  summary?: string;
  status?: DreamStatus;
  priority?: number;
  recommended?: boolean;
  branch?: string;
  source?: string;
  plan?: string;
  canvas?: string;
  prototype?: string;
  report?: string;
}

export function listDreams(repoRoot: string): DreamSummary[] {
  const root = resolve(repoRoot, DREAMS_ROOT);
  const dreams: DreamSummary[] = [];
  for (const slug of safeDreamDirs(root)) {
    const dream = readDreamSummary(repoRoot, slug);
    if (dream) dreams.push(dream);
  }
  return dreams.sort((a, b) => {
    const priority = (a.priority ?? Number.MAX_SAFE_INTEGER) - (b.priority ?? Number.MAX_SAFE_INTEGER);
    if (priority !== 0) return priority;
    if (a.recommended !== b.recommended) return a.recommended ? -1 : 1;
    return a.updatedAt < b.updatedAt ? 1 : -1;
  });
}

export function readDream(repoRoot: string, id: string): DreamDetail | undefined {
  const summary = readDreamSummary(repoRoot, id);
  if (!summary) return undefined;
  const dir = resolve(repoRoot, summary.dir);
  return {
    ...summary,
    content: {
      plan: readOptionalText(join(dir, PLAN_FILE)),
      canvas: readOptionalText(join(dir, CANVAS_FILE)),
      prototype: readOptionalText(join(dir, PROTOTYPE_FILE)),
      report: readOptionalText(join(dir, REPORT_FILE)),
    },
  };
}

export function writeDream(repoRoot: string, input: DreamWriteInput): DreamSummary {
  const now = new Date().toISOString();
  const id = dreamSlug(input.id ?? input.title);
  if (!id) throw new Error("missing dream title");
  if (input.goal && input.goal.length > MAX_DREAM_GOAL_CHARS) {
    throw new Error(`goal is limited to ${MAX_DREAM_GOAL_CHARS} characters (got ${input.goal.length})`);
  }
  const root = resolve(repoRoot, DREAMS_ROOT);
  const dir = join(root, id);
  mkdirSync(dir, { recursive: true });

  const existing = readDreamSummary(repoRoot, id);
  const meta: DreamMeta = {
    id,
    title: input.title.trim(),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    status: input.status ?? existing?.status ?? "planned",
    visualPlan: { skill: "visual-plan", mode: "local-files" },
    ...(input.goal !== undefined ? { goal: input.goal } : existing?.goal ? { goal: existing.goal } : {}),
    ...(input.summary !== undefined ? { summary: input.summary } : existing?.summary ? { summary: existing.summary } : {}),
    ...(input.priority !== undefined ? { priority: input.priority } : existing?.priority !== undefined ? { priority: existing.priority } : {}),
    ...(input.recommended !== undefined ? { recommended: input.recommended } : existing?.recommended !== undefined ? { recommended: existing.recommended } : {}),
    ...(input.branch !== undefined ? { branch: input.branch } : existing?.branch ? { branch: existing.branch } : {}),
    ...(input.source !== undefined ? { source: input.source } : existing?.source ? { source: existing.source } : {}),
  };

  writeFileSync(join(dir, META_FILE), JSON.stringify(meta, null, 2) + "\n");
  if (input.plan !== undefined) writeFileSync(join(dir, PLAN_FILE), input.plan);
  if (input.canvas !== undefined) writeFileSync(join(dir, CANVAS_FILE), input.canvas);
  if (input.prototype !== undefined) writeFileSync(join(dir, PROTOTYPE_FILE), input.prototype);
  if (input.report !== undefined) writeFileSync(join(dir, REPORT_FILE), input.report);

  const written = readDreamSummary(repoRoot, id);
  if (!written) throw new Error(`failed to write dream ${id}`);
  return written;
}

export function deleteDream(repoRoot: string, id: string): boolean {
  const dir = safeDreamPath(repoRoot, id);
  if (!dir || !existsSync(dir)) return false;
  rmSync(dir, { recursive: true, force: true });
  return true;
}

export function dreamAssetPath(repoRoot: string, id: string, relPath: string): string | undefined {
  const dir = safeDreamPath(repoRoot, id);
  if (!dir) return undefined;
  const target = resolve(dir, relPath);
  if (!isWithin(dir, target) || !existsSync(target)) return undefined;
  return target;
}

function readDreamSummary(repoRoot: string, id: string): DreamSummary | undefined {
  const dir = safeDreamPath(repoRoot, id);
  if (!dir || !existsSync(dir)) return undefined;
  const meta = readDreamMeta(dir, id);
  if (!meta) return undefined;
  const files = dreamFiles(dir);
  return {
    ...meta,
    dir: join(DREAMS_ROOT, basename(dir)),
    files,
  };
}

function readDreamMeta(absDir: string, fallbackId: string): DreamMeta | undefined {
  const meta = readJsonMeta(join(absDir, META_FILE));
  if (meta) return normalizeMeta(meta, fallbackId);
  const plan = readOptionalText(join(absDir, PLAN_FILE));
  if (!plan) return undefined;
  const frontmatter = parseFrontmatter(plan);
  const statTime = new Date(0).toISOString();
  return normalizeMeta(
    {
      id: fallbackId,
      title: frontmatter.title ?? titleFromSlug(fallbackId),
      summary: frontmatter.summary,
      goal: frontmatter.goal,
      priority: numberFrom(frontmatter.priority),
      recommended: booleanFrom(frontmatter.recommended),
      status: statusFrom(frontmatter.status),
      branch: frontmatter.branch,
      createdAt: frontmatter.createdAt ?? statTime,
      updatedAt: frontmatter.updatedAt ?? statTime,
      visualPlan: { skill: "visual-plan", mode: "local-files" },
    },
    fallbackId,
  );
}

function normalizeMeta(meta: Partial<DreamMeta>, fallbackId: string): DreamMeta | undefined {
  const id = dreamSlug(meta.id ?? fallbackId);
  const title = (meta.title ?? titleFromSlug(id)).trim();
  if (!id || !title) return undefined;
  const now = new Date().toISOString();
  return {
    id,
    title,
    createdAt: meta.createdAt ?? now,
    updatedAt: meta.updatedAt ?? meta.createdAt ?? now,
    status: statusFrom(meta.status) ?? "planned",
    ...(meta.goal ? { goal: meta.goal } : {}),
    ...(meta.summary ? { summary: meta.summary } : {}),
    ...(meta.priority !== undefined ? { priority: meta.priority } : {}),
    ...(meta.recommended !== undefined ? { recommended: Boolean(meta.recommended) } : {}),
    ...(meta.branch ? { branch: meta.branch } : {}),
    ...(meta.source ? { source: meta.source } : {}),
    visualPlan: meta.visualPlan ?? { skill: "visual-plan", mode: "local-files" },
  };
}

function dreamFiles(absDir: string): DreamFiles {
  return {
    ...(existsSync(join(absDir, PLAN_FILE)) ? { plan: PLAN_FILE } : {}),
    ...(existsSync(join(absDir, CANVAS_FILE)) ? { canvas: CANVAS_FILE } : {}),
    ...(existsSync(join(absDir, PROTOTYPE_FILE)) ? { prototype: PROTOTYPE_FILE } : {}),
    ...(existsSync(join(absDir, PROTOTYPE_HTML)) ? { prototypeHtml: PROTOTYPE_HTML } : {}),
    ...(existsSync(join(absDir, REPORT_FILE)) ? { report: REPORT_FILE } : {}),
    images: listDreamImages(absDir),
  };
}

function listDreamImages(absDir: string): string[] {
  try {
    return readdirSync(absDir, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"].includes(extname(name).toLowerCase()))
      .sort();
  } catch {
    return [];
  }
}

function safeDreamDirs(root: string): string[] {
  try {
    return readdirSync(root, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name === dreamSlug(entry.name))
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

function safeDreamPath(repoRoot: string, id: string): string | undefined {
  const slug = dreamSlug(id);
  if (!slug) return undefined;
  const root = resolve(repoRoot, DREAMS_ROOT);
  const dir = resolve(root, slug);
  return isWithin(root, dir) ? dir : undefined;
}

function isWithin(root: string, target: string): boolean {
  const relative = target.slice(root.length);
  return target === root || (target.startsWith(root + sep) && !relative.includes(`..${sep}`));
}

function dreamSlug(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function titleFromSlug(slug: string): string {
  return slug.split("-").filter(Boolean).map((part) => part[0]!.toUpperCase() + part.slice(1)).join(" ");
}

function readJsonMeta(path: string): Partial<DreamMeta> | undefined {
  try {
    return JSON.parse(readFileSync(path, "utf8")) as Partial<DreamMeta>;
  } catch {
    return undefined;
  }
}

function readOptionalText(path: string): string | undefined {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return undefined;
  }
}

function parseFrontmatter(markdown: string): Record<string, string> {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const out: Record<string, string> = {};
  for (const line of match[1]!.split("\n")) {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) continue;
    out[key.trim()] = rest.join(":").trim().replace(/^['"]|['"]$/g, "");
  }
  return out;
}

function statusFrom(value: unknown): DreamStatus | undefined {
  if (
    value === "planned" ||
    value === "approved" ||
    value === "running" ||
    value === "needs_review" ||
    value === "done"
  ) {
    return value;
  }
  return undefined;
}

function numberFrom(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function booleanFrom(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return undefined;
  if (value.toLowerCase() === "true") return true;
  if (value.toLowerCase() === "false") return false;
  return undefined;
}
