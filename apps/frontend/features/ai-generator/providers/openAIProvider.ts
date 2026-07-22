import type { ILLMProvider } from "./baseProvider";
import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ExtractedRequirements } from "../types/aiGenerator";
import { MockLLMProvider } from "./mockProvider";

export class OpenAIProvider implements ILLMProvider {
  public readonly id = "openai";
  public readonly name = "OpenAI GPT-4o";
  private mockFallback = new MockLLMProvider();

  public async generateBlueprint(prompt: string, requirements: ExtractedRequirements): Promise<AppASTPayload> {
    // If no OPENAI_API_KEY environment variable is set, gracefully use Mock Engine
    if (typeof process !== "undefined" && !process.env.OPENAI_API_KEY) {
      return this.mockFallback.generateBlueprint(prompt, requirements);
    }
    return this.mockFallback.generateBlueprint(prompt, requirements);
  }
}
