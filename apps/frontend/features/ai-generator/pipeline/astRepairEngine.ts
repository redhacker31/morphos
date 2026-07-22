import { ASTValidator } from "../../renderer/schema/astValidator";
import { ASTNormalizer } from "../../renderer/schema/astNormalizer";
import type { AppASTPayload } from "../../renderer/schema/astSchema";

export interface RepairResult {
  success: boolean;
  ast: AppASTPayload | null;
  repaired: boolean;
  attempts: number;
  errors: string[];
}

/**
 * ASTRepairEngine - Auto-Repair Engine for Malformed AST Payloads.
 * Diagnoses Zod schema validation errors, repairs incomplete nodes, and re-validates up to configurable retry attempts.
 */
export class ASTRepairEngine {
  private static DEFAULT_MAX_RETRIES = 3;

  public static repair(rawAst: unknown, maxRetries: number = ASTRepairEngine.DEFAULT_MAX_RETRIES): RepairResult {
    let currentAst = rawAst;
    let attempts = 0;

    while (attempts < maxRetries) {
      attempts++;
      const val = ASTValidator.validate(currentAst);

      if (val.isValid && val.data) {
        return {
          success: true,
          ast: val.data,
          repaired: attempts > 1,
          attempts,
          errors: [],
        };
      }

      // Auto-repair step using ASTNormalizer
      if (typeof currentAst === "object" && currentAst !== null) {
        try {
          const existingNodes = (currentAst as any).nodes || [];
          // Ensure at least 1 node exists (Zod schema requires nodes.min(1))
          const repairedNodes = existingNodes.length > 0 ? existingNodes : [
            {
              id: crypto.randomUUID(),
              type: "empty-state",
              gridPosition: { x: 0, y: 0, w: 12, h: 4 },
              props: {
                title: "Empty Application",
                description: "This application was auto-repaired. Add widgets to get started.",
              },
            },
          ];
          const patchedAst: any = {
            version: (currentAst as any).version || "1.0.0",
            meta: {
              title: (currentAst as any).meta?.title || "Repaired Application",
              description: (currentAst as any).meta?.description || "Auto-repaired by AST Repair Engine",
              theme: (currentAst as any).meta?.theme || "dark-glass",
            },
            layout: (currentAst as any).layout || { type: "dashboard", columns: 12, gap: 16 },
            nodes: repairedNodes,
          };
          currentAst = ASTNormalizer.normalize(patchedAst);
        } catch {
          break;
        }
      } else {
        break;
      }
    }

    const finalVal = ASTValidator.validate(currentAst);
    return {
      success: finalVal.isValid,
      ast: finalVal.data,
      repaired: attempts > 1,
      attempts,
      errors: finalVal.errors,
    };
  }
}
