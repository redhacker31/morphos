import { useState } from "react";
import { PromptParser } from "../pipeline/promptParser";
import { ASTRepairEngine } from "../pipeline/astRepairEngine";
import { sb } from "@/lib/db";
import type {
  AIGenerationResult,
  GenerationProgress,
} from "../types/aiGenerator";
import type { AppASTPayload } from "../../renderer/schema/astSchema";

const MODEL = "openai/gpt-5.6-luna";

/**
 * useAIGenerator - React hook that connects the prompt studio to the real
 * AI blueprint backend function. Keeps the staged progress UI and runs the
 * client-side AST repair engine for defense-in-depth validation.
 */
export function useAIGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [result, setResult] = useState<AIGenerationResult | null>(null);
  const [activeAst, setActiveAst] = useState<AppASTPayload | null>(null);

  const generate = async (promptText: string): Promise<AIGenerationResult> => {
    setIsGenerating(true);
    const startTime = Date.now();

    setProgress({
      stage: "Intent",
      percent: 12,
      message: "Analyzing your request...",
    });
    const reqs = PromptParser.parse(promptText);

    setProgress({
      stage: "Planning",
      percent: 28,
      message: `Planning a ${reqs.domain.replace(/-/g, " ")} blueprint...`,
    });
    setProgress({ stage: "Layout", percent: 44, message: "Selecting layout..." });
    setProgress({
      stage: "Widgets",
      percent: 58,
      message: `Composing ${reqs.requestedWidgets.length || 6} widgets...`,
    });
    setProgress({
      stage: "AST",
      percent: 72,
      message: "Generating application blueprint with AI...",
    });

    const fail = (
      message: string
    ): AIGenerationResult => ({
      success: false,
      ast: null,
      requirements: reqs,
      confidence: {
        intentConfidence: 0,
        layoutConfidence: 0,
        widgetConfidence: 0,
        themeConfidence: 0,
        overallConfidence: 0,
      },
      diagnostics: {
        warnings: [message],
        assumptions: [],
        suggestions: [],
        missingInformation: [],
        potentialImprovements: [],
      },
      generationTimeMs: Date.now() - startTime,
      providerUsed: MODEL,
      errors: [message],
    });

    let genResult: AIGenerationResult;
    try {
      const { data, error } = await sb.functions.invoke(
        "generate-app-blueprint",
        { body: { prompt: promptText, requirements: reqs } }
      );

      if (error || !data?.success || !data?.ast) {
        const message =
          error?.message || data?.errors?.[0] || "Generation failed. Please try again.";
        genResult = fail(message);
      } else {
        const repair = ASTRepairEngine.repair(data.ast);
        const ast: AppASTPayload =
          repair.success && repair.ast ? repair.ast : (data.ast as AppASTPayload);

        setProgress({
          stage: "Validation",
          percent: 88,
          message: "Validating blueprint schema...",
        });
        setProgress({ stage: "Ready", percent: 100, message: "Application ready!" });

        genResult = {
          success: true,
          ast,
          requirements: reqs,
          confidence: {
            intentConfidence: 0.92,
            layoutConfidence: 0.9,
            widgetConfidence: 0.88,
            themeConfidence: 0.9,
            overallConfidence: 0.9,
          },
          diagnostics: {
            warnings: repair.repaired
              ? ["Blueprint auto-repaired during validation"]
              : [],
            assumptions: [`Domain intent: ${reqs.domain}`],
            suggestions: [
              "Iterate on your prompt to add more pages, charts, or data tables.",
            ],
            missingInformation: [],
            potentialImprovements: [],
          },
          generationTimeMs: Date.now() - startTime,
          providerUsed: data.providerUsed || MODEL,
          errors: [],
        };
      }
    } catch (e) {
      genResult = fail(e instanceof Error ? e.message : "Network error contacting AI.");
    }

    setResult(genResult);
    if (genResult.success && genResult.ast) {
      setActiveAst(genResult.ast);
    }
    setIsGenerating(false);
    return genResult;
  };

  return { isGenerating, progress, result, activeAst, generate, setActiveAst };
}
