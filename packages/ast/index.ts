import { z } from "zod";

// Grid Position Zod Schema
export const GridPositionSchema = z.object({
  x: z.number().min(0).max(12),
  y: z.number().min(0),
  w: z.number().min(1).max(12),
  h: z.number().min(1),
});

export type GridPosition = z.infer<typeof GridPositionSchema>;

// Widget Node Zod Schema
export const WidgetNodeASTSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string().optional(),
  gridPosition: GridPositionSchema,
  props: z.record(z.string(), z.unknown()).default({}),
  children: z.array(z.lazy(() => WidgetNodeASTSchema)).optional(),
});

export type WidgetNodeAST = z.infer<typeof WidgetNodeASTSchema>;

// Layout Zod Schema
export const LayoutASTSchema = z.object({
  type: z.enum(["dashboard", "sidebar-main", "grid-tight", "full-width", "grid", "flex"]).default("dashboard"),
  columns: z.number().default(12),
  gap: z.number().default(16),
});

export type LayoutAST = z.infer<typeof LayoutASTSchema>;

// App Metadata Zod Schema
export const AppASTMetaSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  theme: z.string().default("dark-glass"),
  domain: z.string().optional(),
  version: z.string().default("1.0.0"),
});

export type AppASTMeta = z.infer<typeof AppASTMetaSchema>;

// Root AppSchemaAST Payload Schema
export const AppSchemaAST = z.object({
  version: z.string().default("1.0.0"),
  meta: AppASTMetaSchema,
  layout: LayoutASTSchema,
  nodes: z.array(WidgetNodeASTSchema),
});

export type AppASTPayload = z.infer<typeof AppSchemaAST>;
