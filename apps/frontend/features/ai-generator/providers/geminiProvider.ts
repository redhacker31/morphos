import type { ILLMProvider } from "./baseProvider";
import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ExtractedRequirements } from "../types/aiGenerator";
import { MockLLMProvider } from "./mockProvider";

export class GeminiProvider implements ILLMProvider {
  public readonly id = "gemini";
  public readonly name = "Google Gemini 1.5 Pro";
  private mockFallback = new MockLLMProvider();

  public async generateBlueprint(prompt: string, requirements: ExtractedRequirements): Promise<AppASTPayload> {
    if (typeof process !== "undefined" && !process.env.GEMINI_API_KEY) {
      return this.mockFallback.generateBlueprint(prompt, requirements);
    }
    return this.mockFallback.generateBlueprint(prompt, requirements);
  }
}
