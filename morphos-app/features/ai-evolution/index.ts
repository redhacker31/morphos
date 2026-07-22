export { EvolutionPipeline } from "./pipeline/evolutionPipeline";
export { ApplicationAnalyzer } from "./analyzer/appAnalyzer";
export { ContextEngine } from "./context/contextEngine";
export { IntentRecognizer } from "./intent/intentRecognizer";
export { ASTDiffPlanner } from "./planner/diffPlanner";
export { PatchGenerator } from "./patcher/patchGenerator";
export { PatchValidator } from "./patcher/patchValidator";
export { PatchRepairEngine } from "./patcher/patchRepairEngine";
export { PatchApplier } from "./patcher/patchApplier";
export { HistoryManager } from "./history/historyManager";
export { UndoRedoEngine } from "./history/undoRedoEngine";
export { VersionComparer } from "./history/versionComparer";
export { SnapshotManager } from "./snapshots/snapshotManager";
export { ChangeExplainer } from "./explanation/changeExplainer";
export { EvolutionDiagnostics } from "./diagnostics/evolutionDiagnostics";
export { useAIEvolution } from "./hooks/useAIEvolution";

export type {
  EvolutionOperationIntent,
  ASTPatchOpType,
  ASTPatchOperation,
  ApplicationAnalysis,
  EvolutionRequest,
  AIEvolutionResult,
  HistoryEntry,
  VersionSnapshot,
} from "./types/aiEvolution";
