import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { test } from "node:test";
import type { Annotation } from "@loupe/core/model";
import { writeBundle, writeReference } from "./bundle.js";
import {
  addAnnotationReference,
  appendComment,
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

test("agent completion comments move annotations to needs review, not resolved", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-agent-review-"));
  writeBundle(repo, annotation("ann-1"), { candidates: [], method: "none" });

  assert.equal(appendComment(repo, "ann-1", {
    author: "agent:codex",
    body: "implemented",
    createdAt: "2026-06-22T00:01:00.000Z",
    status: "resolved",
  }), true);

  let [stored] = listAnnotations(repo);
  assert.equal(stored?.status, "needs_review");
  assert.equal(stored?.comments?.[0]?.status, "needs_review");

  assert.equal(appendComment(repo, "ann-1", {
    author: "Dani",
    body: "looks good",
    createdAt: "2026-06-22T00:02:00.000Z",
    status: "resolved",
  }), true);

  [stored] = listAnnotations(repo);
  assert.equal(stored?.status, "resolved");
  assert.equal(stored?.comments?.[1]?.status, "resolved");
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
