import type { ExtractedRequirements } from "../types/aiGenerator";

/**
 * WidgetPlanner - Selects presentational widgets exclusively from Widget Registry.
 */
export class WidgetPlanner {
  // Allowed widget types from WidgetRegistry
  public static ALLOWED_WIDGETS = [
    "hero-banner",
    "metric-card",
    "stat-grid",
    "bar-chart",
    "line-chart",
    "pie-chart",
    "data-table",
    "form-container",
    "input",
    "button",
    "alert",
    "progress",
    "badge",
    "container",
    "empty-state",
  ] as const;

  public static selectWidgets(requirements: ExtractedRequirements): string[] {
    const selected: string[] = ["hero-banner"];

    if (requirements.hasMetrics) {
      selected.push("metric-card", "metric-card");
    }

    if (requirements.hasCharts) {
      selected.push("bar-chart", "line-chart");
    } else {
      selected.push("bar-chart");
    }

    if (requirements.hasTables) {
      selected.push("data-table");
    }

    if (requirements.hasForms) {
      selected.push("form-container");
    }

    // Filter to ensure all widgets exist in ALLOWED_WIDGETS
    return selected.filter((w) => (WidgetPlanner.ALLOWED_WIDGETS as readonly string[]).includes(w));
  }
}
