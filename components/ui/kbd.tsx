import { cn } from "@/lib/utils"

/**
 * Render a styled keyboard key element.
 *
 * @param className - Additional CSS class names to merge with the component's default styles.
 * @param props - Additional props forwarded to the underlying `<kbd>` element (e.g., event handlers, ARIA attributes).
 * @returns A `<kbd>` element with `data-slot="kbd"`, the component's base utility classes merged with `className`, and all other props forwarded.
 */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a compact inline group of keyboard tokens.
 *
 * Merges `className` with default grouping styles and forwards all other props to the rendered `<kbd>` element.
 *
 * @param className - Additional class names to append to the component's default group styles
 * @returns A `kbd` element styled as an inline-flex group with centered items and a small gap; all other props are forwarded to that element
 */
function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }