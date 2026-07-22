"use client";

import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";

export const ContainerWidgetMetadata: WidgetMetadata = {
  type: "container",
  displayName: "Nested Sub-Container Layout",
  category: "presentation",
  description: "Serves as a layout wrapper for nesting child widgets recursively.",
  version: "1.0.0",
  capabilities: {
    editable: true,
    resizable: true,
    exportable: false,
    requiresData: false,
    supportsFilters: false,
    interactive: false,
    realtimeCapable: false,
  },
  defaultConfig: {},
  defaultData: {},
};

export const ContainerWidget = memo(function ContainerWidget({
  title,
  children,
}: BaseWidgetProps & { children?: React.ReactNode }) {
  return (
    <div className="w-full rounded-2xl bg-[var(--surface-elevated)]/60 border border-white/10 p-5 space-y-4 backdrop-blur-xl">
      {title && <h4 className="text-xs font-bold text-white uppercase tracking-wider">{title}</h4>}
      <div className="w-full space-y-4">{children}</div>
    </div>
  );
});
