"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

/**
 * Renders a HoverCard root that forwards all received props and sets `data-slot="hover-card"`.
 *
 * @param props - Props passed to `HoverCardPrimitive.Root`
 * @returns The rendered `HoverCardPrimitive.Root` element
 */
function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

/**
 * Renders a HoverCard trigger element with a `data-slot="hover-card-trigger"` attribute and forwards all received props.
 *
 * @returns The trigger element with the `data-slot="hover-card-trigger"` attribute and any props passed through.
 */
function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

/**
 * Renders the hover card content inside a Portal with default alignment, offset, and composed styling.
 *
 * @param className - Additional CSS class names appended to the component's default styles
 * @param align - Alignment of the content relative to the trigger (default: "center")
 * @param sideOffset - Distance in pixels between the content and the trigger (default: 4)
 * @param props - Additional props forwarded to the underlying HoverCardPrimitive.Content
 * @returns The rendered hover card content element
 */
function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }