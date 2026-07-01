import { spawnSync } from "node:child_process";
import type { AnnotationTarget } from "@loupe/core/model";

export interface SourceResolution {
  /** Best single guess at the source file (repo-relative), if any. */
  primary?: string;
  /** Other plausible files, ranked. */
  candidates: string[];
  /** How `primary` was found. */
  method: "ripgrep" | "filename" | "none";
}

/** Extensions we treat as component source files, in ripgrep brace-glob form. */
const COMPONENT_GLOB = "*.{tsx,jsx,ts,js,vue,svelte}";

/** Component names look like PascalCase identifiers (Button, VBtn, TodoList). */
function isComponentName(name: string): boolean {
  return /^[A-Z][A-Za-z0-9_]+$/.test(name);
}

/**
 * Resolve a component to a source file, best-effort and framework-agnostic:
 *   1. ripgrep for a *definition* of the component name — matches React/Svelte
 *      style `function/const/class Foo` declarations.
 *   2. match a *file named* after the component — this is how single-file
 *      component frameworks (Vue `.vue`, Svelte `.svelte`) map a component to
 *      its source, since the SFC declares no `function Foo` in the file body.
 *   3. give up — the agent still has the component name + selector + screenshot.
 *
 * Definition hits rank ahead of filename hits (higher fidelity), so `method`
 * reports how the *primary* guess was found.
 *
 * Repo-specific high-fidelity resolution (e.g. a component registry) is left to
 * custom actions / resolvers rather than baked in here.
 */
export class Resolver {
  constructor(private repoRoot: string) {}

  resolve(target: AnnotationTarget): SourceResolution {
    const names = target.componentChain.map((c) => c.name).filter(isComponentName);
    const defHits = this.ripgrepDefinitions(names);
    const fileHits = this.filenameMatches(names);

    const candidates: string[] = [];
    for (const hit of [...defHits, ...fileHits]) {
      if (!candidates.includes(hit)) candidates.push(hit);
    }
    if (candidates.length === 0) return { candidates: [], method: "none" };

    const method = candidates[0] && defHits.includes(candidates[0]) ? "ripgrep" : "filename";
    return { primary: candidates[0], candidates: candidates.slice(0, 6), method };
  }

  /** Find files that likely *define* one of the given component names. */
  private ripgrepDefinitions(names: string[]): string[] {
    const seen = new Set<string>();
    for (const name of names) {
      const pattern = `(function|const|class)\\s+${name}\\b|export\\s+(default\\s+)?(function|class)\\s+${name}\\b`;
      const res = spawnSync(
        "rg",
        ["-l", "--max-count", "1", "-g", COMPONENT_GLOB, "-e", pattern, "."],
        { cwd: this.repoRoot, encoding: "utf8", timeout: 5000 },
      );
      this.collect(res, seen);
      if (seen.size >= 6) break;
    }
    return [...seen].slice(0, 6);
  }

  /**
   * Find files *named* after one of the component names, e.g. `TodoList.vue`
   * for a Vue component whose `__name`/`__file` the overlay recovered. The glob
   * has no `/`, so ripgrep matches the basename at any depth.
   */
  private filenameMatches(names: string[]): string[] {
    const seen = new Set<string>();
    for (const name of names) {
      const res = spawnSync(
        "rg",
        ["--files", "-g", `${name}.{tsx,jsx,ts,js,vue,svelte}`, "."],
        { cwd: this.repoRoot, encoding: "utf8", timeout: 5000 },
      );
      this.collect(res, seen);
      if (seen.size >= 6) break;
    }
    return [...seen].slice(0, 6);
  }

  private collect(res: ReturnType<typeof spawnSync>, seen: Set<string>): void {
    if (res.status === 0 && typeof res.stdout === "string") {
      for (const line of res.stdout.split("\n").map((l) => l.trim().replace(/^\.\//, "")).filter(Boolean)) {
        seen.add(line);
      }
    }
  }
}
