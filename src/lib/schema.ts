import { z } from "zod";

// ─── Widget Types ───────────────────────────────────────────────────────────
export const WidgetTypeEnum = z.enum([
  "KpiCard",
  "LineChart",
  "PieChart",
  "BarChart",
  "Table",
  "Sidebar",
  "Navbar",
  "Button",
  "Input",
  "Modal",
  "AiChat",
  "StatCard",
  "MetricCard",
  "Text",
  "Heading",
  "Divider",
  "Section",
  "Container",
]);

export type WidgetType = z.infer<typeof WidgetTypeEnum>;

// ─── Layout Schema ──────────────────────────────────────────────────────────
export const LayoutSchema = z.object({
  type: z.enum(["grid", "flex", "stack"]).default("grid"),
  columns: z.number().min(1).max(12).default(12),
  gap: z.string().default("1.5rem"),
  padding: z.string().optional(),
  align: z.enum(["start", "center", "end", "stretch"]).optional(),
  justify: z.enum(["start", "center", "end", "between", "around"]).optional(),
});

export type Layout = z.infer<typeof LayoutSchema>;

// ─── Event Schema ───────────────────────────────────────────────────────────
export const EventSchema = z.object({
  trigger: z.enum(["click", "submit", "change", "hover"]),
  action: z.string(),
  payload: z.record(z.string(), z.unknown()).optional(),
});

export type WidgetEvent = z.infer<typeof EventSchema>;

// ─── Widget Node (Recursive) ───────────────────────────────────────────────
export const WidgetNodeSchema: z.ZodType<WidgetNode> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: WidgetTypeEnum,
    props: z.record(z.string(), z.unknown()).default({}),
    layout: LayoutSchema.optional(),
    children: z.array(WidgetNodeSchema).optional(),
    events: z.array(EventSchema).optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })
);

export interface WidgetNode {
  id: string;
  type: WidgetType;
  props: Record<string, unknown>;
  layout?: Layout;
  children?: WidgetNode[];
  events?: WidgetEvent[];
  metadata?: Record<string, unknown>;
}

// ─── Application Schema (Root) ──────────────────────────────────────────────
export const AppSchema = z.object({
  version: z.string().default("1.0"),
  metadata: z.object({
    title: z.string(),
    description: z.string().optional(),
    theme: z.enum(["dark", "light", "glass"]).default("dark"),
    generatedAt: z.string().optional(),
  }),
  layout: LayoutSchema.default({ type: "grid", columns: 12, gap: "1.5rem" }),
  widgets: z.array(WidgetNodeSchema),
});

export type AppSchemaType = z.infer<typeof AppSchema>;

// ─── Validation Helper ──────────────────────────────────────────────────────
export interface ValidationResult {
  success: boolean;
  data?: AppSchemaType;
  errors?: z.ZodError["issues"];
}

export function validateAppSchema(input: unknown): ValidationResult {
  const result = AppSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error.issues };
}
