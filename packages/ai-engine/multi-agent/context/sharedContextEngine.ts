import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { SharedContext, Subtask, AgentMessage } from "../types/multiAgent";
import type { ASTPatchOperation } from "../../ai-evolution/types/aiEvolution";

/**
 * SharedContextEngine - Manages real-time shared context accessible by all specialized AI agents.
 */
export class SharedContextEngine {
  private context: SharedContext;

  constructor(goal: string, currentAst: AppASTPayload) {
    this.context = {
      goal,
      currentAst: JSON.parse(JSON.stringify(currentAst)),
      history: [goal],
      activeSubtasks: [],
      messages: [],
      proposedPatches: [],
      metadata: {},
    };
  }

  public getContext(): SharedContext {
    return this.context;
  }

  public updateSubtasks(subtasks: Subtask[]): void {
    this.context.activeSubtasks = subtasks;
  }

  public addMessage(message: AgentMessage): void {
    this.context.messages.push(message);
  }

  public addProposedPatches(patches: ASTPatchOperation[]): void {
    this.context.proposedPatches.push(...patches);
  }

  public updateAst(ast: AppASTPayload): void {
    this.context.currentAst = JSON.parse(JSON.stringify(ast));
  }
}
