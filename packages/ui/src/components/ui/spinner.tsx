import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * Loupe's universal loading indicator: an animated Braille terminal spinner
 * (⠋⠙⠹⠸⠼⠴⠦⠧⠇). The glyph animation is a pure-CSS `steps()` keyframe
 * (`.loupe-spin`, defined in tokens.css) so it works identically in React,
 * linked page styles, and imperative/vanilla DOM.
 */
function Spinner({
  className,
  label = "Loading",
  ...props
}: React.ComponentProps<"span"> & { label?: string }) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("loupe-spin inline-block leading-none", className)}
      {...props}
    />
  )
}

export { Spinner }
