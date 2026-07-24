
import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { User } from "lucide-react";

export const AvatarWidgetMetadata: WidgetMetadata = {
  type: "avatar",
  displayName: "User Profile Avatar",
  category: "presentation",
  description: "Displays user profile picture or fallback initial badge.",
  version: "1.0.0",
  capabilities: {
    editable: true,
    resizable: false,
    exportable: false,
    requiresData: false,
    supportsFilters: false,
    interactive: false,
    realtimeCapable: false,
  },
  defaultConfig: { name: "Lead Architect", role: "Admin" },
  defaultData: {},
};

export const AvatarWidget = memo(function AvatarWidget({
  title,
  config = AvatarWidgetMetadata.defaultConfig,
}: BaseWidgetProps) {
  const name = title || (config?.name as string) || "Lead Architect";
  const role = (config?.role as string) || "User";

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--surface-elevated)]/90 border border-[var(--card-border)] backdrop-blur-xl">
      <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/20 border border-[var(--primary)]/30 flex items-center justify-center text-[var(--primary)] font-bold">
        <User size={18} />
      </div>
      <div>
        <h5 className="text-xs font-bold text-[var(--text-primary)]">{name}</h5>
        <span className="text-[10px] text-[var(--text-muted)]">{role}</span>
      </div>
    </div>
  );
});
