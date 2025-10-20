import { cn } from "@/lib/utils"

/**
 * Renders a skeleton placeholder div with base pulsing and rounded styling.
 *
 * @param className - Additional class names appended to the base styles.
 * @param props - Additional props forwarded to the underlying div element.
 * @returns The div element used as the skeleton placeholder.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }