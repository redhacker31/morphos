import { z } from "zod";

export const GridPositionSchema = z.object({
  x: z.number().min(0),
  y: z.number().min(0),
  w: z.number().min(1).max(12),
  h: z.number().min(1),
});

export type WidgetASTNode = {
  id: string;
  type: string;
  title?: string;
  description?: string;
  gridPosition?: { x: number; y: number; w: number; h: number };
  props?: {
    title?: string;
    description?: string;
    data?: unknown;
    config?: Record<string, unknown>;
    [key: string]: unknown;
  };
  children?: WidgetASTNode[];
};

export const WidgetNodeASTSchema: z.ZodType<WidgetASTNode> = z.lazy(() =>
  z.object({
    id: z.string().uuid(),
    type: z.string().min(1),
    title: z.string().optional(),
    description: z.string().optional(),
    gridPosition: GridPositionSchema.optional(),
    props: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        data: z.unknown().optional(),
        config: z.record(z.string(), z.unknown()).default({}),
      })
      .default({ config: {} }),
    children: z.array(WidgetNodeASTSchema).optional(),
  })
);

export const LayoutASTSchema = z.object({
  type: z.enum(["grid", "flex", "sidebar-main", "single-column", "dashboard", "container"]),
  columns: z.number().min(1).max(12).default(12),
  gap: z.number().min(0).default(16),
});

export const AppSchemaAST = z.object({
  version: z.literal("1.0.0"),
  meta: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    theme: z.string().default("dark-glass"),
  }),
  layout: LayoutASTSchema,
  nodes: z.array(WidgetNodeASTSchema).min(1),
});

export type AppASTPayload = z.infer<typeof AppSchemaAST>;
export type LayoutASTConfig = z.infer<typeof LayoutASTSchema>;
