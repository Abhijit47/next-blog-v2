"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Wraps the OTPInput primitive to apply default layout and merge custom class names.
 *
 * Renders an OTPInput with a default flex container, gap and disabled styling, while combining any provided `containerClassName` and `className` with the defaults.
 *
 * @param className - Additional class names applied to the OTP input elements.
 * @param containerClassName - Additional class names applied to the OTP input container.
 * @returns The rendered OTPInput React element with merged class names and a `data-slot="input-otp"` attribute.
 */
function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

/**
 * A container element for arranging OTP input slots horizontally.
 *
 * @param className - Additional class names applied to the container
 * @returns A div with `data-slot="input-otp-group"` and combined classes `"flex items-center"` plus any provided `className`; all other props are forwarded to the div
 */
function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

/**
 * Renders a single OTP input slot with its visual state and content.
 *
 * The component displays the slot's character if present and, when applicable, a centered blinking caret.
 * It also exposes a `data-active` attribute reflecting the slot's active state and forwards all native div props.
 *
 * @param index - The zero-based index of the slot to render
 * @returns The rendered OTP slot element
 */
function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

/**
 * Renders a visual separator used between OTP slots.
 *
 * @returns A div element with `data-slot="input-otp-separator"`, `role="separator"`, and a `MinusIcon` child.
 */
function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }