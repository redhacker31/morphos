
import { useState } from "react";
import { StreamingPipeline } from "../pipeline/streamingPipeline";
import type { AIGenerationResult, GenerationProgress } from "../types/aiGenerator";
import type { AppASTPayload } from "../../renderer/schema/astSchema";

/**
 * useAIGenerator - React Hook for Workspace Studio Prompt Generation.
 * Connects PromptInput textarea submissions to the AI StreamingPipeline.
 */
export function useAIGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [result, setResult] = useState<AIGenerationResult | null>(null);
  const [activeAst, setActiveAst] = useState<AppASTPayload | null>(null);

  const generate = async (promptText: string): Promise<AIGenerationResult> => {
    setIsGenerating(true);
    setProgress({ stage: "Intent", percent: 10, message: "Initializing AI Generation Engine..." });

    const genResult = await StreamingPipeline.run(promptText, {
      onProgress: (p) => setProgress(p),
    });

    setResult(genResult);
    if (genResult.success && genResult.ast) {
      setActiveAst(genResult.ast);
    }
    setIsGenerating(false);
    return genResult;
  };

  return {
    isGenerating,
    progress,
    result,
    activeAst,
    generate,
    setActiveAst,
  };
}
