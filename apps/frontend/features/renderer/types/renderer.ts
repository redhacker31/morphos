import type { ComponentType } from "react";
import type { z } from "zod";

export interface WidgetEvent<TPayload = any> {
  widgetId: string;
  eventType: "onSelect" | "onChange" | "onSubmit" | "onCellClick" | "onAction";
  timestamp: number;
  payload: TPayload;
}

export interface BaseWidgetProps<TData = any, TConfig = any> {
  id: string;
  title?: string;
  description?: string;
  data?: TData;
  config?: TConfig;
  className?: string;
  onWidgetEvent?: (event: WidgetEvent) => void;
}

export interface WidgetCapabilities {
  editable: boolean;
  resizable: boolean;
  exportable: boolean;
  requiresData: boolean;
  supportsFilters: boolean;
  interactive: boolean;
  realtimeCapable: boolean;
}

export interface WidgetMetadata<TProps = BaseWidgetProps> {
  type: string;
  displayName: string;
  category: "charts" | "data" | "forms" | "presentation";
  description: string;
  version: string;
  capabilities: WidgetCapabilities;
  defaultConfig: Record<string, unknown>;
  defaultData: any;
  propSchema?: z.ZodSchema<TProps>;
}

export interface WidgetRegistryEntry<TProps = BaseWidgetProps> {
  metadata: WidgetMetadata<TProps>;
  component: ComponentType<any>;
  lazyLoader?: () => Promise<{ default: ComponentType<any> }>;
}

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

export interface RendererContextState {
  activeTheme: ThemeTokens;
  selectedWidgetId: string | null;
  hoveredWidgetId: string | null;
  focusedWidgetId: string | null;
  viewportMode: "desktop" | "tablet" | "mobile";
  isInspectorOpen: boolean;
  selectWidget: (id: string | null) => void;
  hoverWidget: (id: string | null) => void;
  focusWidget: (id: string | null) => void;
  setTheme: (themeId: string) => void;
  dispatchWidgetEvent: (event: WidgetEvent) => void;
}

export interface WidgetErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  widgetId?: string;
  errorTier: "widget" | "renderer" | "workspace" | "appShell";
}
