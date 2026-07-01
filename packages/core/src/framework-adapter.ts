import type { ComponentRef } from "./model.js";

/**
 * Best-effort component ancestry recovery for popular UI runtimes.
 *
 * This intentionally returns only component names. Source locations are resolved
 * later by the bridge from the component name plus DOM signals.
 */

type Framework = "react" | "vue";

type ReactFiber = {
  return: ReactFiber | null;
  type: unknown;
  elementType: unknown;
  tag: number;
};

type Vue3Instance = {
  parent?: Vue3Instance | null;
  type?: VueComponentType;
};

type Vue2Instance = {
  $parent?: Vue2Instance | null;
  $options?: VueComponentType;
};

type VueComponentType = {
  displayName?: string;
  name?: string;
  __name?: string;
  _componentTag?: string;
  __file?: string;
};

const HOST_COMPONENT_TAG = 5; // React's WorkTag for a host (DOM) component.

/**
 * Walk the framework-owned tree from a DOM node, collecting component ancestry
 * innermost first. Anonymous/runtime wrappers are skipped; consecutive
 * duplicates are collapsed. Returns an empty array when no supported framework
 * leaves component metadata on the DOM.
 */
export function componentChainFor(node: Element, max = 8): ComponentRef[] {
  const react = reactComponentChainFor(node, max);
  if (react?.length) return react;
  return vueComponentChainFor(node, max) ?? [];
}

/** Whether this page appears to be a React app at all. */
export function isReactPage(): boolean {
  const root = document.querySelector("[data-reactroot], #__next, #root, body > div");
  if (root && getReactFiber(root)) return true;
  return hasFrameworkMarker(getReactFiber);
}

/** Whether this page appears to be a Vue app at all. */
export function isVuePage(): boolean {
  const root = document.querySelector("#app, [data-v-app], body > div");
  if (root && getVueInstance(root)) return true;
  return hasFrameworkMarker(getVueInstance);
}

/** Whether this page exposes metadata from a supported component framework. */
export function isComponentFrameworkPage(): boolean {
  return isReactPage() || isVuePage();
}

function reactComponentChainFor(node: Element, max: number): ComponentRef[] | null {
  const start = getClosest(node, getReactFiber);
  if (!start) return null;

  const chain: ComponentRef[] = [];
  let fiber: ReactFiber | null = start;
  let lastName: string | undefined;

  while (fiber && chain.length < max) {
    if (fiber.tag !== HOST_COMPONENT_TAG) {
      const name = reactComponentName(fiber.type) ?? reactComponentName(fiber.elementType);
      if (name && name !== lastName && !isInfra(name, "react")) {
        chain.push({ name, framework: "react" });
        lastName = name;
      }
    }
    fiber = fiber.return;
  }

  return chain;
}

function vueComponentChainFor(node: Element, max: number): ComponentRef[] | null {
  const start = getClosest(node, getVueInstance);
  if (!start) return null;

  const chain: ComponentRef[] = [];
  let instance: Vue3Instance | Vue2Instance | null = start;
  let lastName: string | undefined;

  while (instance && chain.length < max) {
    const name = vueComponentName(instance);
    if (name && name !== lastName && !isInfra(name, "vue")) {
      chain.push({ name, framework: "vue" });
      lastName = name;
    }
    instance = isVue3Instance(instance) ? (instance.parent ?? null) : (instance.$parent ?? null);
  }

  return chain;
}

function getClosest<T>(node: Element, read: (node: Element) => T | undefined): T | undefined {
  for (let el: Element | null = node; el; el = el.parentElement) {
    const found = read(el);
    if (found) return found;
  }
  return undefined;
}

function hasFrameworkMarker(read: (node: Element) => unknown): boolean {
  const sample = document.body?.querySelectorAll("*");
  if (!sample) return false;
  for (let i = 0; i < Math.min(sample.length, 75); i++) {
    if (read(sample[i]!)) return true;
  }
  return false;
}

function getReactFiber(node: Element): ReactFiber | undefined {
  const key = Object.getOwnPropertyNames(node).find(
    (name) => name.startsWith("__reactFiber$") || name.startsWith("__reactInternalInstance$"),
  );
  if (!key) return undefined;
  return (node as unknown as Record<string, ReactFiber>)[key];
}

function getVueInstance(node: Element): Vue3Instance | Vue2Instance | undefined {
  const record = node as unknown as {
    __vueParentComponent?: Vue3Instance;
    __vue__?: Vue2Instance;
    __vue_app__?: { _instance?: Vue3Instance | null };
  };
  return record.__vueParentComponent ?? record.__vue__ ?? record.__vue_app__?._instance ?? undefined;
}

function reactComponentName(type: unknown): string | undefined {
  if (typeof type === "function") {
    const fn = type as { displayName?: string; name?: string };
    return cleanName(fn.displayName || fn.name);
  }
  if (type && typeof type === "object") {
    // forwardRef / memo / context consumers wrap the real component.
    const obj = type as {
      displayName?: string;
      render?: { displayName?: string; name?: string };
      type?: unknown;
    };
    return (
      cleanName(obj.displayName) ??
      cleanName(obj.render?.displayName || obj.render?.name) ??
      (obj.type ? reactComponentName(obj.type) : undefined)
    );
  }
  return undefined;
}

function vueComponentName(instance: Vue3Instance | Vue2Instance): string | undefined {
  const type = isVue3Instance(instance) ? instance.type : instance.$options;
  return cleanName(type?.displayName) ?? cleanName(type?.name) ?? cleanName(type?.__name) ?? fileName(type?.__file);
}

function isVue3Instance(instance: Vue3Instance | Vue2Instance): instance is Vue3Instance {
  return "type" in instance || "parent" in instance;
}

function fileName(path: string | undefined): string | undefined {
  if (!path) return undefined;
  const base = path.split(/[\\/]/).pop()?.replace(/\.(vue|tsx?|jsx?)$/i, "");
  return cleanName(base);
}

function cleanName(name: string | undefined): string | undefined {
  const trimmed = name?.trim();
  if (!trimmed || trimmed === "Anonymous" || trimmed === "anonymous") return undefined;
  return trimmed;
}

/**
 * Vuetify layout wrappers that only exist to position content. They are never a
 * meaningful annotation target, so we drop them to keep the chain focused on the
 * user's components — while keeping semantic Vuetify components (VBtn, VCard,
 * VTextField, …), which tell the agent what design-system primitive was used.
 */
const VUETIFY_LAYOUT = new Set([
  "VApp",
  "VMain",
  "VLayout",
  "VContainer",
  "VRow",
  "VCol",
  "VSpacer",
]);

function isInfra(name: string, framework: Framework): boolean {
  if (framework === "react") {
    return (
      name === "Provider" ||
      name === "Context" ||
      name === "Fragment" ||
      name.startsWith("_") ||
      name.endsWith(".Provider") ||
      name.endsWith(".Consumer")
    );
  }

  return (
    name === "Transition" ||
    name === "KeepAlive" ||
    name === "Teleport" ||
    name === "Suspense" ||
    VUETIFY_LAYOUT.has(name)
  );
}
