"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

/**
 * Render a drawer root element with a standardized `data-slot="drawer"` attribute.
 *
 * @param props - Props forwarded to the underlying drawer root element.
 * @returns The rendered drawer root element.
 */
function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

/**
 * Renders a drawer trigger element with a standardized data-slot attribute.
 *
 * @returns A trigger element for the drawer with all provided props forwarded.
 */
function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

/**
 * Wraps the drawer portal element and forwards all props to it while adding a `data-slot="drawer-portal"` attribute.
 *
 * @param props - Props forwarded to the drawer portal element
 * @returns The portal element used to render drawer content
 */
function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

/**
 * Renders a drawer close trigger element with a standardized `data-slot` and forwarded props.
 *
 * @returns A React element rendering the underlying `DrawerPrimitive.Close` with `data-slot="drawer-close"` and the supplied props.
 */
function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

/**
 * Renders the drawer backdrop overlay with the component's standard animation and backdrop styles.
 *
 * @param className - Additional CSS classes to merge with the overlay's default classes
 * @returns The overlay element used as the drawer backdrop
 */
function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the drawer's portal, overlay, and content container with direction-aware layout and styling.
 *
 * The component wraps Vaul's Drawer Content inside a DrawerPortal and injects a DrawerOverlay,
 * applying composed classes that adjust positioning, sizing, borders, and rounded corners based
 * on the drawer's direction (`data-vaul-drawer-direction`). It also prepends a small draggable
 * handle visible when the drawer opens from the bottom.
 *
 * @param className - Additional CSS classes appended to the content container
 * @param children - Content rendered inside the drawer body
 * @returns The assembled drawer content React node (portal + overlay + styled content)
 */
function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

/**
 * Renders the drawer header wrapper with standardized layout, spacing, and data-slot="drawer-header".
 *
 * @param props - Standard div props; `className` will be merged with the component's default classes.
 * @returns The header element for a drawer, styled and annotated for directional layout.
 */
function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a container for drawer footer content with standardized spacing and layout.
 *
 * @param className - Additional CSS classes appended to the default footer classes
 * @returns The footer `div` element with `data-slot="drawer-footer"`
 */
function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

/**
 * Renders a drawer title element with standardized typography and a data-slot attribute.
 *
 * @returns A React element for the drawer title with `data-slot="drawer-title"` and a composed `className` combining "text-foreground font-semibold" with any provided `className`.
 */
function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Wraps DrawerPrimitive.Description to apply standardized typography and a `data-slot="drawer-description"` attribute.
 *
 * @returns A `DrawerPrimitive.Description` element with the `text-muted-foreground text-sm` classes combined with any provided `className`
 */
function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}