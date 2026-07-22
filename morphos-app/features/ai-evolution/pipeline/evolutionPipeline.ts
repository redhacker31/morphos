import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { AIEvolutionResult } from "../types/aiEvolution";
import { ApplicationAnalyzer } from "../analyzer/appAnalyzer";
import { ContextEngine } from "../context/contextEngine";
import { IntentRecognizer } from "../intent/intentRecognizer";
import { ASTDiffPlanner } from "../planner/diffPlanner";
import { PatchGenerator } from "../patcher/patchGenerator";
import { PatchValidator } from "../patcher/patchValidator";
import { PatchRepairEngine } from "../patcher/patchRepairEngine";
import { PatchApplier } from "../patcher/patchApplier";
import { ChangeExplainer } from "../explanation/changeExplainer";
import { EvolutionDiagnostics } from "../diagnostics/evolutionDiagnostics";

export interface EvolutionPipelineOptions {
  contextEngine?: ContextEngine;
  maxRetries?: number;
}

/**
 * EvolutionPipeline - Main coordinator for natural language AST application evolution.
 */
export class EvolutionPipeline {
  public static async evolve(
    prompt: string,
    currentAst: AppASTPayload,
    options?: EvolutionPipelineOptions
  ): Promise<AIEvolutionResult> {
    const startTime = Date.now();
    const contextEngine = options?.contextEngine || new ContextEngine();

    try {
      // Step 1: Application Analysis
      const analysisStart = Date.now();
      const analysis = ApplicationAnalyzer.analyze(currentAst);
      const analysisTimeMs = Date.now() - analysisStart;

      // Step 2: Intent Recognition & Context Understanding
      const intent = IntentRecognizer.recognize(prompt);
      const context = contextEngine.resolveReference(prompt, currentAst);
      contextEngine.recordInteraction(prompt, context.targetNodeId);

      // Step 3: AST Diff Planning
      const diffStart = Date.now();
      const plan = ASTDiffPlanner.planDiff(prompt, currentAst, intent, context);
      const diffTimeMs = Date.now() - diffStart;

      // Step 4: Patch Generation
      const patchStart = Date.now();
      const rawPatches = PatchGenerator.generatePatches(plan);
      const patchTimeMs = Date.now() - patchStart;

      // Step 5: Validation & Auto-Repair
      const valStart = Date.now();
      let validation = PatchValidator.validateAll(rawPatches, currentAst);
      let finalPatches = rawPatches;
      let repaired = false;

      if (!validation.isValid) {
        const repairRes = PatchRepairEngine.repairPatches(rawPatches, currentAst);
        finalPatches = repairRes.repairedPatches;
        repaired = repairRes.repaired;
        if (!repairRes.success) {
          return {
            success: false,
            updatedAst: null,
            patches: [],
            explanation: ["Failed to validate or repair AST evolution patches."],
            diagnostics: { warnings: repairRes.errors, suggestions: [], layoutImprovements: [] },
            metrics: { analysisTimeMs, diffTimeMs, patchTimeMs, validationTimeMs: Date.now() - valStart, totalTimeMs: Date.now() - startTime, patchCount: 0 },
            versionId: "",
            errors: repairRes.errors,
          };
        }
      }
      const validationTimeMs = Date.now() - valStart;

      // Step 6: Patch Application
      const updatedAst = PatchApplier.applyPatches(currentAst, finalPatches);

      // Step 7: Natural Language Explanation & Evolution Diagnostics
      const explanation = ChangeExplainer.explainChanges(prompt, finalPatches);
      if (repaired) {
        explanation.push("(Note: AST patch was auto-repaired to preserve schema integrity)");
      }
      const diagnostics = EvolutionDiagnostics.diagnose(updatedAst, finalPatches);
      const versionId = `v-${Date.now()}`;
      const totalTimeMs = Date.now() - startTime;

      return {
        success: true,
        updatedAst,
        patches: finalPatches,
        explanation,
        diagnostics,
        metrics: {
          analysisTimeMs,
          diffTimeMs,
          patchTimeMs,
          validationTimeMs,
          totalTimeMs,
          patchCount: finalPatches.length,
        },
        versionId,
        errors: [],
      };
    } catch (err: any) {
      return {
        success: false,
        updatedAst: null,
        patches: [],
        explanation: [`Evolution Exception: ${err?.message}`],
        diagnostics: { warnings: [err?.message || "Unknown error"], suggestions: [], layoutImprovements: [] },
        metrics: { analysisTimeMs: 0, diffTimeMs: 0, patchTimeMs: 0, validationTimeMs: 0, totalTimeMs: Date.now() - startTime, patchCount: 0 },
        versionId: "",
        errors: [err?.message || "Evolution execution exception"],
      };
    }
  }
}
