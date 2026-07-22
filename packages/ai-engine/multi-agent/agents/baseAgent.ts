import type { AgentMetadata, AgentRole, AgentVote, Subtask, SharedContext, AgentMessage } from "../types/multiAgent";

/**
 * IAgent - Contract interface for all specialized AI agents.
 */
export interface IAgent {
  readonly metadata: AgentMetadata;
  executeSubtask(subtask: Subtask, context: SharedContext): Promise<Subtask>;
  evaluateProposal(subtask: Subtask, context: SharedContext): Promise<AgentVote>;
}

/**
 * BaseAgent - Abstract base class implementing shared utility methods.
 */
export abstract class BaseAgent implements IAgent {
  public abstract readonly metadata: AgentMetadata;

  public abstract executeSubtask(subtask: Subtask, context: SharedContext): Promise<Subtask>;

  public async evaluateProposal(subtask: Subtask, context: SharedContext): Promise<AgentVote> {
    const patches = subtask.outputPatches || [];
    const score = patches.length > 0 ? 0.95 : 0.80;
    return {
      agentRole: this.metadata.role,
      approved: score >= 0.70,
      score,
      reasoning: `${this.metadata.name} evaluated proposal with score ${score}`,
    };
  }

  protected createMessage(
    type: AgentMessage["messageType"],
    content: string,
    confidence: number = 0.9,
    recipientRole?: AgentRole
  ): AgentMessage {
    return {
      id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      senderRole: this.metadata.role,
      recipientRole: recipientRole || "ALL",
      timestamp: Date.now(),
      messageType: type,
      content,
      confidence,
    };
  }
}
