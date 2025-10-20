"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

/**
 * Root wrapper for Radix AlertDialog that adds a `data-slot="alert-dialog"` attribute and forwards all props.
 *
 * @param props - Props forwarded to `AlertDialogPrimitive.Root`
 * @returns The rendered AlertDialog root element
 */
function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

/**
 * Trigger element for opening the alert dialog.
 *
 * Renders the underlying Radix AlertDialog Trigger with a `data-slot="alert-dialog-trigger"` and forwards all received props.
 *
 * @returns The trigger element that activates the alert dialog.
 */
function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

/**
 * Renders a Radix AlertDialog portal with a data-slot of "alert-dialog-portal" and forwards all props.
 *
 * @param props - Props to pass to `AlertDialogPrimitive.Portal`
 * @returns The portal element that renders alert dialog children into a DOM portal
 */
function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

/**
 * Overlay backdrop for the AlertDialog, applying entry/exit animations and a translucent black background.
 *
 * @returns The overlay element used as the alert dialog backdrop.
 */
function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the alert dialog's content inside a portal with a backdrop and project-specific styling.
 *
 * @param className - Additional CSS classes to merge with the component's default styling.
 * @param props - Remaining props are forwarded to the underlying Radix `AlertDialogPrimitive.Content`.
 * @returns A React element that renders the dialog content wrapped in a portal and overlay with composed class names and data-slot="alert-dialog-content".
 */
function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

/**
 * Header region inside the alert dialog.
 *
 * @param className - Additional class names appended to the header's default layout classes.
 * @returns A div element with data-slot "alert-dialog-header" and responsive header layout classes.
 */
function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

/**
 * Footer container for the alert dialog that aligns action buttons and applies responsive layout.
 *
 * @param className - Additional class names to apply to the footer container.
 * @returns The footer element (`div`) with data-slot "alert-dialog-footer" and responsive layout classes.
 */
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Title element for the alert dialog that applies the project `data-slot` and typography styling.
 *
 * @returns The rendered title element with `data-slot="alert-dialog-title"` and the composed `className`.
 */
function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders the dialog's description text with project styling and a data-slot attribute.
 *
 * @returns The AlertDialog Description element with data-slot "alert-dialog-description" and composed classes for muted, small text.
 */
function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Renders an AlertDialog primary action element with the project's default button styling.
 *
 * Merges any provided `className` with the component's button variants and forwards all other props to Radix's `AlertDialogPrimitive.Action`.
 *
 * @returns The AlertDialog action element styled as a button.
 */
function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

/**
 * Renders a cancel-styled action button for an AlertDialog.
 *
 * @returns A Cancel action button element styled with the outline button variant.
 */
function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}