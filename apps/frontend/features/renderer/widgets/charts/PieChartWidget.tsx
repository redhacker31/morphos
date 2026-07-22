"use client";

import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { PieChart as PieIcon } from "lucide-react";

export const PieChartWidgetMetadata: WidgetMetadata = {
  type: "pie-chart",
  displayName: "Radial Pie Chart",
  category: "charts",
  description: "Renders proportional percentage distribution data in a radial pie graph.",
  version: "1.0.0",
  capabilities: {
    editable: true,
    resizable: true,
    exportable: true,
    requiresData: true,
    supportsFilters: true,
    interactive: true,
    realtimeCapable: true,
  },
  defaultConfig: {
    colors: ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B"],
  },
  defaultData: [
    { name: "Enterprise", value: 45 },
    { name: "Mid-Market", value: 30 },
    { name: "SMB", value: 15 },
    { name: "Self-Serve", value: 10 },
  ],
};

export const PieChartWidget = memo(function PieChartWidget({
  id,
  title = "Market Distribution",
  description,
  data = PieChartWidgetMetadata.defaultData,
  config = PieChartWidgetMetadata.defaultConfig,
  onWidgetEvent,
}: BaseWidgetProps) {
  const chartData = Array.isArray(data) && data.length > 0 ? data : (PieChartWidgetMetadata.defaultData as any[]);
  const palette = (config?.colors as string[]) || (PieChartWidgetMetadata.defaultConfig.colors as string[]);

  return (
    <div
      onClick={() => onWidgetEvent?.({ widgetId: id, eventType: "onSelect", timestamp: Date.now(), payload: { id } })}
      className="w-full h-full rounded-2xl bg-[var(--surface-elevated)]/90 border border-white/10 p-5 space-y-3 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 flex items-center justify-center text-[var(--accent)]">
            <PieIcon size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white group-hover:text-[var(--accent)] transition-colors">{title}</h4>
            {description && <p className="text-[10px] text-[var(--text-muted)]">{description}</p>}
          </div>
        </div>
        <span className="text-[9px] font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded border border-[var(--accent)]/20">
          RADIAL AST
        </span>
      </div>

      {/* Radial Distribution Bar Representation */}
      <div className="space-y-2 pt-2">
        {chartData.map((item, idx) => {
          const color = palette[idx % palette.length];
          const val = Number(item.value) || 0;
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[11px] font-medium text-white">
                <span>{item.name}</span>
                <span className="font-mono text-[var(--text-secondary)]">{val}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${val}%`, backgroundColor: color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
