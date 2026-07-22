"use client";

import React from "react";
import type { WidgetASTNode } from "../schema/astSchema";
import type { WidgetEvent } from "../types/renderer";
import { WidgetFactory } from "../factory/widgetFactory";
import { WidgetErrorBoundary } from "../errors/WidgetErrorBoundary";

interface DashboardLayoutProps {
  nodes: WidgetASTNode[];
  gap?: number;
  onWidgetEvent?: (event: WidgetEvent) => void;
}

export function DashboardLayout({ nodes, gap = 16, onWidgetEvent }: DashboardLayoutProps) {
  // Separate top-level hero/text blocks from secondary metric/chart cards
  const heroNodes = nodes.filter((n) => n.type === "hero-banner" || n.type === "text-block");
  const gridNodes = nodes.filter((n) => n.type !== "hero-banner" && n.type !== "text-block");

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner Area */}
      {heroNodes.length > 0 && (
        <div className="space-y-4 w-full">
          {heroNodes.map((node) => (
            <WidgetErrorBoundary key={node.id} widgetId={node.id}>
              <WidgetFactory node={node} onWidgetEvent={onWidgetEvent} />
            </WidgetErrorBoundary>
          ))}
        </div>
      )}

      {/* Multi-Card Dashboard Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 w-full"
        style={{ gap: `${gap}px` }}
      >
        {gridNodes.map((node) => {
          const colSpan = Math.min(12, Math.max(1, node.gridPosition?.w ?? 6));
          return (
            <div
              key={node.id}
              style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
              className="w-full"
            >
              <WidgetErrorBoundary widgetId={node.id}>
                <WidgetFactory node={node} onWidgetEvent={onWidgetEvent} />
              </WidgetErrorBoundary>
            </div>
          );
        })}
      </div>
    </div>
  );
}
