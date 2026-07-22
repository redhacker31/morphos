"use client";

import React, { memo } from "react";
import type { WidgetProps } from "../engine/ComponentRegistry";

export const ButtonWidget = memo(function ButtonWidget(props: WidgetProps) {
  const { label, variant = "secondary", icon } = props as {
    label?: string; variant?: string; icon?: string;
  } & WidgetProps;

  const className = variant === "primary" ? "primary-btn" : variant === "glow" ? "generate-btn glow-btn" : "secondary-btn";

  return (
    <button className={className}>
      {icon && <i className={`ph ph-${icon}`}></i>}
      {label ?? "Button"}
    </button>
  );
});

export const InputWidget = memo(function InputWidget(props: WidgetProps) {
  const { placeholder, label, type = "text" } = props as {
    placeholder?: string; label?: string; type?: string;
  } & WidgetProps;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {label && <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder ?? "Enter value..."}
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid var(--card-border)",
          padding: "0.75rem 1.25rem",
          borderRadius: "12px",
          color: "white",
          outline: "none",
          fontSize: "0.95rem",
        }}
      />
    </div>
  );
});

export const TextWidget = memo(function TextWidget(props: WidgetProps) {
  const { content, color, size } = props as {
    content?: string; color?: string; size?: string;
  } & WidgetProps;

  return (
    <p style={{
      color: color ?? "var(--text-muted)",
      fontSize: size ?? "1rem",
      lineHeight: 1.6,
    }}>
      {content ?? ""}
    </p>
  );
});

export const HeadingWidget = memo(function HeadingWidget(props: WidgetProps) {
  const { text, level = 2, color } = props as {
    text?: string; level?: number; color?: string;
  } & WidgetProps;

  const style = {
    color: color ?? "var(--text-main)",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
  };

  const safeLevel = Math.min(Math.max(level, 1), 6);
  const content = text ?? "Heading";

  if (safeLevel === 1) return <h1 style={style}>{content}</h1>;
  if (safeLevel === 2) return <h2 style={style}>{content}</h2>;
  if (safeLevel === 3) return <h3 style={style}>{content}</h3>;
  if (safeLevel === 4) return <h4 style={style}>{content}</h4>;
  if (safeLevel === 5) return <h5 style={style}>{content}</h5>;
  return <h6 style={style}>{content}</h6>;
});

export const DividerWidget = memo(function DividerWidget() {
  return (
    <hr style={{
      border: "none",
      borderTop: "1px solid var(--card-border)",
      margin: "1rem 0",
    }} />
  );
});
