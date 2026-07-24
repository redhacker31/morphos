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
    <div className="w-full h-full rounded-2xl bg-[var(--surface-elevated)]/90 border border-[var(--card-border)] p-5 space-y-4 backdrop-blur-xl shadow-elev-2">
      <div className="flex items-center gap-2 border-b border-[var(--card-border)] pb-3">
        <Grid size={14} className="text-[var(--primary)]" />
        <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">{title}</h4>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((st, idx) => (
          <div
            key={idx}
            className="bg-[var(--hover-overlay)] border border-[var(--card-border)] rounded-xl p-3 space-y-1 hover:bg-[var(--active-overlay)] hover:border-[var(--card-border)] transition-all duration-300"
          >
            <span className="text-[10px] text-[var(--text-muted)] font-medium block truncate">{st.label}</span>
            <span className="text-lg font-bold text-[var(--text-primary)] block metric-nums">{st.value}</span>
            <span className="text-[10px] font-mono text-[var(--success)] block">{st.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
