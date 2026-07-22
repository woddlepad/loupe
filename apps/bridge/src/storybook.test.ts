import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import type { Annotation } from "@loupe/core/model";
import { writeBundle } from "./bundle.js";
import { resolveStorybookContext, storyIdFromUrl } from "./storybook.js";

test("detects manager and direct iframe story URLs", () => {
  assert.equal(
    storyIdFromUrl("http://localhost:6006/?path=/story/foundations-actions-button--primary"),
    "foundations-actions-button--primary",
  );
  assert.equal(
    storyIdFromUrl("http://localhost:6006/iframe.html?id=foundations-actions-button--primary&viewMode=story"),
    "foundations-actions-button--primary",
  );
});

test("ignores ordinary and non-story Storybook URLs", () => {
  assert.equal(storyIdFromUrl("http://localhost:5173/settings"), undefined);
  assert.equal(storyIdFromUrl("http://localhost:6006/?path=/docs/foundations-actions-button--docs"), undefined);
  assert.equal(storyIdFromUrl("not a URL"), undefined);
});

test("resolves deterministic metadata from the running Storybook index", async () => {
  let requestedUrl = "";
  const context = await resolveStorybookContext(
    "http://localhost:6006/ui/iframe.html?id=foundations-actions-button--primary",
    "packages/ui/src/button.tsx",
    async (input) => {
      requestedUrl = String(input);
      return new Response(JSON.stringify({
        entries: {
          "foundations-actions-button--primary": {
            id: "foundations-actions-button--primary",
            name: "Primary",
            exportName: "Primary",
            importPath: "./packages/ui/src/button.stories.tsx",
          },
        },
      }));
    },
  );

  assert.equal(requestedUrl, "http://localhost:6006/ui/index.json");
  assert.deepEqual(context, {
    storyId: "foundations-actions-button--primary",
    baseUrl: "http://localhost:6006/ui",
    storyFile: "./packages/ui/src/button.stories.tsx",
    importPath: "./packages/ui/src/button.stories.tsx",
    name: "Primary",
    exportName: "Primary",
    componentSource: "packages/ui/src/button.tsx",
  });
});

test("prefers an indexed component path and fails closed for missing stories", async () => {
  const fetcher = async () => new Response(JSON.stringify({
    entries: {
      "button--primary": {
        name: "Primary",
        importPath: "./button.stories.tsx",
        componentPath: "./button.tsx",
      },
    },
  }));

  assert.deepEqual(
    await resolveStorybookContext("http://localhost:6006/?path=/story/button--primary", "fallback.tsx", fetcher),
    {
      storyId: "button--primary",
      baseUrl: "http://localhost:6006",
      storyFile: "./button.stories.tsx",
      importPath: "./button.stories.tsx",
      name: "Primary",
      componentSource: "button.tsx",
    },
  );
  assert.equal(
    await resolveStorybookContext("http://localhost:6006/?path=/story/missing--story", undefined, fetcher),
    undefined,
  );
});

test("persists resolved Storybook context without changing ordinary annotation metadata", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-storybook-"));
  const base: Annotation = {
    id: "story-1",
    url: "http://localhost:6006/?path=/story/button--primary",
    title: "Primary",
    rect: { x: 0, y: 0, width: 10, height: 10 },
    devicePixelRatio: 1,
    target: { tag: "button", selector: "button", text: "Save", dataAttributes: {}, className: "", componentChain: [] },
    note: "tighten spacing",
    createdAt: "2026-07-22T00:00:00.000Z",
  };
  const storybook = {
    storyId: "button--primary",
    baseUrl: "http://localhost:6006",
    storyFile: "./button.stories.tsx",
    importPath: "./button.stories.tsx",
    name: "Primary",
    componentSource: "button.tsx",
  };

  const storyBundle = writeBundle(repo, { ...base, storybook }, { candidates: [], method: "none" });
  const ordinaryBundle = writeBundle(repo, { ...base, id: "ordinary-1", url: "http://localhost:5173/" }, { candidates: [], method: "none" });
  const storyMeta = JSON.parse(readFileSync(join(storyBundle.absDir, "meta.json"), "utf8")) as Annotation;
  const ordinaryMeta = JSON.parse(readFileSync(join(ordinaryBundle.absDir, "meta.json"), "utf8")) as Annotation;

  assert.deepEqual(storyMeta.storybook, storybook);
  assert.equal("storybook" in ordinaryMeta, false);
});
