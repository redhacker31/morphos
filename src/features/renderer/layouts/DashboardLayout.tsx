import React from "react";
import { motion } from "framer-motion";
import type { WidgetASTNode } from "../schema/astSchema";
import type { WidgetEvent } from "../types/renderer";
import { WidgetFactory } from "../factory/widgetFactory";
import { WidgetErrorBoundary } from "../errors/WidgetErrorBoundary";

interface DashboardLayoutProps {
  nodes: WidgetASTNode[];
  gap?: number;
  onWidgetEvent?: (event: WidgetEvent) => void;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function DashboardLayout({ nodes, gap = 16, onWidgetEvent }: DashboardLayoutProps) {
  // Separate top-level hero/text blocks from secondary metric/chart cards
  const heroNodes = nodes.filter((n) => n.type === "hero-banner" || n.type === "text-block");
  const gridNodes = nodes.filter((n) => n.type !== "hero-banner" && n.type !== "text-block");

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner Area */}
      {heroNodes.length > 0 && (
        <div className="space-y-4 w-full">
          {heroNodes.map((node, idx) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: Math.min(idx * 0.05, 0.3) }}
            >
              <WidgetErrorBoundary widgetId={node.id}>
                <WidgetFactory node={node} onWidgetEvent={onWidgetEvent} />
              </WidgetErrorBoundary>
            </motion.div>
          ))}
        </div>
      )}

      {/* Multi-Card Dashboard Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 w-full"
        style={{ gap: `${gap}px` }}
      >
        {gridNodes.map((node, idx) => {
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
    </div>
  );
}
