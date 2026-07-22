"use client";

import React from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { BarChart3 } from "lucide-react";

export const BarChartWidgetMetadata: WidgetMetadata = {
  type: "bar-chart",
  displayName: "Bar Chart Widget",
  category: "charts",
  description: "Renders comparative data metrics in a responsive vertical bar chart.",
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
    color: "#8B5CF6",
    xAxisKey: "name",
    yAxisKey: "value",
  },
  defaultData: [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 650 },
    { name: "Mar", value: 550 },
    { name: "Apr", value: 800 },
    { name: "May", value: 950 },
    { name: "Jun", value: 700 },
  ],
};

export function BarChartWidget({
  id,
  title = "Bar Chart",
  description,
  data = BarChartWidgetMetadata.defaultData,
  config = BarChartWidgetMetadata.defaultConfig,
  onWidgetEvent,
}: BaseWidgetProps) {
  const rawData = Array.isArray(data) && data.length > 0 ? data : (BarChartWidgetMetadata.defaultData as any[]);
  const barColor = (config?.color as string) || "#8B5CF6";
  const xAxisKey = (config?.xAxisKey as string) || "name";
  const yAxisKey = (config?.yAxisKey as string) || "value";

  const maxValue = Math.max(...rawData.map((d) => Number(d[yAxisKey]) || 1), 10);

  return (
    <div
      onClick={() => onWidgetEvent?.({ widgetId: id, eventType: "onSelect", timestamp: Date.now(), payload: { id } })}
      className="w-full h-full rounded-2xl bg-[var(--surface-elevated)]/90 border border-white/10 p-5 space-y-3 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/15 flex items-center justify-center text-[var(--primary)]">
            <BarChart3 size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white group-hover:text-[var(--primary)] transition-colors">{title}</h4>
            {description && <p className="text-[10px] text-[var(--text-muted)]">{description}</p>}
          </div>
        </div>
        <span className="text-[9px] font-mono text-[var(--success)] bg-[var(--success)]/10 px-2 py-0.5 rounded border border-[var(--success)]/20">
          LIVE AST
        </span>
      </div>

      {/* SVG Native Bar Chart */}
      <div className="w-full h-40 pt-2 flex items-end justify-between gap-2 border-b border-white/10 px-2">
        {rawData.map((item, idx) => {
          const val = Number(item[yAxisKey]) || 0;
          const heightPercent = Math.min(100, Math.max(10, (val / maxValue) * 100));
          const name = String(item[xAxisKey] || idx);

          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group/bar h-full justify-end">
              <span className="text-[9px] font-mono text-[var(--text-muted)] opacity-0 group-hover/bar:opacity-100 transition-opacity">
                {val}
              </span>
              <div
                className="w-full rounded-t-md transition-all duration-300 group-hover/bar:brightness-125"
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: barColor,
                }}
              />
              <span className="text-[9px] text-[var(--text-muted)] truncate w-full text-center mt-1">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
