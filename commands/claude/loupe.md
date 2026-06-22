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
2. Inspect every listed screenshot and reference image.
3. Use the URL, selector, data attributes, visible text, source hints, and screenshot to locate the UI code.
4. Implement the requested annotation or group with minimal unrelated changes.
5. Run relevant checks.
6. Mark each completed annotation resolved:

```bash
loupe comment <annotation_id> --status resolved --author agent:claude --body "Implemented: <summary>. Checks: <commands run>."
```

If the CLI is unavailable for commenting, append the equivalent JSON line to the annotation's `comments.jsonl`.
