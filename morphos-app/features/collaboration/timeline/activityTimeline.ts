import type { ActivityEvent } from "../types/collaboration";

/**
 * ActivityTimeline - Logs real-time activity events across collaboration sessions.
 */
export class ActivityTimeline {
  private events: ActivityEvent[] = [];

  public logEvent(
    sessionId: string,
    actorId: string,
    actorName: string,
    actionType: ActivityEvent["actionType"],
    description: string,
    metadata?: Record<string, unknown>
  ): ActivityEvent {
    const event: ActivityEvent = {
      id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sessionId,
      timestamp: new Date().toISOString(),
      actorId,
      actorName,
      actionType,
      description,
      metadata,
    };
    this.events.push(event);
    return event;
  }

  public getEvents(sessionId?: string): ActivityEvent[] {
    if (sessionId) {
      return this.events.filter((e) => e.sessionId === sessionId);
    }
    return [...this.events];
  }

  public clearEvents(): void {
    this.events = [];
  }
}
