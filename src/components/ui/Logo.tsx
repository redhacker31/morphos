
import React from "react";
import { Hexagon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  collapsed?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ collapsed = false, className, size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: 18, text: "text-base" },
    md: { icon: 22, text: "text-xl" },
    lg: { icon: 28, text: "text-2xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative">
        <Hexagon
          size={icon}
          className="text-[var(--primary)] fill-[var(--primary-subtle)]"
          strokeWidth={2}
        />
        <div className="absolute inset-0 blur-lg bg-[var(--primary-glow)] rounded-full opacity-40" />
      </div>
      {!collapsed && (
        <span className={cn("font-bold tracking-tight text-white", text)}>
          MorphOS
        </span>
      )}
    </div>
  );
}
