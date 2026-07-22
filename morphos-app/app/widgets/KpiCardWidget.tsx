"use client";

import React, { useEffect, useRef, memo } from "react";
import type { WidgetProps } from "../engine/ComponentRegistry";

export const KpiCardWidget = memo(function KpiCardWidget(props: WidgetProps) {
  const { title, value, trend, trendText, prefix = "$" } = props as {
    title?: string; value?: number; trend?: string; trendText?: string; prefix?: string;
  } & WidgetProps;

  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!valueRef.current || !value) return;
    const target = Number(value);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    let frameId: number;
    const tick = () => {
      current += step;
      if (current < target) {
        if (valueRef.current) valueRef.current.textContent = Math.ceil(current).toLocaleString();
        frameId = requestAnimationFrame(tick);
      } else {
        if (valueRef.current) valueRef.current.textContent = target.toLocaleString();
      }
    };
    frameId = requestAnimationFrame(tick);
    
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value]);

  const trendColor = trend === "up" ? "var(--success)" : trend === "down" ? "var(--primary)" : "var(--text-muted)";

  return (
    <div className="kpi-card">
      <div className="kpi-header">
        {title ?? "Metric"}
        <i className={`ph ph-trend-${trend ?? "up"}`} style={{ color: trendColor }}></i>
      </div>
      <div className="kpi-value">{prefix}<span ref={valueRef}>0</span></div>
      <div className="kpi-sub">{trendText ?? ""}</div>
    </div>
  );
});
