import type { CollaboratorPresence, CollaboratorRole } from "../types/collaboration";

/**
 * PresenceEngine - Tracks connected user status, cursors, selected nodes, and assigns peer colors.
 */
export class PresenceEngine {
  private static USER_COLORS = [
    "#6366f1", // Indigo
    "#ec4899", // Pink
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#8b5cf6", // Purple
    "#06b6d4", // Cyan
    "#ef4444", // Red
    "#14b8a6", // Teal
  ];

  public static createPresence(
    userId: string,
    name: string,
    workspaceId: string,
    role: CollaboratorRole = "Editor"
  ): CollaboratorPresence {
    const colorIndex = Math.abs(PresenceEngine.hashString(userId)) % PresenceEngine.USER_COLORS.length;
    return {
      userId,
      name,
      color: PresenceEngine.USER_COLORS[colorIndex],
      role,
      currentWorkspaceId: workspaceId,
      selectedNodeId: null,
      cursor: null,
      status: "active",
      lastActiveTimestamp: Date.now(),
    };
  }

  public static updateCursor(presence: CollaboratorPresence, x: number, y: number): CollaboratorPresence {
    return {
      ...presence,
      cursor: { x, y },
      status: "active",
      lastActiveTimestamp: Date.now(),
    };
  }

  public static updateSelection(presence: CollaboratorPresence, nodeId: string | null): CollaboratorPresence {
    return {
      ...presence,
      selectedNodeId: nodeId,
      status: nodeId ? "editing" : "active",
      lastActiveTimestamp: Date.now(),
    };
  }

  private static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
}
