import type { ASTPatchOperation } from "../types/aiEvolution";
import type { DiffPlan } from "../planner/diffPlanner";

/**
 * PatchGenerator - Formats and sanitizes deterministic AST Patch Operations.
 */
export class PatchGenerator {
  public static generatePatches(plan: DiffPlan): ASTPatchOperation[] {
    return plan.proposedPatches.map((patch) => ({
      ...patch,
      id: patch.id || crypto.randomUUID(),
      description: patch.description || `Execute ${patch.op} operation`,
    }));
  }
}
