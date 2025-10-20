import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Compose class names from `clsx` inputs and resolve Tailwind utility conflicts with `twMerge`.
 *
 * @param inputs - Class name inputs (strings, arrays, objects, etc.) accepted by `clsx`
 * @returns The resulting class string with Tailwind utility classes merged and deduplicated
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}