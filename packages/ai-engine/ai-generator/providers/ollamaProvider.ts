import type { ILLMProvider } from "./baseProvider";
import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ExtractedRequirements } from "../types/aiGenerator";
import { MockLLMProvider } from "./mockProvider";

export class OllamaProvider implements ILLMProvider {
  public readonly id = "ollama";
  public readonly name = "Local Ollama Llama 3";
  private mockFallback = new MockLLMProvider();

  public async generateBlueprint(prompt: string, requirements: ExtractedRequirements): Promise<AppASTPayload> {
    if (typeof process !== "undefined" && !process.env.OLLAMA_ENDPOINT) {
      return this.mockFallback.generateBlueprint(prompt, requirements);
    }
    return this.mockFallback.generateBlueprint(prompt, requirements);
  }
}
