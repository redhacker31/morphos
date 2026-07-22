import type { CollaborationDiagnostics } from "../types/collaboration";

/**
 * CollaborationDiagnosticsEngine - Monitors peer connection health, sync latency, and conflict statistics.
 */
export class CollaborationDiagnosticsEngine {
  public static getDiagnostics(
    sessionId: string,
    connectedPeerCount: number,
    totalPatchesSynced: number,
    conflictCount: number,
    failedPatchesCount: number = 0,
    syncLatencyMs: number = 12
  ): CollaborationDiagnostics {
    let connectionHealth: "excellent" | "good" | "degraded" | "disconnected" = "excellent";

    if (connectedPeerCount === 0) {
      connectionHealth = "disconnected";
    } else if (syncLatencyMs > 150 || failedPatchesCount > 5) {
      connectionHealth = "degraded";
    } else if (syncLatencyMs > 50) {
      connectionHealth = "good";
    }

    return {
      sessionId,
      connectedPeerCount,
      syncLatencyMs,
      totalPatchesSynced,
      conflictCount,
      failedPatchesCount,
      connectionHealth,
      patchThroughputPerSec: Number((totalPatchesSynced / Math.max(1, syncLatencyMs / 1000)).toFixed(1)),
    };
  }
}
