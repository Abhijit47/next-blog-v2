"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * Wraps Radix UI's Collapsible root, applying `data-slot="collapsible"` and forwarding all received props.
 *
 * @param props - Props accepted by `CollapsiblePrimitive.Root`; forwarded to the underlying element.
 * @returns A JSX element rendering `CollapsiblePrimitive.Root` with the provided props and `data-slot="collapsible"`.
 */
function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

/**
 * Renders a collapsible trigger element with a `data-slot="collapsible-trigger"` attribute and applies the provided props.
 *
 * @param props - Props to apply to the rendered trigger element.
 * @returns A JSX element for the collapsible trigger.
 */
function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

/**
 * Wraps Radix's CollapsibleContent primitive, forwarding all received props.
 *
 * @param props - Props forwarded to the underlying Radix CollapsibleContent primitive.
 * @returns A JSX element for collapsible content with `data-slot="collapsible-content"`.
 */
function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }