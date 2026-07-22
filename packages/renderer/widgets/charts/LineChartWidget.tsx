"use client";

import React from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { TrendingUp } from "lucide-react";

export const LineChartWidgetMetadata: WidgetMetadata = {
  type: "line-chart",
  displayName: "Line Chart Widget",
  category: "charts",
  description: "Renders continuous trend analysis data in a responsive line graph.",
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
    color: "#06B6D4",
    xAxisKey: "name",
    yAxisKey: "value",
  },
  defaultData: [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 240 },
    { name: "Wed", value: 180 },
    { name: "Thu", value: 320 },
    { name: "Fri", value: 450 },
    { name: "Sat", value: 380 },
    { name: "Sun", value: 510 },
  ],
};

export function LineChartWidget({
  id,
  title = "Line Chart",
  description,
  data = LineChartWidgetMetadata.defaultData,
  config = LineChartWidgetMetadata.defaultConfig,
  onWidgetEvent,
}: BaseWidgetProps) {
  const rawData = Array.isArray(data) && data.length > 0 ? data : (LineChartWidgetMetadata.defaultData as any[]);
  const strokeColor = (config?.color as string) || "#06B6D4";
  const xAxisKey = (config?.xAxisKey as string) || "name";
  const yAxisKey = (config?.yAxisKey as string) || "value";

  const maxValue = Math.max(...rawData.map((d) => Number(d[yAxisKey]) || 1), 10);
  const points = rawData
    .map((item, idx) => {
      const x = (idx / (rawData.length - 1 || 1)) * 300;
      const y = 120 - ((Number(item[yAxisKey]) || 0) / maxValue) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div
      onClick={() => onWidgetEvent?.({ widgetId: id, eventType: "onSelect", timestamp: Date.now(), payload: { id } })}
      className="w-full h-full rounded-2xl bg-[var(--surface-elevated)]/90 border border-white/10 p-5 space-y-3 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all group shrink-0"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--secondary)]/15 flex items-center justify-center text-[var(--secondary)]">
            <TrendingUp size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white group-hover:text-[var(--secondary)] transition-colors">{title}</h4>
            {description && <p className="text-[10px] text-[var(--text-muted)]">{description}</p>}
          </div>
        </div>
        <span className="text-[9px] font-mono text-[var(--secondary)] bg-[var(--secondary)]/10 px-2 py-0.5 rounded border border-[var(--secondary)]/20">
          TREND AST
        </span>
      </div>

      {/* SVG Native Line Chart */}
      <div className="w-full h-36 pt-2">
        <svg viewBox="0 0 300 130" className="w-full h-full overflow-visible">
          <polyline
            fill="none"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
          {rawData.map((item, idx) => {
            const x = (idx / (rawData.length - 1 || 1)) * 300;
            const y = 120 - ((Number(item[yAxisKey]) || 0) / maxValue) * 100;
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r="4"
                fill={strokeColor}
                className="hover:r-6 transition-all cursor-pointer"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
