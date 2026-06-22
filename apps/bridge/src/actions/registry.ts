import type { ActionDescriptor } from "@loupe/core/model";
import type { BridgeConfig } from "../config.js";
import { agentActions } from "./agent.js";
import { loadCustomActions } from "./custom.js";
import { linearAction, linearConfig } from "./linear.js";
import { saveAction } from "./save.js";
import type { Action } from "./types.js";

/**
 * The set of actions available for this repo, assembled from:
 *   - built-ins:     save, + one per configured agent (claude, codex)
 *   - integrations:  Linear (when configured)
 *   - custom:        .loupe/actions/*.mjs in the repo
 *
 * Later-loaded actions with a duplicate id win, so a repo can override a
 * built-in by shipping its own action with the same id.
 */
export class ActionRegistry {
  private actions = new Map<string, Action>();

  static async build(config: BridgeConfig): Promise<ActionRegistry> {
    const registry = new ActionRegistry();
    registry.put(saveAction);
    for (const a of agentActions(config)) registry.put(a);

    const linear = linearConfig(config);
    if (linear) registry.put(linearAction(linear));

    for (const a of await loadCustomActions(config.repoRoot)) registry.put(a);
    return registry;
  }

  private put(action: Action): void {
    this.actions.set(action.id, action);
  }

  get(id: string): Action | undefined {
    return this.actions.get(id);
  }

  /** Public descriptors for the panel (order: save, agents, integrations, custom). */
  descriptors(): ActionDescriptor[] {
    return [...this.actions.values()].map((a) => ({ id: a.id, label: a.label, hint: a.hint }));
  }
}
