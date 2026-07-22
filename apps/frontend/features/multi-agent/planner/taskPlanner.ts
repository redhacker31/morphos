import type { Subtask } from "../types/multiAgent";

/**
 * TaskPlanner - Decomposes high-level natural language user goals into structured subtask DAGs.
 */
export class TaskPlanner {
  public static planGoal(goalPrompt: string): Subtask[] {
    const lower = goalPrompt.toLowerCase();
    const subtasks: Subtask[] = [];

    // Subtask 1: Application Architecture Analysis & Blueprint Planning
    subtasks.push({
      id: "task-1",
      title: "Plan Application Blueprint & Strategy",
      assignedRole: "ApplicationPlanner",
      status: "pending",
      inputPrompt: goalPrompt,
      dependencies: [],
    });

    // Subtask 2: Layout Optimization
    if (lower.includes("layout") || lower.includes("dashboard") || lower.includes("sidebar") || lower.includes("grid")) {
      subtasks.push({
        id: "task-2",
        title: "Optimize Layout & Structural Grid",
        assignedRole: "LayoutArchitect",
        status: "pending",
        inputPrompt: goalPrompt,
        dependencies: ["task-1"],
      });
    }

    // Subtask 3: Theme Styling
    if (lower.includes("theme") || lower.includes("cyberpunk") || lower.includes("neon") || lower.includes("dark")) {
      subtasks.push({
        id: "task-3",
        title: "Design Visual Theme & Glass Profile",
        assignedRole: "ThemeDesigner",
        status: "pending",
        inputPrompt: goalPrompt,
        dependencies: ["task-1"],
      });
    }

    // Subtask 4: Widget Selection & Insertion
    if (lower.includes("widget") || lower.includes("table") || lower.includes("chart") || lower.includes("add") || lower.includes("insert")) {
      subtasks.push({
        id: "task-4",
        title: "Select & Configure Presentational Widgets",
        assignedRole: "WidgetSelector",
        status: "pending",
        inputPrompt: goalPrompt,
        dependencies: ["task-1"],
      });
    }

    // Default Fallback Subtask
    if (subtasks.length === 1) {
      subtasks.push({
        id: "task-2-default",
        title: "Optimize Layout & Structural Grid",
        assignedRole: "LayoutArchitect",
        status: "pending",
        inputPrompt: goalPrompt,
        dependencies: ["task-1"],
      });
    }

    return subtasks;
  }
}
