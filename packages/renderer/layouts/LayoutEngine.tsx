"use client";

import React from "react";
import type { LayoutASTConfig, WidgetASTNode } from "../schema/astSchema";
import type { WidgetEvent } from "../types/renderer";
import { GridLayout } from "./GridLayout";
import { FlexLayout } from "./FlexLayout";
import { SidebarMainLayout } from "./SidebarMainLayout";
import { SingleColumnLayout } from "./SingleColumnLayout";
import { DashboardLayout } from "./DashboardLayout";

interface LayoutEngineProps {
  layoutConfig: LayoutASTConfig;
  nodes: WidgetASTNode[];
  onWidgetEvent?: (event: WidgetEvent) => void;
}

/**
 * LayoutEngine - Strategy Dispatcher for MorphOS Dynamic Layouts.
 */
export function LayoutEngine({ layoutConfig, nodes, onWidgetEvent }: LayoutEngineProps) {
  const { type, columns = 12, gap = 16 } = layoutConfig;

  switch (type) {
    case "flex":
      return <FlexLayout nodes={nodes} gap={gap} onWidgetEvent={onWidgetEvent} />;
    case "sidebar-main":
      return <SidebarMainLayout nodes={nodes} gap={gap} onWidgetEvent={onWidgetEvent} />;
    case "single-column":
      return <SingleColumnLayout nodes={nodes} gap={gap} onWidgetEvent={onWidgetEvent} />;
    case "dashboard":
      return <DashboardLayout nodes={nodes} gap={gap} onWidgetEvent={onWidgetEvent} />;
    case "grid":
    default:
      return <GridLayout nodes={nodes} columns={columns} gap={gap} onWidgetEvent={onWidgetEvent} />;
  }
}
