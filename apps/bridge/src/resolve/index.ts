import { spawnSync } from "node:child_process";
import type { AnnotationTarget } from "@loupe/core/model";

export interface SourceResolution {
  /** Best single guess at the source file (repo-relative), if any. */
  primary?: string;
  /** Other plausible files, ranked. */
  candidates: string[];
  /** How `primary` was found. */
  method: "ripgrep" | "none";
}

/**
 * Resolve a component to a source file, best-effort and framework-agnostic:
 *   1. ripgrep for a definition of the component name (any repo)
 *   2. give up — the agent still has the component name + selector + screenshot.
 *
 * Repo-specific high-fidelity resolution (e.g. a component registry) is left to
 * custom actions / resolvers rather than baked in here.
 */
export class Resolver {
  constructor(private repoRoot: string) {}

  resolve(target: AnnotationTarget): SourceResolution {
    const hits = this.ripgrep(target.componentChain.map((c) => c.name));
    if (hits.length) return { primary: hits[0], candidates: hits, method: "ripgrep" };
    return { candidates: [], method: "none" };
  }

  /** Find files that likely *define* one of the given component names. */
  private ripgrep(names: string[]): string[] {
    const seen = new Set<string>();
    for (const name of names) {
      if (!/^[A-Z][A-Za-z0-9_]+$/.test(name)) continue;
      const pattern = `(function|const|class)\\s+${name}\\b|export\\s+(default\\s+)?(function|class)\\s+${name}\\b`;
      const res = spawnSync(
        "rg",
        ["-l", "--max-count", "1", "-g", "*.{tsx,jsx,ts,js,vue,svelte}", "-e", pattern, "."],
        { cwd: this.repoRoot, encoding: "utf8", timeout: 5000 },
      );
      if (res.status === 0 && res.stdout) {
        for (const line of res.stdout.split("\n").map((l) => l.trim()).filter(Boolean)) {
          seen.add(line);
        }
      }
      if (seen.size >= 6) break;
    }
    return [...seen].slice(0, 6);
  }
}
