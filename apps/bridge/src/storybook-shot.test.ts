import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import type { StoredAnnotation } from "./store.js";
import { captureStory, defaultStoryShotOutput, resolveStorybookBaseUrl, storybookContext, storyUrl } from "./storybook.js";

function annotation(storybook: Record<string, unknown>): StoredAnnotation {
  return { id: "ann-1", dir: ".loupe/annotations/inbox/ann-1", groupSlug: "inbox", storybook } as unknown as StoredAnnotation;
}

test("reads screenshot metadata and builds a direct iframe URL", () => {
  const context = storybookContext(annotation({ storyId: "actions-button--primary", baseUrl: "http://localhost:6007", storyFile: "src/button.stories.tsx" }));
  assert.equal(context?.storyId, "actions-button--primary");
  assert.equal(context?.storyFile, "src/button.stories.tsx");
  assert.equal(storyUrl("localhost:6006/", "actions-button--primary"), "http://localhost:6006/iframe.html?id=actions-button--primary&viewMode=story");
});

test("resolves repo Storybook config and its default", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-storybook-shot-"));
  mkdirSync(join(repo, ".loupe"));
  writeFileSync(join(repo, ".loupe/config.json"), JSON.stringify({ storybook: { url: "http://localhost:7007" } }));
  assert.equal(resolveStorybookBaseUrl(repo), "http://localhost:7007");
  assert.equal(resolveStorybookBaseUrl(repo, annotation({ storyId: "a--b", baseUrl: "localhost:8008" })), "http://localhost:8008");
  assert.equal(resolveStorybookBaseUrl(mkdtempSync(join(tmpdir(), "loupe-storybook-default-"))), "http://localhost:6006");
});

test("uses deterministic output paths", () => {
  assert.equal(defaultStoryShotOutput("/repo", "a--b", annotation({ storyId: "a--b" })), "/repo/.loupe/annotations/inbox/ann-1/story.png");
  assert.equal(defaultStoryShotOutput("/repo", "actions/button--primary"), "/repo/.loupe/shots/actions-button--primary.png");
});

test("rejects an ordinary annotation instead of treating its id as a story id", async () => {
  const ordinary = annotation({});
  await assert.rejects(
    captureStory({ repoRoot: "/repo", target: ordinary.id, annotation: ordinary }),
    /was not captured from a Storybook story/,
  );
});
