import * as React from "react";
import { Toaster as Sonner, toast, type ToasterProps } from "sonner";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, CircleXIcon } from "lucide-react";
import { Spinner } from "./spinner";

/**
 * Loupe is dark-only; the overlay mounts inside a shadow root whose `.dark`
 * token set is already active, so the Toaster reads the same popover/border
 * tokens as the rest of the panel. Sonner's base stylesheet
 * (`sonner/dist/styles.css`) is compiled into the injected overlay sheet.
 */
function Toaster({ position = "bottom-center", ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position={position}
      offset={28}
      icons={{
        success: <CircleCheckIcon className="size-[18px]" />,
        info: <InfoIcon className="size-[18px]" />,
        warning: <TriangleAlertIcon className="size-[18px]" />,
        error: <CircleXIcon className="size-[18px]" />,
        loading: <Spinner className="text-[15px]" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--success-bg": "var(--popover)",
          "--success-text": "var(--popover-foreground)",
          "--error-bg": "var(--popover)",
          "--error-text": "var(--popover-foreground)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "loupe-toast",
          title: "loupe-toast-title",
          description: "loupe-toast-description",
          icon: "loupe-toast-icon",
        },
      }}
      {...props}
    />
  );
}

export { Toaster, toast };
