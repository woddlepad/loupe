import { test } from "node:test";
import assert from "node:assert/strict";
import loupe, { annotateReactComponents } from "./index.js";

test("annotates top-level React function and wrapper components", () => {
  const out = annotateReactComponents(
    [
      "export function FlowGraphEditor() { return <div /> }",
      "const helper = () => null",
      "export const IconButton = forwardRef<HTMLButtonElement>((props, ref) => <button ref={ref} />)",
      "export const Timeline = memo(function TimelineImpl() { return null })",
    ].join("\n"),
    "portal-flow.tsx",
    "apps/web/src/components/shell/bodies/portal-flow.tsx",
  );

  assert.match(out, /Object\.defineProperty\(FlowGraphEditor, "__loupeSource"/);
  assert.match(out, /Object\.defineProperty\(IconButton, "__loupeSource"/);
  assert.match(out, /Object\.defineProperty\(Timeline, "__loupeSource"/);
  assert.doesNotMatch(out, /Object\.defineProperty\(helper,/);
});

test("plugin uses repo-relative paths and include filters", () => {
  const plugin = loupe({
    root: "/repo",
    include: ["apps/web/src/**/*.{ts,tsx}"],
  });
  const result = plugin.transform?.(
    "export function Button() { return <button /> }",
    "/repo/apps/web/src/components/Button.tsx?v=123",
  );

  assert.ok(result);
  assert.match(result.code, /"apps\/web\/src\/components\/Button\.tsx"/);
});

test("plugin skips files outside include filters", () => {
  const plugin = loupe({
    root: "/repo",
    include: ["apps/web/src/**/*.{ts,tsx}"],
  });

  assert.equal(plugin.transform?.("export function Button() { return null }", "/repo/packages/ui/src/Button.tsx"), null);
});
