
import React, { memo, useState } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";

export const InputWidgetMetadata: WidgetMetadata = {
  type: "input",
  displayName: "Single Line Input",
  category: "forms",
  description: "Renders a text field input control.",
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
    label: "Field Input",
    placeholder: "Type a value...",
  },
  defaultData: { value: "" },
};

export const InputWidget = memo(function InputWidget({
  id,
  title,
  config = InputWidgetMetadata.defaultConfig,
  onWidgetEvent,
}: BaseWidgetProps) {
  const [val, setVal] = useState("");
  const label = title || (config?.label as string) || "Field Input";
  const placeholder = (config?.placeholder as string) || "Type a value...";

  return (
    <div className="space-y-1.5 w-full">
      <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">{label}</label>
      <input
        type="text"
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
        className="w-full bg-[var(--hover-overlay)] border border-[var(--card-border)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
      />
    </div>
  );
});
