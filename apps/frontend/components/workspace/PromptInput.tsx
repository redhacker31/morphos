"use client";

import React, { useState } from "react";
import { Sparkles, Paperclip, LayoutTemplate, Mic, Loader2, CheckCircle2 } from "lucide-react";
import { useAIGenerator } from "@/features/ai-generator/hooks/useAIGenerator";
import type { AppASTPayload } from "@/features/renderer/schema/astSchema";

interface PromptInputProps {
  onSubmit?: (promptText: string) => void;
  onASTGenerated?: (ast: AppASTPayload) => void;
  onTemplatesClick?: () => void;
  onUploadClick?: () => void;
}

export default function PromptInput({
  onSubmit,
  onASTGenerated,
  onTemplatesClick,
  onUploadClick,
}: PromptInputProps) {
  const [promptText, setPromptText] = useState("");
  const { isGenerating, progress, generate } = useAIGenerator();

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim() || isGenerating) return;

    onSubmit?.(promptText);

    const res = await generate(promptText);
    if (res.success && res.ast) {
      onASTGenerated?.(res.ast);
    }
  };

  return (
    <div className="w-full relative group">
      {/* Animated Gradient Aura */}
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] opacity-35 blur-xl group-hover:opacity-60 transition duration-500" />

      {/* Main Glass Box */}
      <div className="relative rounded-3xl bg-[var(--surface-elevated)]/90 border border-white/15 p-4 shadow-2xl backdrop-blur-2xl transition-all">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white shrink-0 mt-1 shadow-md">
              <Sparkles size={16} />
            </div>

            <textarea
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Describe the application you want to build (e.g. 'Create a Sales CRM for a SaaS company with pipeline revenue chart, deal metrics, and customer table')..."
              className="w-full bg-transparent text-sm text-white placeholder-[var(--text-muted)] focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Streaming Generation Progress Indicator */}
          {isGenerating && progress && (
            <div className="rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 p-3 space-y-1.5 backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span className="flex items-center gap-2">
                  <Loader2 size={13} className="animate-spin text-[var(--primary)]" />
                  <span>Stage: {progress.stage}</span>
                </span>
                <span className="font-mono text-[var(--primary)]">{progress.percent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-300"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <p className="text-[10px] text-[var(--text-secondary)]">{progress.message}</p>
            </div>
          )}

          {/* Action Toolbar */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onUploadClick}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Paperclip size={13} />
                <span>Attach Data</span>
              </button>

              <button
                type="button"
                onClick={onTemplatesClick}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LayoutTemplate size={13} />
                <span>Templates</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[var(--text-muted)] hidden sm:inline-block font-mono">
                Ctrl + Enter to Generate
              </span>

              <button
                type="submit"
                disabled={isGenerating || !promptText.trim()}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white text-xs font-extrabold flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Generating AST...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    <span>Generate Application</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
