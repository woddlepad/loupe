import type { Action } from "./types.js";

/**
 * The "Save to repo" action. The bundle is always written before any action
 * runs, so this is intentionally a no-op that just confirms the location — it
 * exists so "keep it as a committable annotation, nothing more" is a real,
 * explicit button rather than an implicit default.
 */
export const saveAction: Action = {
  id: "save",
  label: "Save to repo",
  hint: "write a committable annotation, no routing",
  run: ({ bundle }) => ({ ok: true, detail: `saved ${bundle.dir}` }),
};
