import { WidgetRegistry } from "../registry/widgetRegistry";
import type { WidgetMetadata } from "../types/renderer";

export function useWidgetRegistry() {
  const registry = WidgetRegistry.getInstance();

  return {
    listWidgets: (): WidgetMetadata[] => registry.list(),
    getWidget: (type: string) => registry.get(type),
    hasWidget: (type: string) => registry.has(type),
  };
}
