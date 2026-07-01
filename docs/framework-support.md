# Framework support matrix

Loupe is framework-agnostic by design: even when it can't identify a component,
you still get the screenshot, selector, text, `data-*` attributes, and route to
hand an agent. But for supported runtimes it does much better — it walks the
framework's own component tree to recover the **component ancestry**, then maps
the innermost component to a **source file** in your repo.

Two independent mechanisms are at play, and a framework can support one without
the other:

- **Component chain (runtime).** The overlay reads the pointers a framework
  leaves on DOM nodes (React fibers, Vue instances) to recover component names
  and, when available, their source path. See
  [`framework-adapter.ts`](../packages/core/src/framework-adapter.ts).
- **Source resolution (bridge).** Given the recovered component names, the
  bridge finds the file that defines them — either a `function/const/class`
  **definition** or a **file named** after the component (how single-file
  component frameworks like Vue/Svelte map a component to disk). See
  [`resolve/index.ts`](../apps/bridge/src/resolve/index.ts).
- **Project auto-detect.** `loupe init` sniffs `package.json` + config files to
  label the project and guess dev-server ports. See
  [`project.ts`](../apps/bridge/src/project.ts).

## Matrix

| Framework | Component chain (runtime) | Source resolution | Project auto-detect |
| --- | --- | --- | --- |
| **React** (Vite, Next.js, CRA) | ✅ fiber tree (`__reactFiber$*`) | ✅ definition + filename | ✅ `react`, `react-vite`, `nextjs`, `create-react-app` |
| **Vue 3** (incl. Nuxt) | ✅ `__vueParentComponent` / `__vue_app__` | ✅ filename (`.vue`) + definition | ✅ `vue`, `vue-vite`, `nuxt` |
| **Vue 2** | ✅ `__vue__` | ✅ filename (`.vue`) + definition | ✅ `vue` |
| **Vuetify** (Vue 3 UI library) | ✅ as Vue components; pure layout wrappers (`VApp`, `VContainer`, `VRow`, `VCol`, `VMain`, `VSpacer`, `VLayout`) filtered, semantic ones (`VBtn`, `VCard`, `VTextField`, …) kept | ✅ resolves the user's `.vue` SFC; Vuetify's own components live in `node_modules` and are skipped | ✅ via `vue` / `vue-vite` |
| **Svelte / SvelteKit** | ❌ no per-node instance exposed | ⚠️ filename (`.svelte`) if a component name is known | ✅ `sveltekit` |
| **Angular** | ❌ not yet walked | ⚠️ definition/filename by class name | ✅ `angular` |
| **Solid / Preact / others** | ❌ | ⚠️ falls back to selector/text/route search by the agent | ➖ generic `vite` when detected |

Legend: ✅ supported · ⚠️ partial / best-effort · ❌ not supported · ➖ n/a

### What "reactivity support" means here

The component chain works only when a framework leaves a pointer from each DOM
node back to its owning component instance. React (fibers) and Vue (instance
refs) both do; Svelte compiles that indirection away, and Angular keeps it behind
`ng` debug APIs we don't yet read. Where there's no chain, Loupe degrades to the
DOM-level signals — still enough for an agent to grep its way to the file, just
without the one-hop precision.

## Trying it (Vue + Vuetify)

To validate Vue/Vuetify detection, scaffold a throwaway Vite + Vue 3 + Vuetify
app whose user components (`AppHeader`, `TodoList`, `StatsCard`) are wrapped in
Vuetify primitives (`v-app`, `v-card`, `v-btn`, …):

```sh
npm create vuetify@latest my-demo   # pick the "Base (Vuetify)" preset
cd my-demo
npm run dev                          # e.g. http://localhost:5175
loupe init --port 5175               # register with the bridge, then: loupe bridge
```

Drag-select the "Add todo" button. You should see the chain report
`VBtn → VCard → TodoList` (the Vuetify layout wrappers `VApp`/`VContainer`/`VRow`/
`VCol` are filtered out), and the bridge resolves `src/components/TodoList.vue` —
the user's SFC, not the Vuetify wrapper.
