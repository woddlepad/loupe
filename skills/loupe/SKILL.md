---
name: loupe
description: Implement UI feedback captured by the Loupe browser extension. Use when the user asks for "/loupe", "$loupe", "Loupe annotation", a Loupe group name, or a Loupe annotation id; especially when fixing annotations stored under .loupe/annotations with screenshot/reference images, note.md, meta.json, selector, URL, source hints, and comments.jsonl.
---

# Loupe Annotation Implementer

Use this skill to turn a Loupe annotation or group into code changes.

## Quick Start

From the target repo root, prefer the CLI:

```bash
loupe show <group_name|annotation_id>
```

Examples:

```bash
loupe list
loupe show notes
loupe show dde8f08a
loupe show 2026-06-22-dde8f08a --repo ~/dev/atmOS
```

If `loupe` is not in PATH, use the bundled fallback:

```bash
python3 ~/.codex/skills/loupe/scripts/loupe_context.py <group_name|annotation_id>
```

Read the emitted Markdown fully before editing. It contains absolute paths to:
- `note.md`
- `meta.json`
- `shot.png`
- reference images under `refs/`
- `comments.jsonl`

If no argument is provided, list available groups and annotations, then ask which to implement.

## Project Setup / Repair

If the repo has not been mapped for Loupe yet, or the browser extension says the daemon is not running, initialize the project from the repo root:

```bash
loupe init
loupe bridge
```

`loupe init` detects common app stacks such as Next.js, Vite React, Vue, Nuxt, SvelteKit, Angular, and Create React App. It writes/merges `.loupe/config.json` and registers the repo in `~/.loupe/projects.json` with likely local origins such as `localhost:3000` or `localhost:5173`.

For nonstandard dev servers, add explicit mappings:

```bash
loupe init --origin staging.acme.com --port 5174
```

## Workflow

1. Resolve the requested annotation or group with `loupe show <group|annotation_id>`; use `loupe_context.py` only as a fallback.
2. Inspect each screenshot and reference image. In Codex, use image viewing tools when available. In other agents, open the absolute paths shown by the script.
3. Read `note.md` and `meta.json`. Trust the user note first, then use selector, URL, selected text, screenshot, references, and source hints to find the relevant UI code.
4. If `resolution.primary` is empty, infer the source from the URL route, selector/data attributes, visible text, component names, and repo search. Search for stable anchors such as `data-testid`, page route segments, button labels, surrounding text, and class names.
5. Implement the UI change. Keep scope tight to the annotation.
6. Run the smallest relevant checks available in the repo.
7. Mark each implemented annotation as needing human review:

```bash
loupe comment <annotation_id> --status needs_review --author agent:<agent-name> --body "Implemented: <summary>. Checks: <commands run>."
```

Use `agent:codex`, `agent:claude`, or another accurate agent name.

If the CLI is unavailable for commenting, append the equivalent JSON line to the annotation's `comments.jsonl`:

```json
{"author":"agent:<agent-name>","body":"Implemented: <short summary>. Checks: <commands run>.","createdAt":"<iso timestamp>","status":"needs_review"}
```

## Rules

- Do not mark an annotation resolved; agents move completed work to `needs_review` and leave resolution to the human reviewer.
- For a group, handle every open annotation in the group unless the user asks for a specific id.
- Prefer existing app patterns over broad refactors.
- When screenshot/reference images disagree with code text, prioritize the user's note plus screenshot.
- If the source is ambiguous, inspect likely UI files before asking for help.
