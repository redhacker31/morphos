import type { ExtractedRequirements } from "../types/aiGenerator";
import type { LayoutASTConfig } from "../../renderer/schema/astSchema";

/**
 * LayoutPlanner - Selects layout strategy based on extracted requirements.
 * Supported layout types: dashboard, grid, flex, sidebar-main, single-column, container.
 */
export class LayoutPlanner {
  public static selectLayout(requirements: ExtractedRequirements): LayoutASTConfig {
    if (requirements.navigation.length > 3 || requirements.domain === "sales-crm" || requirements.domain === "erp-system") {
      return {
        type: "dashboard",
        columns: 12,
        gap: 16,
      };
    }

    if (requirements.hasTables && !requirements.hasCharts) {
      return {
        type: "single-column",
        columns: 12,
        gap: 20,
      };
    }

    return {
      type: "dashboard",
      columns: 12,
      gap: 16,
    };
  }
}
