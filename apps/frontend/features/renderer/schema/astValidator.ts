import { AppSchemaAST, type AppASTPayload } from "./astSchema";

export interface ASTValidationResult {
  isValid: boolean;
  data: AppASTPayload | null;
  errors: string[];
}

export class ASTValidator {
  public static validate(rawAst: unknown): ASTValidationResult {
    const parseResult = AppSchemaAST.safeParse(rawAst);

    if (parseResult.success) {
      return {
        isValid: true,
        data: parseResult.data,
        errors: [],
      };
    }

    const formattedErrors = parseResult.error.issues.map(
      (issue) => `[Path: ${issue.path.join(".")}] ${issue.message}`
    );

    return {
      isValid: false,
      data: null,
      errors: formattedErrors,
    };
  }
}
