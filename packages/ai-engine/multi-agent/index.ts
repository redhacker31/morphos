export { AgentRegistry } from "./registry/agentRegistry";
export { BaseAgent } from "./agents/baseAgent";
export { SharedContextEngine } from "./context/sharedContextEngine";
export { AgentBus } from "./communication/agentBus";
export { MemoryManager } from "./memory/memoryManager";
export { TaskPlanner } from "./planner/taskPlanner";
export { ConsensusEngine } from "./consensus/consensusEngine";
export { AgentOrchestrator } from "./orchestrator/agentOrchestrator";
export { AgentDiagnosticsEngine } from "./diagnostics/agentDiagnostics";
export { useMultiAgent } from "./hooks/useMultiAgent";

export {
  ApplicationPlannerAgent,
  LayoutArchitectAgent,
  WidgetSelectionAgent,
  ThemeDesignerAgent,
  AccessibilityAuditorAgent,
  PerformanceOptimizerAgent,
  PatchReviewerAgent,
  QAVerificationAgent,
  OptimizationAgent,
  DocumentationWriterAgent,
} from "./agents/specializedAgents";

export type {
  AgentRole,
  AgentMetadata,
  Subtask,
  AgentMessage,
  AgentVote,
  ConsensusResult,
  SharedContext,
  MemoryRecord,
  MultiAgentExecutionResult,
} from "./types/multiAgent";
