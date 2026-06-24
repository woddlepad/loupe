import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { basename, extname, resolve, sep } from "node:path";
import type { Annotation, AnnotatePayload, AnnotationComment } from "@loupe/core/model";
import { runAgentGroup } from "./actions/agent.js";
import { ActionRegistry } from "./actions/registry.js";
import type { ActionOutcome } from "./actions/types.js";
import { writeBundle, writeReference } from "./bundle.js";
import { loadConfig, type BridgeConfig } from "./config.js";
import { gitUserName } from "./git.js";
import { matchingProjects, readProjectRegistry, type LoupeProjectConfig, type RegisteredProject } from "./project.js";
import { Resolver } from "./resolve/index.js";
import {
  addAnnotationReference,
  appendComment,
  createGroup,
  deleteGroup,
  deleteAnnotation,
  deleteResolvedAnnotations,
  groupSummaries,
  listAnnotations,
  listReferences,
  moveAnnotationToGroup,
  renameGroup,
  reorderGroups,
  updateAnnotation,
} from "./store.js";

interface ProjectContext {
  config: BridgeConfig;
  resolver: Resolver;
  registry: ActionRegistry;
}

export function createBridge(config: BridgeConfig) {
  const contexts = new Map<string, Promise<ProjectContext>>();

  const server = createServer((req, res) => {
    cors(res);
    if (req.method === "OPTIONS") {
      end(res, 204, "");
      return;
    }

    void handleRequest(req, res, config, contexts).catch((e) => {
      console.error(`[loupe] request failed: ${String(e)}`);
      json(res, 500, { error: String(e) });
    });
  });

  return {
    listen: async () => {
      await new Promise<void>((done) => {
        server.listen(config.port, config.host, () => {
          console.log(`[loupe] bridge on http://${config.host}:${config.port}`);
          if (isAllInterfaces(config.host)) console.log("[loupe] listening on all interfaces; use your Tailscale/device URL from another machine");
          console.log(`[loupe] default repo: ${config.repoRoot}`);
          console.log(`[loupe] project registry: ${readProjectRegistry().projects.length} registered`);
          done();
        });
      });
    },
    close: () => new Promise<void>((done) => server.close(() => done())),
  };
}

