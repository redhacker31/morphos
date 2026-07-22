export { SessionManager } from "./session/sessionManager";
export { PresenceEngine } from "./presence/presenceEngine";
export { LiveCursorSelection } from "./presence/liveCursorSelection";
export { PatchSyncEngine } from "./sync/patchSyncEngine";
export { ConflictResolver } from "./conflict/conflictResolver";
export { CommentsEngine } from "./comments/commentsEngine";
export { ActivityTimeline } from "./timeline/activityTimeline";
export { PermissionsLayer } from "./permissions/permissionsLayer";
export { CollaborationDiagnosticsEngine } from "./diagnostics/collaborationDiagnostics";
export { useCollaboration } from "./hooks/useCollaboration";

export type {
  CollaboratorRole,
  CollaboratorPresence,
  NodeComment,
  SyncMessageType,
  SyncMessage,
  ActivityEvent,
  CollaborationDiagnostics,
} from "./types/collaboration";
