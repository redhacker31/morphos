import type { ComponentType } from "react";
import type { z } from "zod";

/**
 * Widget Capability Flags Matrix
 * Declares operational metadata for every registered widget.
 */
export interface WidgetCapabilities {
  editable: boolean;        // Supports prop inline/inspector editing
  resizable: boolean;       // Supports dynamic grid layout resizing
  exportable: boolean;      // Supports CSV/PNG data export
  requiresData: boolean;    // Requires backend/AST data array
  supportsFilters: boolean; // Accepts real-time filter queries
  interactive: boolean;     // Emits click/selection events
  realtimeCapable: boolean; // Supports Convex WebSocket live streaming
}

/**
 * Widget Metadata Schema Contract
 */
export interface WidgetMetadata<TProps = Record<string, unknown>> {
  type: string;             // Unique type string (e.g. "bar-chart", "data-table")
  displayName: string;      // Human-readable widget name
  category: "charts" | "data" | "forms" | "presentation";
  description: string;
  version: string;
  capabilities: WidgetCapabilities;
  defaultConfig: Record<string, unknown>;
  propSchema?: z.ZodSchema<TProps>;
}

/**
 * Widget Registration Record Contract
 */
export interface WidgetRegistryEntry<TProps = Record<string, unknown>> {
  metadata: WidgetMetadata<TProps>;
  component: ComponentType<TProps>;
  lazyLoader?: () => Promise<{ default: ComponentType<TProps> }>;
}

/**
 * Dynamic Widget Registry Interface Contract
 */
export interface IWidgetRegistry {
  register<TProps>(entry: WidgetRegistryEntry<TProps>): void;
  get(type: string): WidgetRegistryEntry | undefined;
  has(type: string): boolean;
  list(): WidgetMetadata[];
}

/**
 * Theme Engine Contract & Tokens
 */
export interface ThemeTokens {
  id: string;
  name: string;
  colors: {
    background: string;
    surface: string;
    surfaceElevated: string;
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
  };
  glass: {
    background: string;
    border: string;
    blur: string;
  };
}

/**
 * Renderer Error Boundary State Contract
 */
export interface WidgetErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  widgetId?: string;
  errorTier: "widget" | "renderer" | "workspace" | "appShell";
}
