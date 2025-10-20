import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

/**
 * Renders a centered navigation container configured for pagination controls.
 *
 * The output is a <nav> element with role="navigation", aria-label="pagination", and
 * data-slot="pagination". Default layout classes are merged with any provided
 * `className`, and remaining nav props are spread onto the element.
 *
 * @param className - Additional CSS class names to apply to the nav element.
 * @returns The pagination <nav> element with applied attributes, classes, and props.
 */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

/**
 * Renders the pagination content container (an unordered list) used to group pagination items.
 *
 * Accepts standard `ul` props and merges `className` with the default layout classes.
 *
 * @param className - Additional CSS class names to merge with the default flex layout
 * @returns The rendered `ul` element serving as the pagination content container
 */
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

/**
 * List-item wrapper for pagination items.
 *
 * Renders an <li> element with `data-slot="pagination-item"` and forwards all received props to the element.
 */
function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

/**
 * Renders a pagination link styled with Button variants and an optional active state.
 *
 * When `isActive` is true the link is marked with `aria-current="page"` and receives the
 * "outline" variant styling; otherwise it uses the "ghost" variant.
 *
 * @param isActive - If `true`, marks the link as the current page and applies active styling.
 * @param size - Size passed to the underlying button variant; defaults to `"icon"`.
 * @returns A JSX anchor element suitable for use as a pagination link.
 */
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a pagination control for navigating to the previous page.
 *
 * @returns A PaginationLink element configured as the "previous" control, containing a left chevron icon and a "Previous" label that is visible on screens at least small.
 */
function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

/**
 * Renders a preconfigured "Next" pagination link with a right-chevron icon and accessible label.
 *
 * @returns A PaginationLink element configured to navigate to the next page
 */
function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

/**
 * Renders an ellipsis indicator used to represent truncated pages in pagination controls.
 *
 * The element is decorative (aria-hidden) and contains a visible ellipsis icon plus screen-reader text "More pages".
 *
 * @param className - Additional CSS classes to apply to the span
 * @param props - Additional span attributes to spread onto the element
 * @returns A span element representing an ellipsis in pagination
 */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}