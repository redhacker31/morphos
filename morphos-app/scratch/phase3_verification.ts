/**
 * Phase 3 Comprehensive Verification Script
 * Run via: npx tsx scratch/phase3_verification.ts
 */

import { PromptParser } from "../features/ai-generator/pipeline/promptParser";
import { ApplicationPlanner } from "../features/ai-generator/pipeline/appPlanner";
import { ASTRepairEngine } from "../features/ai-generator/pipeline/astRepairEngine";
import { ConfidenceScorer } from "../features/ai-generator/confidence/confidenceScorer";
import { StreamingPipeline } from "../features/ai-generator/pipeline/streamingPipeline";
import { PROMPT_CORPUS } from "../features/ai-generator/library/promptCorpus";
import { ASTValidator } from "../features/renderer/schema/astValidator";
import { SALES_CRM_AST } from "../features/renderer/samples/salesCrmAst";
import { FINANCIAL_ANALYTICS_AST } from "../features/renderer/samples/financialAnalyticsAst";
import { INVENTORY_MANAGEMENT_AST } from "../features/renderer/samples/inventoryManagementAst";
import { ADMIN_DASHBOARD_AST } from "../features/renderer/samples/adminDashboardAst";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures: string[] = [];

function test(name: string, fn: () => boolean) {
  totalTests++;
  try {
    const result = fn();
    if (result) {
      passedTests++;
      console.log(`  ✅ PASS: ${name}`);
    } else {
      failedTests++;
      failures.push(name);
      console.log(`  ❌ FAIL: ${name}`);
    }
  } catch (err: any) {
    failedTests++;
    failures.push(`${name} (EXCEPTION: ${err.message})`);
    console.log(`  ❌ FAIL: ${name} — ${err.message}`);
  }
}

