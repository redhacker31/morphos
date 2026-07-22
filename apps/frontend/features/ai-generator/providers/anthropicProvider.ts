import type { ILLMProvider } from "./baseProvider";
import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ExtractedRequirements } from "../types/aiGenerator";
import { MockLLMProvider } from "./mockProvider";

export class AnthropicProvider implements ILLMProvider {
  public readonly id = "anthropic";
  public readonly name = "Anthropic Claude 3.5 Sonnet";
  private mockFallback = new MockLLMProvider();

  public async generateBlueprint(prompt: string, requirements: ExtractedRequirements): Promise<AppASTPayload> {
    if (typeof process !== "undefined" && !process.env.ANTHROPIC_API_KEY) {
      return this.mockFallback.generateBlueprint(prompt, requirements);
    }
    return this.mockFallback.generateBlueprint(prompt, requirements);
  }
}
