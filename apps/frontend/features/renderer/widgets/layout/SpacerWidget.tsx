"use client";

import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";

export const SpacerWidgetMetadata: WidgetMetadata = {
  type: "spacer",
  displayName: "Vertical Spacer",
  category: "presentation",
  description: "Renders vertical spacing gaps between elements.",
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
  defaultConfig: { height: 24 },
  defaultData: {},
};

export const SpacerWidget = memo(function SpacerWidget({ config = SpacerWidgetMetadata.defaultConfig }: BaseWidgetProps) {
  const h = Number(config?.height) || 24;
  return <div style={{ height: `${h}px` }} className="w-full" />;
});
