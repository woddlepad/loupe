import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { anchorSummary, listDreams, readDream, writeDream, writeDreamFeedback } from "./dreams.js";

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

test("writes anchored feedback under feedback/ without polluting the dream", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-dream-feedback-"));
  try {
    const dream = writeDream(repo, { title: "Feedback target", plan: "# Feedback target\n" });
    const before = readDream(repo, dream.id)!;

    const written = writeDreamFeedback(repo, dream.id, {
      note: "Tighten the verification section",
      tab: "plan",
      targetFile: "plan.mdx",
      url: "http://localhost:7337/dreamer",
      anchor: {
        kind: "markdown",
        heading: "Verification",
        headingLevel: 2,
        quote: "Run the bash checks",
        selector: "article > ul > li:nth-of-type(2)",
        tag: "li",
        rect: { x: 320, y: 410, width: 520, height: 48 },
      },
    });

    assert.match(written.id, /^fb-/);
    assert.equal(written.relPath, join(".loupe/dreams/feedback-target/feedback", `${written.id}.md`));
    assert.ok(existsSync(written.absPath));

    const file = readFileSync(written.absPath, "utf8");
    assert.match(file, /^---\nid: fb-/);
    assert.match(file, /tab: plan/);
    assert.match(file, /target: plan\.mdx/);
    assert.match(file, /Tighten the verification section/);
    assert.match(file, /- Section: "Verification" \(h2\)/);
    assert.match(file, /- Element: <li> — "Run the bash checks"/);
    assert.match(file, /- Viewport rect: x=320 y=410 520×48/);

    // Fire-and-forget: the feedback subdir must stay invisible to the dream.
    const after = readDream(repo, dream.id)!;
    assert.deepEqual(after.files, before.files);
    assert.deepEqual(after.content, before.content);
  } finally {
    rmSync(repo, { recursive: true, force: true });
  }
});

test("rejects feedback for unknown or unsafe dream ids", () => {
  const repo = mkdtempSync(join(tmpdir(), "loupe-dream-feedback-safe-"));
  try {
    const input = { note: "n", tab: "plan" as const, anchor: { kind: "markdown" as const } };
    assert.throws(() => writeDreamFeedback(repo, "does-not-exist", input), /not found/);
    assert.throws(() => writeDreamFeedback(repo, "../escape", input), /not found/);
  } finally {
    rmSync(repo, { recursive: true, force: true });
  }
});

test("summarizes each anchor kind", () => {
  assert.equal(
    anchorSummary({
      note: "",
      tab: "plan",
      anchor: { kind: "markdown", heading: "Implementation Plan", headingLevel: 2, quote: "Add a compile step", tag: "li" },
    }),
    'section "Implementation Plan" (h2) → <li> "Add a compile step"',
  );
  assert.equal(
    anchorSummary({
      note: "",
      tab: "prototype",
      targetFile: "prototype.html",
      anchor: {
        kind: "iframe",
        tag: "button",
        quote: "Save changes",
        selector: "form > button.primary",
        iframeRect: { x: 120, y: 80, width: 260, height: 140 },
        iframeScroll: { x: 0, y: 250 },
      },
    }),
    '<button> "Save changes" inside the prototype.html prototype (selector form > button.primary)',
  );
  assert.equal(
    anchorSummary({
      note: "",
      tab: "prototype",
      targetFile: "prototype.html",
      anchor: { kind: "iframe", iframeRect: { x: 120, y: 80, width: 260, height: 140 } },
    }),
    "region x=120 y=80 260×140 inside the prototype.html prototype",
  );
  assert.equal(
    anchorSummary({
      note: "",
      tab: "canvas",
      anchor: { kind: "image", image: "shot-01.png", rect: { x: 40, y: 60, width: 300, height: 180 } },
    }),
    "image shot-01.png (viewport region x=40 y=60 300×180)",
  );
  assert.equal(
    anchorSummary({ note: "", tab: "report", anchor: { kind: "element", tag: "td", quote: "3 failed", selector: "table td" } }),
    '<td> "3 failed" (selector table td)',
  );
});
