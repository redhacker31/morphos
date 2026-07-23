
import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";

export const DividerWidgetMetadata: WidgetMetadata = {
  type: "divider",
  displayName: "Layout Divider",
  category: "presentation",
  description: "Renders a subtle horizontal separator line.",
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

export const DividerWidget = memo(function DividerWidget() {
  return <div className="w-full my-4 border-t border-white/10" />;
});
