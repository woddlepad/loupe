import { readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join, resolve } from "node:path";
import type { Action, CustomActionModule } from "./types.js";

/**
 * Load custom actions from `<repo>/.loupe/actions/*.{mjs,js}`. Each file
 * default-exports an Action:
 *
 *   // .loupe/actions/jira.mjs
 *   export default {
 *     id: "jira",
 *     label: "create Jira issue",
 *     async run({ annotation, bundle, resolution, config }) {
 *       // …call your issue tracker, return { ok, detail, url }
 *       return { ok: true, detail: "created PROJ-42" };
 *     },
 *   };
 *
 * This is the seam for "add it to my specific issue-management software": drop a
 * file in, restart the daemon, and a button appears.
 */
export async function loadCustomActions(repoRoot: string): Promise<Action[]> {
  const dir = resolve(repoRoot, ".loupe/actions");
  let files: string[];
  try {
    files = readdirSync(dir).filter((f) => /\.(mjs|js)$/.test(f));
  } catch {
    return [];
  }

  const actions: Action[] = [];
  for (const file of files) {
    try {
      const mod = (await import(pathToFileURL(join(dir, file)).href)) as {
        default?: CustomActionModule;
      };
      const action = normalize(mod.default);
      if (action) actions.push(action);
      else console.warn(`[loupe] .loupe/actions/${file} has no valid default export — skipped`);
    } catch (e) {
      console.warn(`[loupe] failed to load .loupe/actions/${file}: ${String(e)}`);
    }
  }
  return actions;
}

function normalize(mod: CustomActionModule | undefined): Action | undefined {
  if (!mod) return undefined;
  const candidate = "default" in mod ? mod.default : mod;
  if (
    candidate &&
    typeof candidate.id === "string" &&
    typeof candidate.label === "string" &&
    typeof candidate.run === "function"
  ) {
    return candidate;
  }
  return undefined;
}
