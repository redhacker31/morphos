import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: boolean;
  success?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, success, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary transition-all placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
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
Textarea.displayName = "Textarea"

export { Textarea }
