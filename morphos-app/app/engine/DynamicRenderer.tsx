"use client";
/* eslint-disable react-hooks/static-components */

import React, { Suspense, useMemo } from "react";
import type { WidgetNode } from "@/lib/schema";
import { validateAppSchema } from "@/lib/schema";
import type { AppSchemaType } from "@/lib/schema";
import { componentRegistry } from "./ComponentRegistry";
import { WidgetErrorBoundary } from "./WidgetErrorBoundary";
import { AnimationWrapper } from "./AnimationWrapper";

// ─── Layout Resolver ────────────────────────────────────────────────────────
function resolveLayoutStyles(node: WidgetNode): React.CSSProperties {
  const layout = node.layout;
  if (!layout) return {};

  const styles: React.CSSProperties = {};

  if (layout.type === "grid") {
    styles.display = "grid";
    styles.gridTemplateColumns = `repeat(${layout.columns ?? 12}, 1fr)`;
    styles.gap = layout.gap ?? "1.5rem";
  } else if (layout.type === "flex") {
    styles.display = "flex";
    styles.gap = layout.gap ?? "1.5rem";
    styles.flexWrap = "wrap";
  } else if (layout.type === "stack") {
    styles.display = "flex";
    styles.flexDirection = "column";
    styles.gap = layout.gap ?? "1rem";
  }

  if (layout.padding) styles.padding = layout.padding;

  return styles;
}

// ─── Single Widget Renderer ─────────────────────────────────────────────────
interface WidgetRendererProps {
  node: WidgetNode;
  index: number;
  depth: number;
}

function WidgetRenderer({ node, index, depth }: WidgetRendererProps) {
  if (depth > 15) {
    return (
      <div className="widget-error-card" style={{
        background: "rgba(255, 77, 77, 0.1)",
        border: "1px solid rgba(255, 77, 77, 0.3)",
        borderRadius: "12px",
        padding: "1rem",
        color: "#FF4D4D",
        fontSize: "0.85rem",
      }}>
        <strong>Security Error:</strong> Maximum nesting depth exceeded.
      </div>
    );
  }

  const Component = componentRegistry.get(node.type);

  if (!Component) {
    return (
      <div className="widget-error-card" style={{
        background: "rgba(255, 77, 77, 0.1)",
        border: "1px solid rgba(255, 77, 77, 0.3)",
        borderRadius: "12px",
        padding: "1rem",
        color: "#FF4D4D",
        fontSize: "0.85rem",
      }}>
        <strong>Unknown widget:</strong> <code>{node.type}</code>
      </div>
    );
  }

  const renderedChildren = node.children?.map((child, i) => (
    <WidgetRenderer key={child.id} node={child} index={i} depth={depth + 1} />
  ));

  const layoutStyles = node.children ? resolveLayoutStyles(node) : {};

  return (
    <WidgetErrorBoundary widgetId={node.id} widgetType={node.type}>
      <AnimationWrapper index={index} depth={depth}>
        <Suspense fallback={<WidgetSkeleton />}>
          <Component
            {...(node.props as Record<string, unknown>)}
            widgetId={node.id}
            events={node.events}
            metadata={node.metadata}
          >
            {renderedChildren && renderedChildren.length > 0 ? (
              <div style={layoutStyles}>{renderedChildren}</div>
            ) : null}
          </Component>
        </Suspense>
      </AnimationWrapper>
    </WidgetErrorBoundary>
  );
}

// ─── Skeleton Loader ────────────────────────────────────────────────────────
function WidgetSkeleton() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      borderRadius: "16px",
      height: "200px",
      animation: "pulse 2s ease-in-out infinite",
    }} />
  );
}

// ─── DynamicRenderer (Public API) ───────────────────────────────────────────
interface DynamicRendererProps {
  schema: unknown;
  onError?: (errors: unknown) => void;
}

export function DynamicRenderer({ schema, onError }: DynamicRendererProps) {
  const validated = useMemo(() => validateAppSchema(schema), [schema]);

  if (!validated.success) {
    if (onError) onError(validated.errors);
    return (
      <div style={{
        background: "rgba(255, 77, 77, 0.08)",
        border: "1px solid rgba(255, 77, 77, 0.2)",
        borderRadius: "16px",
        padding: "2rem",
        margin: "2rem",
      }}>
        <h3 style={{ color: "#FF4D4D", marginBottom: "1rem" }}>⚠️ Schema Validation Failed</h3>
        <pre style={{ color: "#A1A1AA", fontSize: "0.8rem", overflow: "auto" }}>
          {JSON.stringify(validated.errors, null, 2)}
        </pre>
      </div>
    );
  }

  const app = validated.data as AppSchemaType;
  const rootLayout = resolveLayoutStyles({ id: "root", type: "Container", props: {}, layout: app.layout });

  return (
    <div className="morphos-dynamic-root">
      <div className="main-header progressive-reveal revealed">
        <h2>{app.metadata.title}</h2>
        <div className="header-badges">
          <div className="ai-generated-badge">
            <i className="ph ph-sparkle" style={{ color: "var(--secondary)" }}></i>
            AI Generated
            <span className="divider">|</span>
            Theme: {app.metadata.theme}
          </div>
        </div>
      </div>
      <div style={rootLayout}>
        {app.widgets.map((widget, i) => (
          <WidgetRenderer key={widget.id} node={widget} index={i} depth={0} />
        ))}
      </div>
    </div>
  );
}
