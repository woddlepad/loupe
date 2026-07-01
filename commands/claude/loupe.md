Use the Loupe annotation workflow for: $ARGUMENTS

Run from the current repo unless the argument includes a repo path:

```bash
loupe show $ARGUMENTS
```

If `loupe` is not available in PATH, fall back to:

```bash
python3 ~/.codex/skills/loupe/scripts/loupe_context.py $ARGUMENTS
```

Then:

1. Read the emitted context fully.
2. Inspect every listed screenshot and reference image. For a **flow recording**
   (video annotation under `.loupe/recordings/`), you cannot watch the video —
   inspect `keyframes/*.png`, then read `note.md`, `events.jsonl`, `console.log`,
   `network.jsonl`, and `errors.jsonl` to correlate clicks/typing, errors, failed
   requests, and the page URL.
3. Use the URL, selector, data attributes, visible text, source hints, and screenshot to locate the UI code.
4. Implement the requested annotation or group with minimal unrelated changes.
5. Run relevant checks.
6. Mark each completed annotation as needing human review:

```bash
loupe status <annotation_id> --status needs_review --author agent:claude
```

Summarize what you implemented and the checks you ran in your reply.
Do not mark annotations resolved; the human reviewer will resolve them.
