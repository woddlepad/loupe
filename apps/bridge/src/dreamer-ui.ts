export function dreamerHtml(): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dreamer</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #080808;
      --panel: #151515;
      --panel-2: #202020;
      --line: #303030;
      --text: #f4f4f4;
      --muted: #a3a3a3;
      --accent: #e8e8e8;
      --good: #7dd3fc;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    button, select, input { font: inherit; }
    .shell {
      height: 100vh;
      display: grid;
      grid-template-rows: auto 1fr;
      overflow: hidden;
    }
    header {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 24px;
      padding: 28px 36px 20px;
      border-bottom: 1px solid var(--line);
    }
    h1 {
      margin: 0;
      font-size: 40px;
      line-height: 1;
      letter-spacing: 0;
    }
    .sub {
      margin: 8px 0 0;
      color: var(--muted);
      font-size: 16px;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .main {
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(300px, 420px) minmax(0, 1fr);
      gap: 0;
    }
    aside {
      min-height: 0;
      border-right: 1px solid var(--line);
      display: grid;
      grid-template-rows: auto 1fr;
    }
    .toolbar {
      display: flex;
      gap: 10px;
      padding: 16px;
      border-bottom: 1px solid var(--line);
    }
    .field {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 8px;
      color: var(--text);
      background: #0f0f0f;
      padding: 10px 12px;
    }
    .list {
      min-height: 0;
      overflow: auto;
      padding: 12px;
    }
    .dream {
      width: 100%;
      display: grid;
      grid-template-columns: 36px 1fr;
      gap: 12px;
      text-align: left;
      border: 1px solid transparent;
      border-radius: 8px;
      padding: 12px;
      color: var(--text);
      background: transparent;
      cursor: pointer;
    }
    .dream:hover, .dream.active {
      background: var(--panel);
      border-color: var(--line);
    }
    .rank {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      border-radius: 999px;
      color: #111;
      background: var(--accent);
      font-size: 14px;
    }
    .rank.soft {
      color: var(--muted);
      background: var(--panel-2);
    }
    .dream-title {
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .dream-summary {
      color: var(--muted);
      margin-top: 4px;
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .detail {
      min-width: 0;
      min-height: 0;
      display: grid;
      grid-template-rows: auto auto 1fr;
    }
    .hero {
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 24px;
      padding: 28px 34px 22px;
      border-bottom: 1px solid var(--line);
    }
    .hero h2 {
      margin: 0;
      font-size: clamp(28px, 4vw, 46px);
      line-height: 1.05;
      letter-spacing: 0;
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
    }
    .pill {
      border: 1px solid var(--line);
      background: #0f0f0f;
      color: var(--muted);
      border-radius: 999px;
      padding: 6px 10px;
      font-size: 13px;
    }
    .tabs {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 12px 34px;
      border-bottom: 1px solid var(--line);
    }
    .tab, .btn {
      border: 1px solid var(--line);
      background: var(--panel);
      color: var(--text);
      border-radius: 8px;
      padding: 10px 14px;
      cursor: pointer;
    }
    .tab.active, .btn.primary {
      background: var(--accent);
      color: #111;
    }
    .viewer {
      min-height: 0;
      overflow: auto;
      padding: 26px 34px 40px;
    }
    .markdown {
      max-width: 980px;
      color: #dedede;
      font-size: 17px;
      line-height: 1.65;
    }
    .markdown h1, .markdown h2, .markdown h3 {
      color: var(--text);
      line-height: 1.2;
      margin: 28px 0 12px;
      letter-spacing: 0;
    }
    .markdown h1 { font-size: 36px; }
    .markdown h2 { font-size: 28px; border-bottom: 1px solid var(--line); padding-bottom: 10px; }
    .markdown h3 { font-size: 22px; }
    .markdown code {
      background: var(--panel-2);
      border-radius: 5px;
      padding: 2px 5px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.9em;
    }
    .markdown pre {
      overflow: auto;
      padding: 16px;
      border-radius: 8px;
      background: #101010;
      border: 1px solid var(--line);
    }
    .mermaid {
      margin: 18px 0;
      padding: 18px;
      border-radius: 8px;
      border: 1px solid var(--line);
      background: #101010;
    }
    .images {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 14px;
    }
    .images img, iframe {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: white;
    }
    iframe {
      min-height: 70vh;
      background: white;
    }
    .empty {
      color: var(--muted);
      padding: 38px;
    }
    @media (max-width: 900px) {
      header { align-items: start; flex-direction: column; padding: 22px; }
      .main { grid-template-columns: 1fr; grid-template-rows: 280px 1fr; }
      aside { border-right: 0; border-bottom: 1px solid var(--line); }
      .hero, .viewer, .tabs { padding-left: 20px; padding-right: 20px; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <header>
      <div>
        <h1>Dreamer</h1>
        <p class="sub">Visual plans stored in <code>.loupe/dreams</code>.</p>
      </div>
      <div class="header-actions">
        <button class="btn" id="reload">Reload</button>
        <a class="btn primary" id="repo-link" href="#">Open repo dreams</a>
      </div>
    </header>
    <main class="main">
      <aside>
        <div class="toolbar">
          <input id="query" class="field" placeholder="Filter dreams" />
          <select id="sort" class="field" aria-label="Sort">
            <option value="priority">Priority</option>
            <option value="updated">Updated</option>
            <option value="title">Title</option>
          </select>
        </div>
        <div class="list" id="list"></div>
      </aside>
      <section class="detail" id="detail">
        <div class="empty">No dreams yet. Run <code>/dream</code> to create one in this repo.</div>
      </section>
    </main>
  </div>
  <script type="module">
    import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
    window.__dreamerMermaid = mermaid;
    mermaid.initialize({ startOnLoad: false, theme: "dark" });
  </script>
  <script>
    const state = { dreams: [], selected: null, tab: "plan" };
    const params = new URLSearchParams(location.search);
    const repoRoot = params.get("repoRoot") || "";
    const qs = repoRoot ? "?repoRoot=" + encodeURIComponent(repoRoot) : "";
    const listEl = document.getElementById("list");
    const detailEl = document.getElementById("detail");
    const queryEl = document.getElementById("query");
    const sortEl = document.getElementById("sort");
    const repoLink = document.getElementById("repo-link");
    repoLink.href = "/dreams" + qs;

    document.getElementById("reload").addEventListener("click", () => loadDreams());
    queryEl.addEventListener("input", renderList);
    sortEl.addEventListener("change", renderList);

    async function loadDreams() {
      const response = await fetch("/dreams" + qs);
      const data = await response.json();
      state.dreams = data.dreams || [];
      renderList();
      if (!state.selected && state.dreams[0]) await selectDream(state.dreams[0].id);
      if (state.selected && !state.dreams.find((dream) => dream.id === state.selected.id)) state.selected = null;
      if (!state.selected) renderDetail();
    }

    async function selectDream(id) {
      const response = await fetch("/dreams/" + encodeURIComponent(id) + qs);
      if (!response.ok) return;
      state.selected = await response.json();
      state.tab = bestTab(state.selected);
      renderList();
      renderDetail();
    }

    function renderList() {
      const needle = queryEl.value.trim().toLowerCase();
      let dreams = state.dreams.filter((dream) => {
        const haystack = [dream.title, dream.summary, dream.goal, dream.branch].filter(Boolean).join(" ").toLowerCase();
        return !needle || haystack.includes(needle);
      });
      if (sortEl.value === "updated") dreams = dreams.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
      if (sortEl.value === "title") dreams = dreams.sort((a, b) => a.title.localeCompare(b.title));
      if (sortEl.value === "priority") dreams = dreams.sort((a, b) => {
        const priority = (a.priority ?? 9999) - (b.priority ?? 9999);
        return priority || (a.updatedAt < b.updatedAt ? 1 : -1);
      });
      listEl.innerHTML = dreams.length ? dreams.map((dream, index) => dreamRow(dream, index)).join("") : '<div class="empty">No matching dreams.</div>';
      for (const button of listEl.querySelectorAll("[data-dream]")) {
        button.addEventListener("click", () => selectDream(button.dataset.dream));
      }
    }

    function renderDetail() {
      const dream = state.selected;
      if (!dream) {
        detailEl.innerHTML = '<div class="empty">No dreams yet. Run <code>/dream</code> to create one in this repo.</div>';
        return;
      }
      const tabs = availableTabs(dream);
      detailEl.innerHTML = \`
        <div class="hero">
          <div>
            <div class="meta">
              \${dream.branch ? '<span class="pill">' + escapeHtml(dream.branch) + '</span>' : ""}
              <span class="pill">\${escapeHtml(dream.status || "planned")}</span>
              <span class="pill">\${escapeHtml(dream.dir)}</span>
            </div>
            <h2>\${escapeHtml(dream.title)}</h2>
            \${dream.summary ? '<p class="sub">' + escapeHtml(dream.summary) + '</p>' : ""}
          </div>
        </div>
        <div class="tabs">
          \${tabs.map((tab) => '<button class="tab ' + (state.tab === tab.id ? 'active' : '') + '" data-tab="' + tab.id + '">' + tab.label + '</button>').join("")}
        </div>
        <div class="viewer">\${renderTab(dream, state.tab)}</div>
      \`;
      for (const button of detailEl.querySelectorAll("[data-tab]")) {
        button.addEventListener("click", () => {
          state.tab = button.dataset.tab;
          renderDetail();
        });
      }
      void renderMermaid();
    }

    function dreamRow(dream, index) {
      const selected = state.selected && state.selected.id === dream.id;
      const special = dream.recommended || (dream.priority && dream.priority <= 3);
      return \`
        <button class="dream \${selected ? 'active' : ''}" data-dream="\${escapeAttr(dream.id)}">
          <span class="rank \${special ? '' : 'soft'}">\${dream.priority || index + 1}</span>
          <span>
            <span class="dream-title">\${escapeHtml(dream.title)}</span>
            <span class="dream-summary">\${escapeHtml(dream.summary || dream.goal || dream.dir)}</span>
          </span>
        </button>
      \`;
    }

    function availableTabs(dream) {
      const tabs = [];
      if (dream.content && dream.content.plan) tabs.push({ id: "plan", label: "Plan" });
      if ((dream.content && dream.content.canvas) || dream.files.images.length) tabs.push({ id: "canvas", label: "Canvas" });
      if ((dream.content && dream.content.prototype) || dream.files.prototypeHtml) tabs.push({ id: "prototype", label: "Prototype" });
      if (dream.content && dream.content.report) tabs.push({ id: "report", label: "Report" });
      if (tabs.length === 0) tabs.push({ id: "meta", label: "Metadata" });
      return tabs;
    }

    function bestTab(dream) {
      return availableTabs(dream)[0].id;
    }

    function renderTab(dream, tab) {
      if (tab === "canvas") {
        const pieces = [];
        if (dream.content.canvas) pieces.push(markdown(dream.content.canvas));
        if (dream.files.images.length) {
          pieces.push('<div class="images">' + dream.files.images.map((image) => {
            const url = assetUrl(dream.id, image);
            return '<a href="' + url + '" target="_blank" rel="noreferrer"><img src="' + url + '" alt="' + escapeAttr(image) + '" /></a>';
          }).join("") + '</div>');
        }
        return pieces.join("");
      }
      if (tab === "prototype") {
        if (dream.files.prototypeHtml) return '<iframe src="' + assetUrl(dream.id, dream.files.prototypeHtml) + '"></iframe>';
        return markdown(dream.content.prototype || "");
      }
      if (tab === "report") return markdown(dream.content.report || "");
      if (tab === "meta") return markdown("\`\`\`json\\n" + JSON.stringify(dream, null, 2) + "\\n\`\`\`");
      return markdown(dream.content.plan || "");
    }

    function markdown(value) {
      const lines = value.split("\\n");
      let inCode = false;
      let codeLang = "";
      let codeLines = [];
      const html = [];
      for (const line of lines) {
        if (line.startsWith("\`\`\`")) {
          if (inCode) {
            html.push(renderCodeBlock(codeLang, codeLines.join("\\n")));
            codeLang = "";
            codeLines = [];
            inCode = false;
          } else {
            codeLang = line.slice(3).trim().toLowerCase();
            inCode = true;
          }
          continue;
        }
        if (inCode) {
          codeLines.push(line);
          continue;
        }
        if (line.startsWith("# ")) html.push("<h1>" + escapeHtml(line.slice(2)) + "</h1>");
        else if (line.startsWith("## ")) html.push("<h2>" + escapeHtml(line.slice(3)) + "</h2>");
        else if (line.startsWith("### ")) html.push("<h3>" + escapeHtml(line.slice(4)) + "</h3>");
        else if (line.startsWith("- ")) html.push("<p>• " + inline(line.slice(2)) + "</p>");
        else if (!line.trim()) html.push("<br />");
        else html.push("<p>" + inline(line) + "</p>");
      }
      return '<div class="markdown">' + html.join("") + '</div>';
    }

    function renderCodeBlock(lang, code) {
      if (lang === "mermaid") return '<div class="mermaid">' + escapeHtml(code) + '</div>';
      return '<pre><code>' + escapeHtml(code) + '</code></pre>';
    }

    async function renderMermaid() {
      const mermaid = window.__dreamerMermaid;
      const nodes = detailEl.querySelectorAll(".mermaid");
      if (!mermaid || nodes.length === 0) return;
      try {
        await mermaid.run({ nodes });
      } catch {
        // Leave the source visible if Mermaid cannot load or parse a diagram.
      }
    }

    function inline(value) {
      return escapeHtml(value).replace(/\\\`([^\\\`]+)\\\`/g, "<code>$1</code>");
    }

    function assetUrl(id, path) {
      return "/dreams/" + encodeURIComponent(id) + "/asset" + qs + (qs ? "&" : "?") + "path=" + encodeURIComponent(path);
    }

    function escapeHtml(value) {
      return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
    }

    function escapeAttr(value) {
      return escapeHtml(value).replace(/\\n/g, " ");
    }

    loadDreams().catch((error) => {
      detailEl.innerHTML = '<div class="empty">' + escapeHtml(error.message || String(error)) + '</div>';
    });
  </script>
</body>
</html>`;
}
