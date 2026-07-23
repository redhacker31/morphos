import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { TrendingUp } from "lucide-react";
import { CHART_TICK, CHART_GRID, CHART_SURFACE, ChartTooltip, resolveColor } from "./chartUtils";

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
  const rawData =
    Array.isArray(data) && data.length > 0 ? data : (LineChartWidgetMetadata.defaultData as any[]);
  const strokeColor = resolveColor(config, "color", 1);
  const xAxisKey = (config?.xAxisKey as string) || "name";
  const yAxisKey = (config?.yAxisKey as string) || "value";
  const gradId = `line-grad-${id}`;

  return (
    <div
      onClick={() =>
        onWidgetEvent?.({ widgetId: id, eventType: "onSelect", timestamp: Date.now(), payload: { id } })
      }
      className="w-full h-full rounded-2xl bg-[var(--surface-elevated)]/90 border border-white/10 p-5 backdrop-blur-xl flex flex-col shadow-elev-2 hover:border-white/20 hover:shadow-elev-3 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--secondary)]/15 flex items-center justify-center text-[var(--secondary)]">
            <TrendingUp size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--secondary)] transition-colors">
              {title}
            </h4>
            {description && <p className="text-[10px] text-[var(--text-muted)]">{description}</p>}
          </div>
        </div>
        <span className="text-[9px] font-mono text-[var(--secondary)] bg-[var(--secondary)]/10 px-2 py-0.5 rounded border border-[var(--secondary)]/20">
          TREND AST
        </span>
      </div>

      <div className="relative w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={rawData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.4} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
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
            <Tooltip
              cursor={{ stroke: CHART_GRID, strokeDasharray: "4 4" }}
              content={<ChartTooltip />}
            />
            <Area
              type="monotone"
              dataKey={yAxisKey}
              stroke={strokeColor}
              strokeWidth={2.5}
              fill={`url(#${gradId})`}
              dot={{ r: 3, fill: strokeColor, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: strokeColor, stroke: CHART_SURFACE, strokeWidth: 2 }}
              isAnimationActive
              animationDuration={900}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
