import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { glassStyles } from "@/lib/theme/glass"
import { motionVariants } from "@/lib/theme/motion"

type CardVariant = "glass" | "feature" | "application" | "stats" | "template" | "empty";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: CardVariant;
  interactive?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  glass: glassStyles.card,
  feature: "bg-surface-elevated border border-border rounded-xl p-6 relative overflow-hidden group",
  application: "bg-surface border border-border rounded-2xl p-5 shadow-soft hover:shadow-medium",
  stats: "bg-surface-elevated border-l-2 border-l-primary rounded-r-lg p-4",
  template: "bg-surface border border-border rounded-xl overflow-hidden hover:border-primary-subtle",
  empty: "bg-background border border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-12 text-center",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "glass", interactive = false, children, ...props }, ref) => {
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          variantStyles[variant],
          interactive && "cursor-pointer transition-all duration-300",
          className
        )}
        whileHover={interactive ? "whileHover" : undefined}
        whileTap={interactive ? "whileTap" : undefined}
        variants={interactive ? motionVariants.hoverLift : undefined}
        {...props}
      >
        {children}
        
        {/* Animated border for feature card */}
        {variant === "feature" && (
          <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/50 transition-colors duration-500 rounded-[inherit] pointer-events-none" />
        )}
      </motion.div>
    )
  }
)
Card.displayName = "Card"
