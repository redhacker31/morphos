import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ASTPatchOperation } from "../../ai-evolution/types/aiEvolution";

/**
 * Specialized Agent Role Identifiers
 */
export type AgentRole =
  | "ApplicationPlanner"
  | "LayoutArchitect"
  | "WidgetSelector"
  | "ThemeDesigner"
  | "UXAuditor"
  | "AccessibilityAuditor"
  | "PerformanceOptimizer"
  | "PatchReviewer"
  | "QAVerifier"
  | "OptimizationEngine"
  | "DocumentationWriter";

/**
 * Agent Metadata Specification
 */
export interface AgentMetadata {
  id: string;
  role: AgentRole;
  name: string;
  description: string;
  capabilities: string[];
  version: string;
}

/**
 * Subtask Decomposition Unit
 */
export interface Subtask {
  id: string;
  title: string;
  assignedRole: AgentRole;
  status: "pending" | "in_progress" | "completed" | "failed";
  inputPrompt: string;
  dependencies: string[];
  outputPatches?: ASTPatchOperation[];
  outputSuggestions?: string[];
  executionTimeMs?: number;
}

/**
 * Inter-Agent Bus Message
 */
export interface AgentMessage {
  id: string;
  senderRole: AgentRole;
  recipientRole?: AgentRole | "ALL";
  timestamp: number;
  messageType: "PROPOSAL" | "REVIEW" | "WARNING" | "SUGGESTION" | "VOTE";
  content: string;
  patches?: ASTPatchOperation[];
  confidence: number;
}

/**
 * Agent Review & Evaluation Vote
 */
export interface AgentVote {
  agentRole: AgentRole;
  approved: boolean;
  score: number; // 0.0 to 1.0
  reasoning: string;
  suggestedPatches?: ASTPatchOperation[];
}

/**
 * Consensus Engine Tally Result
 */
export interface ConsensusResult {
  approved: boolean;
  approvalRatio: number;
  consensusScore: number;
  votes: AgentVote[];
  approvedPatches: ASTPatchOperation[];
  rejectionReasons: string[];
}

/**
 * Shared Context Engine Data Payload
 */
export interface SharedContext {
  goal: string;
  currentAst: AppASTPayload;
  history: string[];
  activeSubtasks: Subtask[];
  messages: AgentMessage[];
  proposedPatches: ASTPatchOperation[];
  metadata: Record<string, unknown>;
}

/**
 * Long-Term Project Memory Record
 */
export interface MemoryRecord {
  id: string;
  timestamp: string;
  category: "architecture" | "user_preference" | "rejected_idea" | "successful_pattern" | "optimization";
  content: string;
  tags: string[];
}

/**
 * Multi-Agent Pipeline Result
 */
export interface MultiAgentExecutionResult {
  success: boolean;
  updatedAst: AppASTPayload | null;
  subtasks: Subtask[];
  consensus: ConsensusResult;
  messages: AgentMessage[];
  documentation: {
    releaseNotes: string[];
    architectureSummary: string;
  };
  diagnostics: {
    agentCount: number;
    totalExecutionTimeMs: number;
    totalMessagesExchanged: number;
    consensusRatio: number;
  };
  errors: string[];
}
