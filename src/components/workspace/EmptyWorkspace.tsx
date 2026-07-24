
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Keyboard, Lightbulb, ArrowRight, BookOpen, Rocket } from "lucide-react";

interface EmptyWorkspaceProps {
  onSelectTemplate: (templateId: string) => void;
  onFocusPrompt: () => void;
}

export function EmptyWorkspace({ onSelectTemplate, onFocusPrompt }: EmptyWorkspaceProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 py-6">
      {/* Welcome Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[var(--surface-elevated)] via-[var(--surface)] to-[var(--background-secondary)] border border-[var(--card-border)] p-8 text-center space-y-4 relative overflow-hidden shadow-2xl">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)]/30 to-[var(--accent)]/30 border border-[var(--card-border)] mx-auto flex items-center justify-center shadow-[0_0_30px_var(--primary-glow)]"
        >
          <Sparkles size={24} className="text-[var(--primary)]" />
        </motion.div>

        <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Welcome to Your MorphOS Studio
        </h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
          Describe the application, internal tool, or analytics dashboard you need. MorphOS translates natural language intent into structured, interactive software.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={onFocusPrompt}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white text-xs font-extrabold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <Rocket size={14} />
            <span>Start Building with Prompt</span>
          </button>
        </div>
      </div>

      {/* Shortcuts & Tips Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--hover-overlay)] p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
            <Keyboard size={15} className="text-[var(--primary)]" />
            <span>Power Keyboard Shortcuts</span>
          </div>

          <div className="space-y-2.5 text-xs text-[var(--text-secondary)]">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--hover-overlay)] border border-[var(--card-border)]">
              <span>Open Global Command Palette</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--active-overlay)] font-mono text-[10px] text-[var(--text-primary)]">⌘K / Ctrl+K</kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--hover-overlay)] border border-[var(--card-border)]">
              <span>Focus Main Prompt Studio</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--active-overlay)] font-mono text-[10px] text-[var(--text-primary)]">/</kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--hover-overlay)] border border-[var(--card-border)]">
              <span>Toggle Left Navigation Sidebar</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--active-overlay)] font-mono text-[10px] text-[var(--text-primary)]">[</kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--hover-overlay)] border border-[var(--card-border)]">
              <span>Execute AST Generation</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--active-overlay)] font-mono text-[10px] text-[var(--text-primary)]">Ctrl + Enter</kbd>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--hover-overlay)] p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
            <Lightbulb size={15} className="text-amber-400" />
            <span>MorphOS Best Practices</span>
          </div>

          <ul className="space-y-3 text-xs text-[var(--text-secondary)] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)] font-bold">1.</span>
              <span><strong>Be Specific About Data:</strong> Mention desired chart types, columns, and filters (e.g. &quot;Bar chart for monthly sales and key metric cards&quot;).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)] font-bold">2.</span>
              <span><strong>Drag & Drop Business Files:</strong> Drop Excel or CSV data files directly into the prompt workspace to generate data-driven apps.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary)] font-bold">3.</span>
              <span><strong>Iterate via Copilot:</strong> Evolve generated applications through follow-up natural language instructions.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
