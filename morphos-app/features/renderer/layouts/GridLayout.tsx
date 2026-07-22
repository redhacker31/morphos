"use client";

import React from "react";
import type { WidgetASTNode } from "../schema/astSchema";
import type { WidgetEvent } from "../types/renderer";
import { WidgetFactory } from "../factory/widgetFactory";
import { WidgetErrorBoundary } from "../errors/WidgetErrorBoundary";

interface GridLayoutProps {
  nodes: WidgetASTNode[];
  columns?: number;
  gap?: number;
  onWidgetEvent?: (event: WidgetEvent) => void;
}

export function GridLayout({
  nodes,
  columns = 12,
  gap = 16,
  onWidgetEvent,
}: GridLayoutProps) {
  return (
    <div
      className="grid w-full transition-all duration-300"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap}px`,
      }}
    >
      {nodes.map((node) => {
        const colSpan = Math.min(12, Math.max(1, node.gridPosition?.w ?? 6));
        return (
          <div
            key={node.id}
            style={{
              gridColumn: `span ${colSpan} / span ${colSpan}`,
            }}
            className="w-full min-h-[160px]"
          >
            <WidgetErrorBoundary widgetId={node.id}>
              <WidgetFactory node={node} onWidgetEvent={onWidgetEvent} />
            </WidgetErrorBoundary>
          </div>
        );
      })}
    </div>
  );
}
