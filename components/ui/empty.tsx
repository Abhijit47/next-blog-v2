import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Renders the outer container for an empty-state layout.
 *
 * The element includes data-slot="empty", combines default empty-state classes with any provided
 * `className`, and forwards remaining div props to the rendered element.
 *
 * @returns A div element serving as the empty-state container with the applied classes and attributes.
 */
function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a centered header container for an empty-state layout.
 *
 * @param className - Additional CSS classes to merge with the default header container classes
 * @returns The header container element (a `div` with `data-slot="empty-header"`)
 */
function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Render a media/icon container for the empty state with variant-controlled styling.
 *
 * @param className - Additional class names to merge with the component's default styles
 * @param variant - One of `"default"` or `"icon"`; controls the visual variant applied to the media area
 * @returns A `div` element used as the empty-state media area. The element has `data-slot="empty-icon"` and `data-variant` set to the selected variant
 */
function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

/**
 * Renders the title element for an empty-state layout.
 *
 * The element includes default title typography and the `data-slot="empty-title"` attribute; any provided `className` and other props are forwarded to the underlying `div`.
 *
 * @returns A `div` element with title styling and `data-slot="empty-title"`.
 */
function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  )
}

/**
 * Renders the descriptive text block for an empty state.
 *
 * Applies muted text and small relaxed typography, ensures descendant anchors are underlined
 * with hover color and underline offset, and sets `data-slot="empty-description"`.
 *
 * @returns A div element styled as the empty-state description area.
 */
function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the content area for an empty-state layout.
 *
 * Merges any provided `className` with the component's default layout and typography classes and forwards remaining props to the underlying `div`.
 *
 * @returns The rendered `div` element used as the empty-state content container.
 */
function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}