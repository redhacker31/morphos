# MorphOS: AI Engine Specification

**Status:** Approved for MVP
**Architecture:** Lightweight Single Orchestrator (No complex multi-agent frameworks for MVP).

---

## 1. Pipeline Overview

**User Prompt** 
↓ 
**Prompt Builder (Context Injection)** 
↓ 
**OpenAI `gpt-4o` (Structured Output)** 
↓ 
**Zod JSON Validation** 
↓ 
**Convex Storage** 
↓ 
**Dynamic Renderer**

---

## 2. Responsibilities
- Parse natural language into strict JSON AST.
- Preserve existing AST structure when modifying (e.g., adding a single chart to a complex dashboard).
- Guarantee valid JSON syntax.

---

## 3. Prompt Templates

### System Prompt
```text
You are MorphOS, a deterministic UI engine.
Your sole job is to translate user requests into a strict JSON Abstract Syntax Tree (AST).
You do NOT output markdown, explanations, or conversational text.
You only output valid JSON that strictly matches the provided JSON Schema.
```

### Context Injection (For Modifying Apps)
```text
Current Application AST:
{current_json_ast}

User Request: {user_prompt}

INSTRUCTIONS:
Preserve all existing widgets.
Append or modify only the widgets required by the User Request.
Return the complete updated AST.
```

### Repair Prompt
```text
Your previous JSON output failed Zod validation.
Error: {zod_error_message}
Fix the JSON structure and return the corrected AST.
```

---

## 4. OpenAI Structured Outputs

- **Model:** `gpt-4o-2024-08-06`
- **Temperature:** `0.1` (Strict determinism)
- **response_format:** `{ type: "json_schema", json_schema: { name: "app_schema", schema: ZodToJsonSchema(RootSchema) } }`

---

## 5. Failure Handling & Retry Strategy
1. **Validation Fails:** Catch Zod error in Convex Action.
2. **Attempt 1:** Send Repair Prompt to OpenAI with error context.
3. **Attempt 2:** If it fails again, fallback to `previousVersionId` AST.
4. **User Output:** "I encountered an error building that chart. Please try rephrasing."

---

## 6. Example Modification Flow

**User:** "Add a Burn Rate Chart"
**Context:** Current AST has 2 KPIs.
**Action:** OpenAI receives current AST, adds `{ type: "LineChart", title: "Burn Rate" }` to the `widgets` array, and returns the full AST.
**Storage:** Convex saves as Version 2.
**Realtime:** Next.js instantly renders the new chart.
