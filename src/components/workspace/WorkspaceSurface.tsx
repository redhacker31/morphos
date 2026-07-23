
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WorkspaceSurfaceProps {
  children: React.ReactNode;
  activeViewKey?: string;
  rendererSlot?: React.ReactNode; // Reserved slot for Phase 2 Application Renderer
}

/**
 * WorkspaceSurface - The permanent host surface for MorphOS workspace applications.
 * Layout Hierarchy: WorkspaceSurface -> Prompt Area -> Content Area -> Reserved Renderer Slot -> Floating Layers -> Dialogs
 */
export function WorkspaceSurface({
  children,
  activeViewKey = "default",
  rendererSlot,
}: WorkspaceSurfaceProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-12 py-8 scrollbar-none relative z-10 select-none">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeViewKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full space-y-8"
          >
            {/* Primary Content Area */}
            {children}

            {/* Reserved Phase 2 Renderer Slot */}
            {rendererSlot && (
              <div className="w-full rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl relative">
                <div className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-wider mb-4 border-b border-white/10 pb-2 flex items-center justify-between">
                  <span>RESERVED PHASE 2 DYNAMIC RENDERER SURFACE</span>
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                </div>
                {rendererSlot}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
