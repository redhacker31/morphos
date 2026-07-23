import React from "react";

/**
 * Data-viz series palette. Mirrors the --viz-* design tokens so chart
 * internals (which cannot reliably resolve CSS vars as raw SVG attributes)
 * stay visually in sync with the design system.
 */
export const VIZ_PALETTE = [
  "#8b5cf6", // --viz-1 violet
  "#06b6d4", // --viz-2 cyan
  "#22c55e", // --viz-3 emerald
  "#f59e0b", // --viz-4 amber
  "#ec4899", // --viz-5 pink
  "#6366f1", // --viz-6 indigo
];

/** Concrete chart-internal colors that mirror text tokens (SVG-safe). */
export const CHART_TICK = "#71717a"; // --text-muted
export const CHART_GRID = "rgba(255,255,255,0.06)";
export const CHART_CURSOR = "rgba(255,255,255,0.05)";
export const CHART_SURFACE = "#18181f"; // --surface-elevated

interface TooltipEntry {
  name?: string;
  value?: number | string;
  color?: string;
  fill?: string;
  payload?: Record<string, unknown>;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
}

/** Shared dark-glass tooltip rendered by every chart widget. */
export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[var(--surface-elevated)]/95 backdrop-blur-xl px-3 py-2 shadow-elev-3">
      {label != null && label !== "" && (
        <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
          {label}
        </div>
      )}
      <div className="space-y-1">
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color || entry.fill || "#8b5cf6" }}
            />
            <span className="text-[var(--text-secondary)]">{entry.name}</span>
            <span className="ml-auto font-mono font-bold text-[var(--text-primary)] metric-nums">
              {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Resolves a single color from config, falling back to the viz palette. */
export function resolveColor(config: any, key: string, fallbackIndex: number): string {
  const c = config?.[key];
  return typeof c === "string" && c.trim() !== ""
    ? c
    : VIZ_PALETTE[fallbackIndex % VIZ_PALETTE.length];
}
