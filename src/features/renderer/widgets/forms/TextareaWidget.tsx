
import React, { memo, useState } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";

export const TextareaWidgetMetadata: WidgetMetadata = {
  type: "textarea",
  displayName: "Multi-line Textarea",
  category: "forms",
  description: "Renders a multi-line text input control.",
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
    label: "Notes & Feedback",
    placeholder: "Enter details...",
  },
  defaultData: { value: "" },
};

export const TextareaWidget = memo(function TextareaWidget({
  id,
  title,
  config = TextareaWidgetMetadata.defaultConfig,
  onWidgetEvent,
}: BaseWidgetProps) {
  const [val, setVal] = useState("");
  const label = title || (config?.label as string) || "Notes & Feedback";
  const placeholder = (config?.placeholder as string) || "Enter details...";

  return (
    <div className="space-y-1.5 w-full">
      <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">{label}</label>
      <textarea
        rows={3}
        value={val}
        placeholder={placeholder}
        onChange={(e) => {
          setVal(e.target.value);
          onWidgetEvent?.({
            widgetId: id,
            eventType: "onChange",
            timestamp: Date.now(),
            payload: { value: e.target.value },
          });
        }}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] resize-none"
      />
    </div>
  );
});
