import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ASTPatchOperation } from "../../ai-evolution/types/aiEvolution";

/**
 * Collaboration Permission Roles
 */
export type CollaboratorRole = "Owner" | "Editor" | "Reviewer" | "Viewer";

/**
 * Collaborator Presence State
 */
export interface CollaboratorPresence {
  userId: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  color: string;
  role: CollaboratorRole;
  currentWorkspaceId: string;
  selectedNodeId: string | null;
  cursor: { x: number; y: number } | null;
  status: "active" | "idle" | "editing" | "offline";
  lastActiveTimestamp: number;
}

/**
 * Node Comment & Review Thread
 */
export interface NodeComment {
  id: string;
  nodeId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  resolved: boolean;
  replies: Array<{
    id: string;
    authorId: string;
    authorName: string;
    content: string;
    timestamp: string;
  }>;
}

/**
 * Real-Time Sync Message Payload
 */
export type SyncMessageType =
  | "PRESENCE_UPDATE"
  | "PATCH_BROADCAST"
  | "PATCH_ACK"
  | "CONFLICT_RESOLVED"
  | "COMMENT_ADDED"
  | "COMMENT_RESOLVED"
  | "CURSOR_MOVE"
  | "SELECTION_CHANGE";

export interface SyncMessage {
  id: string;
  sessionId: string;
  senderId: string;
  type: SyncMessageType;
  timestamp: number;
  presence?: CollaboratorPresence;
  patches?: ASTPatchOperation[];
  baseVersionId?: string;
  comment?: NodeComment;
  cursor?: { x: number; y: number };
  selectedNodeId?: string | null;
}

/**
 * Timeline Activity Event Log
 */
export interface ActivityEvent {
  id: string;
  sessionId: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actionType: "patch_applied" | "comment_added" | "user_joined" | "user_left" | "snapshot_restored" | "role_changed";
  description: string;
  metadata?: Record<string, unknown>;
}

/**
 * Collaboration Operational Diagnostics
 */
export interface CollaborationDiagnostics {
  sessionId: string;
  connectedPeerCount: number;
  syncLatencyMs: number;
  totalPatchesSynced: number;
  conflictCount: number;
  failedPatchesCount: number;
  connectionHealth: "excellent" | "good" | "degraded" | "disconnected";
  patchThroughputPerSec: number;
}
