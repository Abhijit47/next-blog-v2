"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

/**
 * Wraps Radix UI's Popover root and forwards all received props while adding a `data-slot="popover"` attribute.
 *
 * @returns The rendered Popover root element with forwarded props
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

/**
 * Renders a popover trigger element that forwards all received props and adds a `data-slot="popover-trigger"` attribute.
 *
 * @returns A JSX element representing the popover trigger to be used inside a Popover.
 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

/**
 * Renders popover content inside a Portal with default alignment and side offset, merging provided classes with the component's base styles.
 *
 * @param className - Additional class names to merge with the component's default styling
 * @param align - Placement alignment of the popover relative to the trigger (default: "center")
 * @param sideOffset - Distance in pixels between the trigger and the popover content (default: 4)
 * @param props - Additional props forwarded to the underlying Radix `PopoverPrimitive.Content`
 * @returns The popover content element wrapped in a Portal
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

/**
 * Renders an anchor element for a popover and forwards received props.
 *
 * The component adds a `data-slot="popover-anchor"` attribute and passes all other props to the underlying anchor element.
 *
 * @returns The rendered popover anchor element with `data-slot="popover-anchor"` and forwarded props.
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }