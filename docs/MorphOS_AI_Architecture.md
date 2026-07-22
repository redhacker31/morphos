# MorphOS: Phase 3 AI Application Generation Engine Architecture

**Document Version:** 1.1.0-ENTERPRISE-FROZEN  
**Status:** APPROVED & PERMANENTLY LOCKED  
**Author:** Chief AI Architect, Principal LLM Systems Engineer, Principal Software Architect  
**Target Repository:** `MorphOS`  

---

## 1. Executive Summary

The Phase 3 AI Application Generation Engine for MorphOS converts natural language user prompts into validated, structured `AppSchemaAST` (JSON) blueprints ready for immediate execution by the Phase 2 Dynamic Renderer.

**Strict Architectural Directives Enforced:**
1. **Zero React/JSX/HTML/CSS Generation:** The AI Engine ONLY emits structured JSON `AppSchemaAST`.
2. **Zero Renderer Modification:** Preserves Phase 0 Design Tokens, Phase 1 AppShell, and Phase 2 Dynamic Renderer without changes.
3. **Exclusive Widget & Layout Registry Usage:** All widget selections originate exclusively from the presentational Widget Registry (22 widgets) and Layout Engine.

---

## 2. Core Philosophy & Pipeline Architecture

```
Prompt 
  ↓ 
Prompt Parser (Normalization & Feature Extraction)
  ↓ 
Intent Recognition & Requirements Extraction
  ↓ 
Application Planner (Layout, Widget, Theme Planners)
  ↓ 
Planner Trace & Operational Metrics Generation
  ↓ 
AST Generator (Structured Blueprint Synthesis)
  ↓ 
AST Gatekeeper & Validation Layer (Zod AppSchemaAST)
  ↓ 
AST Repair Engine (Auto-Repair up to N Retries)
  ↓ 
Dynamic Renderer (Phase 2 Execution Engine)
```

---

## 3. Module Specification

### 3.1 AI Provider Layer (`providers/`)
- **`baseProvider.ts`**: `ILLMProvider` interface.
- **Providers**: `OpenAIProvider`, `AnthropicProvider`, `GeminiProvider`, `OpenRouterProvider`, `OllamaProvider`, `MockLLMProvider`.
- **`providerRegistry.ts`**: Dynamic provider registration and active selection with automatic zero-config offline fallback.

### 3.2 Prompt Processing & Intent Recognition (`pipeline/promptParser.ts`)
- Normalizes prompts and extracts intent across 12 domain categories (`sales-crm`, `financial-analytics`, `hr-portal`, `inventory-logistics`, `hospital-triage`, `education-portal`, `admin-infrastructure`, `project-management`, `portfolio-tracker`, `erp-system`, `general-dashboard`, `mixed-application`).
- Extracts business goals, entities, metrics, forms, reports, navigation, user roles, and workflows.

### 3.3 Planners (`pipeline/`)
- **`LayoutPlanner`**: Selects layout types (`dashboard`, `grid`, `flex`, `sidebar-main`, `single-column`, `container`).
- **`WidgetPlanner`**: Selects presentational widgets exclusively from Widget Registry (`metric-card`, `stat-grid`, `bar-chart`, `line-chart`, `pie-chart`, `data-table`, `form-container`, `input`, `button`, `alert`, `progress`, `badge`, `container`).
- **`ThemePlanner`**: Determines theme presets (`dark-glass`, `high-contrast-light`, `cyberpunk-neon`), glass profiles, and color palettes.
- **`ApplicationPlanner`**: Composes layout, widget, and theme planners into a coherent blueprint emitting zero UI code.

### 3.4 Explainability & Monitoring (`types/aiGenerator.ts`)
- **`PlannerTrace`**: Captures reasoning logs, intent classification rationale, widget choices, layout strategy, and timestamp for explainability and debugging.
- **`GenerationMetrics`**: Records execution timing (`planningTimeMs`, `synthesisTimeMs`, `validationTimeMs`, `totalTimeMs`), repair attempt count, confidence scores, and token estimates.

### 3.5 AST Generator, Validation & Repair (`pipeline/`)
- **`ASTGenerator`**: Synthesizes recursive `AppASTPayload` objects with version metadata.
- **`ASTRepairEngine`**: Diagnoses schema errors, normalizes missing attributes, and re-validates up to `maxRetries`.
- **`StreamingPipeline`**: Coordinates 7 incremental stage-by-stage updates (`Intent` $\rightarrow$ `Planning` $\rightarrow$ `Layout` $\rightarrow$ `Widgets` $\rightarrow$ `AST` $\rightarrow$ `Validation` $\rightarrow$ `Ready`).

---

## 4. Phase 4 Evolution Engine Integration Roadmap

As MorphOS transitions from Phase 3 to Phase 4, the clean architectural separation between creation and evolution is strictly preserved:

- **Phase 3 (Generation Engine):** `Prompt → AST` (Creates new applications)
- **Phase 4 (Evolution Engine):** `AST + Prompt → AST Diff → Patched AST` (Evolves existing applications via patch operations)
