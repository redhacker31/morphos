
import React, { memo } from "react";
import { WidgetRegistry } from "../registry/widgetRegistry";
import type { WidgetASTNode } from "../schema/astSchema";
import type { WidgetEvent } from "../types/renderer";
import { AlertTriangle } from "lucide-react";

// Auto-register built-in widgets (22 Presentational Widgets)
import { BarChartWidget, BarChartWidgetMetadata } from "../widgets/charts/BarChartWidget";
import { LineChartWidget, LineChartWidgetMetadata } from "../widgets/charts/LineChartWidget";
import { PieChartWidget, PieChartWidgetMetadata } from "../widgets/charts/PieChartWidget";

import { MetricCardWidget, MetricCardWidgetMetadata } from "../widgets/data/MetricCardWidget";
import { DataTableWidget, DataTableWidgetMetadata } from "../widgets/data/DataTableWidget";
import { StatGridWidget, StatGridWidgetMetadata } from "../widgets/data/StatGridWidget";
import { BadgeWidget, BadgeWidgetMetadata } from "../widgets/data/BadgeWidget";
import { ProgressWidget, ProgressWidgetMetadata } from "../widgets/data/ProgressWidget";

import { FormContainerWidget, FormContainerWidgetMetadata } from "../widgets/forms/FormContainerWidget";
import { ButtonWidget, ButtonWidgetMetadata } from "../widgets/forms/ButtonWidget";
import { InputWidget, InputWidgetMetadata } from "../widgets/forms/InputWidget";
import { TextareaWidget, TextareaWidgetMetadata } from "../widgets/forms/TextareaWidget";

import { TextBlockWidget, TextBlockWidgetMetadata } from "../widgets/presentation/TextBlockWidget";
import { HeroBannerWidget, HeroBannerWidgetMetadata } from "../widgets/presentation/HeroBannerWidget";
import { HeadingWidget, HeadingWidgetMetadata } from "../widgets/presentation/HeadingWidget";
import { DividerWidget, DividerWidgetMetadata } from "../widgets/presentation/DividerWidget";
import { ImageWidget, ImageWidgetMetadata } from "../widgets/presentation/ImageWidget";
import { AlertWidget, AlertWidgetMetadata } from "../widgets/presentation/AlertWidget";
import { CardWidget, CardWidgetMetadata } from "../widgets/presentation/CardWidget";
import { AvatarWidget, AvatarWidgetMetadata } from "../widgets/presentation/AvatarWidget";
import { EmptyStateWidget, EmptyStateWidgetMetadata } from "../widgets/presentation/EmptyStateWidget";

import { ContainerWidget, ContainerWidgetMetadata } from "../widgets/layout/ContainerWidget";
import { SectionWidget, SectionWidgetMetadata } from "../widgets/layout/SectionWidget";
import { SpacerWidget, SpacerWidgetMetadata } from "../widgets/layout/SpacerWidget";

const registry = WidgetRegistry.getInstance();

// Register all 22 Presentational Widgets into Singleton Registry
const widgetsToRegister = [
  { metadata: BarChartWidgetMetadata, component: BarChartWidget },
  { metadata: LineChartWidgetMetadata, component: LineChartWidget },
  { metadata: PieChartWidgetMetadata, component: PieChartWidget },
  { metadata: MetricCardWidgetMetadata, component: MetricCardWidget },
  { metadata: DataTableWidgetMetadata, component: DataTableWidget },
  { metadata: StatGridWidgetMetadata, component: StatGridWidget },
  { metadata: BadgeWidgetMetadata, component: BadgeWidget },
  { metadata: ProgressWidgetMetadata, component: ProgressWidget },
  { metadata: FormContainerWidgetMetadata, component: FormContainerWidget },
  { metadata: ButtonWidgetMetadata, component: ButtonWidget },
  { metadata: InputWidgetMetadata, component: InputWidget },
  { metadata: TextareaWidgetMetadata, component: TextareaWidget },
  { metadata: TextBlockWidgetMetadata, component: TextBlockWidget },
  { metadata: HeroBannerWidgetMetadata, component: HeroBannerWidget },
  { metadata: HeadingWidgetMetadata, component: HeadingWidget },
  { metadata: DividerWidgetMetadata, component: DividerWidget },
  { metadata: ImageWidgetMetadata, component: ImageWidget },
  { metadata: AlertWidgetMetadata, component: AlertWidget },
  { metadata: CardWidgetMetadata, component: CardWidget },
  { metadata: AvatarWidgetMetadata, component: AvatarWidget },
  { metadata: EmptyStateWidgetMetadata, component: EmptyStateWidget },
  { metadata: ContainerWidgetMetadata, component: ContainerWidget },
  { metadata: SectionWidgetMetadata, component: SectionWidget },
  { metadata: SpacerWidgetMetadata, component: SpacerWidget },
];

widgetsToRegister.forEach((entry) => registry.register(entry));

interface WidgetFactoryProps {
  node: WidgetASTNode;
  onWidgetEvent?: (event: WidgetEvent) => void;
  children?: React.ReactNode;
}

/**
 * WidgetFactory - Resolves widget type from Registry, applies defaults, and returns memoized React element.
 */
export const WidgetFactory = memo(function WidgetFactory({
  node,
  onWidgetEvent,
  children,
}: WidgetFactoryProps) {
  const entry = registry.get(node.type);

  if (!entry) {
    return (
      <div className="w-full h-full rounded-2xl bg-amber-500/10 border border-amber-500/30 p-5 space-y-2 backdrop-blur-xl text-amber-700 text-xs flex flex-col justify-center items-center text-center">
        <AlertTriangle size={24} className="text-amber-600" />
        <div className="font-bold text-[var(--text-primary)]">Unknown Widget Type: &quot;{node.type}&quot;</div>
        <div className="text-[10px] text-[var(--text-muted)]">
          The specified widget type is not registered in the WidgetRegistry.
        </div>
      </div>
    );
  }

  const Component = entry.component;
  const mergedProps = {
    id: node.id,
    title: node.props?.title || node.title || entry.metadata.displayName,
    description: node.props?.description || node.description || entry.metadata.description,
    data: node.props?.data ?? entry.metadata.defaultData,
    config: { ...entry.metadata.defaultConfig, ...(node.props?.config ?? {}) },
    onWidgetEvent,
  };

  return <Component {...mergedProps}>{children}</Component>;
});
