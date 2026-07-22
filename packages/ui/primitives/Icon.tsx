import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type IconSize = "sm" | "md" | "lg";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: LucideIcon;
  size?: IconSize;
  interactive?: boolean;
  animated?: boolean;
}

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: LucideComponent, size = "md", interactive, animated, className, ...props }, ref) => {
    
    const iconSize = sizeMap[size];

    const content = (
      <LucideComponent
        ref={ref}
        size={iconSize}
        className={cn(
          interactive && "cursor-pointer transition-colors hover:text-primary",
          className
        )}
        {...props}
      />
    );

    if (animated) {
      return (
        <motion.div
          whileHover={interactive ? { scale: 1.1, rotate: 5 } : undefined}
          whileTap={interactive ? { scale: 0.9 } : undefined}
          className="inline-flex items-center justify-center"
        >
          {content}
        </motion.div>
      );
    }

    return content;
  }
);
Icon.displayName = "Icon";