async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse,
  baseConfig: BridgeConfig,
  contexts: Map<string, Promise<ProjectContext>>,
): Promise<void> {
  const url = new URL(req.url ?? "/", "http://localhost");
  const path = url.pathname;
  const method = req.method ?? "GET";
  const pageUrl = url.searchParams.get("pageUrl") ?? undefined;
  const repoRoot = url.searchParams.get("repoRoot") ?? undefined;

  if (method === "GET" && path === "/projects") {
    const projects = readProjectRegistry().projects;
    const matches = matchingProjects(pageUrl, projects);
    const ctx = await contextForRequest(baseConfig, contexts, pageUrl, repoRoot);
    return json(res, 200, {
      projects,
      matches,
      selected: {
        repoRoot: ctx.config.repoRoot,
        project: ctx.config.project ?? projectFromConfig(ctx.config),
      },
    });
  }

  const { config, resolver, registry } = await contextForRequest(baseConfig, contexts, pageUrl, repoRoot);

  if (method === "GET" && path === "/health") {
    return json(res, 200, {
      ok: true,
      repoRoot: config.repoRoot,
      project: config.project ?? projectFromConfig(config),
    });
  }
  if (method === "GET" && path === "/actions") {
    return json(res, 200, { actions: registry.descriptors() });
  }
  if (method === "GET" && path === "/annotations") {
    return json(res, 200, { annotations: listAnnotations(config.repoRoot) });
  }
  if (method === "POST" && path === "/annotations/resolved/delete") {
    return handleDeleteResolvedAnnotations(res, config);
  }
  if (method === "GET" && path === "/groups") {
    return json(res, 200, { groups: groupSummaries(config.repoRoot) });
  }
  if (method === "POST" && path === "/groups") {
    return withBody(req, res, (b) => handleCreateGroup(config, JSON.parse(b) as { group?: string }));
  }
  if (method === "POST" && path === "/groups/reorder") {
    return withBody(req, res, (b) => handleReorderGroups(config, JSON.parse(b) as { slugs?: string[] }));
  }
  // POST /groups/:slug/rename  { group }
  const groupRename = path.match(/^\/groups\/([^/]+)\/rename$/);
  if (method === "POST" && groupRename) {
    return withBody(req, res, (b) =>
      handleRenameGroup(config, groupRename[1]!, JSON.parse(b) as { group?: string }),
    );
  }
  // DELETE /groups/:slug
  const groupDelete = path.match(/^\/groups\/([^/]+)$/);
  if (method === "DELETE" && groupDelete) {
    return handleDeleteGroup(res, config, groupDelete[1]!);
  }
  // POST /groups/:slug/delete (fallback for environments that block DELETE)
  const groupDeletePost = path.match(/^\/groups\/([^/]+)\/delete$/);
  if (method === "POST" && groupDeletePost) {
    return handleDeleteGroup(res, config, groupDeletePost[1]!);
  }
  if (method === "GET" && path === "/file") {
    return serveFile(res, config.repoRoot, url.searchParams.get("path") ?? "");
  }
  if (method === "POST" && path === "/annotate") {
    return withBody(req, res, (b) =>
      handleAnnotate(config, resolver, registry, JSON.parse(b) as AnnotatePayload),
    );
  }
  if (method === "POST" && path === "/resolve") {
    return withBody(req, res, (b) => {
      const a = JSON.parse(b) as Pick<Annotation, "target">;
      if (!a.target) throw new Error("missing target");
      const resolution = resolver.resolve(a.target);
      return {
        source: resolution.primary ?? null,
        candidates: resolution.candidates,
        method: resolution.method,
      };
    });
  }
  if (method === "GET" && path === "/references") {
    return json(res, 200, { references: listReferences(config.repoRoot) });
  }
  if (method === "POST" && path === "/references") {
    return withBody(req, res, (b) => {
      const a = (JSON.parse(b) as { annotation: Annotation }).annotation;
      if (!a?.id) throw new Error("missing annotation");
      const ref = writeReference(config.repoRoot, a);
      console.log(`[loupe] reference ${ref.dir} (from ${a.url})`);
      return { id: ref.id, dir: ref.dir };
    });
  }

  // POST /annotations/:id/comments
  const comment = path.match(/^\/annotations\/([^/]+)\/comments$/);
  if (method === "POST" && comment) {
    return withBody(req, res, (b) => handleComment(config, comment[1]!, JSON.parse(b)));
  }

  // POST /annotations/:id/update
  const annotationUpdate = path.match(/^\/annotations\/([^/]+)\/update$/);
  if (method === "POST" && annotationUpdate) {
    return withBody(req, res, (b) =>
      handleUpdateAnnotation(config, annotationUpdate[1]!, JSON.parse(b) as { note?: string }),
    );
  }

  // POST /annotations/:id/move
  const annotationMove = path.match(/^\/annotations\/([^/]+)\/move$/);
  if (method === "POST" && annotationMove) {
    return withBody(req, res, (b) =>
      handleMoveAnnotation(config, annotationMove[1]!, JSON.parse(b) as { group?: string }),
    );
  }

  // POST /annotations/:id/references
  const annotationReference = path.match(/^\/annotations\/([^/]+)\/references$/);
  if (method === "POST" && annotationReference) {
    return withBody(req, res, (b) =>
      handleAddReference(
        config,
        annotationReference[1]!,
        JSON.parse(b) as { caption?: string; dataUrl?: string },
      ),
    );
  }

  // DELETE /annotations/:id
  const annotationDelete = path.match(/^\/annotations\/([^/]+)$/);
  if (method === "DELETE" && annotationDelete) {
    return handleDeleteAnnotation(res, config, annotationDelete[1]!);
  }

  // POST /annotations/:id/delete (fallback for environments that block DELETE)
  const annotationDeletePost = path.match(/^\/annotations\/([^/]+)\/delete$/);
  if (method === "POST" && annotationDeletePost) {
    return handleDeleteAnnotation(res, config, annotationDeletePost[1]!);
  }

  // POST /groups/:slug/run  { action }
  const groupRun = path.match(/^\/groups\/([^/]+)\/run$/);
  if (method === "POST" && groupRun) {
    return withBody(req, res, (b) =>
      handleGroupRun(config, registry, groupRun[1]!, JSON.parse(b) as { action: string }),
    );
  }

  return json(res, 404, { error: "not found" });
}

