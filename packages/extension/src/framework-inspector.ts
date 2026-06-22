import { componentChainFor, type ComponentRef } from "@loupe/core";

const INSPECT_ATTR = "data-loupe-inspect-id";
const INSPECT_REQUEST = "loupe:inspect-framework-request";
const INSPECT_RESPONSE = "loupe:inspect-framework-response";

window.addEventListener(INSPECT_REQUEST, (event) => {
  const detail = (event as CustomEvent<FrameworkInspectRequest>).detail;
  if (!detail?.id) return;

  const element = document.querySelector(`[${INSPECT_ATTR}="${cssEscapeAttr(detail.id)}"]`);
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

function cssEscapeAttr(value: string): string {
  if (typeof CSS !== "undefined" && CSS.escape) return CSS.escape(value);
  return value.replace(/["\\]/g, "\\$&");
}
