
import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { Grid } from "lucide-react";

export const StatGridWidgetMetadata: WidgetMetadata = {
  type: "stat-grid",
  displayName: "Multi-Metric Stat Grid",
  category: "data",
  description: "Renders a compact multi-stat grid array.",
  version: "1.0.0",
  capabilities: {
    editable: true,
    resizable: true,
    exportable: true,
    requiresData: true,
    supportsFilters: false,
    interactive: true,
    realtimeCapable: true,
  },
  defaultConfig: {},
  defaultData: [
    { label: "Active Users", value: "24,850", change: "+12%" },
    { label: "Server Load", value: "34%", change: "Optimal" },
    { label: "Conversion", value: "4.8%", change: "+0.6%" },
    { label: "Error Rate", value: "0.02%", change: "-0.01%" },
  ],
};

export const StatGridWidget = memo(function StatGridWidget({
  title = "System Overview Stats",
  data = StatGridWidgetMetadata.defaultData,
}: BaseWidgetProps) {
  const stats = Array.isArray(data) ? data : (StatGridWidgetMetadata.defaultData as any[]);

  return (
    <div className="w-full rounded-2xl bg-[var(--surface-elevated)]/90 border border-white/10 p-5 space-y-3 backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <Grid size={14} className="text-[var(--primary)]" />
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{title}</h4>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((st, idx) => (
          <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-3 space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] font-medium block truncate">{st.label}</span>
            <span className="text-lg font-bold text-white block">{st.value}</span>
            <span className="text-[10px] font-mono text-[var(--success)] block">{st.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
