import { componentChainFor, type ComponentRef } from "@loupe/core";

const INSPECT_ATTR = "data-loupe-inspect-id";
const INSPECT_REQUEST = "loupe:inspect-framework-request";
const INSPECT_RESPONSE = "loupe:inspect-framework-response";

window.addEventListener(INSPECT_REQUEST, (event) => {
  const detail = (event as CustomEvent<FrameworkInspectRequest>).detail;
  if (!detail?.id) return;

  const element = findInspectElement(detail.id);
  const componentChain = element ? componentChainFor(element) : [];
  window.dispatchEvent(
    new CustomEvent<FrameworkInspectResponse>(INSPECT_RESPONSE, {
      detail: { id: detail.id, componentChain },
    }),
  );
});

interface FrameworkInspectRequest {
  id: string;
}

interface FrameworkInspectResponse {
  id: string;
  componentChain: ComponentRef[];
}

function findInspectElement(id: string): Element | null {
  const root = document.documentElement;
  if (!root) return null;
  if (root.getAttribute(INSPECT_ATTR) === id) return root;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const element = node as Element;
    if (element.getAttribute(INSPECT_ATTR) === id) return element;
  }
  return null;
}
