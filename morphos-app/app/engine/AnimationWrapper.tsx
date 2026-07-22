"use client";

import React, { type ReactNode } from "react";

interface AnimationWrapperProps {
  children: ReactNode;
  index: number;
  depth: number;
}

export function AnimationWrapper({ children, index, depth }: AnimationWrapperProps) {
  const delay = (index * 0.1) + (depth * 0.05);

  return (
    <div
      className="morphos-widget-animate"
      style={{
        opacity: 0,
        transform: "translateY(16px)",
        animation: `morphosReveal 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${delay}s forwards`,
      }}
    >
      {children}
    </div>
  );
}
