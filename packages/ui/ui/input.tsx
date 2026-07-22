import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
  success?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text-primary transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          // Hover state
          "hover:border-primary-subtle hover:bg-surface-elevated",
          // Default focus
          !error && !success && "focus-visible:border-primary focus-visible:ring-primary/20",
          // Error state
          error && "border-error focus-visible:border-error focus-visible:ring-error/20",
          // Success state
          success && "border-success focus-visible:border-success focus-visible:ring-success/20",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
