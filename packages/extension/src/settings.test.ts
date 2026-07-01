import { test } from "node:test";
import assert from "node:assert/strict";
import { bridgeUrlForUrl, enabledActions, type LoupeSettings } from "./settings.js";

function settings(overrides: Partial<LoupeSettings> = {}): LoupeSettings {
  return {
    bridgeUrl: "http://localhost:7337",
    author: "me",
    projectOrigins: ["localhost"],
    codexLaunchMode: "background",
    disabledProviders: [],
    bridgeRoutes: [
      {
        origins: ["mac-studio*.ts.net", "*.mac-studio.local"],
        bridgeUrl: "http://mac-studio.tailnet.ts.net:7337/",
      },
    ],
    ...overrides,
  };
}

test("uses default bridge for localhost project pages", () => {
  assert.equal(bridgeUrlForUrl(settings(), "http://localhost:5173/app"), "http://localhost:7337");
});

test("routes mac-studio tailnet pages to the remote bridge", () => {
  assert.equal(
    bridgeUrlForUrl(settings(), "https://mac-studio.tailnet.ts.net:3000/app"),
    "http://mac-studio.tailnet.ts.net:7337",
  );
});

test("routes mac-studio local subdomains to the remote bridge", () => {
  assert.equal(
    bridgeUrlForUrl(settings(), "http://preview.mac-studio.local:3000/app"),
    "http://mac-studio.tailnet.ts.net:7337",
  );
});

test("enabledActions drops disabled providers but keeps save", () => {
  const actions = [
    { id: "save", label: "Save" },
    { id: "claude", label: "Claude" },
    { id: "copilot", label: "Copilot" },
    { id: "pi", label: "Pi" },
  ];
  const result = enabledActions(actions, settings({ disabledProviders: ["copilot", "pi"] }));
  assert.deepEqual(
    result.map((a) => a.id),
    ["save", "claude"],
  );
});

test("enabledActions returns all actions when nothing is disabled", () => {
  const actions = [
    { id: "save", label: "Save" },
    { id: "claude", label: "Claude" },
  ];
  assert.deepEqual(enabledActions(actions, settings()), actions);
});
