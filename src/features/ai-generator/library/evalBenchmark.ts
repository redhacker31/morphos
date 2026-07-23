import { PROMPT_CORPUS } from "./promptCorpus";
import { StreamingPipeline } from "../pipeline/streamingPipeline";

export interface BenchmarkResult {
  totalPrompts: number;
  successfulGenerations: number;
  averageGenerationTimeMs: number;
  averageConfidenceScore: number;
  passed: boolean;
}

/**
 * EvalBenchmarkEngine - Automated Benchmark Evaluation Suite for Phase 3 AI Generation Engine.
 */
export class EvalBenchmarkEngine {
  public static async runBenchmark(): Promise<BenchmarkResult> {
    let successCount = 0;
    let totalTimeMs = 0;
    let totalConfidence = 0;

    for (const item of PROMPT_CORPUS) {
      const start = Date.now();
      const res = await StreamingPipeline.run(item.prompt);
      const elapsed = Date.now() - start;

      if (res.success && res.ast) {
        successCount++;
        totalConfidence += res.confidence.overallConfidence;
      }
      totalTimeMs += elapsed;
    }

    const total = PROMPT_CORPUS.length;
    const avgTime = Math.round(totalTimeMs / total);
    const avgConfidence = Number((totalConfidence / (successCount || 1)).toFixed(2));

    return {
      totalPrompts: total,
      successfulGenerations: successCount,
      averageGenerationTimeMs: avgTime,
      averageConfidenceScore: avgConfidence,
      passed: successCount === total,
    };
  }
}
