import type { Annotation } from "@loupe/core/model";
import type { BridgeConfig } from "../config.js";
import type { WrittenBundle } from "../bundle.js";
import type { SourceResolution } from "../resolve/index.js";

/** Everything a handler needs to act on an annotation. */
export interface ActionContext {
  annotation: Annotation;
  /** The bundle already written to the repo (.loupe/annotations/<id>/). */
  bundle: WrittenBundle;
  resolution: SourceResolution;
  config: BridgeConfig;
}

export interface ActionOutcome {
  ok: boolean;
  /** Short human summary, e.g. "spawned claude" or "created LIN-123". */
  detail?: string;
  /** A URL the action produced (issue link, PR, etc.), if any. */
  url?: string;
}

/**
 * A routable destination for an annotation. The note panel renders one button
 * per action (id + label); `run` executes server-side in the bridge.
 */
export interface Action {
  id: string;
  label: string;
  hint?: string;
  run(ctx: ActionContext): Promise<ActionOutcome> | ActionOutcome;
}

/** The shape a custom `.loupe/actions/*.mjs` default-exports. */
export type CustomActionModule = Action | { default: Action };