function isAllInterfaces(host: string): boolean {
  return host === "0.0.0.0" || host === "::";
}

async function contextForRequest(
  baseConfig: BridgeConfig,
  contexts: Map<string, Promise<ProjectContext>>,
  pageUrl: string | undefined,
  repoRoot: string | undefined,
): Promise<ProjectContext> {
  const project = projectForRequest(baseConfig, pageUrl, repoRoot);
  const root = resolve(project.repoRoot);
  let ctx = contexts.get(root);
  if (!ctx) {
    ctx = buildProjectContext(baseConfig, project);
    contexts.set(root, ctx);
  }
  return ctx;
}

async function buildProjectContext(baseConfig: BridgeConfig, project: RegisteredProject): Promise<ProjectContext> {
  const fileConfig = loadConfig({ repoRoot: project.repoRoot });
  const config: BridgeConfig = {
    ...fileConfig,
    port: baseConfig.port,
    host: baseConfig.host,
    repoRoot: project.repoRoot,
    project: fileConfig.project ?? {
      name: project.name,
      origins: project.origins,
      ...(project.framework ? { framework: project.framework } : {}),
    },
  };
  const registry = await ActionRegistry.build(config);
  console.log(`[loupe] project ready: ${config.project?.name ?? basename(config.repoRoot)} → ${config.repoRoot}`);
  return {
    config,
    resolver: new Resolver(config.repoRoot),
    registry,
  };
}

function projectForRequest(
  baseConfig: BridgeConfig,
  pageUrl: string | undefined,
  repoRoot: string | undefined,
): RegisteredProject {
  const projects = readProjectRegistry().projects;
  if (repoRoot) {
    const root = resolve(repoRoot);
    const registered = projects.find((project) => resolve(project.repoRoot) === root);
    return registered ?? registeredFromConfig({ ...baseConfig, repoRoot: root });
  }

  const matches = matchingProjects(pageUrl, projects);
  if (matches.length > 0) {
    return [...matches].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))[0]!;
  }

  return registeredFromConfig(baseConfig);
}

function registeredFromConfig(config: BridgeConfig): RegisteredProject {
  const project = config.project ?? projectFromConfig(config);
  return {
    ...project,
    repoRoot: resolve(config.repoRoot),
    updatedAt: new Date(0).toISOString(),
  };
}

function projectFromConfig(config: BridgeConfig): LoupeProjectConfig {
  return {
    name: config.project?.name ?? basename(config.repoRoot),
    origins: config.project?.origins ?? [],
    ...(config.project?.framework ? { framework: config.project.framework } : {}),
  };
}

async function handleAnnotate(
  config: BridgeConfig,
  resolver: Resolver,
  registry: ActionRegistry,
  payload: AnnotatePayload,
) {
  const { annotation, actions } = payload;
  if (!annotation?.id) throw new Error("missing annotation");

  // Always write the committable bundle first, then run the chosen actions.
  const resolution = resolver.resolve(annotation.target);
  const bundle = writeBundle(config.repoRoot, annotation, resolution);

  const results: Record<string, ActionOutcome> = {};
  for (const id of actionsWithSave(actions ?? [])) {
    const action = registry.get(id);
    if (!action) {
      results[id] = { ok: false, detail: `unknown action "${id}"` };
      continue;
    }
    try {
      results[id] = await action.run({ annotation, bundle, resolution, config });
    } catch (e) {
      results[id] = { ok: false, detail: String(e) };
    }
  }

  const ran = Object.entries(results)
    .map(([id, r]) => `${id}:${r.ok ? "ok" : "fail"}`)
    .join(" ");
  console.log(
    `[loupe] ${bundle.dir} · ${resolution.method}` +
      (resolution.primary ? ` → ${resolution.primary}` : "") +
      (ran ? ` · ${ran}` : ""),
  );

  return {
    id: bundle.id,
    dir: bundle.dir,
    source: resolution.primary ?? null,
    method: resolution.method,
    results,
  };
}

