"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a table that fills the available width inside a container that enables horizontal scrolling.
 *
 * @returns A table element wrapped in a div with horizontal overflow handling and default layout styles.
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

/**
 * Renders a table header (`thead`) element that applies a bottom border to its rows and merges custom classes.
 *
 * @param className - Additional CSS classes to merge with the component's default row border styling.
 * @param props - Other `thead` props forwarded to the underlying element.
 * @returns A `thead` React element with `data-slot="table-header"`, default row bottom-border styling, and any provided props and classes applied.
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

/**
 * Renders a `tbody` element that removes the bottom border from the last row and forwards all provided tbody props.
 *
 * @param className - Additional CSS classes to merge with the component's default styles.
 * @returns The rendered `tbody` element with merged classes and forwarded props.
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

/**
 * Renders a table footer element with default footer styling and merged class names.
 *
 * @returns A `<tfoot>` element with a muted background, top border, medium font weight, and the provided `className` merged with the component's default styles
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Table row wrapper that applies default row styling, hover and selected states, and forwards props.
 *
 * The rendered element is a `<tr>` with a `data-slot="table-row"` attribute; the provided `className`
 * is merged with the component's default row styles and all other props are passed through to the `<tr>`.
 *
 * @returns A table row element (`<tr>`) configured with default row styles and forwarded props.
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a styled table header cell (`th`) with a `data-slot="table-head"` attribute.
 *
 * The component applies default typography, spacing, alignment, and checkbox-aware adjustments while
 * merging any `className` provided via props. All other `th` props are forwarded to the underlying element.
 *
 * @returns A `th` element configured as a styled table header cell.
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table data cell (`td`) with default padding, vertical alignment, and checkbox-aware spacing, while forwarding all `td` props.
 *
 * @param className - Additional CSS classes merged with the component's default classes.
 * @param props - Remaining props forwarded to the underlying `td` element.
 * @returns The rendered `td` element with `data-slot="table-cell"` and merged classes.
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table caption with muted styling, small text sizing, and top margin.
 *
 * @returns The caption element with default classes merged with `className` and any forwarded props.
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}