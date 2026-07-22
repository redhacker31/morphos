import type { IAgent } from "../agents/baseAgent";
import type { AgentRole } from "../types/multiAgent";
import {
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
} from "../agents/specializedAgents";

/**
 * AgentRegistry - Central registry managing specialized AI agents.
 */
export class AgentRegistry {
  private static agents: Map<AgentRole, IAgent> = new Map();

  static {
    AgentRegistry.register(new ApplicationPlannerAgent());
    AgentRegistry.register(new LayoutArchitectAgent());
    AgentRegistry.register(new WidgetSelectionAgent());
    AgentRegistry.register(new ThemeDesignerAgent());
    AgentRegistry.register(new AccessibilityAuditorAgent());
    AgentRegistry.register(new PerformanceOptimizerAgent());
    AgentRegistry.register(new PatchReviewerAgent());
    AgentRegistry.register(new QAVerificationAgent());
    AgentRegistry.register(new OptimizationAgent());
    AgentRegistry.register(new DocumentationWriterAgent());
  }

  public static register(agent: IAgent): void {
    AgentRegistry.agents.set(agent.metadata.role, agent);
  }

  public static get(role: AgentRole): IAgent | undefined {
    return AgentRegistry.agents.get(role);
  }

  public static listAll(): IAgent[] {
    return Array.from(AgentRegistry.agents.values());
  }
}
