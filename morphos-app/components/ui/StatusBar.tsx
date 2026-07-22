"use client";

import React from "react";
import { Wifi, Zap, Keyboard, Command, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  workspaceName?: string;
  activeMode?: string;
  className?: string;
}

export function StatusBar({
  workspaceName = "Workspace / Main Studio",
  activeMode = "Prompt Studio",
  className,
}: StatusBarProps) {
  return (
    <footer
      className={cn(
        "h-8 flex items-center justify-between px-4 text-[11px] text-[var(--text-muted)] border-t border-white/10 bg-[var(--surface-elevated)]/90 backdrop-blur-md shrink-0 select-none z-20",
        className
      )}
    >
      {/* Left Group */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5" title="Convex WebSocket Status">
          <span className="w-2 h-2 rounded-full bg-[var(--success)] shadow-[0_0_8px_var(--success-glow)] animate-pulse" />
          <span className="text-white font-semibold">Online</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[var(--text-secondary)]">
          <Wifi size={12} className="text-[var(--secondary)]" />
          <span>Sub-30ms Reactive Sync</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-[var(--text-secondary)]">
          <span className="text-white/20">•</span>
          <span className="truncate max-w-[180px] font-medium">{workspaceName}</span>
        </div>
      </div>

      {/* Middle Group */}
      <div className="hidden lg:flex items-center gap-2 text-[var(--text-muted)]">
        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white text-[10px] font-semibold">
          Mode: {activeMode}
        </span>
      </div>

      {/* Right Group */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-1 text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer">
          <Keyboard size={12} />
          <span>⌘K Commands</span>
        </div>

        <div className="flex items-center gap-1.5 text-[var(--primary)] font-semibold">
          <Zap size={12} />
          <span>MorphOS v1.1.0-Phase1</span>
        </div>
      </div>
    </footer>
  );
}
