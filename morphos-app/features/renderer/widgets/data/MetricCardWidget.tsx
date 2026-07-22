"use client";

import React from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const MetricCardWidgetMetadata: WidgetMetadata = {
  type: "metric-card",
  displayName: "Metric KPI Card",
  category: "presentation",
  description: "Displays a single high-impact numerical KPI with trend status indicator.",
  version: "1.0.0",
  capabilities: {
    editable: true,
    resizable: true,
    exportable: false,
    requiresData: false,
    supportsFilters: false,
    interactive: true,
    realtimeCapable: true,
  },
  defaultConfig: {
    unit: "$",
    trend: "+12.4%",
    isPositive: true,
  },
  defaultData: {
    value: "142,850",
  },
};

export function MetricCardWidget({
  id,
  title = "Total Metric",
  description = "Compared to last month",
  data = MetricCardWidgetMetadata.defaultData,
  config = MetricCardWidgetMetadata.defaultConfig,
  onWidgetEvent,
}: BaseWidgetProps) {
  const metricVal = (data as any)?.value || (data as any) || "0";
  const unit = (config.unit as string) || "";
  const trend = (config.trend as string) || "";
  const isPositive = config.isPositive !== false;

  return (
    <div
      onClick={() => onWidgetEvent?.({ widgetId: id, eventType: "onSelect", timestamp: Date.now(), payload: { id } })}
      className="w-full h-full rounded-2xl bg-[var(--surface-elevated)]/90 border border-white/10 p-5 space-y-3 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all group cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">{title}</span>
        <div className="w-7 h-7 rounded-lg bg-[var(--primary)]/15 flex items-center justify-center text-[var(--primary)] group-hover:scale-110 transition-transform">
          <Zap size={14} />
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-3xl font-extrabold text-white tracking-tight">
          {unit}{metricVal}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold">
          <span className={`flex items-center ${isPositive ? "text-[var(--success)]" : "text-[var(--error)]"}`}>
            {isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {trend}
          </span>
          <span className="text-[var(--text-muted)]">{description}</span>
        </div>
      </div>
    </div>
  );
}
