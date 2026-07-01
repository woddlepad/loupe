# Custom Actions

Loupe actions are repo-local server-side hooks. Put JavaScript modules in:

```text
.loupe/actions/*.mjs
```

Restart the bridge after adding or editing action files. Each valid action becomes
a button in the annotation popover and a route target in the viewer.

## Minimal Action

```js
// .loupe/actions/jira.mjs
export default {
  id: "jira",
  label: "Create Jira issue",
  hint: "Open a ticket with the screenshot and source context",
  async run({ annotation, bundle, resolution, config }) {
    console.log(annotation.note);
    console.log(bundle.absDir);
    console.log(resolution.primary);
    return { ok: true, detail: "created PROJ-42", url: "https://jira.example/browse/PROJ-42" };
  },
};
```

## Export Shape

Default-export an object:

```ts
interface Action {
  id: string;
  label: string;
  hint?: string;
  run(ctx: ActionContext): ActionOutcome | Promise<ActionOutcome>;
}

interface ActionOutcome {
  ok: boolean;
  detail?: string;
  url?: string;
}
```

`id` is the stable action id sent by the extension. `label` is shown on the
button. `hint` is shown as hover text.

## Context

`run(ctx)` receives:

```ts
interface ActionContext {
  annotation: Annotation;
  bundle: {
    id: string;
    dir: string;       // repo-relative .loupe/annotations/... path
    absDir: string;    // absolute bundle directory
    screenshot?: string;
    references: string[];
  };
  resolution: {
    primary?: string;
    candidates: string[];
    method: "ripgrep" | "none";
  };
  config: BridgeConfig;
}
```

Useful files in `bundle.absDir`:

- `shot.png`
- `note.md`
- `meta.json`
- `refs/*`

The bundle is already written before your action runs. Agent actions, custom
actions, and integrations can rely on those files existing.

## Configuration

Use `.loupe/config.json` for repo-local config:

```json
{
  "agents": {
    "claude": { "mode": "spawn", "argv": ["claude", "--permission-mode", "auto", "--bg", "{loupeCommand}"] },
    "codex": { "mode": "spawn", "argv": ["codex", "exec", "{loupeCommand}"] },
    "copilot": { "mode": "spawn", "argv": ["copilot", "--allow-all-tools", "-p", "{prompt}"] },
    "pi": { "mode": "spawn", "argv": ["pi", "-p", "{atImages}", "{prompt}"] }
  },
  "integrations": {
    "linear": { "apiKey": "lin_api_...", "teamId": "..." }
  },
  "custom": {
    "webhook": {
      "url": "https://example.test/loupe"
    }
  }
}
```

Custom actions can read `ctx.config.custom` for this data.

Built-in agent modes:

- `spawn` runs `argv` on the bridge machine, and is only advertised when
  `argv[0]` is found on `PATH` (so uninstalled agents are hidden). Supported
  placeholders are `{prompt}`, `{imageArgs}` (→ `-i shot.png,ref.png` for Codex),
  `{atImages}` (→ `@shot.png @ref.png` for Pi), `{bundleDir}`, `{screenshot}`,
  `{source}`, `{loupeCommand}`, `{codexUrl}`, and `{repoRoot}`.
- `codex-app` opens a Codex Desktop thread with `/loupe <id-or-group>` and the
  repo path prefilled. You can choose this from the extension settings when you
  prefer URL-handler handoff.
- `codex-app-server` creates a Codex thread through the Codex app-server daemon
  on the bridge machine. Use it for remote bridges when your local Codex app is
  connected to that host over SSH. Set `LOUPE_CODEX_APP_SERVER=1` for the default
  Codex action, or configure:

```json
{
  "agents": {
    "codex": {
      "mode": "codex-app-server",
      "socketPath": "/root/.codex/app-server-control/app-server-control.sock"
    }
  }
}
```

- `session` only saves the annotation bundle for an already-open agent session.

For phone-visible Codex Cloud tasks, use `codex cloud exec` in a spawn action:

```json
{
  "agents": {
    "codex": { "mode": "spawn", "argv": ["codex", "cloud", "exec", "--env", "env_abc123", "{loupeCommand}"] }
  }
}
```

If the extension points at a Tailscale bridge URL, actions still run on the
target bridge machine. Start that bridge with `--host 0.0.0.0` or a specific
Tailscale IP.

Keep secrets out of git when possible. Prefer environment variables for tokens:

```js
const token = process.env.JIRA_TOKEN;
```

## Webhook Example

```js
// .loupe/actions/webhook.mjs
export default {
  id: "webhook",
  label: "Send webhook",
  hint: "POST this annotation to the team's workflow",
  async run({ annotation, bundle, resolution, config }) {
    const settings = config.custom?.webhook;
    const url = (typeof settings === "object" && settings && "url" in settings ? settings.url : undefined) ?? process.env.LOUPE_WEBHOOK_URL;
    if (!url) return { ok: false, detail: "missing webhook URL" };

    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        annotation,
        bundle: bundle.dir,
        screenshot: bundle.screenshot,
        references: bundle.references,
        source: resolution.primary ?? null,
      }),
    });

    if (!res.ok) return { ok: false, detail: `webhook returned ${res.status}` };
    return { ok: true, detail: "sent webhook" };
  },
};
```

## Agent Example

Use a custom action when the built-in `agents` config is not enough:

```js
// .loupe/actions/my-agent.mjs
import { spawn } from "node:child_process";
import { openSync } from "node:fs";
import { join } from "node:path";

export default {
  id: "my-agent",
  label: "My Agent",
  run({ annotation, bundle, resolution, config }) {
    const prompt = [
      "Implement this Loupe annotation.",
      `Bundle: ${bundle.absDir}`,
      `Note: ${annotation.note}`,
      resolution.primary ? `Source: ${resolution.primary}` : "Source: unresolved",
    ].join("\\n");

    const log = openSync(join(bundle.absDir, "agent-my-agent.log"), "a");
    const child = spawn("my-agent", ["run", prompt], {
      cwd: config.repoRoot,
      detached: true,
      stdio: ["ignore", log, log],
    });
    child.unref();
    return { ok: true, detail: "spawned my-agent" };
  },
};
```

## Operational Notes

- Restart `loupe bridge` after changing `.loupe/actions/*`.
- Later-loaded actions override earlier actions with the same `id`, so a repo can
  override built-ins.
- Return `{ ok: false, detail }` instead of throwing for expected failures.
- Throwing is fine for unexpected bugs; the bridge will surface the error in the
  action result.
