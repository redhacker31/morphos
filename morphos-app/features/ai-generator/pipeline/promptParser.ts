import type { ApplicationDomainIntent, ExtractedRequirements } from "../types/aiGenerator";

/**
 * PromptParser - Intent Recognition & Requirements Extractor.
 * Parses raw natural language user prompts and extracts domain classification,
 * business goals, entities, metrics, forms, reports, navigation, roles, workflows, and theme preferences.
 */
export class PromptParser {
  public static parse(rawPrompt: string): ExtractedRequirements {
    // Prompt Normalization
    const prompt = rawPrompt.trim();
    const lower = prompt.toLowerCase();

    // Domain Intent Classification
    let domain: ApplicationDomainIntent = "general-dashboard";
    let themePreference: "dark-glass" | "high-contrast-light" | "cyberpunk-neon" = "dark-glass";

    const isFinance = lower.includes("finance") || lower.includes("revenue") || lower.includes("cash") || lower.includes("ebitda") || lower.includes("profit") || lower.includes("financial");
    const isCrm = lower.includes("crm") || lower.includes("sales") || lower.includes("pipeline") || lower.includes("lead") || lower.includes("deal") || lower.includes("customer");
    const isErp = lower.includes("erp") || lower.includes("enterprise resource") || lower.includes("supply chain") || lower.includes("manufacturing");

    if (isCrm && isFinance) {
      domain = "mixed-application";
    } else if (isErp) {
      domain = "erp-system";
    } else if (isFinance) {
      domain = "financial-analytics";
      themePreference = "cyberpunk-neon";
    } else if (isCrm) {
      domain = "sales-crm";
    } else if (lower.includes("inventory") || lower.includes("sku") || lower.includes("stock") || lower.includes("logistics") || lower.includes("warehouse")) {
      domain = "inventory-logistics";
    } else if (lower.includes("admin") || lower.includes("cluster") || lower.includes("cpu") || lower.includes("server") || lower.includes("security") || lower.includes("infrastructure")) {
      domain = "admin-infrastructure";
    } else if (lower.includes("hr") || lower.includes("headcount") || lower.includes("employee") || lower.includes("staff") || lower.includes("payroll")) {
      domain = "hr-portal";
    } else if (lower.includes("hospital") || lower.includes("patient") || lower.includes("triage") || /\ber\b/.test(lower) || lower.includes("medical") || lower.includes("clinic")) {
      domain = "hospital-triage";
    } else if (lower.includes("school") || lower.includes("education") || lower.includes("course") || lower.includes("student") || lower.includes("academic")) {
      domain = "education-portal";
    } else if (lower.includes("project") || lower.includes("sprint") || lower.includes("jira") || lower.includes("task") || lower.includes("scrum") || lower.includes("kanban")) {
      domain = "project-management";
    } else if (lower.includes("portfolio") || lower.includes("crypto") || lower.includes("asset") || lower.includes("stock") || lower.includes("investment")) {
      domain = "portfolio-tracker";
    }

    // Requirements & Feature Detection
    const hasCharts = lower.includes("chart") || lower.includes("graph") || lower.includes("trend") || lower.includes("bar") || lower.includes("line") || lower.includes("pie") || lower.includes("funnel");
    const hasTables = lower.includes("table") || lower.includes("ledger") || lower.includes("list") || lower.includes("record") || lower.includes("grid");
    const hasMetrics = lower.includes("metric") || lower.includes("kpi") || lower.includes("stat") || lower.includes("total") || lower.includes("count") || lower.includes("revenue") || lower.includes("arr");
    const hasForms = lower.includes("form") || lower.includes("input") || lower.includes("entry") || lower.includes("onboarding") || lower.includes("create") || lower.includes("add");

    // Entity & Workflow Extraction
    const entities: string[] = [];
    if (lower.includes("customer") || lower.includes("account")) entities.push("Customer");
    if (lower.includes("deal") || lower.includes("opportunity")) entities.push("Deal");
    if (lower.includes("employee") || lower.includes("staff")) entities.push("Employee");
    if (lower.includes("sku") || lower.includes("item")) entities.push("SKU");
    if (lower.includes("patient")) entities.push("Patient");
    if (lower.includes("student")) entities.push("Student");
    if (entities.length === 0) entities.push("Record");

    const businessGoals: string[] = [
      `Optimize ${domain.replace("-", " ")} efficiency`,
      "Provide real-time operational visibility",
    ];

    const metrics: string[] = hasMetrics ? ["ARR", "Conversion Rate", "Volume", "Total Active Count"] : [];
    const forms: string[] = hasForms ? ["Entity Entry Form", "Filter Form"] : [];
    const reports: string[] = hasCharts ? ["Performance Trend Report", "Distribution Summary"] : [];
    const dashboards: string[] = ["Executive Overview", "Operational Detail"];
    const navigation: string[] = ["Overview", "Analytics", "Records", "Settings"];
    const userRoles: string[] = ["Admin", "Manager", "Analyst"];
    const workflows: string[] = lower.includes("onboarding") ? ["Onboarding Workflow"] : ["Approval Workflow"];

    // Title Generation
    const titleWords = prompt.split(" ").slice(0, 5).join(" ");
    const generatedTitle = titleWords.length > 0 ? titleWords.charAt(0).toUpperCase() + titleWords.slice(1) : "Generated Application";

    // Requested Widgets mapping strictly to presentational widget types
    const requestedWidgets: string[] = [
      "hero-banner",
      ...(hasMetrics ? ["metric-card", "stat-grid"] : ["metric-card"]),
      ...(hasCharts ? ["bar-chart", "line-chart"] : ["line-chart"]),
      ...(hasTables ? ["data-table"] : []),
      ...(hasForms ? ["form-container", "button"] : []),
    ];

    return {
      domain,
      title: generatedTitle,
      description: `AI-Generated ${domain.toUpperCase().replace("-", " ")} Application from prompt: "${prompt.slice(0, 60)}..."`,
      businessGoals,
      entities,
      metrics,
      forms,
      reports,
      dashboards,
      navigation,
      userRoles,
      workflows,
      hasCharts,
      hasTables,
      hasMetrics,
      hasForms,
      themePreference,
      requestedWidgets,
    };
  }
}
