"use client";

import React, { memo } from "react";
import type { WidgetProps } from "../engine/ComponentRegistry";

export const StatCardWidget = memo(function StatCardWidget(props: WidgetProps) {
  const { title, value, icon, color } = props as {
    title?: string; value?: string; icon?: string; color?: string;
  } & WidgetProps;

  return (
    <div className="kpi-card" style={{ borderLeft: `3px solid ${color ?? "var(--accent)"}` }}>
      <div className="kpi-header">
        {icon && <i className={`ph ph-${icon}`} style={{ color: color ?? "var(--accent)", fontSize: "1.25rem" }}></i>}
        {title ?? "Stat"}
      </div>
      <div className="kpi-value" style={{ fontSize: "1.8rem" }}>{value ?? "—"}</div>
    </div>
  );
});