function handleDeleteAnnotation(res: ServerResponse, config: BridgeConfig, id: string): void {
  const ok = deleteAnnotation(config.repoRoot, id);
  if (!ok) return json(res, 404, { ok: false, error: `annotation ${id} not found` });
  console.log(`[loupe] deleted annotation ${id}`);
  return json(res, 200, { ok: true });
}

function handleDeleteResolvedAnnotations(res: ServerResponse, config: BridgeConfig): void {
  const count = deleteResolvedAnnotations(config.repoRoot);
  console.log(`[loupe] deleted ${count} resolved annotation${count === 1 ? "" : "s"}`);
  return json(res, 200, { ok: true, count });
}

function handleDeleteGroup(res: ServerResponse, config: BridgeConfig, slug: string): void {
  const result = deleteGroup(config.repoRoot, slug);
  if (!result.deleted) return json(res, 404, { ok: false, error: `group ${slug} not found` });
  console.log(`[loupe] deleted group "${slug}" (${result.count} annotations)`);
  return json(res, 200, { ok: true, count: result.count });
}

function handleUpdateAnnotation(
  config: BridgeConfig,
  id: string,
  body: { note?: string },
): { ok: true } {
  const ok = updateAnnotation(config.repoRoot, id, { note: body.note ?? "" });
  if (!ok) throw new Error(`annotation ${id} not found`);
  console.log(`[loupe] updated annotation ${id}`);
  return { ok: true };
}

function handleAddReference(
  config: BridgeConfig,
  id: string,
  body: { caption?: string; dataUrl?: string },
): { ok: true } {
  if (!body.dataUrl) throw new Error("missing reference dataUrl");
  const ok = addAnnotationReference(config.repoRoot, id, { caption: body.caption, dataUrl: body.dataUrl });
  if (!ok) throw new Error(`annotation ${id} not found`);
  console.log(`[loupe] added reference to annotation ${id}`);
  return { ok: true };
}

function handleCreateGroup(config: BridgeConfig, body: { group?: string }) {
  const group = body.group?.trim();
  if (!group) throw new Error("missing group name");
  const created = createGroup(config.repoRoot, group);
  console.log(`[loupe] created group "${created.group}"`);
  return { ok: true, group: created };
}

function handleReorderGroups(config: BridgeConfig, body: { slugs?: string[] }) {
  if (!Array.isArray(body.slugs)) throw new Error("missing slugs");
  const slugs = reorderGroups(config.repoRoot, body.slugs);
  console.log(`[loupe] reordered groups: ${slugs.join(", ")}`);
  return { ok: true, slugs };
}

function handleMoveAnnotation(config: BridgeConfig, id: string, body: { group?: string }): { ok: true } {
  const group = body.group?.trim();
  if (!group) throw new Error("missing group name");
  const ok = moveAnnotationToGroup(config.repoRoot, id, group);
  if (!ok) throw new Error(`annotation ${id} not found`);
  console.log(`[loupe] moved annotation ${id} → "${group}"`);
  return { ok: true };
}

function handleRenameGroup(config: BridgeConfig, slug: string, body: { group?: string }) {
  const group = body.group?.trim();
  if (!group) throw new Error("missing group name");
  const count = renameGroup(config.repoRoot, slug, group);
  console.log(`[loupe] renamed group "${slug}" → "${group}" (${count} annotations)`);
  return { ok: true, count };
}

