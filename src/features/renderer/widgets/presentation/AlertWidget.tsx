
import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { AlertCircle, Info, CheckCircle2 } from "lucide-react";

export const AlertWidgetMetadata: WidgetMetadata = {
  type: "alert",
  displayName: "Notification Alert Callout",
  category: "presentation",
  description: "Renders an alert callout box for info, warnings, or success messages.",
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
    type: "info",
    message: "System sync verified cleanly.",
  },
  defaultData: {},
};

export const AlertWidget = memo(function AlertWidget({
  title = "Notice",
  description,
  config = AlertWidgetMetadata.defaultConfig,
}: BaseWidgetProps) {
  const alertType = (config?.type as string) || "info";
  const msg = description || (config?.message as string) || "System notice";

  const isWarning = alertType === "warning";
  const isError = alertType === "error";

  const boxStyle = isError
    ? "bg-red-500/10 border-red-500/30 text-red-200"
    : isWarning
    ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
    : "bg-[var(--primary)]/10 border-[var(--primary)]/30 text-[var(--primary-light)]";

  const Icon = isError ? AlertCircle : isWarning ? AlertCircle : CheckCircle2;

  return (
    <div className={`w-full rounded-xl border p-4 flex items-start gap-3 backdrop-blur-xl ${boxStyle}`}>
      <Icon size={18} className="shrink-0 mt-0.5" />
      <div>
        <h5 className="text-xs font-bold text-white">{title}</h5>
        <p className="text-[11px] opacity-90">{msg}</p>
      </div>
    </div>
  );
});
