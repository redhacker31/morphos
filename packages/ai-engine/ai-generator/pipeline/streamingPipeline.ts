import { PromptParser } from "./promptParser";
import { ApplicationPlanner } from "./appPlanner";
import { ASTGenerator } from "./astGenerator";
import { ASTRepairEngine } from "./astRepairEngine";
import { ConfidenceScorer } from "../confidence/confidenceScorer";
import type { AIGenerationResult, GenerationProgress, PlannerTrace, GenerationMetrics } from "../types/aiGenerator";
import type { ILLMProvider } from "../providers/baseProvider";

export interface PipelineOptions {
  provider?: ILLMProvider;
  maxRetries?: number;
  onProgress?: (progress: GenerationProgress) => void;
}

/**
 * StreamingPipeline - Coordinates incremental stage-by-stage AI application generation across 7 stages:
 * Stage 1: Intent
 * Stage 2: Planning
 * Stage 3: Layout
 * Stage 4: Widgets
 * Stage 5: AST
 * Stage 6: Validation
 * Stage 7: Repair / Ready
 */
export class StreamingPipeline {
  public static async run(prompt: string, options?: PipelineOptions): Promise<AIGenerationResult> {
    const startTime = Date.now();
    const emitProgress = (progress: GenerationProgress) => {
      options?.onProgress?.(progress);
    };

    try {
      // Stage 1: Intent Recognition & Requirement Extraction
      const intentStart = Date.now();
      emitProgress({ stage: "Intent", percent: 15, message: "Classifying domain intent and extracting structured requirements..." });
      const reqs = PromptParser.parse(prompt);

      // Stage 2: Application Blueprint Planning
      const planningStart = Date.now();
      emitProgress({ stage: "Planning", percent: 30, message: `Creating internal blueprint for domain: ${reqs.domain}...` });
      const planner = ApplicationPlanner.plan(reqs);

      // Stage 3: Layout Planning
      emitProgress({ stage: "Layout", percent: 45, message: `Selecting layout strategy: ${planner.layout.type} (${planner.layout.columns} cols)...` });

      // Stage 4: Widget Selection
      emitProgress({ stage: "Widgets", percent: 60, message: `Selecting presentational widgets from Widget Registry (${planner.selectedWidgets.length} widgets)...` });
      const planningTimeMs = Date.now() - planningStart;

      // Stage 5: AST Generation
      const synthesisStart = Date.now();
      emitProgress({ stage: "AST", percent: 75, message: "Synthesizing recursive, deterministic JSON AppASTPayload blueprint..." });
      const generator = new ASTGenerator(options?.provider);
      const rawAst = await generator.generate(prompt, reqs);
      const synthesisTimeMs = Date.now() - synthesisStart;

      // Stage 6: Schema Validation & Repair
      const validationStart = Date.now();
      emitProgress({ stage: "Validation", percent: 85, message: "Validating AST schema against AppSchemaAST gatekeeper..." });
      const repair = ASTRepairEngine.repair(rawAst, options?.maxRetries);
      const validationTimeMs = Date.now() - validationStart;

      if (!repair.success || !repair.ast) {
        emitProgress({ stage: "Error", percent: 100, message: "AST validation failed and repair attempts exceeded retry limit." });
        return {
          success: false,
          ast: null,
          requirements: reqs,
          confidence: { intentConfidence: 0, layoutConfidence: 0, widgetConfidence: 0, themeConfidence: 0, overallConfidence: 0 },
          diagnostics: {
            warnings: repair.errors,
            assumptions: [],
            suggestions: ["Check prompt for unresolvable constraints."],
            missingInformation: ["Valid widget structure"],
            potentialImprovements: ["Provide clearer layout instructions"],
          },
          generationTimeMs: Date.now() - startTime,
          providerUsed: options?.provider?.name || "MorphOS Offline Neural Engine (Mock)",
          errors: repair.errors,
        };
      }

      // Stage 7: Confidence Scoring & Ready State
      emitProgress({ stage: "Ready", percent: 100, message: "AST Blueprint validated and ready for Dynamic Renderer execution!" });
      const confidence = ConfidenceScorer.score(reqs, repair.ast);
      const totalTimeMs = Date.now() - startTime;

      // Planner Trace & Operational Metrics
      const trace: PlannerTrace = {
        intent: reqs.domain,
        layout: planner.layout.type,
        theme: repair.ast.meta.theme,
        widgetSelection: planner.selectedWidgets,
        reasoning: [
          `Matched prompt domain to ${reqs.domain}`,
          `Selected layout strategy: ${planner.layout.type}`,
          `Selected ${planner.selectedWidgets.length} presentational widgets from Widget Registry`,
          `Applied theme profile: ${repair.ast.meta.theme}`,
        ],
        timestamp: new Date().toISOString(),
      };

      const metrics: GenerationMetrics = {
        planningTimeMs,
        synthesisTimeMs,
        validationTimeMs,
        totalTimeMs,
        repairCount: repair.attempts - 1,
        confidenceScore: confidence.overallConfidence,
        tokensEstimated: Math.ceil(prompt.length / 4) + 250,
      };

      return {
        success: true,
        ast: repair.ast,
        requirements: reqs,
        confidence,
        diagnostics: {
          warnings: repair.repaired ? ["AST required structure auto-repair during validation phase"] : [],
          assumptions: [
            `Classified domain intent: ${reqs.domain}`,
            `Applied layout: ${repair.ast.layout.type}`,
            `Selected theme: ${repair.ast.meta.theme}`,
          ],
          suggestions: [
            "Iterate on prompt to add additional pages, navigation links, or widget grids.",
            "Refine theme by specifying custom glass profile or color palette.",
          ],
          missingInformation: reqs.metrics.length === 0 ? ["Specific metric benchmarks"] : [],
          potentialImprovements: [
            "Add sub-navigation for multi-tab views.",
            "Include custom data filters for data tables.",
          ],
        },
        trace,
        metrics,
        generationTimeMs: totalTimeMs,
        providerUsed: options?.provider?.name || "MorphOS Offline Neural Engine (Mock)",
        errors: [],
      };
    } catch (err: any) {
      emitProgress({ stage: "Error", percent: 100, message: `Pipeline Exception: ${err?.message}` });
      return {
        success: false,
        ast: null,
        requirements: null,
        confidence: { intentConfidence: 0, layoutConfidence: 0, widgetConfidence: 0, themeConfidence: 0, overallConfidence: 0 },
        diagnostics: {
          warnings: [err?.message || "Unknown pipeline exception"],
          assumptions: [],
          suggestions: [],
          missingInformation: [],
          potentialImprovements: [],
        },
        generationTimeMs: Date.now() - startTime,
        providerUsed: options?.provider?.name || "MorphOS Offline Neural Engine (Mock)",
        errors: [err?.message || "Pipeline execution exception"],
      };
    }
  }
}
