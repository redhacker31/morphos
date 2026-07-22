import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { MultiAgentExecutionResult, Subtask, AgentMessage } from "../types/multiAgent";
import { SharedContextEngine } from "../context/sharedContextEngine";
import { TaskPlanner } from "../planner/taskPlanner";
import { AgentRegistry } from "../registry/agentRegistry";
import { AgentBus } from "../communication/agentBus";
import { ConsensusEngine } from "../consensus/consensusEngine";
import { PatchApplier } from "../../ai-evolution/patcher/patchApplier";
import { MemoryManager } from "../memory/memoryManager";

export interface OrchestratorOptions {
  memoryManager?: MemoryManager;
}

/**
 * AgentOrchestrator - Coordinates multi-agent collaboration, task dispatching, consensus voting,
 * patch application, and documentation generation.
 */
export class AgentOrchestrator {
  public static async runGoal(
    goalPrompt: string,
    currentAst: AppASTPayload,
    options?: OrchestratorOptions
  ): Promise<MultiAgentExecutionResult> {
    const startTime = Date.now();
    const bus = new AgentBus();
    const contextEngine = new SharedContextEngine(goalPrompt, currentAst);
    const memory = options?.memoryManager || new MemoryManager();

    try {
      // Step 1: Subtask Planning
      const subtasks = TaskPlanner.planGoal(goalPrompt);
      contextEngine.updateSubtasks(subtasks);

      bus.publish({
        id: `msg-${Date.now()}`,
        senderRole: "ApplicationPlanner",
        recipientRole: "ALL",
        timestamp: Date.now(),
        messageType: "PROPOSAL",
        content: `Planned ${subtasks.length} specialized agent subtasks for goal '${goalPrompt}'`,
        confidence: 0.95,
      });

      // Step 2: Execute Subtasks across Specialized Agents
      const executedSubtasks: Subtask[] = [];
      for (const st of subtasks) {
        const agent = AgentRegistry.get(st.assignedRole);
        if (agent) {
          const result = await agent.executeSubtask(st, contextEngine.getContext());
          executedSubtasks.push(result);
          if (result.outputPatches && result.outputPatches.length > 0) {
            contextEngine.addProposedPatches(result.outputPatches);
            bus.publish({
              id: `msg-${Date.now()}`,
              senderRole: st.assignedRole,
              recipientRole: "ALL",
              timestamp: Date.now(),
              messageType: "PROPOSAL",
              content: `Proposed ${result.outputPatches.length} AST patches for subtask '${st.title}'`,
              patches: result.outputPatches,
              confidence: 0.92,
            });
          }
        } else {
          executedSubtasks.push({ ...st, status: "completed" });
        }
      }

      // Step 3: Multi-Agent Consensus Evaluation
      const consensus = await ConsensusEngine.evaluateProposals(executedSubtasks, contextEngine);

      bus.publish({
        id: `msg-${Date.now()}`,
        senderRole: "PatchReviewer",
        recipientRole: "ALL",
        timestamp: Date.now(),
        messageType: "VOTE",
        content: `Consensus evaluation complete: Approved = ${consensus.approved} (Ratio: ${consensus.approvalRatio})`,
        confidence: consensus.consensusScore,
      });

      if (!consensus.approved) {
        return {
          success: false,
          updatedAst: null,
          subtasks: executedSubtasks,
          consensus,
          messages: bus.getHistory(),
          documentation: { releaseNotes: [], architectureSummary: "Consensus rejected proposed patches" },
          diagnostics: { agentCount: 10, totalExecutionTimeMs: Date.now() - startTime, totalMessagesExchanged: bus.getHistory().length, consensusRatio: consensus.approvalRatio },
          errors: consensus.rejectionReasons,
        };
      }

      // Step 4: Apply Approved AST Patches
      const updatedAst = PatchApplier.applyPatches(currentAst, consensus.approvedPatches);
      memory.recordMemory("successful_pattern", `Applied ${consensus.approvedPatches.length} patches for goal '${goalPrompt}'`, ["multi-agent"]);

      const totalExecutionTimeMs = Date.now() - startTime;

      return {
        success: true,
        updatedAst,
        subtasks: executedSubtasks,
        consensus,
        messages: bus.getHistory(),
        documentation: {
          releaseNotes: [
            `Multi-Agent Orchestration succeeded for prompt '${goalPrompt}'`,
            `Applied ${consensus.approvedPatches.length} approved AST patches`,
            `Consensus Approval Ratio: ${consensus.approvalRatio * 100}%`,
          ],
          architectureSummary: `AppSchemaAST updated layout to '${updatedAst.layout.type}' and theme to '${updatedAst.meta.theme}' with 0 renderer code changes.`,
        },
        diagnostics: {
          agentCount: 10,
          totalExecutionTimeMs,
          totalMessagesExchanged: bus.getHistory().length,
          consensusRatio: consensus.approvalRatio,
        },
        errors: [],
      };
    } catch (err: any) {
      return {
        success: false,
        updatedAst: null,
        subtasks: [],
        consensus: { approved: false, approvalRatio: 0, consensusScore: 0, votes: [], approvedPatches: [], rejectionReasons: [err?.message || "Execution exception"] },
        messages: bus.getHistory(),
        documentation: { releaseNotes: [], architectureSummary: "" },
        diagnostics: { agentCount: 10, totalExecutionTimeMs: Date.now() - startTime, totalMessagesExchanged: bus.getHistory().length, consensusRatio: 0 },
        errors: [err?.message || "Multi-agent orchestration exception"],
      };
    }
  }
}
