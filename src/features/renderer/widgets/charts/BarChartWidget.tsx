import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { BarChart3 } from "lucide-react";
import { CHART_TICK, CHART_GRID, CHART_CURSOR, ChartTooltip, resolveColor } from "./chartUtils";

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
  const rawData =
    Array.isArray(data) && data.length > 0 ? data : (BarChartWidgetMetadata.defaultData as any[]);
  const barColor = resolveColor(config, "color", 0);
  const xAxisKey = (config?.xAxisKey as string) || "name";
  const yAxisKey = (config?.yAxisKey as string) || "value";
  const gradId = `bar-grad-${id}`;

  return (
    <div
      onClick={() =>
        onWidgetEvent?.({ widgetId: id, eventType: "onSelect", timestamp: Date.now(), payload: { id } })
      }
      className="w-full h-full rounded-2xl bg-[var(--surface-elevated)]/90 border border-[var(--card-border)] p-5 backdrop-blur-xl flex flex-col shadow-elev-2 hover:border-[var(--card-border-hover)] hover:shadow-elev-3 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/15 flex items-center justify-center text-[var(--primary)]">
            <BarChart3 size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
              {title}
            </h4>
            {description && <p className="text-[10px] text-[var(--text-muted)]">{description}</p>}
          </div>
        </div>
        <span className="text-[9px] font-mono text-[var(--success)] bg-[var(--success)]/10 px-2 py-0.5 rounded border border-[var(--success)]/20">
          LIVE AST
        </span>
      </div>

      <div className="relative w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rawData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={barColor} stopOpacity={0.95} />
                <stop offset="100%" stopColor={barColor} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={CHART_GRID} />
            <XAxis
              dataKey={xAxisKey}
              tick={{ fill: CHART_TICK, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: CHART_TICK, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip cursor={{ fill: CHART_CURSOR }} content={<ChartTooltip />} />
            <Bar
              dataKey={yAxisKey}
              fill={`url(#${gradId})`}
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
              isAnimationActive
              animationDuration={700}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
