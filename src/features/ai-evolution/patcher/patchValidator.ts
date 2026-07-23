import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ASTPatchOperation } from "../types/aiEvolution";

export interface PatchValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * PatchValidator - Validates proposed AST patch operations against schema, widget registry, and tree references.
 */
export class PatchValidator {
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

  public static validatePatch(patch: ASTPatchOperation, currentAst: AppASTPayload): PatchValidationResult {
    const errors: string[] = [];
    const nodes = currentAst.nodes || [];

    if (patch.op === "DeleteNode" || patch.op === "MoveNode" || patch.op === "UpdateProps" || patch.op === "ReplaceWidget") {
      if (!patch.targetNodeId) {
        errors.push(`Patch '${patch.op}' missing targetNodeId`);
      } else {
        const targetExists = nodes.some((n) => n.id === patch.targetNodeId);
        if (!targetExists) {
          errors.push(`Target node ID '${patch.targetNodeId}' not found in current AST`);
        }
      }
    }

    if (patch.op === "ReplaceWidget" && patch.replacementWidgetType) {
      if (!PatchValidator.ALLOWED_WIDGET_TYPES.includes(patch.replacementWidgetType)) {
        errors.push(`Replacement widget type '${patch.replacementWidgetType}' not in Widget Registry`);
      }
    }

    if (patch.op === "InsertNode" && patch.node) {
      if (!PatchValidator.ALLOWED_WIDGET_TYPES.includes(patch.node.type)) {
        errors.push(`Inserted widget type '${patch.node.type}' not in Widget Registry`);
      }
      if (!patch.node.id) {
        errors.push("Inserted node missing required UUID");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  public static validateAll(patches: ASTPatchOperation[], currentAst: AppASTPayload): PatchValidationResult {
    const allErrors: string[] = [];
    for (const patch of patches) {
      const res = PatchValidator.validatePatch(patch, currentAst);
      if (!res.isValid) {
        allErrors.push(...res.errors);
      }
    }
    return {
      isValid: allErrors.length === 0,
      errors: allErrors,
    };
  }
}
