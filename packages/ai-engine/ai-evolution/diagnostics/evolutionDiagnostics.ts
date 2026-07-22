import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ASTPatchOperation } from "../types/aiEvolution";

export interface EvolutionDiagnosticsResult {
  warnings: string[];
  suggestions: string[];
  layoutImprovements: string[];
}

/**
 * EvolutionDiagnostics - Inspects AST patches and resulting blueprint for optimization opportunities,
 * layout performance, and accessibility recommendations.
 */
export class EvolutionDiagnostics {
  public static diagnose(ast: AppASTPayload, patches: ASTPatchOperation[]): EvolutionDiagnosticsResult {
    const warnings: string[] = [];
    const suggestions: string[] = [];
    const layoutImprovements: string[] = [];

    const nodeCount = ast.nodes?.length || 0;

    if (nodeCount > 20) {
      warnings.push(`High widget density detected (${nodeCount} widgets). Consider grouping into sub-containers.`);
    }

    if (nodeCount < 2) {
      suggestions.push("Application contains few widgets. Add metric cards or tables for richer data visibility.");
    }

    const hasCharts = ast.nodes?.some((n) => n.type.includes("chart"));
    const hasTables = ast.nodes?.some((n) => n.type.includes("table"));

    if (hasCharts && !hasTables) {
      suggestions.push("Consider adding a data table beneath charts to allow raw data inspection.");
    }

    const theme = ast.meta?.theme;
    if (theme === "dark-glass") {
      layoutImprovements.push("Glassmorphism profile optimal. Ensure contrast ratios meet WCAG AA standards.");
    }

    return {
      warnings,
      suggestions,
      layoutImprovements,
    };
  }
}