function actionsWithSave(actions: string[]): string[] {
  const ids = actions.filter((id) => id !== "copy-reference");
  if (ids.length === 0 || ids.includes("save")) return [...new Set(ids)];
  return ["save", ...new Set(ids)];
}

function handleComment(config: BridgeConfig, id: string, body: Partial<AnnotationComment>) {
  if (!body.body) throw new Error("missing comment body");
  const comment: AnnotationComment = {
    author: commentAuthor(config.repoRoot, body.author),
    body: body.body,
    createdAt: body.createdAt || new Date().toISOString(),
    ...(body.status ? { status: body.status } : {}),
  };
  const ok = appendComment(config.repoRoot, id, comment);
  if (!ok) throw new Error(`annotation ${id} not found`);
  console.log(`[loupe] comment on ${id} by ${comment.author}${comment.status ? ` → ${comment.status}` : ""}`);
  return { ok: true };
}

function commentAuthor(repoRoot: string, author: string | undefined): string {
  const trimmed = author?.trim();
  if (!trimmed || trimmed === "me" || trimmed === "anon") return gitUserName(repoRoot);
  return trimmed;
}

async function handleGroupRun(
  config: BridgeConfig,
  registry: ActionRegistry,
  slug: string,
  body: { action: string },
) {
  const items = listAnnotations(config.repoRoot).filter((a) => a.groupSlug === slug);
  if (items.length === 0) throw new Error(`group "${slug}" has no annotations`);
  const groupName = items[0]!.group || slug;

  // Agent actions get ONE session over the whole batch (the point of grouping).
  const agentCmd = config.agents[body.action];
  if (agentCmd) {
    if (agentCmd.mode === "session") {
      return {
        ok: true,
        action: body.action,
        count: items.length,
        detail: `group "${groupName}" saved — pick it up in your open ${body.action} session`,
      };
    }
    const logPath = resolve(config.repoRoot, ".loupe/annotations", slug, `agent-${body.action}.log`);
    const outcome = await runAgentGroup(body.action, agentCmd, config, groupName, items, logPath);
    console.log(`[loupe] group "${slug}" → ${body.action} (${items.length} items): ${outcome.detail}`);
    return { ok: outcome.ok, action: body.action, count: items.length, detail: outcome.detail };
  }

  // Non-agent actions run per annotation.
  const action = registry.get(body.action);
  if (!action) throw new Error(`unknown action "${body.action}"`);
  console.log(`[loupe] group "${slug}" → ${body.action} per-item (${items.length})`);
  return { ok: true, action: body.action, count: items.length, detail: `${body.action} queued per item` };
}

/** Serve an image from `.loupe/` only (path-traversal guarded). */
function serveFile(res: ServerResponse, repoRoot: string, rel: string): void {
  const base = resolve(repoRoot, ".loupe");
  const abs = resolve(repoRoot, rel);
  if (!abs.startsWith(base + sep) || !existsSync(abs)) {
    return end(res, 404, "");
  }
  const types: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };
  res.writeHead(200, { "content-type": types[extname(abs).toLowerCase()] ?? "application/octet-stream" });
  res.end(readFileSync(abs));
}

// --- http helpers ---

function withBody(
  req: IncomingMessage,
  res: ServerResponse,
  handler: (body: string) => unknown | Promise<unknown>,
): void {
  void readBody(req)
    .then((b) => handler(b))
    .then((out) => json(res, 200, out))
    .catch((e) => json(res, 400, { error: String(e) }));
}

function cors(res: ServerResponse): void {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("access-control-allow-headers", "content-type");
}

function json(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

function end(res: ServerResponse, status: number, body: string): void {
  res.writeHead(status);
  res.end(body);
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((done, fail) => {
    let data = "";
    req.on("data", (c) => {
      data += c;
      if (data.length > 50 * 1024 * 1024) fail(new Error("payload too large"));
    });
    req.on("end", () => done(data));
    req.on("error", fail);
  });
}
