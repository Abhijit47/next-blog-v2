"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/**
 * Provides a tooltip context with a configurable opening/closing delay.
 *
 * @param delayDuration - Milliseconds to wait before showing or hiding the tooltip (default: 0).
 * @returns A TooltipPrimitive.Provider element configured with the given `delayDuration` and forwarded props.
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

/**
 * Wraps Radix's Tooltip root with the module's TooltipProvider.
 *
 * @param props - Props to forward to `TooltipPrimitive.Root`
 * @returns The tooltip root element wrapped in `TooltipProvider`
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

/**
 * Renders a trigger element for a tooltip and forwards received props to the underlying trigger.
 *
 * @param props - Props to apply to the trigger element (all valid props for the tooltip trigger)
 * @returns A React element that acts as the tooltip trigger
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

/**
 * Renders tooltip content inside a portal with built-in styling and an arrow, allowing a configurable side offset.
 *
 * @param className - Additional CSS class names to apply to the tooltip content container.
 * @param sideOffset - Distance in pixels between the tooltip and its trigger; defaults to 0.
 * @param children - Elements or text to display inside the tooltip.
 * @param props - Additional props forwarded to `TooltipPrimitive.Content`.
 * @returns A tooltip content React element rendered within a Portal.
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }