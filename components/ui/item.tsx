import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

/**
 * Renders a vertical list group container for item components.
 *
 * @param className - Additional class names appended to the group's base classes.
 * @returns The rendered container element with `role="list"` and `data-slot="item-group"`.
 */
function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  )
}

/**
 * Renders a horizontal separator configured for use between item elements.
 *
 * @param className - Additional class names to apply; merged with the default `"my-0"` margin reset
 * @returns The rendered horizontal `Separator` element with `data-slot="item-separator"`
 */
function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "p-4 gap-4 ",
        sm: "py-3 px-4 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Renders a flexible, stylable item container used as a building block for item lists.
 *
 * Renders a div (or a Radix Slot when `asChild` is true) with data attributes and classes derived from `variant` and `size`.
 *
 * @param className - Additional class names to append to the computed item classes
 * @param variant - Visual variant of the item; controls background/border styling (e.g., "default", "outline", "muted")
 * @param size - Size variant of the item; controls padding and spacing (e.g., "default", "sm")
 * @param asChild - When true, renders a Radix `Slot` so the caller can pass a custom element as the item root
 * @returns The rendered item element (a `div` or a `Slot`) with appropriate data attributes and computed classes
 */
function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Renders the media area for an item with variant-driven styling.
 *
 * @param className - Additional CSS classes to apply to the media container
 * @param variant - Visual variant of the media area: `"default"`, `"icon"`, or `"image"`
 * @returns The rendered media container element with appropriate variant classes and attributes
 */
function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

/**
 * Renders the main content area for an item with responsive layout and spacing.
 *
 * The container uses flex layout to grow inside an item and prevents adjacent
 * content areas from flexing when multiple content slots are present.
 *
 * @returns A div element serving as the item's main content area.
 */
function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the title area for an item with layout and typographic styling.
 *
 * The element includes `data-slot="item-title"` and applies classes for horizontal layout, spacing, and emphasis.
 *
 * @returns A `div` element that serves as an item's title container.
 */
function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the item's description paragraph with consistent styling and slot metadata.
 *
 * @param className - Additional CSS classes to merge with the component's default styles.
 * @returns A <p> element with data-slot="item-description", muted text styling, two-line clamp, and link-specific styles.
 */
function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Container for action controls associated with an item.
 *
 * Renders a div with a data-slot of "item-actions" and horizontal layout for placing action controls (e.g., buttons, icons).
 *
 * @returns A div element that serves as the actions area of an item
 */
function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

/**
 * Header area for an item that arranges its children horizontally with space between.
 *
 * Renders a div with `data-slot="item-header"` and a flex layout (`items-center`, `justify-between`, `gap-2`).
 * Accepts any standard div props and merges `className` with the base header classes.
 */
function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * Footer area for an item that arranges content horizontally with space between.
 *
 * @returns The rendered item footer element.
 */
function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}