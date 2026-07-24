
import React, { useMemo } from "react";
import { PipelineOrchestrator } from "./pipeline";
import { LayoutEngine } from "../layouts/LayoutEngine";
import { RendererErrorBoundary } from "../errors/RendererErrorBoundary";
import { RendererProvider } from "../context/RendererContext";
import type { WidgetEvent } from "../types/renderer";
import { AlertTriangle, Sparkles } from "lucide-react";

interface DynamicRendererProps {
  astPayload: unknown;
  onWidgetEvent?: (event: WidgetEvent) => void;
}

/**
 * DynamicRenderer - Source-Agnostic React Rendering Engine for MorphOS.
 * Converts validated JSON AST blueprints into interactive application trees.
 */
export function DynamicRenderer({ astPayload, onWidgetEvent }: DynamicRendererProps) {
  // Execute pipeline strategy
  const pipelineResult = useMemo(() => {
    return PipelineOrchestrator.execute(astPayload);
  }, [astPayload]);

  if (!pipelineResult.success || !pipelineResult.ast) {
    return (
      <div className="w-full rounded-3xl bg-red-500/10 border border-red-500/40 p-8 text-center space-y-4 backdrop-blur-2xl">
        <div className="w-12 h-12 rounded-xl bg-red-500/20 mx-auto flex items-center justify-center text-red-500">
          <AlertTriangle size={24} />
        </div>
        <h3 className="text-lg font-bold text-[var(--text-primary)]">AST Validation Failed</h3>
        <p className="text-xs text-red-600/80 max-w-md mx-auto">
          The provided JSON payload failed pre-render Zod schema validation at {pipelineResult.stage}.
        </p>
        <div className="text-left bg-[var(--hover-overlay)] p-4 rounded-xl border border-red-500/20 max-w-lg mx-auto space-y-1 font-mono text-[11px] text-red-500 max-h-40 overflow-y-auto">
          {pipelineResult.errors.map((err, idx) => (
            <div key={idx}>• {err}</div>
          ))}
        </div>
      </div>
    );
  }

  const { meta, layout, nodes } = pipelineResult.ast;

  return (
    <RendererProvider initialThemeId={meta.theme} onWidgetEvent={onWidgetEvent}>
      <RendererErrorBoundary>
        <div className="w-full space-y-6 select-none">
          {/* Renderer Header */}
          <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[var(--primary)]" />
                <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{meta.title}</h3>
              </div>
              {meta.description && (
                <p className="text-xs text-[var(--text-muted)]">{meta.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-1 rounded-full border border-[var(--primary)]/20 font-bold">
                LAYOUT: {layout.type.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono text-[var(--success)] bg-[var(--success)]/10 px-2.5 py-1 rounded-full border border-[var(--success)]/20 font-bold">
                {nodes.length} WIDGETS
              </span>
            </div>
          </div>

          {/* Layout Strategy Execution */}
          <LayoutEngine layoutConfig={layout} nodes={nodes} onWidgetEvent={onWidgetEvent} />
        </div>
      </RendererErrorBoundary>
    </RendererProvider>
  );
}
