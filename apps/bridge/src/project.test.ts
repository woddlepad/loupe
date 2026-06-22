import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { detectFramework, detectPorts, initProject, matchingProjects, projectMatchesUrl } from "./project.js";

function tempRepo(): string {
  return mkdtempSync(join(tmpdir(), "loupe-project-"));
}

test("detects Next.js and explicit dev script ports", () => {
  const repo = tempRepo();
  writeFileSync(
    join(repo, "package.json"),
    JSON.stringify({
      name: "web",
      scripts: { dev: "next dev --port 3010" },
      dependencies: { next: "latest", react: "latest" },
    }),
  );

  assert.equal(detectFramework(repo), "nextjs");
  assert.deepEqual(detectPorts(JSON.parse(readFileSync(join(repo, "package.json"), "utf8"))), [3010]);
});

test("initializes project config and global registry with detected Vite origins", () => {
  const repo = tempRepo();
  const registryPath = join(tempRepo(), "projects.json");
  writeFileSync(
    join(repo, "package.json"),
    JSON.stringify({
      name: "@acme/app",
      scripts: { dev: "vite" },
      dependencies: { react: "latest", vite: "latest" },
    }),
  );

  const result = initProject({ repoRoot: repo, registryPath });
  assert.equal(result.project.name, "app");
  assert.equal(result.detected.framework, "react-vite");
  assert.deepEqual(result.project.origins, ["localhost:5173", "127.0.0.1:5173"]);

  const repoConfig = JSON.parse(readFileSync(join(repo, ".loupe/config.json"), "utf8"));
  assert.deepEqual(repoConfig.project.origins, result.project.origins);

  const registry = JSON.parse(readFileSync(registryPath, "utf8"));
  assert.equal(registry.projects[0].repoRoot, repo);
});

test("init merges manual origins without duplicating existing config", () => {
  const repo = tempRepo();
  const registryPath = join(tempRepo(), "projects.json");
  writeFileSync(join(repo, "package.json"), JSON.stringify({ dependencies: { vue: "latest" } }));

  initProject({ repoRoot: repo, registryPath, origins: ["staging.acme.com"] });
  const result = initProject({ repoRoot: repo, registryPath, origins: ["staging.acme.com"] });

  assert.deepEqual(result.project.origins, ["staging.acme.com", "localhost:8080", "127.0.0.1:8080"]);
  const repoConfig = JSON.parse(readFileSync(join(repo, ".loupe/config.json"), "utf8"));
  assert.deepEqual(repoConfig.project.origins, ["staging.acme.com", "localhost:8080", "127.0.0.1:8080"]);
});

test("matches registered projects by host and port", () => {
  assert.equal(projectMatchesUrl({ name: "vite", origins: ["localhost:5173"] }, "http://localhost:5173/app"), true);
  assert.equal(projectMatchesUrl({ name: "vite", origins: ["localhost:5173"] }, "http://localhost:3000/app"), false);
  assert.equal(projectMatchesUrl({ name: "remote", origins: ["*.tailnet.ts.net"] }, "https://dev.tailnet.ts.net/app"), true);
});

test("returns every project that claims the same origin", () => {
  const projects = [
    { name: "one", repoRoot: "/repo/one", origins: ["localhost:5173"], updatedAt: "2026-01-01T00:00:00.000Z" },
    { name: "two", repoRoot: "/repo/two", origins: ["localhost:5173"], updatedAt: "2026-01-02T00:00:00.000Z" },
  ];

  assert.deepEqual(
    matchingProjects("http://localhost:5173/app", projects).map((project) => project.name),
    ["one", "two"],
  );
});
