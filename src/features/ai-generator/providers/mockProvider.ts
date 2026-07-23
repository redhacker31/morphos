import type { ILLMProvider } from "./baseProvider";
import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ExtractedRequirements } from "../types/aiGenerator";
import { SALES_CRM_AST } from "../../renderer/samples/salesCrmAst";
import { FINANCIAL_ANALYTICS_AST } from "../../renderer/samples/financialAnalyticsAst";
import { INVENTORY_MANAGEMENT_AST } from "../../renderer/samples/inventoryManagementAst";
import { ADMIN_DASHBOARD_AST } from "../../renderer/samples/adminDashboardAst";

export class MockLLMProvider implements ILLMProvider {
  public readonly id = "mock-local";
  public readonly name = "MorphOS Offline Neural Engine (Mock)";

  public async generateBlueprint(prompt: string, requirements: ExtractedRequirements): Promise<AppASTPayload> {
    const domain = requirements.domain;

    let baseAst: AppASTPayload;

    if (domain === "financial-analytics") {
      baseAst = FINANCIAL_ANALYTICS_AST as AppASTPayload;
    } else if (domain === "inventory-logistics") {
      baseAst = INVENTORY_MANAGEMENT_AST as AppASTPayload;
    } else if (domain === "admin-infrastructure") {
      baseAst = ADMIN_DASHBOARD_AST as AppASTPayload;
    } else {
      baseAst = SALES_CRM_AST as AppASTPayload;
    }

    return {
      version: "1.0.0",
      layout: baseAst.layout,
      nodes: baseAst.nodes,
      meta: {
        title: requirements.title || baseAst.meta.title,
        description: requirements.description || baseAst.meta.description,
        theme: requirements.themePreference || baseAst.meta.theme,
      },
    };
  }
}
