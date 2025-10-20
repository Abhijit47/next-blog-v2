"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * Reusable separator component that renders a styled Radix UI Separator.
 *
 * @param className - Additional CSS classes to merge with the component's base styles
 * @param orientation - Layout orientation, either `"horizontal"` or `"vertical"` (default: `"horizontal"`)
 * @param decorative - Marks the separator as decorative for accessibility purposes (default: `true`)
 * @returns A React element representing the styled separator
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }