
import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

export function GradientText({ children, className, animated = false }: GradientTextProps) {
  return (
    <span
      className={cn(
        animated ? "gradient-text-animated" : "gradient-text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}
