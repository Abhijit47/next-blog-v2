"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Renders a Dialog root element with a standardized data-slot attribute and forwards all props.
 *
 * @param props - Props forwarded to the underlying Dialog root component
 * @returns The rendered Dialog root element with `data-slot="dialog"`
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

/**
 * Renders a dialog trigger element with a data-slot attribute and forwards all props.
 *
 * @returns A Dialog trigger element with `data-slot="dialog-trigger"`.
 */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/**
 * Renders a Radix Dialog Portal with a `data-slot` attribute for testing and automation.
 *
 * @returns A Dialog Portal element with `data-slot="dialog-portal"` and all provided props forwarded.
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/**
 * Renders a dialog close control using Radix's Close primitive with a testing-friendly data-slot.
 *
 * @returns A React element that renders a dialog close control with `data-slot="dialog-close"` and forwards all provided props.
 */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/**
 * Renders the dialog overlay element with a consistent data-slot and styling hooks.
 *
 * The overlay receives a composed `className` (including entrance/exit animations and a semi-transparent backdrop) and forwards all other props to the underlying Radix Overlay.
 *
 * @returns The rendered dialog overlay element
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders dialog content inside a portal with an overlay and an optional close button.
 *
 * @param className - Optional additional CSS class names merged into the dialog content container
 * @param showCloseButton - Whether to render the built-in top-right close button; defaults to `true`
 * @returns The dialog content element containing `children`, rendered within a portal and overlay; includes a close button when `showCloseButton` is `true`
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

/**
 * Header container for dialog content.
 *
 * Forwards props to a div with `data-slot="dialog-header"` and merges `className` with
 * layout and typography utility classes to provide a responsive header area.
 *
 * @returns A div element used as the dialog header with `data-slot="dialog-header"`.
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

/**
 * Layout container for dialog footer actions.
 *
 * Renders a div with data-slot="dialog-footer" and responsive spacing that stacks actions vertically on small screens and aligns them to the end on larger screens.
 *
 * @returns The rendered dialog footer div element with combined `className` and forwarded props
 */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Dialog title component that applies standardized data-slot and typography classes.
 *
 * Merges the provided `className` with default title typography and forwards all other props to the underlying Radix `DialogPrimitive.Title`.
 *
 * @returns A `DialogPrimitive.Title` element with `data-slot="dialog-title"` and the combined `className`.
 */
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders a dialog description element with a data-slot attribute and default typography classes.
 *
 * @returns The dialog description React element.
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}