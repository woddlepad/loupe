import type { LoupeMessage } from "./messages.js";
import { bridgeUrlForUrl, loadSettings, saveSettings } from "./settings.js";

const status = document.getElementById("status") as HTMLDivElement;
const activeProject = document.getElementById("activeProject") as HTMLSelectElement;
const projectStatus = document.getElementById("projectStatus") as HTMLDivElement;

interface BridgeProject {
  name: string;
  origins: string[];
  framework?: string;
  repoRoot: string;
  updatedAt: string;
}

interface ProjectsResponse {
  projects: BridgeProject[];
  matches: BridgeProject[];
  selected: {
    repoRoot: string;
    project: {
      name: string;
      origins: string[];
      framework?: string;
    };
  };
}

void renderProjects();

async function run(type: "popup-annotate" | "popup-view"): Promise<void> {
  status.textContent = "";
  const res = (await chrome.runtime.sendMessage({ type } satisfies LoupeMessage)) as {
    ok: boolean;
    error?: string;
  };
  if (res?.ok) {
    window.close();
  } else {
    status.textContent = res?.error ?? "couldn't start on this page";
  }
}

document.getElementById("annotate")?.addEventListener("click", () => void run("popup-annotate"));
document.getElementById("view")?.addEventListener("click", () => void run("popup-view"));
activeProject.addEventListener("change", async () => {
  const repoRoot = activeProject.value;
  if (repoRoot) {
    await saveSettings({ activeRepoRoot: repoRoot });
  } else {
    await chrome.storage.sync.remove("activeRepoRoot");
  }
  await renderProjects();
});
document.getElementById("settings")?.addEventListener("click", (e) => {
  e.preventDefault();
  chrome.runtime.openOptionsPage();
});

async function renderProjects(): Promise<void> {
  const settings = await loadSettings();
  const pageUrl = await currentTabUrl();
  const bridgeUrl = bridgeUrlForUrl(settings, pageUrl);
  const url = new URL("/projects", bridgeUrl.endsWith("/") ? bridgeUrl : `${bridgeUrl}/`);
  if (pageUrl) url.searchParams.set("pageUrl", pageUrl);
  if (settings.activeRepoRoot) url.searchParams.set("repoRoot", settings.activeRepoRoot);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = (await res.json()) as ProjectsResponse;
    activeProject.disabled = false;
    activeProject.replaceChildren(autoOption(body), ...body.projects.map(projectOption));
    activeProject.value = settings.activeRepoRoot ?? "";
    projectStatus.textContent = projectDetail(body, settings.activeRepoRoot);
  } catch {
    activeProject.disabled = true;
    activeProject.replaceChildren(option("Bridge unavailable", ""));
    projectStatus.textContent = `not connected at ${bridgeUrl}`;
  }
}

function autoOption(body: ProjectsResponse): HTMLOptionElement {
  const name = body.selected.project.name || repoName(body.selected.repoRoot);
  const suffix = body.matches.length > 1 ? "multiple matches" : "current page";
  return option(`Auto: ${name} (${suffix})`, "");
}

function projectOption(project: BridgeProject): HTMLOptionElement {
  return option(project.name || repoName(project.repoRoot), project.repoRoot);
}

function projectDetail(body: ProjectsResponse, activeRepoRoot: string | undefined): string {
  if (!activeRepoRoot && body.matches.length > 1) {
    return `multiple projects match this page\n${body.selected.repoRoot}`;
  }
  const mode = activeRepoRoot ? "manual" : "auto";
  return `${mode}: ${body.selected.repoRoot}`;
}

function option(label: string, value: string): HTMLOptionElement {
  const el = document.createElement("option");
  el.value = value;
  el.textContent = label;
  return el;
}

function repoName(repoRoot: string): string {
  return repoRoot.split(/[\\/]/).filter(Boolean).at(-1) ?? repoRoot;
}

async function currentTabUrl(): Promise<string | undefined> {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab?.url;
  } catch {
    return undefined;
  }
}
