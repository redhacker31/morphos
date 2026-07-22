import type { AppASTPayload } from "../../renderer/schema/astSchema";

/**
 * Domain Intent Classification
 */
export type ApplicationDomainIntent =
  | "sales-crm"
  | "financial-analytics"
  | "hr-portal"
  | "inventory-logistics"
  | "hospital-triage"
  | "education-portal"
  | "admin-infrastructure"
  | "project-management"
  | "general-dashboard"
  | "portfolio-tracker"
  | "erp-system"
  | "mixed-application";

/**
 * Extracted User Requirements
 */
export interface ExtractedRequirements {
  domain: ApplicationDomainIntent;
  title: string;
  description: string;
  businessGoals: string[];
  entities: string[];
  metrics: string[];
  forms: string[];
  reports: string[];
  dashboards: string[];
  navigation: string[];
  userRoles: string[];
  workflows: string[];
  hasCharts: boolean;
  hasTables: boolean;
  hasMetrics: boolean;
  hasForms: boolean;
  themePreference: "dark-glass" | "high-contrast-light" | "cyberpunk-neon";
  requestedWidgets: string[];
}

/**
 * Structured Planner Trace for Explainability & Debugging
 */
export interface PlannerTrace {
  intent: ApplicationDomainIntent;
  layout: string;
  theme: string;
  widgetSelection: string[];
  reasoning: string[];
  timestamp: string;
}

/**
 * Detailed Operational Planning Metrics
 */
export interface GenerationMetrics {
  planningTimeMs: number;
  synthesisTimeMs: number;
  validationTimeMs: number;
  totalTimeMs: number;
  repairCount: number;
  confidenceScore: number;
  tokensEstimated: number;
}

/**
 * Stage-by-Stage Streaming Generation Progress
 */
export interface GenerationProgress {
  stage: "Intent" | "Planning" | "Layout" | "Widgets" | "AST" | "Validation" | "Repair" | "Ready" | "Error";
  percent: number;
  message: string;
}

/**
 * Multi-Dimension Confidence Metric Scores
 */
export interface ConfidenceScores {
  intentConfidence: number;   // 0.0 to 1.0
  layoutConfidence: number;   // 0.0 to 1.0
  widgetConfidence: number;   // 0.0 to 1.0
  themeConfidence: number;    // 0.0 to 1.0
  overallConfidence: number;  // 0.0 to 1.0
}

/**
 * AI Diagnostics Summary
 */
export interface AIDiagnostics {
  warnings: string[];
  assumptions: string[];
  suggestions: string[];
  missingInformation: string[];
  potentialImprovements: string[];
}

/**
 * Complete Generation Result Payload
 */
export interface AIGenerationResult {
  success: boolean;
  ast: AppASTPayload | null;
  requirements: ExtractedRequirements | null;
  confidence: ConfidenceScores;
  diagnostics: AIDiagnostics;
  trace?: PlannerTrace;
  metrics?: GenerationMetrics;
  generationTimeMs: number;
  providerUsed: string;
  errors: string[];
}
