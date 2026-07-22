import type { ExtractedRequirements } from "../types/aiGenerator";
import type { LayoutASTConfig } from "../../renderer/schema/astSchema";
import { LayoutPlanner } from "./layoutPlanner";
import { WidgetPlanner } from "./widgetPlanner";
import { ThemePlanner, type ThemeConfig } from "./themePlanner";

export interface PlannedBlueprint {
  title: string;
  description: string;
  themeConfig: ThemeConfig;
  theme: "dark-glass" | "high-contrast-light" | "cyberpunk-neon";
  layout: LayoutASTConfig;
  selectedWidgets: string[];
}

/**
 * ApplicationPlanner - Orchestrates LayoutPlanner, WidgetPlanner, and ThemePlanner.
 * Emits NO UI code (zero React, JSX, HTML, or CSS). Only structured blueprint metadata.
 */
export class ApplicationPlanner {
  public static plan(requirements: ExtractedRequirements): PlannedBlueprint {
    const layout = LayoutPlanner.selectLayout(requirements);
    const selectedWidgets = WidgetPlanner.selectWidgets(requirements);
    const themeConfig = ThemePlanner.selectTheme(requirements);

    return {
      title: requirements.title,
      description: requirements.description,
      themeConfig,
      theme: themeConfig.theme,
      layout,
      selectedWidgets,
    };
  }
}
