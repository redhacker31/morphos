"use client";

import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { Type } from "lucide-react";

export const HeadingWidgetMetadata: WidgetMetadata = {
  type: "heading",
  displayName: "Section Heading",
  category: "presentation",
  description: "Renders styled typographic section headers (H1 - H4).",
  version: "1.0.0",
  capabilities: {
    editable: true,
    resizable: true,
    exportable: false,
    requiresData: false,
    supportsFilters: false,
    interactive: false,
    realtimeCapable: false,
  },
  defaultConfig: {
    level: "h2",
    subtitle: "Overview metrics and operational status",
  },
  defaultData: { text: "Section Title" },
};

export const HeadingWidget = memo(function HeadingWidget({
  id,
  title = "Section Title",
  description,
  data,
  config = HeadingWidgetMetadata.defaultConfig,
}: BaseWidgetProps) {
  const text = (data as any)?.text || title;
  const subtitle = description || (config?.subtitle as string) || "";
  const level = (config?.level as string) || "h2";

  return (
    <div className="w-full py-2 space-y-1">
      {level === "h1" ? (
        <h1 className="text-3xl font-extrabold text-white tracking-tight">{text}</h1>
      ) : level === "h3" ? (
        <h3 className="text-lg font-bold text-white tracking-tight">{text}</h3>
      ) : (
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Type size={18} className="text-[var(--primary)]" />
          <span>{text}</span>
        </h2>
      )}
      {subtitle && <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>}
    </div>
  );
});
