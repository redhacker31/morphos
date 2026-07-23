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
  const fillGradient = `linear-gradient(90deg, ${color}, ${color}cc)`;

  return (
    <div className="w-full h-full space-y-3 p-5 rounded-2xl bg-[var(--surface-elevated)]/90 border border-white/10 backdrop-blur-xl shadow-elev-2 group transition-all duration-300 hover:shadow-elev-3">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-[var(--text-primary)]">{title}</span>
        <span className="font-mono text-sm text-[var(--primary)] metric-nums">{percent}%</span>
      </div>
      <div className="relative w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-elegant relative"
          style={{ width: `${percent}%`, background: fillGradient }}
        >
          <span className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white/80 blur-[3px]" />
        </div>
      </div>
    </div>
  );
});
