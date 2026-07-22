import type { MultiAgentExecutionResult } from "../types/multiAgent";

export interface AgentTelemetrySummary {
  agentCount: number;
  totalExecutionTimeMs: number;
  totalMessagesExchanged: number;
  consensusScore: number;
  status: "OPTIMAL" | "SUB_OPTIMAL" | "FAILED";
}

/**
 * AgentDiagnosticsEngine - Evaluates multi-agent execution graphs, decision logs, and voting telemetry.
 */
export class AgentDiagnosticsEngine {
  public static evaluateTelemetry(result: MultiAgentExecutionResult): AgentTelemetrySummary {
    const status = result.success ? (result.consensus.consensusScore >= 0.9 ? "OPTIMAL" : "SUB_OPTIMAL") : "FAILED";
    return {
      agentCount: result.diagnostics.agentCount,
      totalExecutionTimeMs: result.diagnostics.totalExecutionTimeMs,
      totalMessagesExchanged: result.diagnostics.totalMessagesExchanged,
      consensusScore: result.consensus.consensusScore,
      status,
    };
  }
}
