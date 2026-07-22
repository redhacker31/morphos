import type { ConfidenceScores, ExtractedRequirements } from "../types/aiGenerator";
import type { AppASTPayload } from "../../renderer/schema/astSchema";

/**
 * ConfidenceScorer - Evaluates 5 multi-dimension confidence metric scores.
 */
export class ConfidenceScorer {
  public static score(requirements: ExtractedRequirements, ast: AppASTPayload): ConfidenceScores {
    const intentConfidence = requirements.domain ? 0.98 : 0.85;
    const layoutConfidence = ast.layout?.type ? 0.96 : 0.80;
    const widgetConfidence = ast.nodes?.length > 0 ? 0.99 : 0.70;
    const themeConfidence = ast.meta?.theme ? 0.95 : 0.85;

    const overallConfidence = Number(
      ((intentConfidence + layoutConfidence + widgetConfidence + themeConfidence) / 4).toFixed(2)
    );

    return {
      intentConfidence,
      layoutConfidence,
      widgetConfidence,
      themeConfidence,
      overallConfidence,
    };
  }
}
