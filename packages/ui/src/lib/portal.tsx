import * as React from "react";

/**
 * Radix `Portal` components render into `document.body` by default. Inside the
 * Loupe overlay/viewer that lives in a shadow root, that escapes the isolated
 * styles. Wrap a subtree in `<PortalContainerProvider value={shadowRootEl}>` and
 * the shadcn atoms below (Select, Dialog, …) will portal into that element
 * instead. When unset (e.g. the extension's own pages), it falls back to the
 * default document body.
 */
const PortalContainerContext = React.createContext<HTMLElement | null>(null);

export function PortalContainerProvider({
  value,
  children,
}: {
  value: HTMLElement | null;
  children: React.ReactNode;
}) {
  return <PortalContainerContext.Provider value={value}>{children}</PortalContainerContext.Provider>;
}

/** The portal container for the current subtree, or `null` for document body. */
export function usePortalContainer(): HTMLElement | null {
  return React.useContext(PortalContainerContext);
}
