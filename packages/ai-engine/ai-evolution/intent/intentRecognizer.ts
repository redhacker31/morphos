import type { EvolutionOperationIntent } from "../types/aiEvolution";

export interface RecognizedIntent {
  operation: EvolutionOperationIntent;
  targetCategory?: "chart" | "table" | "metric" | "form" | "layout" | "theme" | "node";
  confidence: number;
}

/**
 * IntentRecognizer - Classifies natural language modification prompts into specific AST operations.
 */
export class IntentRecognizer {
  public static recognize(prompt: string): RecognizedIntent {
    const lower = prompt.toLowerCase();

    if (lower.includes("theme") || lower.includes("cyberpunk") || lower.includes("dark") || lower.includes("light") || lower.includes("glass")) {
      return { operation: "update-theme", targetCategory: "theme", confidence: 0.98 };
    }

    if (lower.includes("layout") || lower.includes("sidebar") || lower.includes("grid") || lower.includes("flex") || lower.includes("convert the dashboard")) {
      return { operation: "update-layout", targetCategory: "layout", confidence: 0.96 };
    }

    if (lower.includes("move") || lower.includes("reorder") || lower.includes("position") || lower.includes("above") || lower.includes("below") || lower.includes("left") || lower.includes("right")) {
      return { operation: "move-node", targetCategory: "node", confidence: 0.95 };
    }

    if (lower.includes("replace") || lower.includes("swap") || lower.includes("change the pie chart to")) {
      return { operation: "replace-widget", targetCategory: "chart", confidence: 0.94 };
    }

    if (lower.includes("delete") || lower.includes("remove") || lower.includes("hide")) {
      return { operation: "delete-node", targetCategory: "node", confidence: 0.95 };
    }

    if (lower.includes("add") || lower.includes("insert") || lower.includes("append") || lower.includes("create a customer table")) {
      return { operation: "insert-node", targetCategory: "table", confidence: 0.95 };
    }

    if (lower.includes("rename") || lower.includes("title")) {
      return { operation: "rename-node", targetCategory: "node", confidence: 0.92 };
    }

    return { operation: "update-props", targetCategory: "node", confidence: 0.85 };
  }
}
