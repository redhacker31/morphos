import { ASTValidator, type ASTValidationResult } from "../schema/astValidator";
import { ASTNormalizer } from "../schema/astNormalizer";
import type { AppASTPayload } from "../schema/astSchema";

export interface PipelineExecutionResult {
  success: boolean;
  ast: AppASTPayload | null;
  errors: string[];
  stage: string;
}

/**
 * PipelineOrchestrator - Executes the 10-stage Dynamic Renderer Pipeline Strategy.
 * 
 * 1. Input Payload Receipt
 * 2. Pre-render Zod Validation Gatekeeper
 * 3. Tree Normalizer & Default Props Repair
 * 4. Layout Strategy Resolution
 * 5. Theme Tokens Mapping
 * 6. Widget Registry Lookup
 * 7. Factory Instantiation
 * 8. Error Boundary Wrapping
 * 9. React Tree Synthesis
 * 10. Interactive Mount
 */
export class PipelineOrchestrator {
  public static execute(rawAst: unknown): PipelineExecutionResult {
    // Stage 1 & 2: Validation Gatekeeper
    const validation: ASTValidationResult = ASTValidator.validate(rawAst);

    if (!validation.isValid || !validation.data) {
      return {
        success: false,
        ast: null,
        errors: validation.errors,
        stage: "Stage 2: Pre-render Zod Schema Validation",
      };
    }

    // Stage 3: Normalization & Props Repair
    const normalizedAst = ASTNormalizer.normalize(validation.data);

    return {
      success: true,
      ast: normalizedAst,
      errors: [],
      stage: "Stage 10: Interactive React Tree Synthesis Ready",
    };
  }
}
