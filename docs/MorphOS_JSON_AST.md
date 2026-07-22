# MorphOS: JSON AST Specification

**Status:** Approved for MVP
**Purpose:** This document defines the exact JSON AST contract shared between the AI Engine, the Convex Database, and the Dynamic Renderer.

---

## 1. Root Schema

**Purpose:** The top-level wrapper for an entire generated application.

**JSON Schema / Zod Types:**
```typescript
const RootSchema = z.object({
  version: z.literal("1.0"),
  metadata: z.object({
    title: z.string(),
    theme: z.enum(["dark", "light", "glass"]),
  }),
  layout: LayoutSchema,
  dataSources: z.array(DataSourceSchema).optional(),
  pages: z.array(PageSchema)
});
```

**Required Fields:** `version`, `metadata`, `layout`, `pages`
**Default Values:** `version: "1.0"`, `theme: "glass"`

---

## 2. Page Object

**Purpose:** Defines a single viewable screen (e.g., "Dashboard", "Settings").

**Properties:**
```json
{
  "id": "page_123",
  "title": "Main Dashboard",
  "route": "/",
  "widgets": ["w_kpi_rev", "w_kpi_exp", "w_chart_burn"]
}
```

---

## 3. Widget Object

**Purpose:** The building blocks of the UI. Maps directly to React components.

**Properties:**
```typescript
const WidgetSchema = z.object({
  id: z.string(),
  type: z.enum(["KpiCard", "LineChart", "PieChart", "Table", "Sidebar", "Navbar", "AiChat", "Button", "Input", "Modal"]),
  props: z.record(z.any()), // Component specific
  layoutParams: z.object({
    colSpan: z.number().min(1).max(12),
    rowSpan: z.number().optional()
  }),
  bindings: z.record(z.string()).optional() // Maps prop names to DataSource IDs
});
```

**Example:**
```json
{
  "id": "w_chart_burn",
  "type": "LineChart",
  "props": {
    "title": "Burn Rate",
    "color": "#FF4D4D"
  },
  "layoutParams": { "colSpan": 8 },
  "bindings": { "data": "ds_burn_rate" }
}
```

---

## 4. Supported MVP Widgets

### KPI Card
- **Props:** `title` (string), `value` (number), `trend` ("up" | "down"), `trendText` (string)
- **Default:** `trend: "up"`

### Line Chart & Pie Chart
- **Props:** `title` (string), `labels` (array of strings), `datasets` (array of objects with `data` arrays).
- **Validation:** Arrays must match length.

### Table
- **Props:** `headers` (array of strings), `rows` (array of arrays containing strings).
- **Validation:** Row lengths must match header length.

---

## 5. DataSource Object

**Purpose:** Defines how a widget fetches data dynamically.

**JSON Schema:**
```json
{
  "id": "ds_burn_rate",
  "type": "convex_query",
  "queryName": "getFinancialData",
  "params": { "metric": "burn_rate" }
}
```

---

## 6. Error Cases & Validation
- **Missing Widget ID:** Renderer ignores widget.
- **Invalid Widget Type:** Renders `<ErrorBoundary fallback="Invalid Component" />`.
- **Zod Validation Failure:** Rejected before saving to Convex. Repair Agent is triggered.
