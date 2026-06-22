import { test } from "node:test";
import assert from "node:assert/strict";
import { isProjectUrl } from "./origins.js";

const PROJECT = ["localhost", "127.0.0.1", "*.localhost", "*.my-tailnet.ts.net", "staging.acme.com"];

test("localhost with a port is a project origin", () => {
  assert.equal(isProjectUrl("http://localhost:3000/app", PROJECT), true);
});

test("port-specific localhost patterns only match that dev server", () => {
  const project = ["localhost:5173"];
  assert.equal(isProjectUrl("http://localhost:5173/app", project), true);
  assert.equal(isProjectUrl("http://localhost:3000/app", project), false);
});

test("127.0.0.1 is a project origin", () => {
  assert.equal(isProjectUrl("http://127.0.0.1:8081/", PROJECT), true);
});

test("a tailnet wildcard matches any subdomain", () => {
  assert.equal(isProjectUrl("https://myapp.my-tailnet.ts.net/x", PROJECT), true);
});

test("a tailnet wildcard also matches the apex", () => {
  assert.equal(isProjectUrl("https://my-tailnet.ts.net/", PROJECT), true);
});

test("an exact remote host matches", () => {
  assert.equal(isProjectUrl("https://staging.acme.com/dash", PROJECT), true);
});

test("a foreign site (Notion) is NOT a project origin", () => {
  assert.equal(isProjectUrl("https://www.notion.so/page", PROJECT), false);
});

test("a lookalike host is not matched by the wildcard", () => {
  assert.equal(isProjectUrl("https://evil-my-tailnet.ts.net.attacker.com/", PROJECT), false);
});
