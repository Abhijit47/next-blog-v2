import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Render a spinning loader icon for indicating loading state.
 *
 * Renders lucide-react's Loader2Icon with accessible attributes and a default spinning size.
 *
 * @param className - Additional CSS class names to merge with the default `"size-4 animate-spin"` classes
 * @param props - Other SVG attributes passed through to the underlying icon
 * @returns The Loader2Icon element with `role="status"` and `aria-label="Loading"`
 */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }