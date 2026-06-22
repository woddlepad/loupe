import { spawnSync } from "node:child_process";

export function gitUserName(repoRoot: string): string {
  return gitConfig(repoRoot, "user.name") || gitConfig(repoRoot, "user.email") || process.env["USER"] || "unknown";
}

function gitConfig(repoRoot: string, key: string): string {
  const res = spawnSync("git", ["config", "--get", key], {
    cwd: repoRoot,
    encoding: "utf8",
    timeout: 2000,
  });
  return res.status === 0 ? res.stdout.trim() : "";
}
