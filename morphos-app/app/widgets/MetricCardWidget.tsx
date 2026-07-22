"use client";

import React, { memo } from "react";
import type { WidgetProps } from "../engine/ComponentRegistry";

export const MetricCardWidget = memo(function MetricCardWidget(props: WidgetProps) {
  const { title, value, subtitle, change, changeType } = props as {
    title?: string; value?: string; subtitle?: string; change?: string; changeType?: string;
  } & WidgetProps;

  const changeColor = changeType === "positive" ? "var(--success)" : changeType === "negative" ? "var(--primary)" : "var(--text-muted)";

  return (
    <div className="kpi-card">
      <div className="kpi-header">{title ?? "Metric"}</div>
      <div className="kpi-value" style={{ fontSize: "2rem" }}>{value ?? "—"}</div>
      {(subtitle || change) && (
        <div className="kpi-sub">
          {change && <span style={{ color: changeColor, fontWeight: 600 }}>{change}</span>}
          {subtitle && <span> {subtitle}</span>}
        </div>
      )}
    </div>
  );
});
