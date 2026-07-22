import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-primary text-white shadow-soft",
        secondary:
          "border-transparent bg-surface-elevated text-text-primary",
        outline: "text-text-primary border-border",
        success:
          "border-transparent bg-success/20 text-success border border-success/30",
        warning:
          "border-transparent bg-warning/20 text-warning border border-warning/30",
        error:
          "border-transparent bg-error/20 text-error border border-error/30",
        comingSoon:
          "border-transparent bg-primary/20 text-primary border border-primary/30",
        new:
          "border-transparent bg-accent/20 text-accent border border-accent/30",
        beta:
          "border-transparent bg-secondary/20 text-secondary border border-secondary/30",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
