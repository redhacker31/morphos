
import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";

export const BadgeWidgetMetadata: WidgetMetadata = {
  type: "badge",
  displayName: "Status Badge Tag",
  category: "presentation",
  description: "Displays a status badge pill tag.",
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
  defaultConfig: { variant: "success", text: "ACTIVE" },
  defaultData: {},
};

export const BadgeWidget = memo(function BadgeWidget({
  title,
  config = BadgeWidgetMetadata.defaultConfig,
}: BaseWidgetProps) {
  const text = title || (config?.text as string) || "ACTIVE";
  const variant = (config?.variant as string) || "success";

  const colorStyle =
    variant === "warning"
      ? "text-amber-400 bg-amber-400/10 border-amber-400/20"
      : variant === "error"
      ? "text-red-400 bg-red-400/10 border-red-400/20"
      : "text-[var(--success)] bg-[var(--success)]/10 border-[var(--success)]/20";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${colorStyle}`}>
      {text}
    </span>
  );
});
