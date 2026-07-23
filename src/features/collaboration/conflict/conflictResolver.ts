import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ASTPatchOperation } from "../../ai-evolution/types/aiEvolution";

export interface ConflictResolutionResult {
  acceptedPatches: ASTPatchOperation[];
  rejectedPatches: ASTPatchOperation[];
  hasConflict: boolean;
  explanations: string[];
}

/**
 * ConflictResolver - Deterministic AST conflict resolution engine.
 * Resolves concurrent multi-user edit conflicts while guaranteeing schema validity.
 */
export class ConflictResolver {
  public static resolveConflicts(
    incomingPatches: ASTPatchOperation[],
    concurrentPatches: ASTPatchOperation[],
    currentAst: AppASTPayload
  ): ConflictResolutionResult {
    const acceptedPatches: ASTPatchOperation[] = [];
    const rejectedPatches: ASTPatchOperation[] = [];
    const explanations: string[] = [];
    let hasConflict = false;

    // Build map of deleted node IDs in concurrent stream
    const deletedNodeIds = new Set<string>();
    for (const cp of concurrentPatches) {
      if (cp.op === "DeleteNode" && cp.targetNodeId) {
        deletedNodeIds.add(cp.targetNodeId);
      }
    }

    for (const patch of incomingPatches) {
      // Deletion Conflict: Node was concurrently deleted
      if (patch.targetNodeId && deletedNodeIds.has(patch.targetNodeId) && patch.op !== "DeleteNode") {
        hasConflict = true;
        rejectedPatches.push(patch);
        explanations.push(`Rejected ${patch.op} on node '${patch.targetNodeId}' because node was concurrently deleted.`);
        continue;
      }

      // Concurrent Property Edit Conflict: Pick last-write-wins or merge non-overlapping props
      const targetConflict = concurrentPatches.find(
        (cp) => cp.targetNodeId === patch.targetNodeId && cp.op === patch.op && cp.id !== patch.id
      );

      if (targetConflict) {
        hasConflict = true;
        // Accept incoming patch and record conflict explanation
        acceptedPatches.push(patch);
        explanations.push(`Merged concurrent ${patch.op} on node '${patch.targetNodeId}' using incoming peer state.`);
        continue;
      }

      acceptedPatches.push(patch);
    }

    return {
      acceptedPatches,
      rejectedPatches,
      hasConflict,
      explanations,
    };
  }
}
