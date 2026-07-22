import type { CollaboratorPresence } from "../types/collaboration";

export interface CursorState {
  userId: string;
  name: string;
  color: string;
  x: number;
  y: number;
  selectedNodeId: string | null;
}

/**
 * LiveCursorSelection - Formats and broadcasts cursor positions and node selections across workspace peers.
 */
export class LiveCursorSelection {
  public static getActiveCursors(peers: CollaboratorPresence[]): CursorState[] {
    return peers
      .filter((p) => p.cursor !== null && p.status !== "offline")
      .map((p) => ({
        userId: p.userId,
        name: p.name,
        color: p.color,
        x: p.cursor!.x,
        y: p.cursor!.y,
        selectedNodeId: p.selectedNodeId,
      }));
  }

  public static getSelectedNodeMap(peers: CollaboratorPresence[]): Map<string, CollaboratorPresence[]> {
    const map = new Map<string, CollaboratorPresence[]>();
    for (const peer of peers) {
      if (peer.selectedNodeId) {
        const list = map.get(peer.selectedNodeId) || [];
        list.push(peer);
        map.set(peer.selectedNodeId, list);
      }
    }
    return map;
  }
}
