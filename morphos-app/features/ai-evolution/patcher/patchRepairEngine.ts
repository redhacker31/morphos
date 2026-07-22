import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ASTPatchOperation } from "../types/aiEvolution";
import { PatchValidator } from "./patchValidator";

export interface PatchRepairResult {
  repairedPatches: ASTPatchOperation[];
  repaired: boolean;
  success: boolean;
  errors: string[];
}

/**
 * PatchRepairEngine - Auto-repair engine for malformed AST patch operations.
 * Resolves missing target IDs, replaces invalid widget types, and fixes positions.
 */
export class PatchRepairEngine {
  private static ALLOWED_WIDGET_TYPES = [
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
  ];

  public static repairPatches(patches: ASTPatchOperation[], currentAst: AppASTPayload): PatchRepairResult {
    let repaired = false;
    const nodes = currentAst.nodes || [];
    const fallbackTargetId = nodes[0]?.id;

    const repairedPatches: ASTPatchOperation[] = patches.map((patch) => {
      let currentPatch = { ...patch };

      // Repair missing or invalid targetNodeId
      if (
        (currentPatch.op === "DeleteNode" ||
          currentPatch.op === "MoveNode" ||
          currentPatch.op === "UpdateProps" ||
          currentPatch.op === "ReplaceWidget") &&
        (!currentPatch.targetNodeId || !nodes.some((n) => n.id === currentPatch.targetNodeId))
      ) {
        if (fallbackTargetId) {
          currentPatch.targetNodeId = fallbackTargetId;
          repaired = true;
        }
      }

      // Repair invalid replacement widget type
      if (
        currentPatch.op === "ReplaceWidget" &&
        (!currentPatch.replacementWidgetType ||
          !PatchRepairEngine.ALLOWED_WIDGET_TYPES.includes(currentPatch.replacementWidgetType))
      ) {
        currentPatch.replacementWidgetType = "bar-chart";
        repaired = true;
      }

      // Repair inserted node missing ID or invalid type
      if (currentPatch.op === "InsertNode" && currentPatch.node) {
        if (!currentPatch.node.id) {
          currentPatch.node = {
            ...currentPatch.node,
            id: crypto.randomUUID(),
          };
          repaired = true;
        }
        if (!PatchRepairEngine.ALLOWED_WIDGET_TYPES.includes(currentPatch.node.type)) {
          currentPatch.node = {
            ...currentPatch.node,
            type: "data-table",
          };
          repaired = true;
        }
      }

      return currentPatch;
    });

    const validation = PatchValidator.validateAll(repairedPatches, currentAst);

    return {
      repairedPatches,
      repaired,
      success: validation.isValid,
      errors: validation.errors,
    };
  }
}
