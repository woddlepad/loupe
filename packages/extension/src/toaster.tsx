import { createRoot } from "react-dom/client";
import { Toaster, toast as sonnerToast } from "@loupe/ui";
import overlayCssRaw from "./styles/overlay.gen.css";

// Same self-hosted-font resolution the content overlay does: rewrite the asset
// placeholder to absolute extension URLs so Geist loads locally (no CDN).
const overlayCss = overlayCssRaw.replaceAll("__LOUPE_ASSET__", chrome.runtime.getURL(""));

type ToastVariant = "success" | "error" | "info";

let mounted = false;

/**
 * A single, always-on Toaster living in its own shadow root, independent of the
 * annotate overlay's lifecycle — a save toast must outlive the overlay closing
 * on submit. Mounted lazily on the first toast.
 */
function ensureToaster(): void {
  if (mounted) return;
  mounted = true;

  const host = document.createElement("div");
  host.setAttribute("data-loupe-overlay", "");
  const root = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = overlayCss;
  const mount = document.createElement("div");
  mount.className = "dark";
  root.append(style, mount);
  document.body.append(host);

  createRoot(mount).render(<Toaster />);
}

export function loupeToast(text: string, variant: ToastVariant = "success"): void {
  ensureToaster();
  const [title, ...rest] = text.split("\n");
  const description = rest.join("\n").trim() || undefined;
  sonnerToast[variant](title, { description });
}
