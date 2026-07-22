import type { AppASTPayload, WidgetASTNode, LayoutASTConfig } from "../../renderer/schema/astSchema";

/**
 * Evolution Operation Intents
 */
export type EvolutionOperationIntent =
  | "insert-node"
  | "delete-node"
  | "move-node"
  | "update-props"
  | "replace-widget"
  | "update-theme"
  | "update-layout"
  | "rename-node"
  | "reorder-nodes"
  | "swap-nodes"
  | "bulk-modify";

/**
 * AST Patch Operation Types
 */
export type ASTPatchOpType =
  | "InsertNode"
  | "DeleteNode"
  | "MoveNode"
  | "UpdateProps"
  | "ReplaceWidget"
  | "UpdateTheme"
  | "UpdateLayout"
  | "RenameNode";

/**
 * Atomic AST Patch Operation Interface
 */
export interface ASTPatchOperation {
  id: string;
  op: ASTPatchOpType;
  targetNodeId?: string;
  parentId?: string;
  position?: number;
  node?: WidgetASTNode;
  gridPosition?: { x: number; y: number; w: number; h: number };
  props?: Record<string, unknown>;
  replacementWidgetType?: string;
  newTheme?: string;
  newLayout?: LayoutASTConfig;
  newTitle?: string;
  description: string;
}

/**
 * Result of Application Analysis
 */
export interface ApplicationAnalysis {
  nodeCount: number;
  layoutType: string;
  theme: string;
  widgetTypesPresent: string[];
  depth: number;
  hasCharts: boolean;
  hasTables: boolean;
  hasMetrics: boolean;
  hasForms: boolean;
  nodesByRole: Record<string, string[]>;
}

/**
 * Structured Evolution Request
 */
export interface EvolutionRequest {
  prompt: string;
  currentAst: AppASTPayload;
  contextHistory?: string[];
}

/**
 * Result of Evolution Engine Execution
 */
export interface AIEvolutionResult {
  success: boolean;
  updatedAst: AppASTPayload | null;
  patches: ASTPatchOperation[];
  explanation: string[];
  diagnostics: {
    warnings: string[];
    suggestions: string[];
    layoutImprovements: string[];
  };
  metrics: {
    analysisTimeMs: number;
    diffTimeMs: number;
    patchTimeMs: number;
    validationTimeMs: number;
    totalTimeMs: number;
    patchCount: number;
  };
  versionId: string;
  errors: string[];
}

/**
 * History Log Entry
 */
export interface HistoryEntry {
  versionId: string;
  timestamp: string;
  author: string;
  prompt: string;
  patchesApplied: ASTPatchOperation[];
  astSnapshot: AppASTPayload;
  explanation: string[];
}

/**
 * Immutable Version Snapshot
 */
export interface VersionSnapshot {
  id: string;
  name: string;
  timestamp: string;
  ast: AppASTPayload;
  nodeCount: number;
  theme: string;
  layoutType: string;
}
