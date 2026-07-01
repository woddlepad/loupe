import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { test } from "node:test";
import type { Annotation } from "@loupe/core/model";
import { writeBundle, writeRecordingBundle, writeReference } from "./bundle.js";
import {
  addAnnotationReference,
  createGroup,
  deleteGroup,
  deleteReference,
  deleteReferencesForUrl,
  deleteResolvedAnnotations,
  groupSlug,
  groupSummaries,
  listAnnotations,
  listReferences,
  moveAnnotationToGroup,
  renameGroup,
  reorderGroups,
  referenceImageDataUrl,
  resolveGroup,
  setAnnotationStatus,
  updateAnnotation,
} from "./store.js";

const PNG_DATA_URL = `data:image/png;base64,${Buffer.from("png").toString("base64")}`;

function annotation(id: string, note = "initial note"): Annotation {
  return {
    id,
    url: "http://localhost:3000/page",
    title: "Page",
    rect: { x: 10, y: 20, width: 30, height: 40 },
    devicePixelRatio: 2,
    target: {
      tag: "button",
      selector: "button",
      text: "Save",
      dataAttributes: {},
      className: "",
      componentChain: [{ name: "Button" }],
    },
    acceptedSuggestions: [],
    note,
    createdAt: "2026-06-22T00:00:00.000Z",
    group: "notes",
    screenshotDataUrl: PNG_DATA_URL,
  };
}

test("updates saved annotation notes and appends references", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-store-"));
  const bundle = writeBundle(repo, annotation("ann-1"), { candidates: [], method: "none" });

  assert.equal(updateAnnotation(repo, "ann-1", { note: "updated note" }), true);
  assert.equal(addAnnotationReference(repo, "ann-1", { caption: "after", dataUrl: PNG_DATA_URL }), true);

  const [stored] = listAnnotations(repo);
  assert.equal(stored?.note, "updated note");
  assert.equal(stored?.references?.[0]?.file, "refs/ref-1.png");
  assert.equal(existsSync(resolve(repo, stored!.dir, "refs/ref-1.png")), true);

  const note = readFileSync(join(bundle.absDir, "note.md"), "utf8");
  assert.match(note, /updated note/);
  assert.match(note, /refs\/ref-1\.png/);
});

test("writes recording events and extracted keyframes", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-recording-"));
  const capture: Annotation = {
    ...annotation("rec-1", "recorded flow"),
    kind: "recording",
    recording: {
      startedAt: "2026-06-22T00:00:00.000Z",
      durationMs: 1200,
      console: [],
      network: [{ kind: "fetch", method: "GET", url: "http://localhost:3000/api", status: 500, ok: false, durationMs: 42, t: 700 }],
      errors: [],
      events: [{ kind: "click", t: 500, label: "click button Save", x: 20, y: 30, selector: "button", text: "Save" }],
      keyframes: [{ t: 720, eventT: 500, label: "after click button Save", dataUrl: PNG_DATA_URL }],
    },
  };

  const bundle = writeRecordingBundle(repo, capture, { candidates: [], method: "none" });
  const keyframe = resolve(repo, bundle.dir, "keyframes/frame-001.png");

  assert.equal(existsSync(keyframe), true);
  assert.equal(readFileSync(resolve(repo, bundle.dir, "events.jsonl"), "utf8").includes("click button Save"), true);

  const meta = JSON.parse(readFileSync(resolve(repo, bundle.dir, "meta.json"), "utf8")) as {
    recording: { counts: { events: number; keyframes: number; failedRequests: number }; keyframes: { file: string; dataUrl?: string }[] };
  };
  assert.equal(meta.recording.counts.events, 1);
  assert.equal(meta.recording.counts.keyframes, 1);
  assert.equal(meta.recording.counts.failedRequests, 1);
  assert.equal(meta.recording.keyframes[0]?.file, "keyframes/frame-001.png");
  assert.equal("dataUrl" in meta.recording.keyframes[0]!, false);
});

test("lists references by capture date, resolves images, and deletes library items", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-references-"));
  writeReference(repo, { ...annotation("old-ref"), createdAt: "2026-06-21T00:00:00.000Z" });
  writeReference(repo, { ...annotation("new-ref"), createdAt: "2026-06-23T00:00:00.000Z" });
  writeReference(repo, {
    ...annotation("other-ref"),
    url: "http://example.com/ref",
    createdAt: "2026-06-22T00:00:00.000Z",
  });

  assert.deepEqual(listReferences(repo).map((ref) => ref.id), ["new-ref", "other-ref", "old-ref"]);
  assert.equal(referenceImageDataUrl(repo, "new-ref"), PNG_DATA_URL);
  assert.equal(deleteReferencesForUrl(repo, "http://localhost:3000/page"), 2);
  assert.deepEqual(listReferences(repo).map((ref) => ref.id), ["other-ref"]);
  assert.equal(deleteReference(repo, "other-ref"), true);
  assert.deepEqual(listReferences(repo), []);
});

