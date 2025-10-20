"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/**
 * Re-exports Radix Tabs.Root with standardized default classes and data-slot.
 *
 * Renders a Tabs.Root element with data-slot="tabs" and merges the provided `className` with "flex flex-col gap-2"; all other props are forwarded to TabsPrimitive.Root.
 *
 * @returns The rendered TabsPrimitive.Root element
 */
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

/**
 * Renders a styled tabs list container.
 *
 * Accepts all props valid for Radix Tabs.List and applies a set of default styling classes
 * while merging any additional `className` provided.
 *
 * @param className - Additional class names to merge with the component's default classes
 * @returns A React element representing the tabs list with applied classes and `data-slot="tabs-list"`
 */
function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Opinionated Tabs trigger component that renders a styled tab trigger with a `data-slot="tabs-trigger"` attribute.
 *
 * @param className - Additional class names appended to the component's default styling.
 * @returns The rendered tabs trigger element.
 */
function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Opinionated wrapper around Radix Tabs.Content that applies default layout styling and sets data-slot="tabs-content".
 *
 * @param className - Additional CSS classes to merge with the default "flex-1 outline-none".
 * @returns The rendered Tabs.Content element configured as the tab panel container.
 */
function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }