import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Renders a semantic navigation container for breadcrumbs.
 *
 * @param props - Props forwarded to the rendered `nav` element (standard `nav` element props).
 * @returns A `nav` element with `aria-label="breadcrumb"` and `data-slot="breadcrumb"` with the provided props applied.
 */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

/**
 * Renders an ordered list element configured as the breadcrumb list.
 *
 * @param className - Additional CSS classes to merge with the component's default classes
 * @returns The rendered `ol` element with `data-slot="breadcrumb-list"` and merged classes
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a list item suitable for a breadcrumb entry.
 *
 * Applies a data-slot of "breadcrumb-item" and combines default layout classes with any provided `className`.
 *
 * @param className - Additional CSS class names to merge with the component's default inline-flex layout and gap
 * @returns The rendered `li` element for a breadcrumb item
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

/**
 * Renders a breadcrumb link, using a Radix `Slot` when `asChild` is true or a native `<a>` otherwise.
 *
 * @param asChild - If `true`, render the passed child element instead of an `<a>` (useful for integrating with routing/link components).
 * @param className - Additional CSS classes to merge with the component's default link styles.
 * @returns The rendered breadcrumb link element.
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

/**
 * Renders the current breadcrumb item as a non-interactive page indicator.
 *
 * The returned element is a span with data-slot="breadcrumb-page", role="link", aria-disabled="true", and aria-current="page".
 *
 * @returns A span element representing the current breadcrumb page with appropriate accessibility attributes and merged classes.
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

/**
 * Render a separator list item for a breadcrumb.
 *
 * Renders an `li` element with `data-slot="breadcrumb-separator"`, `role="presentation"`, and `aria-hidden="true"`, containing the provided `children` or a default `ChevronRight` icon.
 *
 * @param children - Optional content to display as the separator; when omitted a `ChevronRight` icon is rendered.
 * @param className - Additional class names to apply to the `li` element.
 * @returns The separator `li` element used between breadcrumb items.
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

/**
 * Renders an ellipsis indicator for collapsed breadcrumb items.
 *
 * Additional CSS classes can be passed via `className`; all other span props are forwarded.
 *
 * @param className - Additional CSS class names to apply to the outer span
 * @returns The breadcrumb ellipsis span element that visually displays an ellipsis icon and includes an offscreen "More" label while being marked presentational for accessibility
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}