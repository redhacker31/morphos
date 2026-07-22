"use client";

import { useState } from "react";
import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { AIEvolutionResult, HistoryEntry, VersionSnapshot } from "../types/aiEvolution";
import { EvolutionPipeline } from "../pipeline/evolutionPipeline";
import { HistoryManager } from "../history/historyManager";
import { UndoRedoEngine } from "../history/undoRedoEngine";
import { SnapshotManager } from "../snapshots/snapshotManager";
import { ContextEngine } from "../context/contextEngine";

/**
 * useAIEvolution - React Hook for Workspace Studio AST Evolution & Editing.
 * Provides evolution execution, multi-step undo/redo, version history, and snapshot management.
 */
export function useAIEvolution(initialAst: AppASTPayload) {
  const [activeAst, setActiveAst] = useState<AppASTPayload>(initialAst);
  const [isEvolving, setIsEvolving] = useState(false);
  const [lastResult, setLastResult] = useState<AIEvolutionResult | null>(null);

  const [historyManager] = useState(() => new HistoryManager(initialAst));
  const [undoRedoEngine] = useState(() => new UndoRedoEngine(initialAst));
  const [snapshotManager] = useState(() => new SnapshotManager());
  const [contextEngine] = useState(() => new ContextEngine());

  const evolve = async (promptText: string): Promise<AIEvolutionResult> => {
    setIsEvolving(true);
    const result = await EvolutionPipeline.evolve(promptText, activeAst, { contextEngine });

    setLastResult(result);
    if (result.success && result.updatedAst) {
      setActiveAst(result.updatedAst);
      undoRedoEngine.pushState(result.updatedAst);
      historyManager.recordVersion(promptText, result.patches, result.updatedAst, result.explanation);
    }

    setIsEvolving(false);
    return result;
  };

  const undo = (): boolean => {
    const previousState = undoRedoEngine.undo();
    if (previousState) {
      setActiveAst(previousState);
      return true;
    }
    return false;
  };

  const redo = (): boolean => {
    const nextState = undoRedoEngine.redo();
    if (nextState) {
      setActiveAst(nextState);
      return true;
    }
    return false;
  };

  const createSnapshot = (name: string): VersionSnapshot => {
    return snapshotManager.createSnapshot(name, activeAst);
  };

  const restoreSnapshot = (snapshotId: string): boolean => {
    const restored = snapshotManager.restoreSnapshot(snapshotId);
    if (restored) {
      setActiveAst(restored);
      undoRedoEngine.pushState(restored);
      return true;
    }
    return false;
  };

  return {
    activeAst,
    isEvolving,
    lastResult,
    evolve,
    undo,
    redo,
    canUndo: undoRedoEngine.canUndo(),
    canRedo: undoRedoEngine.canRedo(),
    createSnapshot,
    restoreSnapshot,
    snapshots: snapshotManager.listSnapshots(),
    history: historyManager.getHistory(),
    setActiveAst,
  };
}
