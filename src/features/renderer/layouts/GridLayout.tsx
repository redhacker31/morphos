import React from "react";
import { motion } from "framer-motion";
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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function GridLayout({
  nodes,
  columns = 12,
  gap = 16,
  onWidgetEvent,
}: GridLayoutProps) {
  return (
    <div
      className="grid w-full"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap}px`,
      }}
    >
      {nodes.map((node, idx) => {
        const colSpan = Math.min(12, Math.max(1, node.gridPosition?.w ?? 6));
        return (
          <motion.div
            key={node.id}
            style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}
            className="w-full min-h-[180px]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: Math.min(idx * 0.05, 0.4) }}
          >
            <WidgetErrorBoundary widgetId={node.id}>
              <WidgetFactory node={node} onWidgetEvent={onWidgetEvent} />
            </WidgetErrorBoundary>
          </motion.div>
        );
      })}
    </div>
  );
}
