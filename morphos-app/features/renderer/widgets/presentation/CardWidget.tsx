"use client";

import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";

export const CardWidgetMetadata: WidgetMetadata = {
  type: "card",
  displayName: "Generic Card Container",
  category: "presentation",
  description: "Renders a dark glassmorphic surface card.",
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
  defaultConfig: {},
  defaultData: {},
};

export const CardWidget = memo(function CardWidget({
  title,
  description,
  children,
}: BaseWidgetProps & { children?: React.ReactNode }) {
  return (
    <div className="w-full h-full rounded-2xl bg-[var(--surface-elevated)]/90 border border-white/10 p-5 space-y-3 backdrop-blur-xl hover:border-white/20 transition-all">
      {title && (
        <div className="border-b border-white/10 pb-2">
          <h4 className="text-xs font-bold text-white">{title}</h4>
          {description && <p className="text-[10px] text-[var(--text-muted)]">{description}</p>}
        </div>
      )}
      <div className="w-full">{children}</div>
    </div>
  );
});
