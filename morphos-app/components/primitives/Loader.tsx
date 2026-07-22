import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LoaderVariant = "skeleton" | "spinner" | "pulse" | "typing" | "progressBar" | "circular";

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LoaderVariant;
  progress?: number; // 0 to 100 for progressBar
}

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ variant = "spinner", progress = 0, className, ...props }, ref) => {
    
    if (variant === "skeleton") {
      return (
        <div
          ref={ref}
          className={cn("skeleton h-full w-full rounded-md", className)}
          {...props}
        />
      );
    }

    if (variant === "spinner") {
      return (
        <div ref={ref} className={cn("relative w-6 h-6", className)} {...props}>
          <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin-slow" />
        </div>
      );
    }

    if (variant === "pulse") {
      return (
        <div ref={ref} className={cn("w-3 h-3 rounded-full bg-primary animate-pulse", className)} {...props} />
      );
    }

    if (variant === "typing") {
      return (
        <div ref={ref} className={cn("flex space-x-1.5", className)} {...props}>
          <motion.div className="w-2 h-2 rounded-full bg-text-secondary" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
          <motion.div className="w-2 h-2 rounded-full bg-text-secondary" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
          <motion.div className="w-2 h-2 rounded-full bg-text-secondary" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
        </div>
      );
    }

    if (variant === "progressBar") {
      return (
        <div ref={ref} className={cn("h-2 w-full bg-surface-elevated rounded-full overflow-hidden", className)} {...props}>
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-accent" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      );
    }
    
    if (variant === "circular") {
        return (
            <svg
            ref={ref as any}
            className={cn("animate-spin-slow text-primary", className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
            </svg>
        )
    }

    return null;
  }
);
Loader.displayName = "Loader";
