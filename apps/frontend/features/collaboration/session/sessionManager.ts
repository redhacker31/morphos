import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { CollaboratorPresence, CollaboratorRole } from "../types/collaboration";
import { PresenceEngine } from "../presence/presenceEngine";

export interface CollaborationSession {
  sessionId: string;
  workspaceId: string;
  createdTimestamp: number;
  ast: AppASTPayload;
  peers: Map<string, CollaboratorPresence>;
}

/**
 * SessionManager - Manages real-time multi-user collaboration sessions.
 * Supports creating, joining, leaving, reconnecting, and restoring shared sessions.
 */
export class SessionManager {
  private activeSessions: Map<string, CollaborationSession> = new Map();

  public createSession(sessionId: string, workspaceId: string, initialAst: AppASTPayload): CollaborationSession {
    const session: CollaborationSession = {
      sessionId,
      workspaceId,
      createdTimestamp: Date.now(),
      ast: JSON.parse(JSON.stringify(initialAst)),
      peers: new Map(),
    };
    this.activeSessions.set(sessionId, session);
    return session;
  }

  public getSession(sessionId: string): CollaborationSession | undefined {
    return this.activeSessions.get(sessionId);
  }

  public joinSession(
    sessionId: string,
    userId: string,
    name: string,
    role: CollaboratorRole = "Editor"
  ): CollaboratorPresence | null {
    const session = this.activeSessions.get(sessionId);
    if (!session) return null;

    const presence = PresenceEngine.createPresence(userId, name, session.workspaceId, role);
    session.peers.set(userId, presence);
    return presence;
  }

  public leaveSession(sessionId: string, userId: string): boolean {
    const session = this.activeSessions.get(sessionId);
    if (!session) return false;
    return session.peers.delete(userId);
  }

  public getPeers(sessionId: string): CollaboratorPresence[] {
    const session = this.activeSessions.get(sessionId);
    return session ? Array.from(session.peers.values()) : [];
  }

  public updateSessionAst(sessionId: string, ast: AppASTPayload): void {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      session.ast = JSON.parse(JSON.stringify(ast));
    }
  }
}
