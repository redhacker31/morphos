import React, { memo, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { PieChart as PieIcon } from "lucide-react";
import { VIZ_PALETTE, CHART_SURFACE, ChartTooltip } from "./chartUtils";

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
  const chartData =
    Array.isArray(data) && data.length > 0 ? data : (PieChartWidgetMetadata.defaultData as any[]);
  const palette =
    Array.isArray(config?.colors) && config.colors.length > 0
      ? (config.colors as string[])
      : VIZ_PALETTE;

  const total = chartData.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div
      onClick={() =>
        onWidgetEvent?.({ widgetId: id, eventType: "onSelect", timestamp: Date.now(), payload: { id } })
      }
      className="w-full h-full rounded-2xl bg-[var(--surface-elevated)]/90 border border-white/10 p-5 backdrop-blur-xl flex flex-col shadow-elev-2 hover:border-white/20 hover:shadow-elev-3 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 flex items-center justify-center text-[var(--accent)]">
            <PieIcon size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              {title}
            </h4>
            {description && <p className="text-[10px] text-[var(--text-muted)]">{description}</p>}
          </div>
        </div>
        <span className="text-[9px] font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded border border-[var(--accent)]/20">
          RADIAL AST
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
        <div className="relative w-full sm:w-1/2 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="58%"
                outerRadius="82%"
                paddingAngle={2}
                isAnimationActive
                animationDuration={700}
                animationEasing="ease-out"
                onMouseEnter={(_: any, i: number) => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                {chartData.map((_, idx) => (
                  <Cell
                    key={idx}
                    fill={palette[idx % palette.length]}
                    stroke={CHART_SURFACE}
                    strokeWidth={2}
                    opacity={activeIdx === null || activeIdx === idx ? 1 : 0.35}
                  />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">Total</span>
            <span className="text-lg font-bold text-[var(--text-primary)] metric-nums">
              {total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="w-full sm:w-1/2 space-y-1.5">
          {chartData.map((item, idx) => {
            const color = palette[idx % palette.length];
            const val = Number(item.value) || 0;
            const pct = total > 0 ? Math.round((val / total) * 100) : 0;
            const active = activeIdx === idx;
            return (
              <div
                key={idx}
                className={`flex items-center gap-2 text-xs rounded-lg px-2 py-1.5 transition-colors duration-200 ${
                  active ? "bg-white/5" : ""
                }`}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: color }} />
                <span className="text-[var(--text-secondary)] truncate">{item.name}</span>
                <span className="ml-auto font-mono text-[var(--text-primary)] metric-nums">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