test("deletes all resolved annotations", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-resolved-"));
  writeBundle(repo, { ...annotation("open-1"), status: "open" }, { candidates: [], method: "none" });
  writeBundle(repo, { ...annotation("done-1"), status: "resolved" }, { candidates: [], method: "none" });
  writeBundle(repo, { ...annotation("done-2"), status: "resolved" }, { candidates: [], method: "none" });

  assert.equal(deleteResolvedAnnotations(repo), 2);
  assert.deepEqual(listAnnotations(repo).map((a) => a.id), ["open-1"]);
});

test("agent completion moves annotations to needs review, not resolved", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-agent-review-"));
  writeBundle(repo, annotation("ann-1"), { candidates: [], method: "none" });

  // An agent trying to resolve is redirected to needs_review.
  assert.equal(setAnnotationStatus(repo, "ann-1", "resolved", "agent:codex"), true);
  let [stored] = listAnnotations(repo);
  assert.equal(stored?.status, "needs_review");

  // A human can resolve directly.
  assert.equal(setAnnotationStatus(repo, "ann-1", "resolved", "Dani"), true);
  [stored] = listAnnotations(repo);
  assert.equal(stored?.status, "resolved");

  assert.equal(setAnnotationStatus(repo, "missing", "resolved"), false);
});

test("resolveGroup resolves every open annotation in a group", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-resolve-group-"));
  writeBundle(repo, { ...annotation("g-open-1"), status: "open" }, { candidates: [], method: "none" });
  writeBundle(repo, { ...annotation("g-open-2"), status: "needs_review" }, { candidates: [], method: "none" });
  writeBundle(repo, { ...annotation("g-done"), status: "resolved" }, { candidates: [], method: "none" });

  assert.equal(resolveGroup(repo, "notes"), 2);
  assert.deepEqual(
    listAnnotations(repo).every((a) => a.status === "resolved"),
    true,
  );
  // Re-running finds nothing left to resolve.
  assert.equal(resolveGroup(repo, "notes"), 0);
});

test("deletes a group and removes it from ordering", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-delete-group-"));
  writeBundle(repo, annotation("ann-1"), { candidates: [], method: "none" });
  createGroup(repo, "Later");
  reorderGroups(repo, ["later", "notes"]);

  assert.deepEqual(deleteGroup(repo, "notes"), { deleted: true, count: 1 });
  assert.equal(existsSync(resolve(repo, ".loupe/annotations/notes")), false);
  assert.deepEqual(groupSummaries(repo).map((g) => g.slug), ["later"]);
  assert.deepEqual(listAnnotations(repo), []);
});

test("renames a group and moves bundles to the new slug", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-rename-"));
  writeBundle(repo, annotation("ann-1"), { candidates: [], method: "none" });

  assert.equal(renameGroup(repo, groupSlug("notes"), "Portal flows"), 1);

  const [stored] = listAnnotations(repo);
  assert.equal(stored?.group, "Portal flows");
  assert.equal(stored?.groupSlug, "portal-flows");
  assert.equal(stored?.dir.startsWith(".loupe/annotations/portal-flows/"), true);
  assert.equal(existsSync(resolve(repo, stored!.dir)), true);

  const note = readFileSync(resolve(repo, stored!.dir, "note.md"), "utf8");
  assert.match(note, /\*\*Group:\*\* Portal flows/);
});

test("creates groups, moves annotations, and persists group order", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-groups-"));
  writeBundle(repo, annotation("ann-1"), { candidates: [], method: "none" });

  createGroup(repo, "Polish");
  assert.deepEqual(groupSummaries(repo).map((g) => g.slug), ["polish", "notes"]);

  assert.equal(moveAnnotationToGroup(repo, "ann-1", "Polish"), true);
  assert.deepEqual(reorderGroups(repo, ["notes", "polish"]), ["notes", "polish"]);

  const [stored] = listAnnotations(repo);
  assert.equal(stored?.group, "Polish");
  assert.equal(stored?.groupSlug, "polish");
  assert.equal(stored?.dir.startsWith(".loupe/annotations/polish/"), true);
  assert.deepEqual(groupSummaries(repo).map((g) => [g.slug, g.count]), [
    ["notes", 0],
    ["polish", 1],
  ]);
});

test("renames an empty group", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-empty-group-"));
  createGroup(repo, "Empty");

  assert.equal(renameGroup(repo, "empty", "Later"), 0);
  assert.deepEqual(groupSummaries(repo).map((g) => g.slug), ["later"]);
});
