import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { VersionSnapshot } from "../types/aiEvolution";
import { VersionComparer, type VersionDiffSummary } from "../history/versionComparer";

/**
 * SnapshotManager - Manages immutable application version snapshots.
 */
export class SnapshotManager {
  private snapshots: Map<string, VersionSnapshot> = new Map();

  public createSnapshot(name: string, ast: AppASTPayload): VersionSnapshot {
    const id = `snap-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const snapshot: VersionSnapshot = {
      id,
      name,
      timestamp: new Date().toISOString(),
      ast: JSON.parse(JSON.stringify(ast)),
      nodeCount: ast.nodes?.length || 0,
      theme: ast.meta?.theme || "dark-glass",
      layoutType: ast.layout?.type || "dashboard",
    };
    this.snapshots.set(id, snapshot);
    return snapshot;
  }

  public getSnapshot(id: string): VersionSnapshot | undefined {
    return this.snapshots.get(id);
  }

  public listSnapshots(): VersionSnapshot[] {
    return Array.from(this.snapshots.values());
  }

  public restoreSnapshot(id: string): AppASTPayload | null {
    const snap = this.snapshots.get(id);
    return snap ? JSON.parse(JSON.stringify(snap.ast)) : null;
  }

  public compareSnapshots(snapshotIdA: string, snapshotIdB: string): VersionDiffSummary | null {
    const snapA = this.snapshots.get(snapshotIdA);
    const snapB = this.snapshots.get(snapshotIdB);
    if (!snapA || !snapB) return null;

    return VersionComparer.compare(snapA.ast, snapB.ast);
  }
}
