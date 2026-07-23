
import React from "react";
import type { WidgetASTNode } from "../schema/astSchema";
import type { WidgetEvent } from "../types/renderer";
import { WidgetFactory } from "../factory/widgetFactory";
import { WidgetErrorBoundary } from "../errors/WidgetErrorBoundary";

interface SingleColumnLayoutProps {
  nodes: WidgetASTNode[];
  gap?: number;
  onWidgetEvent?: (event: WidgetEvent) => void;
}

export function SingleColumnLayout({ nodes, gap = 16, onWidgetEvent }: SingleColumnLayoutProps) {
  return (
    <div className="flex flex-col w-full" style={{ gap: `${gap}px` }}>
      {nodes.map((node) => (
        <div key={node.id} className="w-full">
          <WidgetErrorBoundary widgetId={node.id}>
            <WidgetFactory node={node} onWidgetEvent={onWidgetEvent} />
          </WidgetErrorBoundary>
        </div>
      ))}
    </div>
  );
}
