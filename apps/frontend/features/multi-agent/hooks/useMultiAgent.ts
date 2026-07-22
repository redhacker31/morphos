"use client";

import { useState } from "react";
import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { MultiAgentExecutionResult } from "../types/multiAgent";
import { AgentOrchestrator } from "../orchestrator/agentOrchestrator";
import { MemoryManager } from "../memory/memoryManager";

/**
 * useMultiAgent - React Hook for Workspace Studio Autonomous Multi-Agent Workflows.
 * Connects natural language goals to multi-agent orchestrator, consensus voting, and diagnostics.
 */
export function useMultiAgent(initialAst: AppASTPayload) {
  const [activeAst, setActiveAst] = useState<AppASTPayload>(initialAst);
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [lastResult, setLastResult] = useState<MultiAgentExecutionResult | null>(null);
  const [memoryManager] = useState(() => new MemoryManager());

  const runGoal = async (goalPrompt: string): Promise<MultiAgentExecutionResult> => {
    setIsOrchestrating(true);
    const result = await AgentOrchestrator.runGoal(goalPrompt, activeAst, { memoryManager });

    setLastResult(result);
    if (result.success && result.updatedAst) {
      setActiveAst(result.updatedAst);
    }

    setIsOrchestrating(false);
    return result;
  };

  return {
    activeAst,
    isOrchestrating,
    lastResult,
    runGoal,
    memories: memoryManager.getMemories(),
    setActiveAst,
  };
}
