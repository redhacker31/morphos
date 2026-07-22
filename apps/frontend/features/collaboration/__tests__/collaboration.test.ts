import { SessionManager } from "../session/sessionManager";
import { PresenceEngine } from "../presence/presenceEngine";
import { LiveCursorSelection } from "../presence/liveCursorSelection";
import { PatchSyncEngine } from "../sync/patchSyncEngine";
import { ConflictResolver } from "../conflict/conflictResolver";
import { CommentsEngine } from "../comments/commentsEngine";
import { ActivityTimeline } from "../timeline/activityTimeline";
import { PermissionsLayer } from "../permissions/permissionsLayer";
import { CollaborationDiagnosticsEngine } from "../diagnostics/collaborationDiagnostics";
import { SALES_CRM_AST } from "../../renderer/samples/salesCrmAst";
import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ASTPatchOperation } from "../../ai-evolution/types/aiEvolution";

export async function runCollaborationTestSuite(): Promise<{ passed: boolean; testCount: number; failures: string[] }> {
  const failures: string[] = [];
  let testCount = 0;

  function assert(condition: boolean, testName: string) {
    testCount++;
    if (!condition) {
      failures.push(`Assertion failed in: ${testName}`);
    }
  }

  const baseAst: AppASTPayload = JSON.parse(JSON.stringify(SALES_CRM_AST));

  // Test 1: SessionManager & PresenceEngine
  const sessionMgr = new SessionManager();
  sessionMgr.createSession("sess-1", "ws-1", baseAst);

  const peer1 = sessionMgr.joinSession("sess-1", "user-1", "Alice", "Owner");
  const peer2 = sessionMgr.joinSession("sess-1", "user-2", "Bob", "Editor");

  assert(peer1 !== null && peer2 !== null, "SessionManager peer joining");
  assert(sessionMgr.getPeers("sess-1").length === 2, "SessionManager active peer count check");

  // Test 2: PresenceEngine Cursor & Selection
  if (peer1) {
    const updated1 = PresenceEngine.updateCursor(peer1, 150, 300);
    assert(updated1.cursor?.x === 150 && updated1.cursor?.y === 300, "PresenceEngine cursor update");

    const selected1 = PresenceEngine.updateSelection(peer1, "a1b2c3d4-e5f6-4a5b-8c9d-111111111111");
    assert(selected1.selectedNodeId === "a1b2c3d4-e5f6-4a5b-8c9d-111111111111", "PresenceEngine selection update");
  }

  // Test 3: LiveCursorSelection
  const activePeers = sessionMgr.getPeers("sess-1");
  const nodeMap = LiveCursorSelection.getSelectedNodeMap(activePeers);
  assert(nodeMap !== undefined, "LiveCursorSelection node map generation");

  // Test 4: PatchSyncEngine & AST Patch Sync
  const patchTheme: ASTPatchOperation = {
    id: "p1",
    op: "UpdateTheme",
    newTheme: "cyberpunk-neon",
    description: "Switch theme to Cyberpunk Neon",
  };

  const syncRes = PatchSyncEngine.syncPatches(baseAst, [patchTheme]);
  assert(syncRes.success === true, "PatchSyncEngine sync execution success");
  assert(syncRes.updatedAst.meta.theme === "cyberpunk-neon", "PatchSyncEngine AST theme mutation");

  // Test 5: ConflictResolver (Concurrent Deletion vs Update)
  const incomingPatch: ASTPatchOperation = {
    id: "p2",
    op: "UpdateProps",
    targetNodeId: "a1b2c3d4-e5f6-4a5b-8c9d-222222222222",
    props: { title: "New Title" },
    description: "Update metric card title",
  };

  const concurrentDelete: ASTPatchOperation = {
    id: "p3",
    op: "DeleteNode",
    targetNodeId: "a1b2c3d4-e5f6-4a5b-8c9d-222222222222",
    description: "Delete metric card",
  };

  const conflictRes = ConflictResolver.resolveConflicts([incomingPatch], [concurrentDelete], baseAst);
  assert(conflictRes.hasConflict === true, "ConflictResolver conflict detection");
  assert(conflictRes.rejectedPatches.length === 1, "ConflictResolver rejected patch check");

  // Test 6: CommentsEngine
  const commentsEngine = new CommentsEngine();
  const cmt = commentsEngine.addComment("a1b2c3d4-e5f6-4a5b-8c9d-111111111111", "user-1", "Alice", "Looks great!");
  assert(cmt.id !== undefined, "CommentsEngine addComment");

  const replied = commentsEngine.replyToComment(cmt.id, "user-2", "Bob", "Thanks!");
  assert(replied === true, "CommentsEngine replyToComment");

  const resolved = commentsEngine.resolveComment(cmt.id);
  assert(resolved === true, "CommentsEngine resolveComment");

  // Test 7: ActivityTimeline
  const timeline = new ActivityTimeline();
  timeline.logEvent("sess-1", "user-1", "Alice", "patch_applied", "Theme updated to cyberpunk");
  assert(timeline.getEvents("sess-1").length === 1, "ActivityTimeline event logging");

  // Test 8: PermissionsLayer
  const permOwner = PermissionsLayer.canApplyPatch("Owner");
  const permViewer = PermissionsLayer.canApplyPatch("Viewer");
  assert(permOwner.allowed === true, "PermissionsLayer Owner edit allowed");
  assert(permViewer.allowed === false, "PermissionsLayer Viewer edit blocked");

  // Test 9: CollaborationDiagnosticsEngine
  const diag = CollaborationDiagnosticsEngine.getDiagnostics("sess-1", 2, 10, 1);
  assert(diag.connectionHealth === "excellent", "CollaborationDiagnosticsEngine connection health check");

  return {
    passed: failures.length === 0,
    testCount,
    failures,
  };
}
