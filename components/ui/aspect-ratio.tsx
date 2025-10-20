"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

/**
 * Renders an AspectRatio root element with a `data-slot="aspect-ratio"` attribute and forwards all received props.
 *
 * @returns A JSX element for the AspectRatio root with `data-slot="aspect-ratio"` and the provided props.
 */
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }