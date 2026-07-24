
import React from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { AlignLeft } from "lucide-react";

export const TextBlockWidgetMetadata: WidgetMetadata = {
  type: "text-block",
  displayName: "Text & Announcement Block",
  category: "presentation",
  description: "Renders formatted body text, announcements, or documentation notes.",
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
    content: "Welcome to the MorphOS generated application view. All widgets are rendered deterministically from valid JSON AST payloads.",
  },
  defaultData: {},
};

export function TextBlockWidget({
  id,
  title = "Notice & Instructions",
  config = TextBlockWidgetMetadata.defaultConfig,
}: BaseWidgetProps) {
  const content = (config.content as string) || (TextBlockWidgetMetadata.defaultConfig.content as string);

  return (
    <div className="w-full h-full rounded-2xl bg-[var(--surface-elevated)]/90 border border-[var(--card-border)] p-5 space-y-2 backdrop-blur-xl flex flex-col justify-between hover:border-[var(--card-border-hover)] transition-all">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-[var(--hover-overlay)] flex items-center justify-center text-[var(--primary)]">
          <AlignLeft size={13} />
        </div>
        <h4 className="text-xs font-bold text-[var(--text-primary)]">{title}</h4>
      </div>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
        {content}
      </p>
    </div>
  );
}
