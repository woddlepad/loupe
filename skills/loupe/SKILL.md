---
name: loupe
description: Implement UI feedback captured by the Loupe browser extension. Use when the user asks for "/loupe", "$loupe", "Loupe annotation", a Loupe group name, or a Loupe annotation id; especially when fixing annotations stored under .loupe/annotations with screenshot/reference images, note.md, meta.json, selector, URL, and source hints.
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
loupe status <annotation_id> --status needs_review --author agent:<agent-name>
```

Use `agent:codex`, `agent:claude`, or another accurate agent name. Summarize what
you implemented and the checks you ran in your reply to the user.

## Flow recordings

Some captures are **flow recordings** (video annotations) instead of single-region
screenshots. `loupe show <id>` marks them as `Flow recording` and they live under
`.loupe/recordings/<group>/<id>/` instead of `.loupe/annotations/`. A recording
bundle contains:

- `recording.webm` — screen capture of the tab (for the **human** reviewer).
- `keyframes/*.png` — still frames extracted from the recording at important
  click and debounced typing timestamps. These are the primary visual evidence
  for agents.
- `events.jsonl` — click/typing/key markers with millisecond timestamps, labels,
  selectors, coordinates, and target text when available.
- `console.log` — every `console.*` call during the flow, timestamped from `0.0s`.
- `network.jsonl` — one JSON object per `fetch`/XHR (`method`, `url`, `status`,
  `ok`, `durationMs`, `error`).
- `errors.jsonl` — uncaught errors and unhandled promise rejections.
- `note.md` — the user's request plus a surfaced list of errors and failed requests.
- `meta.json` — as usual.

How to work a recording:

1. You cannot watch the video. **Read `note.md`, inspect every `keyframes/*.png`,
   then read `events.jsonl`, `console.log`, `network.jsonl`, and `errors.jsonl`**.
   Keyframes show the visual state around clicks and typing bursts; logs are the
   machine-readable record of what happened.
2. Correlate the user's note with concrete evidence: click/typing markers, visual
   keyframes, errors thrown, requests that returned `>= 400` or failed, and noisy
   warnings. The `t` field on each entry is milliseconds-into-the-flow, so you
   can reconstruct ordering across keyframes, events, console, network, and errors.
3. Find the code from the page URL, the failing request URLs/handlers, error stack
   frames, and component/file search — recordings have no single selected element.
4. Implement the fix, run checks, and close the loop with `loupe status` exactly
   as for a normal annotation.

## Rules

- Do not mark an annotation resolved; agents move completed work to `needs_review` and leave resolution to the human reviewer.
- For a group, handle every open annotation in the group unless the user asks for a specific id.
- Prefer existing app patterns over broad refactors.
- When screenshot/reference images disagree with code text, prioritize the user's note plus screenshot.
- If the source is ambiguous, inspect likely UI files before asking for help.
