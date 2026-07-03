import { test } from "node:test";
import assert from "node:assert/strict";
import {
  bridgeRouteFromInput,
  bridgeUrlForUrl,
  enabledActions,
  normalizeBridgeRoutes,
  parseBridgeRouteOrigins,
  type LoupeSettings,
} from "./settings.js";

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

test("uses the first matching bridge route", () => {
  assert.equal(
    bridgeUrlForUrl(
      settings({
        bridgeRoutes: [
          { origins: ["*.example.test"], bridgeUrl: "http://first.example.test:7337" },
          { origins: ["preview.example.test"], bridgeUrl: "http://second.example.test:7337" },
        ],
      }),
      "https://preview.example.test/app",
    ),
    "http://first.example.test:7337",
  );
});

test("parses comma and newline separated bridge route origins", () => {
  assert.deepEqual(parseBridgeRouteOrigins("localhost:5173, *.tailnet.ts.net\nstaging.acme.com"), [
    "localhost:5173",
    "*.tailnet.ts.net",
    "staging.acme.com",
  ]);
});

test("creates a complete bridge route from input", () => {
  assert.deepEqual(bridgeRouteFromInput("localhost:5173, *.tailnet.ts.net", " http://remote:7337/ "), {
    origins: ["localhost:5173", "*.tailnet.ts.net"],
    bridgeUrl: "http://remote:7337",
  });
});

test("ignores incomplete bridge route input", () => {
  assert.equal(bridgeRouteFromInput("localhost:5173", ""), undefined);
  assert.equal(bridgeRouteFromInput("", "http://remote:7337"), undefined);
});

test("normalizes bridge routes before saving", () => {
  assert.deepEqual(
    normalizeBridgeRoutes([
      { origins: ["localhost:5173", " *.tailnet.ts.net "], bridgeUrl: " http://remote:7337/ " },
      { origins: [], bridgeUrl: "http://empty-origins:7337" },
      { origins: ["staging.acme.com"], bridgeUrl: "" },
    ]),
    [{ origins: ["localhost:5173", "*.tailnet.ts.net"], bridgeUrl: "http://remote:7337" }],
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
