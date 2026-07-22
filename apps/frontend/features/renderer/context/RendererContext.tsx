"use client";

import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { RendererContextState, ThemeTokens, WidgetEvent } from "../types/renderer";
import { ThemeEngine } from "../theme/themeEngine";
import { DARK_GLASS_THEME } from "../theme/themePresets";

const RendererContext = createContext<RendererContextState | undefined>(undefined);

interface RendererProviderProps {
  children: ReactNode;
  initialThemeId?: string;
  onWidgetEvent?: (event: WidgetEvent) => void;
}

/**
 * RendererProvider - Manages pure UI selection, hover, focus, theme tokens, and event dispatching.
 */
export function RendererProvider({
  children,
  initialThemeId = "dark-glass",
  onWidgetEvent,
}: RendererProviderProps) {
  const [activeTheme, setActiveTheme] = useState<ThemeTokens>(ThemeEngine.getTheme(initialThemeId));
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [hoveredWidgetId, setHoveredWidgetId] = useState<string | null>(null);
  const [focusedWidgetId, setFocusedWidgetId] = useState<string | null>(null);
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const setTheme = (themeId: string) => {
    const newTheme = ThemeEngine.getTheme(themeId);
    setActiveTheme(newTheme);
  };

  const dispatchWidgetEvent = (event: WidgetEvent) => {
    if (event.eventType === "onSelect") {
      setSelectedWidgetId(event.widgetId);
    }
    onWidgetEvent?.(event);
  };

  const value: RendererContextState = {
    activeTheme,
    selectedWidgetId,
    hoveredWidgetId,
    focusedWidgetId,
    viewportMode,
    isInspectorOpen,
    selectWidget: setSelectedWidgetId,
    hoverWidget: setHoveredWidgetId,
    focusWidget: setFocusedWidgetId,
    setTheme,
    dispatchWidgetEvent,
  };

  return <RendererContext.Provider value={value}>{children}</RendererContext.Provider>;
}

export function useRendererContext(): RendererContextState {
  const context = useContext(RendererContext);
  if (!context) {
    throw new Error("useRendererContext must be used within a RendererProvider");
  }
  return context;
}
