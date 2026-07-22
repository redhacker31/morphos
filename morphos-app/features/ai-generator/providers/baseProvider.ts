import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ExtractedRequirements } from "../types/aiGenerator";

export interface ILLMProvider {
  readonly id: string;
  readonly name: string;
  generateBlueprint(prompt: string, requirements: ExtractedRequirements): Promise<AppASTPayload>;
}