async function testAsync(name: string, fn: () => Promise<boolean>) {
  totalTests++;
  try {
    const result = await fn();
    if (result) {
      passedTests++;
      console.log(`  ✅ PASS: ${name}`);
    } else {
      failedTests++;
      failures.push(name);
      console.log(`  ❌ FAIL: ${name}`);
    }
  } catch (err: any) {
    failedTests++;
    failures.push(`${name} (EXCEPTION: ${err.message})`);
    console.log(`  ❌ FAIL: ${name} — ${err.message}`);
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════════════════");
  console.log(" MorphOS Phase 3 — Comprehensive AI Pipeline Verification     ");
  console.log("═══════════════════════════════════════════════════════════════\n");

  // SECTION 1: PromptParser Intent Classification
  console.log("┌─────────────────────────────────────────────────┐");
  console.log("│ SECTION 1: PromptParser Intent Classification   │");
  console.log("└─────────────────────────────────────────────────┘");

  test("Classifies sales-crm domain", () => PromptParser.parse("Create a Sales CRM dashboard").domain === "sales-crm");
  test("Classifies financial-analytics from 'EBITDA'", () => PromptParser.parse("Finance app with EBITDA margin").domain === "financial-analytics");
  test("Classifies financial-analytics from 'revenue'", () => PromptParser.parse("Build a revenue analytics tracker").domain === "financial-analytics");
  test("Classifies inventory-logistics from 'SKU'", () => PromptParser.parse("Create an SKU stock monitoring system").domain === "inventory-logistics");
  test("Classifies inventory-logistics from 'warehouse'", () => PromptParser.parse("Build a warehouse logistics manager").domain === "inventory-logistics");
  test("Classifies admin-infrastructure from 'server'", () => PromptParser.parse("Create a server monitoring panel").domain === "admin-infrastructure");
  test("Classifies hospital-triage from 'patient'", () => PromptParser.parse("Build a patient triage tracking system").domain === "hospital-triage");
  test("Classifies hr-portal from 'employee'", () => PromptParser.parse("Create an employee performance portal").domain === "hr-portal");
  test("Classifies education-portal from 'student'", () => PromptParser.parse("Build a student course analytics dashboard").domain === "education-portal");
  test("Defaults to sales-crm for ambiguous prompts", () => PromptParser.parse("Build me a dashboard").domain === "sales-crm");

  test("Detects chart requirement from 'graph'", () => PromptParser.parse("Show me a revenue graph").hasCharts === true);
  test("Detects table requirement from 'table'", () => PromptParser.parse("Create a user table").hasTables === true);
  test("Detects metric requirement from 'KPI'", () => PromptParser.parse("Show KPI metrics").hasMetrics === true);
  test("Detects form requirement from 'form'", () => PromptParser.parse("Build a contact form").hasForms === true);
  test("Sets cyberpunk-neon theme for financial domain", () => PromptParser.parse("Finance app with EBITDA").themePreference === "cyberpunk-neon");
  test("Sets dark-glass theme for non-financial domains", () => PromptParser.parse("Build a CRM").themePreference === "dark-glass");
  test("Generates title from prompt words", () => PromptParser.parse("Create a Sales Dashboard").title.length > 0);
  test("Generates non-empty description", () => PromptParser.parse("Create a Sales Dashboard").description.length > 0);
  test("Populates requestedWidgets for metric prompts", () => PromptParser.parse("Show KPI stat").requestedWidgets.length > 0);

  // SECTION 2: ApplicationPlanner
  console.log("\n┌─────────────────────────────────────────────────┐");
  console.log("│ SECTION 2: ApplicationPlanner                   │");
  console.log("└─────────────────────────────────────────────────┘");

  test("Planner returns dashboard layout type", () => ApplicationPlanner.plan(PromptParser.parse("Build a CRM")).layout.type === "dashboard");
  test("Planner returns 12-column grid", () => ApplicationPlanner.plan(PromptParser.parse("Build a CRM")).layout.columns === 12);
  test("Planner returns gap of 16", () => ApplicationPlanner.plan(PromptParser.parse("Build a CRM")).layout.gap === 16);
  test("Planner returns non-empty widget list", () => ApplicationPlanner.plan(PromptParser.parse("Build a CRM")).selectedWidgets.length > 0);
  test("Planner preserves theme from requirements", () => ApplicationPlanner.plan(PromptParser.parse("Finance with EBITDA")).theme === "cyberpunk-neon");

  // SECTION 3: AST Schema Validation
  console.log("\n┌─────────────────────────────────────────────────┐");
  console.log("│ SECTION 3: AST Schema Validation (Samples)      │");
  console.log("└─────────────────────────────────────────────────┘");

  test("SALES_CRM_AST validates", () => ASTValidator.validate(SALES_CRM_AST).isValid);
  test("FINANCIAL_ANALYTICS_AST validates", () => ASTValidator.validate(FINANCIAL_ANALYTICS_AST).isValid);
  test("INVENTORY_MANAGEMENT_AST validates", () => ASTValidator.validate(INVENTORY_MANAGEMENT_AST).isValid);
  test("ADMIN_DASHBOARD_AST validates", () => ASTValidator.validate(ADMIN_DASHBOARD_AST).isValid);
  test("SALES_CRM_AST unique IDs", () => { const ids = SALES_CRM_AST.nodes.map((n: any) => n.id); return new Set(ids).size === ids.length; });
  test("FINANCIAL unique IDs", () => { const ids = FINANCIAL_ANALYTICS_AST.nodes.map((n: any) => n.id); return new Set(ids).size === ids.length; });
  test("INVENTORY unique IDs", () => { const ids = INVENTORY_MANAGEMENT_AST.nodes.map((n: any) => n.id); return new Set(ids).size === ids.length; });
  test("ADMIN unique IDs", () => { const ids = ADMIN_DASHBOARD_AST.nodes.map((n: any) => n.id); return new Set(ids).size === ids.length; });
  test("SALES_CRM_AST has 7 nodes", () => SALES_CRM_AST.nodes.length === 7);
  test("FINANCIAL_ANALYTICS has 4 nodes", () => FINANCIAL_ANALYTICS_AST.nodes.length === 4);
  test("INVENTORY has 3 nodes", () => INVENTORY_MANAGEMENT_AST.nodes.length === 3);
  test("ADMIN has 4 nodes", () => ADMIN_DASHBOARD_AST.nodes.length === 4);

  // SECTION 4: ASTRepairEngine
  console.log("\n┌─────────────────────────────────────────────────┐");
  console.log("│ SECTION 4: ASTRepairEngine                      │");
  console.log("└─────────────────────────────────────────────────┘");

  test("Repairs missing version", () => { const r = ASTRepairEngine.repair({ meta: { title: "Test" }, layout: { type: "dashboard", columns: 12, gap: 16 }, nodes: [] } as any); return r.success && r.ast?.version === "1.0.0"; });
  test("Repairs missing layout", () => { const r = ASTRepairEngine.repair({ version: "1.0.0", meta: { title: "Test" }, nodes: [] } as any); return r.success; });
  test("Repairs missing meta theme", () => { const r = ASTRepairEngine.repair({ meta: { title: "Test" }, nodes: [] } as any); return r.success; });
  test("Valid AST passes without repair", () => { const r = ASTRepairEngine.repair(SALES_CRM_AST); return r.success && r.repaired === false; });
  test("Rejects null input", () => { const r = ASTRepairEngine.repair(null); return !r.success; });
  test("Rejects string input", () => { const r = ASTRepairEngine.repair("bad"); return !r.success; });
  test("Rejects number input", () => { const r = ASTRepairEngine.repair(42); return !r.success; });

  // SECTION 5: ConfidenceScorer
  console.log("\n┌─────────────────────────────────────────────────┐");
  console.log("│ SECTION 5: ConfidenceScorer                     │");
  console.log("└─────────────────────────────────────────────────┘");

  const crmReqs = PromptParser.parse("Create a CRM dashboard");
  const validatedSales = ASTValidator.validate(SALES_CRM_AST);
  if (validatedSales.data) {
    const scores = ConfidenceScorer.score(crmReqs, validatedSales.data);
    test("Intent confidence > 0.8", () => scores.intentConfidence > 0.8);
    test("Layout confidence > 0.8", () => scores.layoutConfidence > 0.8);
    test("Widget confidence > 0.8", () => scores.widgetConfidence > 0.8);
    test("Theme confidence > 0.8", () => scores.themeConfidence > 0.8);
    test("Overall is average of dimensions", () => {
      const expected = Number(((scores.intentConfidence + scores.layoutConfidence + scores.widgetConfidence + scores.themeConfidence) / 4).toFixed(2));
      return scores.overallConfidence === expected;
    });
  }

  // SECTION 6: StreamingPipeline E2E (10 corpus prompts)
  console.log("\n┌─────────────────────────────────────────────────┐");
  console.log("│ SECTION 6: StreamingPipeline E2E (10 prompts)    │");
  console.log("└─────────────────────────────────────────────────┘");

  for (const preset of PROMPT_CORPUS) {
    await testAsync(`Pipeline E2E: ${preset.domain}`, async () => {
      const result = await StreamingPipeline.run(preset.prompt);
      return result.success && result.ast !== null && result.confidence.overallConfidence > 0.5;
    });
  }

  // SECTION 7: Cross-Prompt Verification (25 prompts)
  console.log("\n┌─────────────────────────────────────────────────┐");
  console.log("│ SECTION 7: Cross-Prompt Verification (25)        │");
  console.log("└─────────────────────────────────────────────────┘");

  const crossPrompts = [
    "Build a CRM dashboard with deal pipeline chart",
    "Create an ERP system for manufacturing",
    "Generate finance analytics with EBITDA margins",
    "Build a hospital triage board with patient stats",
    "Create education analytics with student enrollment",
    "Build a retail point of sale dashboard",
    "Create an HR portal with employee headcount",
    "Build a portfolio tracker with net asset value",
    "Create a web traffic analytics dashboard",
    "Build an admin server monitoring panel",
    "Create inventory management with SKU tracking",
    "Build a project management sprint board",
    "Create a customer support ticket tracker",
    "Build a marketing campaign dashboard",
    "Create a SaaS metrics dashboard with MRR",
    "Build a warehouse logistics system",
    "Create a school course management portal",
    "Build a patient triage ER dashboard",
    "Create a sales pipeline forecast tracker",
    "Build an employee performance review portal",
    "Create a server cluster CPU monitoring panel",
    "Build a financial cashflow runway tracker",
    "Create a stock portfolio allocation pie chart",
    "Build a startup KPI dashboard with metrics",
    "Create an infrastructure security log viewer",
  ];

  for (const prompt of crossPrompts) {
    await testAsync(`Cross: "${prompt.substring(0, 42)}..."`, async () => {
      const result = await StreamingPipeline.run(prompt);
      return result.success && result.ast !== null;
    });
  }

  // SECTION 8: Streaming Progress Stage Coverage
  console.log("\n┌─────────────────────────────────────────────────┐");
  console.log("│ SECTION 8: Progress Stage Coverage               │");
  console.log("└─────────────────────────────────────────────────┘");

  await testAsync("Emits Intent stage", async () => { const s: string[] = []; await StreamingPipeline.run("Build CRM", { onProgress: (p) => s.push(p.stage) }); return s.includes("Intent"); });
  await testAsync("Emits Planning stage", async () => { const s: string[] = []; await StreamingPipeline.run("Build CRM", { onProgress: (p) => s.push(p.stage) }); return s.includes("Planning"); });
  await testAsync("Emits AST stage", async () => { const s: string[] = []; await StreamingPipeline.run("Build CRM", { onProgress: (p) => s.push(p.stage) }); return s.includes("AST"); });
  await testAsync("Emits Validation stage", async () => { const s: string[] = []; await StreamingPipeline.run("Build CRM", { onProgress: (p) => s.push(p.stage) }); return s.includes("Validation"); });
  await testAsync("Emits Ready stage", async () => { const s: string[] = []; await StreamingPipeline.run("Build CRM", { onProgress: (p) => s.push(p.stage) }); return s.includes("Ready"); });
  await testAsync("Progress reaches 100%", async () => { let max = 0; await StreamingPipeline.run("Build CRM", { onProgress: (p) => { if (p.percent > max) max = p.percent; } }); return max === 100; });

  // SECTION 9: AIGenerationResult Contract
  console.log("\n┌─────────────────────────────────────────────────┐");
  console.log("│ SECTION 9: AIGenerationResult Contract           │");
  console.log("└─────────────────────────────────────────────────┘");

  await testAsync("Has success boolean", async () => { const r = await StreamingPipeline.run("CRM"); return typeof r.success === "boolean"; });
  await testAsync("Has ast field", async () => { const r = await StreamingPipeline.run("CRM"); return r.ast !== undefined; });
  await testAsync("Has requirements", async () => { const r = await StreamingPipeline.run("CRM"); return r.requirements !== null; });
  await testAsync("Has confidence", async () => { const r = await StreamingPipeline.run("CRM"); return typeof r.confidence.overallConfidence === "number"; });
  await testAsync("Has diagnostics", async () => { const r = await StreamingPipeline.run("CRM"); return Array.isArray(r.diagnostics.warnings); });
  await testAsync("Has generationTimeMs", async () => { const r = await StreamingPipeline.run("CRM"); return r.generationTimeMs >= 0; });
  await testAsync("Has providerUsed", async () => { const r = await StreamingPipeline.run("CRM"); return r.providerUsed.length > 0; });
  await testAsync("Has errors array", async () => { const r = await StreamingPipeline.run("CRM"); return Array.isArray(r.errors); });

  // SECTION 10: Edge Cases
  console.log("\n┌─────────────────────────────────────────────────┐");
  console.log("│ SECTION 10: Edge Cases                           │");
  console.log("└─────────────────────────────────────────────────┘");

  await testAsync("Empty prompt still produces AST", async () => { const r = await StreamingPipeline.run(""); return r.success && r.ast !== null; });
  await testAsync("Single-word prompt", async () => { const r = await StreamingPipeline.run("Dashboard"); return r.success && r.ast !== null; });
  await testAsync("Long prompt (500+ chars)", async () => { const r = await StreamingPipeline.run("Build a comprehensive enterprise CRM dashboard ".repeat(12)); return r.success && r.ast !== null; });
  await testAsync("Unicode prompt", async () => { const r = await StreamingPipeline.run("建立一个仪表板 with metrics"); return r.success && r.ast !== null; });
  await testAsync("Special chars prompt", async () => { const r = await StreamingPipeline.run("Build !@#$%^& dashboard <tags>"); return r.success && r.ast !== null; });

  // FINAL REPORT
  console.log("\n═══════════════════════════════════════════════════════════════");
  console.log(" FINAL RESULTS                                                ");
  console.log("═══════════════════════════════════════════════════════════════");
  console.log(`  Total Tests:  ${totalTests}`);
  console.log(`  Passed:       ${passedTests}`);
  console.log(`  Failed:       ${failedTests}`);
  console.log(`  Pass Rate:    ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  if (failures.length > 0) {
    console.log("\n  ❌ FAILURES:");
    failures.forEach((f) => console.log(`     - ${f}`));
  }

  console.log("\n═══════════════════════════════════════════════════════════════");
  if (failedTests === 0) {
    console.log("  ✅ ALL TESTS PASSED — PHASE 3 PIPELINE VERIFIED");
  } else {
    console.log(`  ⚠️  ${failedTests} TEST(S) FAILED — REVIEW REQUIRED`);
  }
  console.log("═══════════════════════════════════════════════════════════════\n");

  process.exit(failedTests > 0 ? 1 : 0);
}

main().catch(console.error);
