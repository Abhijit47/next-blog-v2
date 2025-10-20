import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a div element styled as a Card container.
 *
 * The output element has `data-slot="card"`, applies the component's base styles, merges any provided `className`, and forwards all other props to the underlying div.
 *
 * @param className - Additional class names to merge with the component's base styles
 * @returns A div element representing the styled card container
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the header section of a Card with a responsive grid layout and reserved action slot.
 *
 * The element uses `data-slot="card-header"` and applies base classes for grid rows, gaps,
 * padding, and an optional action column when a `card-action` slot is present. Additional
 * `div` props and `className` are forwarded to the rendered element.
 *
 * @returns A `<div>` element representing the card header.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a container for a card's title with title typography and a `data-slot="card-title"` marker.
 *
 * @param className - Additional CSS classes to merge with the component's base title styles.
 * @returns A `div` element styled as a card title (`leading-none`, `font-semibold`) with `data-slot="card-title"` and any other passed div props applied.
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders the card description slot with muted, small body text.
 *
 * @returns A `div` element prepared for use as a card description (`data-slot="card-description"`) with `text-muted-foreground` and `text-sm` styles applied; additional `div` props and `className` are forwarded.
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Renders the card's action area positioned in the header grid (typically top-right).
 *
 * @param className - Additional CSS classes to merge with the component's base layout classes
 * @returns The action-area DOM element for a Card rendered as a `div`
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a container for a card's main content area.
 *
 * @param className - Additional CSS classes to merge with the component's base padding
 * @param props - Additional HTML attributes and event handlers spread onto the container div
 * @returns A div element configured as the card's content area (`data-slot="card-content"`)
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Renders a footer slot for a Card with horizontal padding, centered content, and spacing for a top border.
 *
 * @returns The rendered card footer element.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}