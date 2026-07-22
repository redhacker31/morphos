"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/workspace/Sidebar";
import TopNav from "@/components/workspace/TopNav";
import { StatusBar } from "@/components/ui/StatusBar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { BackgroundSystem } from "@/components/ui/BackgroundSystem";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
  onSelectTemplate?: (templateId: string) => void;
  workspaceTitle?: string;
}

export function AppShell({
  children,
  activeView,
  onViewChange,
  onSelectTemplate,
  workspaceTitle = "Main Studio",
}: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global ⌘K / Ctrl+K keyboard shortcut to open Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "[" && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
        setSidebarCollapsed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--background)] text-[var(--text-primary)] relative font-sans select-none">
      {/* Background System */}
      <BackgroundSystem />

      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        onViewChange={onViewChange}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden relative z-10">
        {/* Top Header */}
        <TopNav
          projectName={workspaceTitle}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        {/* Dynamic Workspace Canvas / Content Slot */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </main>

        {/* Global Status Bar */}
        <StatusBar workspaceName={workspaceTitle} activeMode={activeView.toUpperCase()} />
      </div>

      {/* Global Command Layer (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectView={onViewChange}
        onSelectTemplate={onSelectTemplate}
      />
    </div>
  );
}
