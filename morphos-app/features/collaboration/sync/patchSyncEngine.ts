import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ASTPatchOperation } from "../../ai-evolution/types/aiEvolution";
import type { SyncMessage } from "../types/collaboration";
import { PatchApplier } from "../../ai-evolution/patcher/patchApplier";
import { PatchValidator } from "../../ai-evolution/patcher/patchValidator";
import { ConflictResolver } from "../conflict/conflictResolver";

export interface SyncResult {
  success: boolean;
  updatedAst: AppASTPayload;
  appliedPatches: ASTPatchOperation[];
  rejectedPatches: ASTPatchOperation[];
  hasConflict: boolean;
}

/**
 * PatchSyncEngine - Synchronizes atomic AST patches across real-time peers.
 * Zero React/HTML/DOM synchronization over the wire. Synchronizes only structured AST operations.
 */
export class PatchSyncEngine {
  public static syncPatches(
    currentAst: AppASTPayload,
    incomingPatches: ASTPatchOperation[],
    concurrentPatches: ASTPatchOperation[] = []
  ): SyncResult {
    // Step 1: Conflict Resolution
    const resolved = ConflictResolver.resolveConflicts(incomingPatches, concurrentPatches, currentAst);

    // Step 2: Validation
    const validPatches = resolved.acceptedPatches.filter(
      (p) => PatchValidator.validatePatch(p, currentAst).isValid
    );

    // Step 3: Patch Application
    const updatedAst = PatchApplier.applyPatches(currentAst, validPatches);

    return {
      success: validPatches.length > 0,
      updatedAst,
      appliedPatches: validPatches,
      rejectedPatches: resolved.rejectedPatches,
      hasConflict: resolved.hasConflict,
    };
  }

  public static createBroadcastMessage(
    sessionId: string,
    senderId: string,
    patches: ASTPatchOperation[],
    baseVersionId: string
  ): SyncMessage {
    return {
      id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sessionId,
      senderId,
      type: "PATCH_BROADCAST",
      timestamp: Date.now(),
      patches,
      baseVersionId,
    };
  }
}
