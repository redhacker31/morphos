
import React from "react";
import type { WidgetASTNode } from "../schema/astSchema";
import type { WidgetEvent } from "../types/renderer";
import { WidgetFactory } from "../factory/widgetFactory";
import { WidgetErrorBoundary } from "../errors/WidgetErrorBoundary";

interface FlexLayoutProps {
  nodes: WidgetASTNode[];
  gap?: number;
  onWidgetEvent?: (event: WidgetEvent) => void;
}

export function FlexLayout({ nodes, gap = 16, onWidgetEvent }: FlexLayoutProps) {
  return (
    <div
      className="flex flex-wrap w-full items-stretch"
      style={{ gap: `${gap}px` }}
    >
      {nodes.map((node) => (
        <div key={node.id} className="flex-1 min-w-[280px]">
          <WidgetErrorBoundary widgetId={node.id}>
            <WidgetFactory node={node} onWidgetEvent={onWidgetEvent} />
          </WidgetErrorBoundary>
        </div>
      ))}
    </div>
  );
}
