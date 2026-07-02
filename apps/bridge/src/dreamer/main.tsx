import * as React from "react";
import { createRoot } from "react-dom/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  GitBranch,
  ImageIcon,
  ListFilter,
  Loader2,
  MoreHorizontal,
  Pencil,
  Play,
  Plus,
  Terminal,
  Trash2,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Textarea,
  cn,
} from "@loupe/ui";

type DreamStatus = "planned" | "approved" | "running" | "needs_review" | "done";

interface DreamFiles {
  plan?: string;
  canvas?: string;
  prototype?: string;
  prototypeHtml?: string;
  report?: string;
  images: string[];
}

interface DreamSummary {
  id: string;
  title: string;
  goal?: string;
  summary?: string;
  status?: DreamStatus;
  priority?: number;
  recommended?: boolean;
  branch?: string;
  createdAt: string;
  updatedAt: string;
  source?: string;
  dir: string;
  files: DreamFiles;
}

interface DreamDetail extends DreamSummary {
  content: {
    plan?: string;
    canvas?: string;
    prototype?: string;
    report?: string;
  };
}

interface ActionDescriptor {
  id: string;
  label: string;
  hint?: string;
}

type Mode = "plans" | "reports";
type PlanFilter = "all" | "tonight" | "with-report";
type PlanSort = "priority" | "title" | "branch";
type VisualTab = "plan" | "canvas" | "prototype" | "report";

type Draft = {
  id?: string;
  title: string;
  goal: string;
  summary: string;
  branch: string;
  repoRoot: string;
  priority: number;
  recommended: boolean;
  markdown: string;
};

type AutosaveState =
  | { kind: "clean" }
  | { kind: "dirty" }
  | { kind: "saving" }
  | { kind: "saved"; message: string }
  | { kind: "error"; message: string };

type LaunchState =
  | { kind: "idle" }
  | { kind: "ok"; message: string }
  | { kind: "error"; message: string };

const MAX_GOAL_CHARS = 4000;

const PLAN_FILTER_OPTIONS: { label: string; value: PlanFilter }[] = [
  { label: "All plans", value: "all" },
  { label: "Tonight", value: "tonight" },
  { label: "With reports", value: "with-report" },
];

const PLAN_SORT_OPTIONS: { label: string; value: PlanSort }[] = [
  { label: "Priority", value: "priority" },
  { label: "Title", value: "title" },
  { label: "Branch", value: "branch" },
];

const EMPTY_MARKDOWN = `## Background

## Repo Anchors

- 

## Success Criteria

- 

## Decisions To Grill

1. 

## Implementation Plan

1. 

## Verification

\`\`\`bash

\`\`\`
`;

