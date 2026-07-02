import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { listDreams, readDream, writeDream } from "./dreams.js";

test("writes and reads Dreamer artifacts", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-dream-"));
  try {
    const dream = writeDream(repo, {
      title: "Portal chat hardening",
      goal: "/goal Harden portal chat delivery",
      summary: "Plan the backend contracts and verification harness.",
      priority: 1,
      recommended: true,
      branch: "origin/health",
      plan: "# Portal chat hardening\n",
      canvas: "## Flow\n",
    });

    assert.equal(dream.id, "portal-chat-hardening");
    assert.equal(dream.files.plan, "plan.mdx");
    assert.equal(dream.files.canvas, "canvas.mdx");
    assert.equal(listDreams(repo).length, 1);

    const detail = readDream(repo, dream.id);
    assert.equal(detail?.content.plan, "# Portal chat hardening\n");
    assert.equal(detail?.recommended, true);

    const meta = JSON.parse(readFileSync(join(repo, ".loupe/dreams/portal-chat-hardening/dream.json"), "utf8")) as { visualPlan?: { skill?: string } };
    assert.equal(meta.visualPlan?.skill, "visual-plan");
  } finally {
    rmSync(repo, { recursive: true, force: true });
  }
});

test("falls back to plan.mdx frontmatter when dream.json is absent", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-dream-frontmatter-"));
  try {
    const dir = join(repo, ".loupe/dreams/schema-verification");
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, "plan.mdx"),
      [
        "---",
        "title: Schema verification",
        "priority: 2",
        "recommended: true",
        "status: planned",
        "---",
        "",
        "# Schema verification",
      ].join("\n"),
    );
    const dreams = listDreams(repo);
    assert.equal(dreams[0]?.title, "Schema verification");
    assert.equal(dreams[0]?.priority, 2);
    assert.equal(dreams[0]?.recommended, true);
  } finally {
    rmSync(repo, { recursive: true, force: true });
  }
});

test("rejects goals over the launch limit", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-dream-limit-"));
  try {
    assert.throws(
      () => writeDream(repo, { title: "Oversized", goal: "x".repeat(4001) }),
      /goal is limited to 4000 characters/,
    );
  } finally {
    rmSync(repo, { recursive: true, force: true });
  }
});
