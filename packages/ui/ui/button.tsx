import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white shadow-soft hover:shadow-glow-purple hover:bg-primary-hover",
        secondary: "bg-surface-elevated text-text-primary hover:bg-surface-elevated/80 border border-border",
        ghost: "hover:bg-white/5 hover:text-text-primary text-text-secondary",
        outline: "border border-border bg-transparent hover:bg-white/5 text-text-primary",
        gradient: "bg-gradient-to-r from-primary to-accent text-white shadow-soft hover:shadow-glow-purple",
        danger: "bg-error text-white shadow-soft hover:shadow-glow-error hover:bg-error/90",
        success: "bg-success text-white shadow-soft hover:shadow-glow-success hover:bg-success/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // We cannot easily inject a loader inside a Slot without wrapping its children, 
    // so if isLoading is true and asChild is used, it might break layout. 
    // Usually isLoading should just be used on regular buttons.
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!asChild && isLoading ? <span>{children}</span> : children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

// Example of a Framer Motion wrapped button (MotionButton)
type MotionButtonProps = HTMLMotionProps<"button"> & VariantProps<typeof buttonVariants> & { isLoading?: boolean };
const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading || (props.disabled as boolean)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children as React.ReactNode}
      </motion.button>
    )
  }
)
MotionButton.displayName = "MotionButton"

export { Button, buttonVariants, MotionButton }
