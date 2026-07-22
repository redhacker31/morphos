import type { AppASTPayload, WidgetASTNode } from "../../renderer/schema/astSchema";
import type { ASTPatchOperation } from "../types/aiEvolution";
import type { RecognizedIntent } from "../intent/intentRecognizer";
import type { ResolvedContext } from "../context/contextEngine";

export interface DiffPlan {
  intent: RecognizedIntent;
  targetNodeId?: string;
  proposedPatches: ASTPatchOperation[];
}

/**
 * ASTDiffPlanner - Plans minimal AST modifications.
 * Never regenerates entire AST; only calculates targeted delta operations.
 */
export class ASTDiffPlanner {
  public static planDiff(
    prompt: string,
    ast: AppASTPayload,
    intent: RecognizedIntent,
    context: ResolvedContext
  ): DiffPlan {
    const lower = prompt.toLowerCase();
    const nodes = ast.nodes || [];
    const proposedPatches: ASTPatchOperation[] = [];

    if (intent.operation === "update-theme") {
      let newTheme = "dark-glass";
      if (lower.includes("cyberpunk") || lower.includes("neon")) {
        newTheme = "cyberpunk-neon";
      } else if (lower.includes("light") || lower.includes("contrast")) {
        newTheme = "high-contrast-light";
      }

      proposedPatches.push({
        id: crypto.randomUUID(),
        op: "UpdateTheme",
        newTheme,
        description: `Switch application visual theme profile to '${newTheme}'`,
      });
    } else if (intent.operation === "update-layout") {
      let layoutType: "grid" | "flex" | "sidebar-main" | "single-column" | "dashboard" | "container" = "sidebar-main";
      if (lower.includes("grid")) layoutType = "grid";
      if (lower.includes("flex")) layoutType = "flex";
      if (lower.includes("single") || lower.includes("column")) layoutType = "single-column";

      proposedPatches.push({
        id: crypto.randomUUID(),
        op: "UpdateLayout",
        newLayout: { type: layoutType, columns: 12, gap: 16 },
        description: `Change structural layout strategy to '${layoutType}'`,
      });
    } else if (intent.operation === "move-node") {
      // Find candidate nodes to move (e.g. KPI cards, charts)
      const targetNode = nodes.find((n) => n.type === "metric-card" || n.type === "stat-grid") || nodes[0];
      if (targetNode) {
        proposedPatches.push({
          id: crypto.randomUUID(),
          op: "MoveNode",
          targetNodeId: targetNode.id,
          position: 0, // Move to top
          gridPosition: { x: 0, y: 0, w: 12, h: 2 },
          description: `Move '${targetNode.props?.title || targetNode.type}' to top of application layout`,
        });
      }
    } else if (intent.operation === "replace-widget") {
      // Match specific node based on keywords (e.g. "pie", "bar", "chart")
      let targetNode = nodes.find((n) => lower.includes("pie") && n.type.includes("pie"));
      if (!targetNode) {
        targetNode = nodes.find((n) => n.type.includes("chart")) || nodes[0];
      }

      if (targetNode) {
        let replacementType = "line-chart";
        if (lower.includes("bar chart") || lower.includes("to a bar")) replacementType = "bar-chart";
        else if (lower.includes("line chart")) replacementType = "line-chart";
        else if (lower.includes("pie chart")) replacementType = "pie-chart";

        proposedPatches.push({
          id: crypto.randomUUID(),
          op: "ReplaceWidget",
          targetNodeId: targetNode.id,
          replacementWidgetType: replacementType,
          description: `Replace '${targetNode.type}' with '${replacementType}'`,
        });
      }
    } else if (intent.operation === "insert-node") {
      let insertType = "data-table";
      let title = "Customer Records";

      if (lower.includes("table")) {
        insertType = "data-table";
        title = "Customer Records Table";
      } else if (lower.includes("chart")) {
        insertType = "line-chart";
        title = "Revenue Trend Graph";
      } else if (lower.includes("metric") || lower.includes("kpi")) {
        insertType = "metric-card";
        title = "Key Performance Metric";
      }

      const newNode: WidgetASTNode = {
        id: crypto.randomUUID(),
        type: insertType,
        title,
        gridPosition: { x: 0, y: 6, w: 12, h: 4 },
        props: {
          title,
          description: "Inserted dynamically by AI Evolution Engine",
          config: {},
        },
      };

      proposedPatches.push({
        id: crypto.randomUUID(),
        op: "InsertNode",
        node: newNode,
        position: nodes.length,
        description: `Insert new '${insertType}' widget '${title}' into workspace`,
      });
    } else if (intent.operation === "delete-node") {
      const nodeToDelete = context.targetNode || nodes[nodes.length - 1];
      if (nodeToDelete) {
        proposedPatches.push({
          id: crypto.randomUUID(),
          op: "DeleteNode",
          targetNodeId: nodeToDelete.id,
          description: `Delete widget '${nodeToDelete.props?.title || nodeToDelete.id}' from application`,
        });
      }
    } else {
      // Default: UpdateProps
      const nodeToUpdate = context.targetNode || nodes[0];
      if (nodeToUpdate) {
        proposedPatches.push({
          id: crypto.randomUUID(),
          op: "UpdateProps",
          targetNodeId: nodeToUpdate.id,
          props: {
            title: nodeToUpdate.props?.title ? `${nodeToUpdate.props.title} (Updated)` : "Updated Widget",
          },
          description: `Update properties for widget '${nodeToUpdate.id}'`,
        });
      }
    }

    return {
      intent,
      targetNodeId: context.targetNodeId,
      proposedPatches,
    };
  }
}
