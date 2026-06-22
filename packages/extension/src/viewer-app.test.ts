import assert from "node:assert/strict";
import { test } from "node:test";
import { fileUrl } from "./viewer-app.js";

test("fileUrl includes selected repo routing for bridge file requests", () => {
  const url = new URL(fileUrl("http://localhost:7337", ".loupe/references/ref-1", "shot.png", {
    pageUrl: "http://localhost:5173/app",
    repoRoot: "/Users/dani/dev/app",
  }));

  assert.equal(url.origin, "http://localhost:7337");
  assert.equal(url.pathname, "/file");
  assert.equal(url.searchParams.get("path"), ".loupe/references/ref-1/shot.png");
  assert.equal(url.searchParams.get("pageUrl"), "http://localhost:5173/app");
  assert.equal(url.searchParams.get("repoRoot"), "/Users/dani/dev/app");
});
