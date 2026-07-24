
import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { ArrowRight } from "lucide-react";

export const ButtonWidgetMetadata: WidgetMetadata = {
  type: "button",
  displayName: "Interactive Button",
  category: "forms",
  description: "Triggers typed widget events on click.",
  version: "1.0.0",
  capabilities: {
    editable: true,
    resizable: true,
    exportable: false,
    requiresData: false,
    supportsFilters: false,
    interactive: true,
    realtimeCapable: false,
  },
  defaultConfig: {
    variant: "primary",
    label: "Execute Action",
  },
  defaultData: {},
};

export const ButtonWidget = memo(function ButtonWidget({
  id,
  title,
  config = ButtonWidgetMetadata.defaultConfig,
  onWidgetEvent,
}: BaseWidgetProps) {
  const label = title || (config?.label as string) || "Execute Action";
  const variant = (config?.variant as string) || "primary";

  const btnStyle =
    variant === "secondary"
      ? "bg-[var(--active-overlay)] hover:bg-[var(--card-border-hover)] text-[var(--text-primary)] border border-[var(--card-border)]"
      : variant === "outline"
      ? "bg-transparent border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10"
      : "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:opacity-90 shadow-md";

  return (
    <button
      onClick={() =>
        onWidgetEvent?.({
          widgetId: id,
          eventType: "onAction",
          timestamp: Date.now(),
          payload: { action: "click", label },
        })
      }
      className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${btnStyle}`}
    >
      <span>{label}</span>
      <ArrowRight size={14} />
    </button>
  );
});
