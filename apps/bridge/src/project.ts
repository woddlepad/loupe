import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { ensureRecordingsGitignored } from "./bundle.js";

export interface LoupeProjectConfig {
  name: string;
  origins: string[];
  framework?: string;
}

export interface RegisteredProject extends LoupeProjectConfig {
  repoRoot: string;
  updatedAt: string;
}

export interface ProjectRegistry {
  projects: RegisteredProject[];
}

export interface InitProjectOptions {
  repoRoot: string;
  name?: string;
  origins?: string[];
  ports?: number[];
  registryPath?: string;
}

export interface InitProjectResult {
  project: RegisteredProject;
  configPath: string;
  registryPath: string;
  detected: {
    framework?: string;
    ports: number[];
  };
}

interface PackageJson {
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export const DEFAULT_REGISTRY = "~/.loupe/projects.json";

export function initProject(options: InitProjectOptions): InitProjectResult {
  const repoRoot = resolve(options.repoRoot);
  const pkg = readPackageJson(repoRoot);
  const framework = detectFramework(repoRoot, pkg);
  const ports = uniqueNumbers([...(options.ports ?? []), ...detectPorts(pkg), ...defaultPorts(framework)]);
  const origins = uniqueStrings([
    ...(options.origins ?? []),
    ...ports.flatMap((port) => [`localhost:${port}`, `127.0.0.1:${port}`]),
  ]);
  const name = options.name?.trim() || packageName(pkg) || basename(repoRoot);
  const project: RegisteredProject = {
    name,
    repoRoot,
    origins,
    ...(framework ? { framework } : {}),
    updatedAt: new Date().toISOString(),
  };

  const configPath = writeRepoConfig(repoRoot, project);
  const registryPath = options.registryPath ?? expandHome(DEFAULT_REGISTRY);
  writeRegistry(registryPath, project);

  return {
    project,
    configPath,
    registryPath,
    detected: { ...(framework ? { framework } : {}), ports },
  };
}

export function defaultRegistryPath(): string {
  return expandHome(DEFAULT_REGISTRY);
}

export function readProjectRegistry(path: string = defaultRegistryPath()): ProjectRegistry {
  return readJson<ProjectRegistry>(path) ?? { projects: [] };
}

export function projectMatchesUrl(project: LoupeProjectConfig, pageUrl: string): boolean {
  return project.origins.some((origin) => originMatchesUrl(origin, pageUrl));
}

export function matchingProjects(pageUrl: string | undefined, projects: RegisteredProject[]): RegisteredProject[] {
  if (!pageUrl) return [];
  return projects.filter((project) => projectMatchesUrl(project, pageUrl));
}

function originMatchesUrl(pattern: string, pageUrl: string): boolean {
  let host: string;
  let hostWithPort: string;
  try {
    const parsed = new URL(pageUrl);
    host = parsed.hostname.toLowerCase();
    hostWithPort = parsed.port ? `${host}:${parsed.port}` : host;
  } catch {
    return false;
  }

  const clean = pattern.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  return matchHost(clean.includes(":") ? hostWithPort : host, clean);
}

function matchHost(host: string, pattern: string): boolean {
  if (!pattern) return false;
  if (pattern === host) return true;
  if (pattern.startsWith("*.")) {
    const suffix = pattern.slice(2);
    return host === suffix || host.endsWith("." + suffix);
  }
  if (pattern.includes("*")) {
    const re = new RegExp("^" + pattern.split("*").map(escapeRegex).join(".*") + "$");
    return re.test(host);
  }
  return false;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function detectFramework(repoRoot: string, pkg = readPackageJson(repoRoot)): string | undefined {
  const deps = dependencySet(pkg);
  if (deps.has("next")) return "nextjs";
  if (deps.has("nuxt") || deps.has("@nuxt/kit")) return "nuxt";
  if (deps.has("@sveltejs/kit")) return "sveltekit";
  if (deps.has("@angular/core") || existsSync(join(repoRoot, "angular.json"))) return "angular";
  if (deps.has("@vitejs/plugin-vue") || (deps.has("vue") && deps.has("vite"))) return "vue-vite";
  if (deps.has("@vitejs/plugin-react") || (deps.has("react") && deps.has("vite"))) return "react-vite";
  if (deps.has("react-scripts")) return "create-react-app";
  if (deps.has("vue")) return "vue";
  if (deps.has("react")) return "react";
  if (existsSync(join(repoRoot, "next.config.js")) || existsSync(join(repoRoot, "next.config.mjs"))) return "nextjs";
  if (existsSync(join(repoRoot, "vite.config.ts")) || existsSync(join(repoRoot, "vite.config.js"))) return "vite";
  return undefined;
}

export function detectPorts(pkg: PackageJson | undefined): number[] {
  const scripts = Object.values(pkg?.scripts ?? {});
  const ports: number[] = [];
  for (const script of scripts) {
    for (const match of script.matchAll(/(?:--port|-p)\s+(\d{2,5})\b/g)) {
      ports.push(Number(match[1]));
    }
    for (const match of script.matchAll(/\bPORT=(\d{2,5})\b/g)) {
      ports.push(Number(match[1]));
    }
  }
  return uniqueNumbers(ports);
}

function defaultPorts(framework: string | undefined): number[] {
  switch (framework) {
    case "nextjs":
    case "nuxt":
    case "create-react-app":
    case "react":
      return [3000];
    case "angular":
      return [4200];
    case "react-vite":
    case "vue-vite":
    case "sveltekit":
    case "vite":
      return [5173];
    case "vue":
      return [8080];
    default:
      return [3000, 5173];
  }
}

function writeRepoConfig(repoRoot: string, project: RegisteredProject): string {
  const loupeDir = join(repoRoot, ".loupe");
  const configPath = join(loupeDir, "config.json");
  mkdirSync(loupeDir, { recursive: true });
  const existing = readJson<Record<string, unknown>>(configPath) ?? {};
  const existingProject = (existing["project"] ?? {}) as Partial<LoupeProjectConfig>;
  const nextProject: LoupeProjectConfig = {
    name: existingProject.name || project.name,
    origins: uniqueStrings([...(existingProject.origins ?? []), ...project.origins]),
    ...(project.framework ? { framework: project.framework } : {}),
  };
  writeJson(configPath, { ...existing, project: nextProject });
  ensureRecordingsGitignored(repoRoot);
  return configPath;
}

function writeRegistry(path: string, project: RegisteredProject): void {
  mkdirSync(dirname(path), { recursive: true });
  const registry = readJson<ProjectRegistry>(path) ?? { projects: [] };
  const projects = registry.projects.filter((p) => resolve(p.repoRoot) !== project.repoRoot);
  projects.push(project);
  projects.sort((a, b) => a.name.localeCompare(b.name));
  writeJson(path, { projects });
}

function readPackageJson(repoRoot: string): PackageJson | undefined {
  return readJson<PackageJson>(join(repoRoot, "package.json"));
}

function readJson<T>(path: string): T | undefined {
  try {
    return JSON.parse(readFileSync(path, "utf8")) as T;
  } catch {
    return undefined;
  }
}

function writeJson(path: string, value: unknown): void {
  writeFileSync(path, JSON.stringify(value, null, 2) + "\n");
}

function dependencySet(pkg: PackageJson | undefined): Set<string> {
  return new Set([...Object.keys(pkg?.dependencies ?? {}), ...Object.keys(pkg?.devDependencies ?? {})]);
}

function packageName(pkg: PackageJson | undefined): string | undefined {
  const raw = (pkg as PackageJson & { name?: string } | undefined)?.name?.trim();
  return raw ? raw.replace(/^@[^/]+\//, "") : undefined;
}

function uniqueStrings(values: string[]): string[] {
  return [...new Set(values.map((v) => v.trim()).filter(Boolean))];
}

function uniqueNumbers(values: number[]): number[] {
  return [...new Set(values.filter((v) => Number.isInteger(v) && v > 0 && v <= 65535))];
}

function expandHome(path: string): string {
  if (!path.startsWith("~/")) return resolve(path);
  return resolve(process.env["HOME"] ?? ".", path.slice(2));
}
