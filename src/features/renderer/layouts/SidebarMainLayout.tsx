
import React from "react";
import type { WidgetASTNode } from "../schema/astSchema";
import type { WidgetEvent } from "../types/renderer";
import { WidgetFactory } from "../factory/widgetFactory";
import { WidgetErrorBoundary } from "../errors/WidgetErrorBoundary";

interface SidebarMainLayoutProps {
  nodes: WidgetASTNode[];
  gap?: number;
  onWidgetEvent?: (event: WidgetEvent) => void;
}

export function SidebarMainLayout({ nodes, gap = 16, onWidgetEvent }: SidebarMainLayoutProps) {
  const sidebarNode = nodes[0];
  const mainNodes = nodes.slice(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 w-full" style={{ gap: `${gap}px` }}>
      {sidebarNode && (
        <div className="lg:col-span-4">
          <WidgetErrorBoundary widgetId={sidebarNode.id}>
            <WidgetFactory node={sidebarNode} onWidgetEvent={onWidgetEvent} />
          </WidgetErrorBoundary>
        </div>
      )}
      <div className="lg:col-span-8 space-y-4">
        {mainNodes.map((node) => (
          <WidgetErrorBoundary key={node.id} widgetId={node.id}>
            <WidgetFactory node={node} onWidgetEvent={onWidgetEvent} />
          </WidgetErrorBoundary>
        ))}
      </div>
    </div>
  );
}
