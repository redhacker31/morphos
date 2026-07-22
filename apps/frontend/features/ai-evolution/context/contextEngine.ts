import type { AppASTPayload, WidgetASTNode } from "../../renderer/schema/astSchema";

export interface ResolvedContext {
  targetNodeId?: string;
  targetNode?: WidgetASTNode;
  referencingPhrase?: string;
  impliedAction?: string;
}

/**
 * ContextEngine - Manages conversational memory during multi-turn editing.
 * Resolves implicit references (e.g., "move it left", "make it bigger", "replace that chart").
 */
export class ContextEngine {
  private history: string[] = [];
  private lastTargetNodeId: string | null = null;

  public recordInteraction(prompt: string, targetNodeId?: string) {
    this.history.push(prompt);
    if (targetNodeId) {
      this.lastTargetNodeId = targetNodeId;
    }
  }

  public resolveReference(prompt: string, ast: AppASTPayload): ResolvedContext {
    const lower = prompt.toLowerCase();
    const nodes = ast.nodes || [];

    // Implicit reference resolution ("move it", "delete it", "make it bigger")
    const isImplicit = lower.includes("it") || lower.includes("that") || lower.includes("this");

    if (isImplicit && this.lastTargetNodeId) {
      const target = nodes.find((n) => n.id === this.lastTargetNodeId);
      if (target) {
        return {
          targetNodeId: target.id,
          targetNode: target,
          referencingPhrase: "last edited node",
        };
      }
    }

    // Keyword based node resolution
    if (lower.includes("chart")) {
      const chartNode = nodes.find((n) => n.type.includes("chart"));
      if (chartNode) {
        return { targetNodeId: chartNode.id, targetNode: chartNode, referencingPhrase: "chart" };
      }
    }

    if (lower.includes("table")) {
      const tableNode = nodes.find((n) => n.type.includes("table"));
      if (tableNode) {
        return { targetNodeId: tableNode.id, targetNode: tableNode, referencingPhrase: "table" };
      }
    }

    if (lower.includes("kpi") || lower.includes("card") || lower.includes("metric")) {
      const metricNode = nodes.find((n) => n.type.includes("metric"));
      if (metricNode) {
        return { targetNodeId: metricNode.id, targetNode: metricNode, referencingPhrase: "metric card" };
      }
    }

    return {
      targetNodeId: nodes[0]?.id,
      targetNode: nodes[0],
      referencingPhrase: "primary widget",
    };
  }
}
