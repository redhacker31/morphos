"use client";

import React, { memo } from "react";
import type { WidgetProps } from "../engine/ComponentRegistry";

export const SectionWidget = memo(function SectionWidget(props: WidgetProps) {
  const { title, subtitle } = props as {
    title?: string; subtitle?: string;
  } & WidgetProps;

  return (
    <div style={{ gridColumn: "1 / -1" }}>
      {title && <h3 style={{ fontSize: "1.25rem", marginBottom: subtitle ? "0.25rem" : "1rem" }}>{title}</h3>}
      {subtitle && <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>{subtitle}</p>}
      {props.children}
    </div>
  );
});

export const ContainerWidget = memo(function ContainerWidget(props: WidgetProps) {
  return (
    <div className="glass-panel" style={{ padding: "1.5rem", gridColumn: "1 / -1" }}>
      {props.children}
    </div>
  );
});
