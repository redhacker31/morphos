import type { ILLMProvider } from "./baseProvider";
import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ExtractedRequirements } from "../types/aiGenerator";
import { MockLLMProvider } from "./mockProvider";

export class OpenRouterProvider implements ILLMProvider {
  public readonly id = "openrouter";
  public readonly name = "OpenRouter Universal Gateway";
  private mockFallback = new MockLLMProvider();

  public async generateBlueprint(prompt: string, requirements: ExtractedRequirements): Promise<AppASTPayload> {
    if (typeof process !== "undefined" && !process.env.OPENROUTER_API_KEY) {
      return this.mockFallback.generateBlueprint(prompt, requirements);
    }
    return this.mockFallback.generateBlueprint(prompt, requirements);
  }
}
