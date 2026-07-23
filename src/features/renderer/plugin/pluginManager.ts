import { WidgetRegistry } from "../registry/widgetRegistry";
import type { WidgetRegistryEntry, ThemeTokens } from "../types/renderer";
import { THEME_PRESETS } from "../theme/themePresets";

export interface MorphOSPlugin {
  id: string;
  name: string;
  version: string;
  type: "widget" | "theme" | "layout";
  register: () => void;
}

/**
 * PluginManager - Manages registration of external widget packs and theme extensions.
 */
export class PluginManager {
  private static plugins = new Map<string, MorphOSPlugin>();

  public static registerWidgetPlugin(entry: WidgetRegistryEntry): void {
    WidgetRegistry.getInstance().register(entry);
  }

  public static registerThemePlugin(theme: ThemeTokens): void {
    THEME_PRESETS[theme.id] = theme;
  }

  public static listPlugins(): MorphOSPlugin[] {
    return Array.from(PluginManager.plugins.values());
  }
}
