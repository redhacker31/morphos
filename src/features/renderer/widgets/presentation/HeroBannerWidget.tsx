
import React from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { Sparkles } from "lucide-react";

export const HeroBannerWidgetMetadata: WidgetMetadata = {
  type: "hero-banner",
  displayName: "Hero Header Banner",
  category: "presentation",
  description: "Displays a high-impact header banner with title and subtitle.",
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
    bannerTitle: "Executive Operations Hub",
    bannerSubtitle: "Real-time key performance metrics, data tables, and trend analytics.",
  },
  defaultData: {},
};

export function HeroBannerWidget({
  id,
  config = HeroBannerWidgetMetadata.defaultConfig,
}: BaseWidgetProps) {
  const bannerTitle = (config.bannerTitle as string) || (HeroBannerWidgetMetadata.defaultConfig.bannerTitle as string);
  const bannerSubtitle = (config.bannerSubtitle as string) || (HeroBannerWidgetMetadata.defaultConfig.bannerSubtitle as string);

  return (
    <div className="w-full h-full rounded-2xl bg-gradient-to-r from-[var(--primary)]/20 via-[var(--accent)]/10 to-transparent border border-[var(--card-border)] p-6 space-y-2 backdrop-blur-2xl shadow-xl relative overflow-hidden flex flex-col justify-center">
      <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
        <Sparkles size={14} />
        <span>GENERATED APPLICATION VIEW</span>
      </div>
      <h2 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">{bannerTitle}</h2>
      <p className="text-xs text-[var(--text-secondary)] max-w-xl">{bannerSubtitle}</p>
    </div>
  );
}
