import type { AgentMessage } from "../types/multiAgent";

type MessageHandler = (message: AgentMessage) => void;

/**
 * AgentBus - Pub/Sub messaging bus for inter-agent communication.
 */
export class AgentBus {
  private handlers: MessageHandler[] = [];
  private messageHistory: AgentMessage[] = [];

  public subscribe(handler: MessageHandler): () => void {
    this.handlers.push(handler);
    return () => {
      this.handlers = this.handlers.filter((h) => h !== handler);
    };
  }

  public publish(message: AgentMessage): void {
    this.messageHistory.push(message);
    for (const handler of this.handlers) {
      handler(message);
    }
  }

  public getHistory(): AgentMessage[] {
    return [...this.messageHistory];
  }

  public clear(): void {
    this.messageHistory = [];
  }
}
