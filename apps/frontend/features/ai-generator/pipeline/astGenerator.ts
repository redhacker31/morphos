import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ExtractedRequirements } from "../types/aiGenerator";
import type { ILLMProvider } from "../providers/baseProvider";
import { MockLLMProvider } from "../providers/mockProvider";

/**
 * ASTGenerator - Synthesizes deterministic AppASTPayload blueprints via LLM Providers.
 */
export class ASTGenerator {
  private provider: ILLMProvider;

  constructor(provider?: ILLMProvider) {
    this.provider = provider || new MockLLMProvider();
  }

  public async generate(prompt: string, requirements: ExtractedRequirements): Promise<AppASTPayload> {
    return this.provider.generateBlueprint(prompt, requirements);
  }
}
