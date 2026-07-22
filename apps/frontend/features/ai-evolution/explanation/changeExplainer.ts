import type { ASTPatchOperation } from "../types/aiEvolution";

/**
 * ChangeExplainer - Generates human-readable explanations of applied AST patches.
 * e.g., "You asked to replace KPI cards with a trend chart. The AI: Removed 4 Metric Cards, Inserted Line Chart..."
 */
export class ChangeExplainer {
  public static explainChanges(prompt: string, patches: ASTPatchOperation[]): string[] {
    const explanations: string[] = [`Analyzed request: "${prompt}"`];

    for (const patch of patches) {
      if (patch.op === "UpdateTheme") {
        explanations.push(`Switched visual theme profile to '${patch.newTheme}'`);
      } else if (patch.op === "UpdateLayout") {
        explanations.push(`Changed layout strategy to '${patch.newLayout?.type}' (${patch.newLayout?.columns} columns)`);
      } else if (patch.op === "InsertNode") {
        explanations.push(`Inserted new '${patch.node?.type}' widget: '${patch.node?.title || patch.node?.props?.title}'`);
      } else if (patch.op === "DeleteNode") {
        explanations.push(`Removed target widget '${patch.targetNodeId}' from workspace`);
      } else if (patch.op === "MoveNode") {
        explanations.push(`Reordered target widget '${patch.targetNodeId}' to specified grid position`);
      } else if (patch.op === "ReplaceWidget") {
        explanations.push(`Replaced widget '${patch.targetNodeId}' with new type '${patch.replacementWidgetType}'`);
      } else if (patch.op === "UpdateProps") {
        explanations.push(`Updated widget properties for target '${patch.targetNodeId}'`);
      } else if (patch.op === "RenameNode") {
        explanations.push(`Renamed widget to '${patch.newTitle}'`);
      }
    }

    if (explanations.length === 1) {
      explanations.push("Applied minimal property updates to target node");
    }

    return explanations;
  }
}
