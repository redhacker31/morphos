import React from "react";
import { cn } from "@/lib/utils";

/** Public URL of the official MorphOS logo lockup (M icon + wordmark + tagline). */
export const MORPHOS_LOGO_URL =
  "https://cdn.enter.pro/resources/uid_100187967/cbdddb1d-be7b-47.png";

interface LogoProps {
  collapsed?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * MorphOS brand logo. Renders the full lockup image; when `collapsed`,
 * crops to the top "M" icon mark so it fits a square sidebar slot.
 */
export function Logo({ collapsed = false, className, size = "md" }: LogoProps) {
  const heights = {
    sm: 26,
    md: 30,
    lg: 40,
  } as const;
  const h = heights[size];

  if (collapsed) {
    return (
      <div
        className={cn(
          "w-8 h-8 rounded-lg overflow-hidden shrink-0 ring-1 ring-white/10",
          className
        )}
      >
        <img
          src={MORPHOS_LOGO_URL}
          alt="MorphOS"
          className="w-full h-full object-cover object-top"
        />
      </div>
    );
  }

  return (
    <img
      src={MORPHOS_LOGO_URL}
      alt="MorphOS"
      style={{ height: h }}
      className={cn("w-auto object-contain", className)}
    />
  );
}
