---
name: dream
description: Create a Loupe Dreamer visual plan in .loupe/dreams when the user invokes /dream or asks to turn a goal into an agent-native visual plan for Dreamer. Use this for read-only planning artifacts that should appear in the Loupe bridge Dreamer UI.
metadata:
  short-description: Create a Dreamer visual plan
---

# Dream

Create a read-only implementation plan under `.loupe/dreams/<slug>/` so Loupe Dreamer can display it while `loupe bridge` is running.

## Rules

- Do not edit product source files while using this skill. This is a planning artifact only.
- Research the repo first. Name real files, modules, commands, data models, routes, and risks.
- Treat BuilderIO `visual-plan` as the plan shape: MDX document, optional canvas/prototype, repo anchors, implementation sequence, verification, open questions.
- `dream.json.id` must be exactly the directory slug — no date prefix, no variations.
- Keep `dream.json.goal` at or below 3000 characters. If the user's goal is longer, summarize it before writing.
- Prefer backend, data, harness, integration, and UX-flow mapping work when proposing overnight agent tasks, but still specify the best shippable UI behavior where UI is involved.
- The final plan must be specific enough for an agent to execute without reinterpretation.

## Artifact Layout

Write these files:

```text
.loupe/dreams/<slug>/
  dream.json
  plan.mdx
  canvas.mdx        # optional, for click-through flow maps / diagrams
  prototype.mdx     # optional, for UI or interaction sketch
  prototype.html    # optional, iframe-rendered by Dreamer
  report.md         # optional, once implemented by an agent
```

`dream.json`:

```json
{
  "id": "<slug>",
  "title": "Concise title",
  "goal": "Goal prompt, max 3000 characters",
  "summary": "One or two sentence human summary",
  "status": "planned",
  "priority": 1,
  "recommended": true,
  "branch": "current-or-target-branch",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp",
  "visualPlan": { "skill": "visual-plan", "mode": "local-files" }
}
```

## plan.mdx

Use this structure:

```mdx
---
title: Concise title
status: planned
priority: 1
recommended: true
---

# Concise title

## Goal

## Repo findings

## Product behavior

## Technical plan

## Implementation steps

## Verification

## Risks and open questions

## Agent launch prompt
```

The agent launch prompt should begin with `/goal` and instruct the next agent to use `ship-feature` for implementation. It should include the artifact path and the success criteria.

## canvas.mdx

Use this when the plan benefits from visual navigation:

- User journey map
- State machine
- Data-flow graph
- Before/after screen flow
- Mermaid diagrams are acceptable inside MDX.

## After Writing

Tell the user the dream id and the Dreamer URL of the bridge serving **this** repo.
`7337` is only the default, and one bridge per worktree on its own port is a normal
setup — so resolve the port instead of assuming it:

```sh
for pid in $(pgrep -f 'loupe (bridge|dreamer)'); do
  printf '%s | %s\n' "$(ps -o command= -p "$pid")" \
    "$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p')"
done
```

Pick the row whose `--repo` (or, absent that flag, whose cwd) is this repo, and read
its `--port`; no `--port` flag means the 7337 default. Note `pgrep -a` is Linux-only —
on macOS the command above is what works. The URL is then:

```text
http://localhost:<bridge-port>/dreamer
```

Use `loupe dream <id>` to inspect the generated artifact from the terminal.
