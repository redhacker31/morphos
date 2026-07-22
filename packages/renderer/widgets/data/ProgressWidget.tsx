"use client";

import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";

export const ProgressWidgetMetadata: WidgetMetadata = {
  type: "progress",
  displayName: "Progress Bar Indicator",
  category: "data",
  description: "Renders a progress bar with percentage fill.",
  version: "1.0.0",
  capabilities: {
    editable: true,
    resizable: true,
    exportable: false,
    requiresData: true,
    supportsFilters: false,
    interactive: false,
    realtimeCapable: true,
  },
  defaultConfig: { color: "#8B5CF6" },
  defaultData: { value: 72 },
};

export const ProgressWidget = memo(function ProgressWidget({
  title = "Completion Status",
  data = ProgressWidgetMetadata.defaultData,
  config = ProgressWidgetMetadata.defaultConfig,
}: BaseWidgetProps) {
  const percent = Math.min(100, Math.max(0, Number((data as any)?.value ?? data) || 0));
  const color = (config?.color as string) || "#8B5CF6";

  return (
    <div className="w-full space-y-2 p-4 rounded-2xl bg-[var(--surface-elevated)]/90 border border-white/10 backdrop-blur-xl">
      <div className="flex justify-between items-center text-xs font-bold text-white">
        <span>{title}</span>
        <span className="font-mono text-[var(--primary)]">{percent}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${percent}%`, backgroundColor: color }} />
      </div>
    </div>
  );
});
