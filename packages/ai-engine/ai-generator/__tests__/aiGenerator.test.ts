import { PromptParser } from "../pipeline/promptParser";
import { ApplicationPlanner } from "../pipeline/appPlanner";
import { LayoutPlanner } from "../pipeline/layoutPlanner";
import { WidgetPlanner } from "../pipeline/widgetPlanner";
import { ThemePlanner } from "../pipeline/themePlanner";
import { ASTRepairEngine } from "../pipeline/astRepairEngine";
import { StreamingPipeline } from "../pipeline/streamingPipeline";
import { ConfidenceScorer } from "../confidence/confidenceScorer";
import { ProviderRegistry } from "../providers/providerRegistry";
import { PROMPT_CORPUS } from "../library/promptCorpus";
import { EvalBenchmarkEngine } from "../library/evalBenchmark";

export function runAIGeneratorTestSuite(): { passed: boolean; testCount: number; failures: string[] } {
  const failures: string[] = [];
  let testCount = 0;

  function assert(condition: boolean, testName: string) {
    testCount++;
    if (!condition) {
      failures.push(`Assertion failed in: ${testName}`);
    }
  }

  // Test 1: PromptParser Intent & Requirement Classification
  const parsedCrm = PromptParser.parse("Create a Sales CRM dashboard with ARR metrics");
  assert(parsedCrm.domain === "sales-crm", "PromptParser domain classification sales-crm");
  assert(parsedCrm.hasMetrics === true, "PromptParser metric flag check");

  const parsedFin = PromptParser.parse("Finance app with EBITDA margin and revenue graph");
  assert(parsedFin.domain === "financial-analytics", "PromptParser domain classification financial-analytics");
  assert(parsedFin.themePreference === "cyberpunk-neon", "PromptParser theme preference check");

  const parsedErp = PromptParser.parse("Design an ERP enterprise resource planning system for warehouse logistics");
  assert(parsedErp.domain === "erp-system", "PromptParser ERP domain classification");

  // Test 2: Sub-Planners (Layout, Widget, Theme)
  const layout = LayoutPlanner.selectLayout(parsedCrm);
  assert(layout.type === "dashboard", "LayoutPlanner layout type selection");

  const widgets = WidgetPlanner.selectWidgets(parsedCrm);
  assert(widgets.includes("hero-banner"), "WidgetPlanner selected hero-banner");
  assert(widgets.includes("metric-card"), "WidgetPlanner selected metric-card");

  const theme = ThemePlanner.selectTheme(parsedFin);
  assert(theme.theme === "cyberpunk-neon", "ThemePlanner cyberpunk theme selection");

  // Test 3: ApplicationPlanner Composition
  const plan = ApplicationPlanner.plan(parsedCrm);
  assert(plan.layout.type === "dashboard", "ApplicationPlanner layout type check");
  assert(plan.selectedWidgets.length > 0, "ApplicationPlanner widgets list check");

  // Test 4: Provider Registry
  const providers = ProviderRegistry.listAll();
  assert(providers.length >= 6, "ProviderRegistry registered all 6 LLM providers");
  assert(ProviderRegistry.get("openai") !== undefined, "ProviderRegistry get OpenAI provider");
  assert(ProviderRegistry.get("anthropic") !== undefined, "ProviderRegistry get Anthropic provider");

  // Test 5: ASTRepairEngine Auto-Repair
  const rawAst: any = {
    meta: { title: "Raw Unrepaired AST" },
    nodes: [],
  };
  const repair = ASTRepairEngine.repair(rawAst);
  assert(repair.success === true, "ASTRepairEngine repair success check");
  assert(repair.ast?.version === "1.0.0", "ASTRepairEngine version repair check");
  assert(repair.ast?.nodes.length! > 0, "ASTRepairEngine minimum node requirement auto-repair");

  // Test 6: StreamingPipeline end-to-end execution
  const prompt = PROMPT_CORPUS[0].prompt;
  let lastProgressStage = "";

  StreamingPipeline.run(prompt, {
    onProgress: (p) => {
      lastProgressStage = p.stage;
    },
  }).then((res) => {
    assert(res.success === true, "StreamingPipeline end-to-end execution success");
    assert(res.ast !== null, "StreamingPipeline non-null AST check");
  });

  return {
    passed: failures.length === 0,
    testCount,
    failures,
  };
}
