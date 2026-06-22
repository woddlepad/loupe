#!/usr/bin/env python3
"""Emit implementation context for Loupe annotation bundles."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


ROOT = Path(".loupe/annotations")


def main() -> int:
    parser = argparse.ArgumentParser(description="Resolve a Loupe annotation id or group to agent-ready context.")
    parser.add_argument("target", nargs="?", help="Annotation id, bundle folder, or group name")
    parser.add_argument("--repo", default=".", help="Repo root containing .loupe/annotations")
    args = parser.parse_args()

    repo = Path(args.repo).expanduser().resolve()
    annotations = repo / ROOT
    if not annotations.exists():
        raise SystemExit(f"No .loupe/annotations found under {repo}")

    bundles = list_bundles(annotations)
    if not args.target:
        print_inventory(repo, bundles)
        return 0

    matches = resolve_target(args.target, bundles)
    if not matches:
        print_inventory(repo, bundles)
        raise SystemExit(f"\nNo Loupe annotation or group matched: {args.target}")

    emit_context(repo, args.target, matches)
    return 0


def list_bundles(root: Path) -> list[dict[str, Any]]:
    bundles: list[dict[str, Any]] = []
    for group_dir in sorted(p for p in root.iterdir() if p.is_dir()):
        for bundle_dir in sorted(p for p in group_dir.iterdir() if p.is_dir()):
            meta_path = bundle_dir / "meta.json"
            if not meta_path.exists():
                continue
            try:
                meta = json.loads(meta_path.read_text())
            except Exception:
                continue
            bundles.append({"group_slug": group_dir.name, "bundle": bundle_dir.name, "dir": bundle_dir, "meta": meta})
    return bundles


def resolve_target(target: str, bundles: list[dict[str, Any]]) -> list[dict[str, Any]]:
    needle = target.strip()
    exact_group = [b for b in bundles if b["group_slug"] == needle or (b["meta"].get("group") or "") == needle]
    if exact_group:
        return exact_group

    out = []
    for b in bundles:
        meta = b["meta"]
        candidates = [str(meta.get("id", "")), str(b["bundle"])]
        if any(c == needle or c.endswith(needle) or needle in c for c in candidates):
            out.append(b)
    return out


def print_inventory(repo: Path, bundles: list[dict[str, Any]]) -> None:
    print(f"# Loupe annotations in {repo}\n")
    by_group: dict[str, list[dict[str, Any]]] = {}
    for b in bundles:
        by_group.setdefault(b["meta"].get("group") or b["group_slug"], []).append(b)
    if not by_group:
        print("No annotations found.")
        return
    for group, items in sorted(by_group.items()):
        open_count = sum(1 for b in items if b["meta"].get("status", "open") != "resolved")
        print(f"- group `{group}`: {open_count}/{len(items)} open")
        for b in items:
            meta = b["meta"]
            print(f"  - `{meta.get('id')}` (`{b['bundle']}`): {meta.get('status', 'open')} - {compact(meta.get('note') or '')}")


def emit_context(repo: Path, target: str, bundles: list[dict[str, Any]]) -> None:
    print(f"# Loupe task: {target}\n")
    print(f"Repo: `{repo}`")
    print(f"Matched annotations: {len(bundles)}\n")
    print("## Agent instructions\n")
    print("- Implement the requested UI change(s) in this repo.")
    print("- Inspect every screenshot and reference image listed below before editing.")
    print("- Use URL, selector, data attributes, visible text, and source hints to find the code.")
    print("- If source is unresolved, search the repo using route segments, data-testid values, labels, and selected text.")
    print("- Keep changes focused. Run relevant checks.")
    print("- When done, append a JSONL comment to each annotation's `comments.jsonl` with status `resolved`.\n")
    for i, b in enumerate(bundles, 1):
        emit_bundle(b, i)


def emit_bundle(bundle: dict[str, Any], index: int) -> None:
    meta = bundle["meta"]
    directory: Path = bundle["dir"]
    target = meta.get("target") or {}
    resolution = meta.get("resolution") or {}
    refs = [r.get("file") for r in meta.get("references") or [] if r.get("file")]

    print(f"## {index}. Annotation `{meta.get('id')}`\n")
    print(f"- Status: `{meta.get('status', 'open')}`")
    print(f"- Group: `{meta.get('group') or bundle['group_slug']}`")
    print(f"- Bundle: `{directory}`")
    print(f"- Note: {meta.get('note') or '(none)'}")
    print(f"- Page: {meta.get('title') or '(untitled)'} - {meta.get('url') or '(no url)'}")
    print(f"- Component chain: {component_chain(target) or '(none captured)'}")
    print(f"- Tag: `{target.get('tag') or ''}`")
    print(f"- Selector: `{target.get('selector') or ''}`")
    if target.get("dataAttributes"):
        print(f"- Data attributes: `{json.dumps(target.get('dataAttributes'), sort_keys=True)}`")
    if target.get("className"):
        print(f"- Class: `{target.get('className')}`")
    if target.get("text"):
        print(f"- Selected text: {compact(target.get('text'), 260)}")
    if resolution.get("primary"):
        print(f"- Resolved source: `{resolution['primary']}`")
    elif resolution.get("candidates"):
        print(f"- Source candidates: `{', '.join(resolution['candidates'])}`")
    else:
        print("- Source: unresolved; infer from screenshot, URL, selector, and repo search.")
    print(f"- note.md: `{directory / 'note.md'}`")
    print(f"- meta.json: `{directory / 'meta.json'}`")
    print(f"- screenshot: `{directory / 'shot.png'}`")
    print(f"  ![annotation screenshot]({directory / 'shot.png'})")
    for ref in refs:
        path = directory / ref
        print(f"- reference: `{path}`")
        print(f"  ![reference image]({path})")
    print(f"- comments: `{directory / 'comments.jsonl'}`\n")


def component_chain(target: dict[str, Any]) -> str:
    return " > ".join(c.get("name", "") for c in (target.get("componentChain") or []) if c.get("name"))


def compact(value: str, limit: int = 140) -> str:
    one_line = " ".join(str(value).split())
    return one_line if len(one_line) <= limit else one_line[: limit - 1] + "..."


if __name__ == "__main__":
    raise SystemExit(main())
