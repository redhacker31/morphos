
import { useState, useCallback } from "react";
import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ASTPatchOperation } from "../../ai-evolution/types/aiEvolution";
import type { CollaboratorPresence, CollaboratorRole, NodeComment } from "../types/collaboration";
import { SessionManager } from "../session/sessionManager";
import { PresenceEngine } from "../presence/presenceEngine";
import { LiveCursorSelection } from "../presence/liveCursorSelection";
import { PatchSyncEngine } from "../sync/patchSyncEngine";
import { CommentsEngine } from "../comments/commentsEngine";
import { ActivityTimeline } from "../timeline/activityTimeline";
import { PermissionsLayer } from "../permissions/permissionsLayer";
import { CollaborationDiagnosticsEngine } from "../diagnostics/collaborationDiagnostics";

export interface UseCollaborationOptions {
  sessionId: string;
  workspaceId: string;
  userId: string;
  userName: string;
  role?: CollaboratorRole;
  initialAst: AppASTPayload;
}

/**
 * useCollaboration - React Hook for Workspace Studio Real-Time Collaboration.
 * Exposes multi-user session management, presence, live cursors, AST patch sync, comments, and permissions.
 */
export function useCollaboration({
  sessionId,
  workspaceId,
  userId,
  userName,
  role = "Editor",
  initialAst,
}: UseCollaborationOptions) {
  const [sessionManager] = useState(() => {
    const mgr = new SessionManager();
    mgr.createSession(sessionId, workspaceId, initialAst);
    return mgr;
  });

  const [commentsEngine] = useState(() => new CommentsEngine());
  const [timeline] = useState(() => new ActivityTimeline());
  const [activeAst, setActiveAst] = useState<AppASTPayload>(initialAst);
  const [myPresence, setMyPresence] = useState<CollaboratorPresence>(() => {
    return sessionManager.joinSession(sessionId, userId, userName, role)!;
  });

  const [peers, setPeers] = useState<CollaboratorPresence[]>(() => sessionManager.getPeers(sessionId));
  const [conflictCount, setConflictCount] = useState(0);
  const [totalPatchesSynced, setTotalPatchesSynced] = useState(0);

  // Broadcast and apply local AST patches
  const applyAndBroadcastPatches = useCallback(
    (patches: ASTPatchOperation[]): { success: boolean; reason?: string } => {
      const perm = PermissionsLayer.canApplyPatch(myPresence.role);
      if (!perm.allowed) {
        return { success: false, reason: perm.reason };
      }

      const syncRes = PatchSyncEngine.syncPatches(activeAst, patches);
      if (syncRes.success) {
        setActiveAst(syncRes.updatedAst);
        sessionManager.updateSessionAst(sessionId, syncRes.updatedAst);
        setTotalPatchesSynced((prev) => prev + patches.length);
        if (syncRes.hasConflict) {
          setConflictCount((prev) => prev + 1);
        }
        timeline.logEvent(
          sessionId,
          userId,
          userName,
          "patch_applied",
          `Applied ${patches.length} AST patches collaboratively`
        );
        return { success: true };
      }
      return { success: false, reason: "Patch sync validation failed" };
    },
    [activeAst, myPresence.role, sessionId, sessionManager, timeline, userId, userName]
  );

  // Update cursor coordinates
  const updateCursor = useCallback(
    (x: number, y: number) => {
      const updated = PresenceEngine.updateCursor(myPresence, x, y);
      setMyPresence(updated);
    },
    [myPresence]
  );

  // Update selected widget node
  const updateSelection = useCallback(
    (nodeId: string | null) => {
      const updated = PresenceEngine.updateSelection(myPresence, nodeId);
      setMyPresence(updated);
    },
    [myPresence]
  );

  // Add review comment
  const addComment = useCallback(
    (nodeId: string, content: string): NodeComment | null => {
      const perm = PermissionsLayer.canAddComment(myPresence.role);
      if (!perm.allowed) return null;

      const comment = commentsEngine.addComment(nodeId, userId, userName, content);
      timeline.logEvent(sessionId, userId, userName, "comment_added", `Added comment on node '${nodeId}'`);
      return comment;
    },
    [commentsEngine, myPresence.role, sessionId, timeline, userId, userName]
  );

  const diagnostics = CollaborationDiagnosticsEngine.getDiagnostics(
    sessionId,
    peers.length,
    totalPatchesSynced,
    conflictCount
  );

  return {
    activeAst,
    myPresence,
    peers,
    activeCursors: LiveCursorSelection.getActiveCursors(peers),
    selectedNodeMap: LiveCursorSelection.getSelectedNodeMap(peers),
    applyAndBroadcastPatches,
    updateCursor,
    updateSelection,
    addComment,
    getCommentsForNode: (nodeId: string) => commentsEngine.getCommentsForNode(nodeId),
    activityLogs: timeline.getEvents(sessionId),
    diagnostics,
    setActiveAst,
  };
}
