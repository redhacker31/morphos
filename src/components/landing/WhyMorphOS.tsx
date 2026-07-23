
import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2, ShieldAlert, Sparkles, Layers } from "lucide-react";

export function WhyMorphOS() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-elevated)] border border-white/10 text-xs font-semibold text-[var(--accent)]">
            <Sparkles size={14} />
            <span>The MorphOS Paradigm Shift</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white md:text-5xl tracking-tight">
            Why MorphOS Displaces Raw Code AI
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Generating raw React code directly from LLMs creates unstable, insecure, and hard-to-maintain applications. MorphOS uses validated JSON AST contracts instead.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traditional Raw Code AI Generation Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-red-950/10 border border-red-500/20 p-8 space-y-6 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-red-500/20 pb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Traditional LLM Code Generation</h3>
                <p className="text-xs text-red-400">Generates raw JSX / HTML / JavaScript strings</p>
              </div>
            </div>

            <ul className="space-y-4 text-xs text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <span><strong>Syntax & Import Hallucinations:</strong> LLMs generate broken React imports, unclosed tags, and runtime syntax errors.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <span><strong>Security Risks:</strong> Vulnerable to arbitrary code execution, XSS script injection, and malicious string evaluation.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <span><strong>No Real-time Collaboration:</strong> Modifying code requires full-file re-generation, bundler re-compilation, and page reloads.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <span><strong>Vendor & UI Lock-in:</strong> Output code is tightly coupled to specific libraries and impossible to re-theme dynamically.</span>
              </li>
            </ul>
          </motion.div>

          {/* MorphOS JSON AST Generation Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-[var(--surface-elevated)] border border-[var(--primary)]/30 p-8 space-y-6 backdrop-blur-xl shadow-[0_0_40px_rgba(139,92,246,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-l from-[var(--primary)] to-[var(--accent)] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-bl-xl">
              LOCKED ARCHITECTURE
            </div>

            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">MorphOS JSON AST Platform</h3>
                <p className="text-xs text-[var(--primary)]">Generates Zod-validated JSON Application Blueprints</p>
              </div>
            </div>

            <ul className="space-y-4 text-xs text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[var(--success)] shrink-0 mt-0.5" />
                <span><strong>Zero Syntax Hallucinations:</strong> AI outputs structured JSON AST blueprints strictly validated by Zod schemas before rendering.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[var(--success)] shrink-0 mt-0.5" />
                <span><strong>Guaranteed Security:</strong> Presentational widgets render validated AST props with zero string evaluation or XSS risks.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[var(--success)] shrink-0 mt-0.5" />
                <span><strong>Sub-30ms Real-Time Sync:</strong> Convex WebSocket engine broadcasts AST node deltas without full-page reloads.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[var(--success)] shrink-0 mt-0.5" />
                <span><strong>Source-Agnostic Renderer:</strong> The Dynamic Renderer renders AST blueprints from AI, Excel, CSV, PDF, or preset templates.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
