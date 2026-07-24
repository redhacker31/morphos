
import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { Layers } from "lucide-react";

export const EmptyStateWidgetMetadata: WidgetMetadata = {
  type: "empty-state",
  displayName: "Empty State Fallback",
  category: "presentation",
  description: "Displays a clean empty state graphic when no content is present.",
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
    title: "No Data Available",
    description: "Generate or connect data to populate this widget.",
  },
  defaultData: {},
};

export const EmptyStateWidget = memo(function EmptyStateWidget({
  title = "No Data Available",
  description = "Generate or connect data to populate this widget.",
  config = EmptyStateWidgetMetadata.defaultConfig,
}: BaseWidgetProps) {
  const displayTitle = title || (config?.title as string);
  const displayDesc = description || (config?.description as string);

  return (
    <div className="w-full h-44 rounded-2xl bg-[var(--surface-elevated)]/40 border border-dashed border-[var(--card-border)] p-6 flex flex-col items-center justify-center text-center space-y-2 backdrop-blur-xl">
      <div className="w-10 h-10 rounded-xl bg-[var(--hover-overlay)] flex items-center justify-center text-[var(--text-muted)]">
        <Layers size={20} />
      </div>
      <h5 className="text-xs font-bold text-[var(--text-primary)]">{displayTitle}</h5>
      <p className="text-[10px] text-[var(--text-muted)] max-w-xs">{displayDesc}</p>
    </div>
  );
});
