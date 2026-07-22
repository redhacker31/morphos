import type { AgentVote, ConsensusResult, Subtask } from "../types/multiAgent";
import type { SharedContextEngine } from "../context/sharedContextEngine";
import type { ASTPatchOperation } from "../../ai-evolution/types/aiEvolution";
import { AgentRegistry } from "../registry/agentRegistry";

/**
 * ConsensusEngine - Evaluates subtask proposals via multi-agent voting.
 * Evaluators: PatchReviewer, QAVerifier, AccessibilityAuditor, PerformanceOptimizer.
 * Only approved patches proceed.
 */
export class ConsensusEngine {
  private static APPROVAL_THRESHOLD = 0.70;

  public static async evaluateProposals(
    subtasks: Subtask[],
    contextEngine: SharedContextEngine
  ): Promise<ConsensusResult> {
    const votes: AgentVote[] = [];
    const proposedPatches: ASTPatchOperation[] = [];
    const rejectionReasons: string[] = [];

    for (const st of subtasks) {
      if (st.outputPatches && st.outputPatches.length > 0) {
        proposedPatches.push(...st.outputPatches);
      }
    }

    const context = contextEngine.getContext();

    // Evaluator Roles
    const evaluatorRoles = ["PatchReviewer", "QAVerifier", "AccessibilityAuditor", "PerformanceOptimizer"] as const;

    for (const role of evaluatorRoles) {
      const agent = AgentRegistry.get(role);
      if (agent) {
        for (const st of subtasks) {
          if (st.outputPatches && st.outputPatches.length > 0) {
            const vote = await agent.evaluateProposal(st, context);
            votes.push(vote);
            if (!vote.approved) {
              rejectionReasons.push(`${role}: ${vote.reasoning}`);
            }
          }
        }
      }
    }

    const totalVotes = votes.length || 1;
    const approvedCount = votes.filter((v) => v.approved).length;
    const approvalRatio = Number((approvedCount / totalVotes).toFixed(2));
    const totalScore = votes.reduce((sum, v) => sum + v.score, 0);
    const consensusScore = Number((totalScore / totalVotes).toFixed(2));

    const approved = approvalRatio >= ConsensusEngine.APPROVAL_THRESHOLD && rejectionReasons.length === 0;

    return {
      approved,
      approvalRatio,
      consensusScore,
      votes,
      approvedPatches: approved ? proposedPatches : [],
      rejectionReasons,
    };
  }
}
