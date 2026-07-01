import type { BridgeConfig } from "../config.js";
import type { Action, ActionContext, ActionOutcome } from "./types.js";

export interface LinearConfig {
  /** Linear API key (personal or app). Kept in .loupe/config.json. */
  apiKey: string;
  /** Target team id. */
  teamId: string;
  /** Optional label to tag created issues with. */
  labelId?: string;
}

/**
 * Built-in Linear integration. Only registered when `integrations.linear` is
 * configured. Creates an issue titled from the note (or component) with the
 * annotation details in the description. The screenshot lives in the committed
 * bundle; we link to it rather than uploading (upload can be a follow-up).
 */
export function linearAction(cfg: LinearConfig): Action {
  return {
    id: "linear",
    label: "create Linear issue",
    hint: "open a Linear issue from this annotation",
    run: (ctx) => createIssue(cfg, ctx),
  };
}

async function createIssue(cfg: LinearConfig, ctx: ActionContext): Promise<ActionOutcome> {
  const { annotation: a, bundle, resolution } = ctx;
  const title = (a.note || a.target.componentChain[0]?.name || "UI annotation").slice(0, 80);
  const description = [
    a.note ? a.note : "_(no note)_",
    "",
    `**Component:** ${a.target.componentChain.map((c) => c.name).join(" › ") || a.target.tag}`,
    resolution.primary ? `**Source:** \`${resolution.primary}\`` : "",
    `**Page:** ${a.url}`,
    `**Annotation:** \`${bundle.dir}\``,
  ]
    .filter(Boolean)
    .join("\n");

  const query = `mutation Create($input: IssueCreateInput!) {
    issueCreate(input: $input) { success issue { identifier url } }
  }`;
  const input: Record<string, unknown> = { teamId: cfg.teamId, title, description };
  if (cfg.labelId) input["labelIds"] = [cfg.labelId];

  let res: Response;
  try {
    res = await fetch("https://api.linear.app/graphql", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: cfg.apiKey },
      body: JSON.stringify({ query, variables: { input } }),
    });
  } catch (e) {
    return { ok: false, detail: `linear unreachable: ${String(e)}` };
  }
  if (!res.ok) return { ok: false, detail: `linear responded ${res.status}` };

  const body = (await res.json()) as {
    data?: { issueCreate?: { success: boolean; issue?: { identifier: string; url: string } } };
    errors?: Array<{ message: string }>;
  };
  if (body.errors?.length) return { ok: false, detail: body.errors[0]!.message };
  const issue = body.data?.issueCreate?.issue;
  if (!issue) return { ok: false, detail: "linear: no issue returned" };
  return { ok: true, detail: `created ${issue.identifier}`, url: issue.url };
}

/** Pull the Linear config off the bridge config, if present. */
export function linearConfig(config: BridgeConfig): LinearConfig | undefined {
  const c = config.integrations?.linear;
  if (c?.apiKey && c.teamId) return c;
  return undefined;
}
