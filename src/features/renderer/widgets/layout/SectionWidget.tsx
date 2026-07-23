
import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";

export const SectionWidgetMetadata: WidgetMetadata = {
  type: "section",
  displayName: "Titled Layout Section",
  category: "presentation",
  description: "Renders a titled section container for grouping related widgets.",
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

export const SectionWidget = memo(function SectionWidget({
  title = "Section Block",
  description,
  children,
}: BaseWidgetProps & { children?: React.ReactNode }) {
  return (
    <div className="w-full space-y-4 py-2 border-t border-white/10 pt-4">
      <div>
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">{title}</h3>
        {description && <p className="text-xs text-[var(--text-muted)]">{description}</p>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
});
