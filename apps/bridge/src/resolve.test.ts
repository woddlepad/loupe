import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";
import type { AnnotationTarget } from "@loupe/core/model";
import { Resolver } from "./resolve/index.js";

function repoWithComponent(): string {
  const root = mkdtempSync(join(tmpdir(), "loupe-test-"));
  const dir = join(root, "src/components");
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "Button.tsx"),
    `export function Button(props: { label: string }) {\n  return null;\n}\n`,
  );
  return root;
}

function repoWithVueComponents(): string {
  const root = mkdtempSync(join(tmpdir(), "loupe-vue-test-"));
  const dir = join(root, "src/components");
  mkdirSync(dir, { recursive: true });
  // A Vue SFC declares no `function TodoList` in its body — it is identified by
  // filename. Vuetify library components (VBtn, VCard) never live in the repo.
  writeFileSync(
    join(dir, "TodoList.vue"),
    `<script setup>\nimport { ref } from "vue";\nconst items = ref([]);\n</script>\n<template>\n  <v-card><v-btn>Add</v-btn></v-card>\n</template>\n`,
  );
  return root;
}

function target(partial: Partial<AnnotationTarget>): AnnotationTarget {
  return {
    tag: "button",
    selector: "button",
    text: "",
    dataAttributes: {},
    className: "",
    componentChain: [],
    ...partial,
  };
}

test("ripgrep resolves a component definition to its file", () => {
  const r = new Resolver(repoWithComponent());
  const res = r.resolve(target({ componentChain: [{ name: "Button" }] }));
  assert.equal(res.method, "ripgrep");
  assert.match(res.primary ?? "", /Button\.tsx$/);
});

test("returns method 'none' when nothing matches", () => {
  const r = new Resolver(mkdtempSync(join(tmpdir(), "loupe-empty-")));
  const res = r.resolve(target({ componentChain: [{ name: "ZzzNonexistentComponent" }] }));
  assert.equal(res.method, "none");
  assert.equal(res.primary, undefined);
  assert.deepEqual(res.candidates, []);
});

test("resolves a Vue SFC by filename when Vuetify library components lead the chain", () => {
  const r = new Resolver(repoWithVueComponents());
  // The overlay reports the innermost Vuetify components first, then the user's.
  const res = r.resolve(
    target({
      componentChain: [
        { name: "VBtn", framework: "vue" },
        { name: "VCard", framework: "vue" },
        { name: "TodoList", framework: "vue" },
      ],
    }),
  );
  assert.equal(res.method, "filename");
  assert.match(res.primary ?? "", /TodoList\.vue$/);
});

test("ignores lowercase/host element names (not components)", () => {
  const r = new Resolver(repoWithComponent());
  const res = r.resolve(target({ tag: "div", componentChain: [] }));
  assert.equal(res.method, "none");
});
