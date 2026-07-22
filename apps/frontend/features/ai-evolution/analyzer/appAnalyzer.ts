import type { AppASTPayload, WidgetASTNode } from "../../renderer/schema/astSchema";
import type { ApplicationAnalysis } from "../types/aiEvolution";

/**
 * ApplicationAnalyzer - Inspects existing AppSchemaAST blueprints.
 * Extracts structural stats, node hierarchy, widget breakdowns, and layout constraints.
 */
export class ApplicationAnalyzer {
  public static analyze(ast: AppASTPayload): ApplicationAnalysis {
    const nodes = ast.nodes || [];
    const widgetTypesPresent = new Set<string>();
    let maxDepth = 1;

    const traverse = (nodeList: WidgetASTNode[], currentDepth: number) => {
      if (currentDepth > maxDepth) maxDepth = currentDepth;
      for (const node of nodeList) {
        widgetTypesPresent.add(node.type);
        if (node.children && node.children.length > 0) {
          traverse(node.children, currentDepth + 1);
        }
      }
    };

    traverse(nodes, 1);

    const widgetTypesArr = Array.from(widgetTypesPresent);
    const hasCharts = widgetTypesArr.some((t) => t.includes("chart"));
    const hasTables = widgetTypesArr.some((t) => t.includes("table"));
    const hasMetrics = widgetTypesArr.some((t) => t.includes("metric") || t.includes("stat"));
    const hasForms = widgetTypesArr.some((t) => t.includes("form") || t.includes("input"));

    const nodesByRole: Record<string, string[]> = {
      hero: nodes.filter((n) => n.type === "hero-banner").map((n) => n.id),
      metrics: nodes.filter((n) => n.type === "metric-card" || n.type === "stat-grid").map((n) => n.id),
      charts: nodes.filter((n) => n.type.includes("chart")).map((n) => n.id),
      tables: nodes.filter((n) => n.type.includes("table")).map((n) => n.id),
      forms: nodes.filter((n) => n.type.includes("form") || n.type.includes("input")).map((n) => n.id),
    };

    return {
      nodeCount: nodes.length,
      layoutType: ast.layout?.type || "dashboard",
      theme: ast.meta?.theme || "dark-glass",
      widgetTypesPresent: widgetTypesArr,
      depth: maxDepth,
      hasCharts,
      hasTables,
      hasMetrics,
      hasForms,
      nodesByRole,
    };
  }
}
