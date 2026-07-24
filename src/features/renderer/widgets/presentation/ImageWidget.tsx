
import React, { memo } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { Image as ImageIcon } from "lucide-react";

export const ImageWidgetMetadata: WidgetMetadata = {
  type: "image",
  displayName: "Responsive Image",
  category: "presentation",
  description: "Renders a responsive image or media illustration.",
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
    src: "",
    alt: "Application media image",
  },
  defaultData: {},
};

export const ImageWidget = memo(function ImageWidget({
  title = "Media Item",
  config = ImageWidgetMetadata.defaultConfig,
}: BaseWidgetProps) {
  const src = (config?.src as string) || "";
  const alt = (config?.alt as string) || "Media illustration";

  if (!src) {
    return (
      <div className="w-full h-40 rounded-2xl bg-[var(--hover-overlay)] border border-dashed border-[var(--card-border)] flex flex-col items-center justify-center text-[var(--text-muted)] space-y-2">
        <ImageIcon size={28} />
        <span className="text-xs">{title}</span>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[var(--card-border)]">
      <img src={src} alt={alt} className="w-full h-auto object-cover" />
    </div>
  );
});