function App() {
  const params = React.useMemo(() => new URLSearchParams(window.location.search), []);
  const repoRootParam = params.get("repoRoot") ?? undefined;
  const [mode, setMode] = React.useState<Mode>("plans");
  const [repoRoot, setRepoRoot] = React.useState(repoRootParam ?? "");
  const [plans, setPlans] = React.useState<DreamSummary[]>([]);
  const [details, setDetails] = React.useState<Record<string, DreamDetail>>({});
  const [actions, setActions] = React.useState<ActionDescriptor[]>([]);
  const [selectedPlanId, setSelectedPlanId] = React.useState("");
  const [selectedReportId, setSelectedReportId] = React.useState("");
  const [draft, setDraft] = React.useState<Draft | null>(null);
  const [draftDirty, setDraftDirty] = React.useState(false);
  const [planFilter, setPlanFilter] = React.useState<PlanFilter>("all");
  const [planSort, setPlanSort] = React.useState<PlanSort>("priority");
  const [activeTab, setActiveTab] = React.useState<VisualTab>("plan");
  const [launchState, setLaunchState] = React.useState<LaunchState>({ kind: "idle" });
  const [autosaveState, setAutosaveState] = React.useState<AutosaveState>({ kind: "clean" });
  const [loading, setLoading] = React.useState(true);
  const [isPending, startTransition] = React.useTransition();

  const selectedPlan = React.useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) ?? plans[0],
    [plans, selectedPlanId],
  );
  const selectedDetail = selectedPlan ? details[selectedPlan.id] : undefined;
  const activeDraft = draft ?? (selectedPlan ? draftFromDream(selectedPlan, selectedDetail, repoRoot) : null);
  const isEditing = Boolean(draft);
  const reports = React.useMemo(
    () => plans.filter((plan) => plan.files.report || plan.files.images.length > 0),
    [plans],
  );
  const selectedReport = React.useMemo(
    () => reports.find((report) => report.id === selectedReportId) ?? reports[0],
    [reports, selectedReportId],
  );
  const selectedReportDetail = selectedReport ? details[selectedReport.id] : undefined;

  React.useEffect(() => {
    void reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!selectedPlan || details[selectedPlan.id]) return;
    void loadDetail(selectedPlan.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlan?.id]);

  React.useEffect(() => {
    if (!selectedReport || details[selectedReport.id]) return;
    void loadDetail(selectedReport.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedReport?.id]);

  React.useEffect(() => {
    if (!draft || !draftDirty) return;
    const submittedDraft = draft;
    const submittedKey = draftKey(submittedDraft);
    let canceled = false;
    const timer = window.setTimeout(async () => {
      setAutosaveState({ kind: "saving" });
      try {
        const result = await persistDraft(submittedDraft);
        if (canceled) return;
        mergeDream(result.dream);
        setSelectedPlanId(result.dream.id);
        setDetails((current) => ({ ...current, [result.dream.id]: result.dream }));
        setDraft((current) => {
          if (!current) return current;
          if (current.id && current.id !== result.dream.id) return current;
          return { ...current, id: result.dream.id };
        });
        setDraftDirty((currentDirty) => {
          if (!currentDirty) return false;
          return draftKey(draft) !== submittedKey;
        });
        setAutosaveState({ kind: "saved", message: "Saved" });
      } catch (error) {
        if (canceled) return;
        setAutosaveState({ kind: "error", message: error instanceof Error ? error.message : String(error) });
      }
    }, 800);
    return () => {
      canceled = true;
      window.clearTimeout(timer);
    };
  }, [draft, draftDirty]);

  async function reload() {
    setLoading(true);
    try {
      const [health, dreams, actionList] = await Promise.all([
        fetchJson<{ repoRoot?: string }>("/health"),
        fetchJson<{ dreams: DreamSummary[] }>("/dreams"),
        fetchJson<{ actions?: ActionDescriptor[] }>("/actions").catch(() => ({ actions: [] })),
      ]);
      const nextPlans = [...(dreams.dreams ?? [])].sort(sortDreams);
      setRepoRoot(health.repoRoot ?? repoRootParam ?? "");
      setPlans(nextPlans);
      setActions((actionList.actions ?? []).filter((action) => action.id !== "save"));
      setSelectedPlanId((current) => current || nextPlans[0]?.id || "");
      setSelectedReportId((current) => current || nextPlans.find((plan) => plan.files.report || plan.files.images.length)?.id || "");
    } finally {
      setLoading(false);
    }
  }

  async function loadDetail(id: string): Promise<DreamDetail> {
    const detail = await fetchJson<DreamDetail>(`/dreams/${encodeURIComponent(id)}`);
    setDetails((current) => ({ ...current, [id]: detail }));
    return detail;
  }

  function mergeDream(dream: DreamDetail | DreamSummary) {
    setPlans((current) => {
      const without = current.filter((plan) => plan.id !== dream.id);
      return [...without, dream].sort(sortDreams);
    });
  }

  function beginCreatePlan() {
    setMode("plans");
    setLaunchState({ kind: "idle" });
    setAutosaveState({ kind: "clean" });
    setDraftDirty(false);
    setDraft({
      branch: "main",
      goal: "",
      markdown: EMPTY_MARKDOWN,
      priority: plans.length + 1,
      recommended: false,
      repoRoot,
      summary: "",
      title: "New dream",
    });
    setActiveTab("plan");
  }

  function beginEditPlan() {
    if (!selectedPlan) return;
    setLaunchState({ kind: "idle" });
    setAutosaveState({ kind: "clean" });
    setDraftDirty(false);
    setDraft(draftFromDream(selectedPlan, selectedDetail, repoRoot));
  }

  function updateDraft(next: Draft) {
    setDraft(next);
    setDraftDirty(true);
    setAutosaveState({ kind: "dirty" });
  }

  async function closeEditor() {
    if (draft && draftDirty) {
      setAutosaveState({ kind: "saving" });
      try {
        const result = await persistDraft(draft);
        mergeDream(result.dream);
        setDetails((current) => ({ ...current, [result.dream.id]: result.dream }));
        setSelectedPlanId(result.dream.id);
      } catch (error) {
        setAutosaveState({ kind: "error", message: error instanceof Error ? error.message : String(error) });
        return;
      }
    }
    setDraft(null);
    setDraftDirty(false);
    setAutosaveState({ kind: "clean" });
  }

  async function deleteSelectedPlan() {
    if (!selectedPlan) return;
    const response = await fetch(apiUrl(`/dreams/${encodeURIComponent(selectedPlan.id)}`), { method: "DELETE" });
    if (!response.ok) {
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      setLaunchState({ kind: "error", message: result.error ?? "Could not delete plan" });
      return;
    }
    setPlans((current) => {
      const next = current.filter((plan) => plan.id !== selectedPlan.id);
      setSelectedPlanId(next[0]?.id ?? "");
      return next;
    });
    setDetails((current) => {
      const next = { ...current };
      delete next[selectedPlan.id];
      return next;
    });
    setDraft(null);
    setDraftDirty(false);
    setAutosaveState({ kind: "clean" });
    setLaunchState({ kind: "ok", message: "Plan deleted" });
  }

  function launch(agent: ActionDescriptor) {
    setLaunchState({
      kind: "error",
      message: `${agent.label} launch for dreams is not wired yet. Use /dream ${selectedPlan?.id ?? ""} from an agent session for now.`,
    });
  }

  function apiUrl(path: string): string {
    const url = new URL(path, window.location.origin);
    if (repoRootParam) url.searchParams.set("repoRoot", repoRootParam);
    return url.toString();
  }

  async function fetchJson<T>(path: string): Promise<T> {
    const response = await fetch(apiUrl(path));
    const result = (await response.json()) as T & { error?: string };
    if (!response.ok) throw new Error(result.error ?? `HTTP ${response.status}`);
    return result;
  }

  async function persistDraft(nextDraft: Draft): Promise<{ dream: DreamDetail }> {
    const response = await fetch(apiUrl("/dreams"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: nextDraft.id,
        title: nextDraft.title,
        goal: nextDraft.goal,
        summary: nextDraft.summary,
        status: "planned",
        priority: nextDraft.priority,
        recommended: nextDraft.recommended,
        branch: nextDraft.branch,
        source: "dreamer-ui",
        plan: nextDraft.markdown,
      }),
    });
    const result = (await response.json()) as { dream?: DreamSummary; error?: string };
    if (!response.ok || !result.dream) {
      throw new Error(result.error ?? "Could not save plan");
    }
    const detail = await loadDetail(result.dream.id);
    return { dream: detail };
  }

  const visualTabs = selectedDetail ? tabsForDetail(selectedDetail) : ["plan" as const];
  const activeVisualTab = visualTabs.includes(activeTab) ? activeTab : visualTabs[0]!;

  return (
    <main className="h-svh overflow-hidden bg-background text-foreground">
      <div
        className={cn(
          "mx-auto grid h-full w-full grid-rows-[auto_minmax(0,1fr)] px-4 py-2 sm:px-6 lg:px-8",
          isEditing ? "max-w-none" : "max-w-7xl",
        )}
      >
        <header className="border-b border-border pb-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5">
              <h1 className="text-2xl font-semibold tracking-tight">Dreamer</h1>
              <p className="max-w-2xl text-xs text-muted-foreground">
                Review, edit, and launch overnight agent work from one place.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <Button onClick={() => setMode("plans")} size="sm" type="button" variant={mode === "plans" ? "default" : "secondary"}>
                Plans
              </Button>
              <Button onClick={() => setMode("reports")} size="sm" type="button" variant={mode === "reports" ? "default" : "secondary"}>
                Reports
              </Button>
              <Button className="gap-1.5" onClick={beginCreatePlan} size="sm" type="button" variant="outline">
                <Plus className="size-3.5" />
                New plan
              </Button>
              {isEditing ? (
                <Button className="gap-1.5" onClick={closeEditor} size="sm" type="button" variant="outline">
                  <X className="size-3.5" />
                  Back to plans
                </Button>
              ) : null}
            </div>
          </div>
        </header>

        {mode === "plans" ? (
          <div className={cn("dreamer-two-pane-layout", isEditing && "dreamer-edit-layout")}>
            {isEditing ? null : (
              <PlanSidebar
                planFilter={planFilter}
                planSort={planSort}
                plans={plans}
                selectedPlanId={selectedPlan?.id}
                setSelectedPlanId={(id) => {
                  setSelectedPlanId(id);
                  setDraft(null);
                  setActiveTab("plan");
                  setLaunchState({ kind: "idle" });
                }}
                setPlanFilter={setPlanFilter}
                setPlanSort={setPlanSort}
              />
            )}

            <section className="dreamer-detail-pane grid min-h-0 overflow-hidden rounded-lg border bg-card shadow-sm">
              {loading ? (
                <EmptyState icon={Loader2} message="Loading plans from .loupe/dreams." title="Loading dreams" />
              ) : selectedPlan || draft ? (
                <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)]">
                  <div className={cn("border-b px-4 sm:px-6", isEditing ? "py-2" : "py-4")}>
                    {isEditing ? (
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <h2 className="truncate text-base font-medium">{activeDraft?.title ?? "Editing plan"}</h2>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <StatusPill icon={GitBranch} label={activeDraft?.branch ?? "main"} />
                            <StatusPill icon={Terminal} label={activeDraft?.repoRoot ?? repoRoot} />
                          </div>
                        </div>
                        <AutosaveStatus state={autosaveState} />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                        <div className="min-w-0 space-y-2">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <StatusPill icon={GitBranch} label={activeDraft?.branch ?? selectedPlan?.branch ?? "main"} />
                            <StatusPill icon={Terminal} label={activeDraft?.repoRoot ?? repoRoot} />
                          </div>
                          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                            {activeDraft?.title ?? selectedPlan?.title}
                          </h2>
                          <p className="max-w-3xl text-sm text-muted-foreground">
                            {activeDraft?.summary || selectedPlan?.summary}
                          </p>
                          {selectedDetail && visualTabs.length > 1 ? (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {visualTabs.map((tab) => (
                                <Button
                                  key={tab}
                                  size="xs"
                                  type="button"
                                  variant={activeVisualTab === tab ? "default" : "outline"}
                                  onClick={() => setActiveTab(tab)}
                                >
                                  {tabLabel(tab)}
                                </Button>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        <div className="flex flex-col gap-2 sm:min-w-80">
                          <div className="grid grid-cols-2 gap-2">
                            {providerActions(actions).map((agent) => (
                              <Button
                                className="justify-center gap-2"
                                disabled={isPending || Boolean(draft)}
                                key={agent.id}
                                onClick={() => startTransition(() => launch(agent))}
                                title={agent.hint}
                                type="button"
                                variant={agent.id === "claude" ? "default" : "secondary"}
                              >
                                <ProviderIcon agent={agent.id} />
                                {agent.label}
                              </Button>
                            ))}
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <AutosaveStatus state={{ kind: "clean" }} />
                            <PlanActionsMenu
                              canDelete={Boolean(selectedPlan)}
                              canEdit={Boolean(selectedPlan)}
                              onDelete={deleteSelectedPlan}
                              onEdit={beginEditPlan}
                            />
                          </div>
                          <StatusMessage state={launchState} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="min-h-0 overflow-hidden">
                    {draft && activeDraft ? (
                      <PlanEditor draft={activeDraft} setDraft={updateDraft} />
                    ) : selectedDetail ? (
                      <VisualContent detail={selectedDetail} repoRootParam={repoRootParam} tab={activeVisualTab} />
                    ) : (
                      <PlanMarkdown markdown="Loading plan..." />
                    )}
                  </div>
                </div>
              ) : (
                <EmptyState
                  action={beginCreatePlan}
                  actionLabel="Create plan"
                  icon={Play}
                  message="Create a plan here, or run /dream so agents write visual plans under .loupe/dreams."
                  title="No plans yet"
                />
              )}
            </section>
          </div>
        ) : (
          <ReportsView
            repoRootParam={repoRootParam}
            reports={reports}
            selectedReport={selectedReport}
            selectedReportDetail={selectedReportDetail}
            selectedReportId={selectedReportId}
            setSelectedReportId={setSelectedReportId}
          />
        )}
      </div>
    </main>
  );
}

function PlanSidebar({
  planFilter,
  planSort,
  plans,
  selectedPlanId,
  setSelectedPlanId,
  setPlanFilter,
  setPlanSort,
}: {
  planFilter: PlanFilter;
  planSort: PlanSort;
  plans: DreamSummary[];
  selectedPlanId: string | undefined;
  setSelectedPlanId: (id: string) => void;
  setPlanFilter: (filter: PlanFilter) => void;
  setPlanSort: (sort: PlanSort) => void;
}) {
  const visiblePlans = filterAndSortPlans(plans, planFilter, planSort);

  return (
    <aside className="dreamer-sidebar grid min-h-0">
      <section className="dreamer-sidebar-section grid min-h-0 grid-rows-[auto_minmax(0,1fr)] rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="border-b px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-sm font-medium">Plans</h2>
              <p className="truncate text-xs text-muted-foreground">
                {filterLabel(planFilter)} · {sortLabel(planSort)}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <PlanFilterMenu planFilter={planFilter} setPlanFilter={setPlanFilter} />
              <PlanSortMenu planSort={planSort} setPlanSort={setPlanSort} />
            </div>
          </div>
        </div>
        <div className="min-h-0 space-y-1 overflow-auto p-2">
          {visiblePlans.map((plan, index) => (
            <PlanListButton
              compact
              index={index + 1}
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              plan={plan}
              selected={selectedPlanId === plan.id}
            />
          ))}
          {visiblePlans.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">No plans match this filter.</div>
          ) : null}
        </div>
      </section>
    </aside>
  );
}

function PlanListButton({
  compact,
  index,
  onClick,
  plan,
  selected,
}: {
  compact?: boolean;
  index: number;
  onClick: () => void;
  plan: DreamSummary;
  selected: boolean;
}) {
  return (
    <button
      className={cn(
        "dreamer-plan-button flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left transition-colors hover:bg-accent",
        selected && "border-foreground/30 bg-accent",
        compact && "border-transparent",
      )}
      onClick={onClick}
      type="button"
    >
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] text-secondary-foreground">
        <span
          className={cn(
            "flex size-5 items-center justify-center rounded-full",
            plan.recommended
              ? "bg-primary text-primary-foreground shadow-[0_0_0_2px_color-mix(in_oklch,var(--primary),transparent_70%)]"
              : "bg-secondary text-secondary-foreground",
          )}
        >
          {plan.priority ?? index}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{plan.title}</span>
        <span className={cn("text-xs text-muted-foreground", compact ? "block truncate" : "line-clamp-2")}>
          {compact ? plan.branch ?? "main" : plan.summary}
        </span>
      </span>
      <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
    </button>
  );
}

function PlanFilterMenu({
  planFilter,
  setPlanFilter,
}: {
  planFilter: PlanFilter;
  setPlanFilter: (filter: PlanFilter) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Filter plans" size="icon" type="button" variant="outline">
          <ListFilter className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter</DropdownMenuLabel>
        {PLAN_FILTER_OPTIONS.map((option) => (
          <DropdownMenuItem key={option.value} onSelect={() => setPlanFilter(option.value)}>
            <span className="size-4 text-center text-xs">{planFilter === option.value ? "✓" : ""}</span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PlanSortMenu({
  planSort,
  setPlanSort,
}: {
  planSort: PlanSort;
  setPlanSort: (sort: PlanSort) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Sort plans" size="icon" type="button" variant="outline">
          <ChevronRight className="size-4 rotate-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Sort</DropdownMenuLabel>
        {PLAN_SORT_OPTIONS.map((option) => (
          <DropdownMenuItem key={option.value} onSelect={() => setPlanSort(option.value)}>
            <span className="size-4 text-center text-xs">{planSort === option.value ? "✓" : ""}</span>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PlanEditor({ draft, setDraft }: { draft: Draft; setDraft: (draft: Draft) => void }) {
  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)]">
      <div className="grid gap-3 border-b p-4 md:grid-cols-2 xl:grid-cols-4">
        <TextField label="Title" onChange={(title) => setDraft({ ...draft, title })} value={draft.title} />
        <TextField
          label="Goal"
          maxLength={MAX_GOAL_CHARS}
          meta={`${draft.goal.length}/${MAX_GOAL_CHARS}`}
          onChange={(goal) => setDraft({ ...draft, goal })}
          value={draft.goal}
        />
        <TextField label="Branch/ref" onChange={(branch) => setDraft({ ...draft, branch })} value={draft.branch} />
        <TextField label="Repo root" onChange={(repoRoot) => setDraft({ ...draft, repoRoot })} value={draft.repoRoot} />
        <label className="grid gap-1 text-xs font-medium text-muted-foreground xl:col-span-2">
          Summary
          <Input onChange={(event) => setDraft({ ...draft, summary: event.target.value })} value={draft.summary} />
        </label>
        <label className="grid gap-1 text-xs font-medium text-muted-foreground">
          Priority
          <Input
            onChange={(event) => setDraft({ ...draft, priority: Number(event.target.value) })}
            type="number"
            value={draft.priority}
          />
        </label>
        <label className="flex items-end gap-2 pb-2 text-sm">
          <Checkbox
            checked={draft.recommended}
            onCheckedChange={(checked) => setDraft({ ...draft, recommended: checked === true })}
          />
          Recommended tonight
        </label>
      </div>
      <Textarea
        className="min-h-0 resize-none overflow-auto rounded-none border-0 bg-background p-5 font-mono text-sm leading-6 text-foreground shadow-none focus-visible:ring-0"
        onChange={(event) => setDraft({ ...draft, markdown: event.target.value })}
        spellCheck={false}
        value={draft.markdown}
      />
    </div>
  );
}

function TextField({
  label,
  maxLength,
  meta,
  onChange,
  value,
}: {
  label: string;
  maxLength?: number;
  meta?: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="grid gap-1 text-xs font-medium text-muted-foreground">
      <span className="flex items-center justify-between gap-2">
        <span>{label}</span>
        {meta ? <span className="font-normal tabular-nums">{meta}</span> : null}
      </span>
      <Input maxLength={maxLength} onChange={(event) => onChange(event.target.value)} value={value} />
    </label>
  );
}

function VisualContent({
  detail,
  repoRootParam,
  tab,
}: {
  detail: DreamDetail;
  repoRootParam: string | undefined;
  tab: VisualTab;
}) {
  if (tab === "canvas") {
    return (
      <div className="h-full min-h-0 overflow-auto px-4 py-5 sm:px-6">
        {detail.content.canvas ? <MarkdownArticle markdown={detail.content.canvas} /> : null}
        {detail.files.images.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {detail.files.images.map((image) => (
              <figure className="overflow-hidden rounded-lg border bg-background" key={image}>
                <img alt={image} className="w-full object-contain" src={assetUrl(detail.id, image, repoRootParam)} />
                <figcaption className="border-t px-3 py-2 text-xs text-muted-foreground">{image}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
  if (tab === "prototype") {
    if (detail.files.prototypeHtml) {
      return (
        <iframe
          className="h-full w-full border-0 bg-white"
          src={assetUrl(detail.id, detail.files.prototypeHtml, repoRootParam)}
          title={`${detail.title} prototype`}
        />
      );
    }
    return <PlanMarkdown markdown={detail.content.prototype ?? ""} />;
  }
  if (tab === "report") return <PlanMarkdown markdown={detail.content.report ?? ""} />;
  return <PlanMarkdown markdown={detail.content.plan ?? ""} />;
}

function PlanMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="h-full min-h-0 overflow-auto px-4 py-5 sm:px-6">
      <MarkdownArticle markdown={markdown} />
    </div>
  );
}

function MarkdownArticle({ markdown }: { markdown: string }) {
  return (
    <article className="markdown-body max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </article>
  );
}

function ReportsView({
  repoRootParam,
  reports,
  selectedReport,
  selectedReportDetail,
  selectedReportId,
  setSelectedReportId,
}: {
  repoRootParam: string | undefined;
  reports: DreamSummary[];
  selectedReport: DreamSummary | undefined;
  selectedReportDetail: DreamDetail | undefined;
  selectedReportId: string;
  setSelectedReportId: (id: string) => void;
}) {
  return (
    <div className="dreamer-two-pane-layout">
      <aside className="dreamer-sidebar grid min-h-0 grid-rows-[auto_minmax(0,1fr)] rounded-lg border bg-card shadow-sm">
        <div className="border-b px-4 py-3">
          <h2 className="text-sm font-medium">Reports</h2>
          <p className="text-xs text-muted-foreground">Markdown reports and screenshots from completed dreams.</p>
        </div>
        <div className="min-h-0 space-y-1 overflow-auto p-2">
          {reports.map((report) => (
            <button
              className={cn(
                "flex w-full items-start gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-accent",
                selectedReportId === report.id && "bg-accent",
              )}
              key={report.id}
              onClick={() => setSelectedReportId(report.id)}
              type="button"
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border bg-background">
                <ImageIcon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{report.title}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {new Date(report.updatedAt).toLocaleString()} · {report.files.images.length} screenshot
                  {report.files.images.length === 1 ? "" : "s"}
                </span>
              </span>
            </button>
          ))}
          {reports.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">No reports yet.</div>
          ) : null}
        </div>
      </aside>

      <section className="dreamer-detail-pane grid min-h-0 overflow-hidden rounded-lg border bg-card shadow-sm">
        {selectedReport && selectedReportDetail ? (
          <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)]">
            <div className="border-b px-4 py-4 sm:px-6">
              <h2 className="text-xl font-semibold tracking-tight">{selectedReport.title}</h2>
              <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{selectedReport.summary}</p>
            </div>
            <div className="min-h-0 overflow-auto px-4 py-5 sm:px-6">
              {selectedReport.files.images.length ? (
                <div className="mb-6 grid gap-3 md:grid-cols-2">
                  {selectedReport.files.images.map((image) => (
                    <figure className="overflow-hidden rounded-lg border bg-background" key={image}>
                      <img alt={image} className="w-full object-contain" src={assetUrl(selectedReport.id, image, repoRootParam)} />
                      <figcaption className="border-t px-3 py-2 text-xs text-muted-foreground">{image}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}
              <MarkdownArticle markdown={selectedReportDetail.content.report ?? ""} />
            </div>
          </div>
        ) : (
          <EmptyState
            icon={ImageIcon}
            message="Completed-run reports live next to dreams as report.md and screenshots."
            title="No reports yet"
          />
        )}
      </section>
    </div>
  );
}

function StatusMessage({ state }: { state: LaunchState }) {
  if (state.kind === "idle") {
    return <p className="text-xs text-muted-foreground">Launches run on the machine serving this page.</p>;
  }
  return (
    <div
      className={cn(
        "rounded-md border px-3 py-2 text-xs",
        state.kind === "ok"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
          : "border-destructive/40 bg-destructive/10 text-destructive",
      )}
    >
      <div className="flex items-center gap-2">
        {state.kind === "ok" ? <CheckCircle2 className="size-4" /> : <ExternalLink className="size-4" />}
        <span>{state.message}</span>
      </div>
    </div>
  );
}

function AutosaveStatus({ state }: { state: AutosaveState }) {
  if (state.kind === "clean") {
    return <p className="text-xs text-muted-foreground">Open the menu to edit plan details.</p>;
  }
  if (state.kind === "dirty") {
    return <p className="text-xs text-muted-foreground">Unsaved changes</p>;
  }
  if (state.kind === "saving") {
    return (
      <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 className="size-3 animate-spin" />
        Saving
      </p>
    );
  }
  if (state.kind === "saved") {
    return <p className="text-xs text-muted-foreground">{state.message}</p>;
  }
  return <p className="text-xs text-destructive">{state.message}</p>;
}

function PlanActionsMenu({
  canDelete,
  canEdit,
  onDelete,
  onEdit,
}: {
  canDelete: boolean;
  canEdit: boolean;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Plan actions" size="icon" type="button" variant="outline">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Plan actions</DropdownMenuLabel>
        <DropdownMenuItem disabled={!canEdit} onSelect={onEdit}>
          <Pencil className="size-4" />
          Edit plan
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={!canDelete} onSelect={onDelete} variant="destructive">
          <Trash2 className="size-4" />
          Delete plan
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function EmptyState({
  action,
  actionLabel,
  icon: Icon,
  message,
  title,
}: {
  action?: () => void;
  actionLabel?: string;
  icon: LucideIcon;
  message: string;
  title: string;
}) {
  return (
    <div className="flex h-full min-h-[32rem] flex-col items-center justify-center gap-3 p-6 text-center">
      <Icon className="size-8 text-muted-foreground" />
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      {action ? (
        <Button className="gap-2" onClick={action} type="button">
          <Plus className="size-4" />
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

function StatusPill({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded-md border bg-background px-2 py-1">
      <Icon className="size-3.5 shrink-0" />
      <span className="truncate">{label}</span>
    </span>
  );
}

function ProviderIcon({ agent }: { agent: string }) {
  const svg = agent.toLowerCase().includes("claude") ? CLAUDE_LOGO_SVG : OPENAI_LOGO_SVG;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center [&>svg]:block [&>svg]:size-4",
        agent.toLowerCase().includes("claude") ? "text-[#d97757]" : "text-current",
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function draftFromDream(plan: DreamSummary, detail: DreamDetail | undefined, repoRoot: string): Draft {
  return {
    branch: plan.branch ?? "main",
    goal: plan.goal ?? "",
    id: plan.id,
    markdown: detail?.content.plan ?? "",
    priority: plan.priority ?? 999,
    recommended: plan.recommended ?? false,
    repoRoot,
    summary: plan.summary ?? "",
    title: plan.title,
  };
}

function stripDraft(draft: Draft) {
  return {
    branch: draft.branch,
    goal: draft.goal,
    markdown: draft.markdown,
    priority: draft.priority,
    recommended: draft.recommended,
    repoRoot: draft.repoRoot,
    summary: draft.summary,
    title: draft.title,
  };
}

function draftKey(draft: Draft): string {
  return JSON.stringify(stripDraft(draft));
}

function sortDreams(a: DreamSummary, b: DreamSummary) {
  if (a.recommended !== b.recommended) return a.recommended ? -1 : 1;
  const priority = (a.priority ?? Number.MAX_SAFE_INTEGER) - (b.priority ?? Number.MAX_SAFE_INTEGER);
  if (priority !== 0) return priority;
  return a.title.localeCompare(b.title);
}

function filterAndSortPlans(plans: DreamSummary[], planFilter: PlanFilter, planSort: PlanSort): DreamSummary[] {
  return plans
    .filter((plan) => {
      if (planFilter === "tonight") return plan.recommended;
      if (planFilter === "with-report") return plan.files.report || plan.files.images.length > 0;
      return true;
    })
    .sort((a, b) => {
      if (planSort === "title") return a.title.localeCompare(b.title);
      if (planSort === "branch") {
        const branchCompare = (a.branch ?? "").localeCompare(b.branch ?? "");
        if (branchCompare !== 0) return branchCompare;
      }
      return sortDreams(a, b);
    });
}

function filterLabel(planFilter: PlanFilter): string {
  return PLAN_FILTER_OPTIONS.find((option) => option.value === planFilter)?.label ?? "All plans";
}

function sortLabel(planSort: PlanSort): string {
  return PLAN_SORT_OPTIONS.find((option) => option.value === planSort)?.label ?? "Priority";
}

function tabsForDetail(detail: DreamDetail): VisualTab[] {
  const tabs: VisualTab[] = ["plan"];
  if (detail.content.canvas || detail.files.images.length > 0) tabs.push("canvas");
  if (detail.content.prototype || detail.files.prototypeHtml) tabs.push("prototype");
  if (detail.content.report) tabs.push("report");
  return tabs;
}

function tabLabel(tab: VisualTab): string {
  if (tab === "canvas") return "Canvas";
  if (tab === "prototype") return "Prototype";
  if (tab === "report") return "Report";
  return "Plan";
}

function providerActions(actions: ActionDescriptor[]): ActionDescriptor[] {
  const preferred = actions.filter((action) => ["claude", "codex"].includes(action.id));
  return preferred.length ? preferred : actions.slice(0, 2);
}

function assetUrl(id: string, path: string, repoRootParam: string | undefined): string {
  const url = new URL(`/dreams/${encodeURIComponent(id)}/asset`, window.location.origin);
  url.searchParams.set("path", path);
  if (repoRootParam) url.searchParams.set("repoRoot", repoRootParam);
  return url.toString();
}

const CLAUDE_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 257"><path fill="currentColor" d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"/></svg>';

const OPENAI_LOGO_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 260"><path fill="currentColor" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/></svg>';

createRoot(document.getElementById("root")!).render(<App />);
