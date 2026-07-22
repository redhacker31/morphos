"use client";

import React, { useState, use } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { WorkspaceSurface } from "@/components/workspace/WorkspaceSurface";
import PromptInput from "@/components/workspace/PromptInput";
import FileUpload from "@/components/workspace/FileUpload";
import TemplateGallery from "@/components/workspace/TemplateGallery";
import PromptHistory from "@/components/workspace/PromptHistory";
import SettingsPanel from "@/components/workspace/SettingsPanel";
import ChatPanel from "@/components/workspace/ChatPanel";
import { QuickStart } from "@/components/workspace/QuickStart";
import { RecentProjects } from "@/components/workspace/RecentProjects";
import { EmptyWorkspace } from "@/components/workspace/EmptyWorkspace";
import { EmptyState } from "@/components/ui/EmptyState";
import { DynamicRenderer } from "@/features/renderer";
import type { AppASTPayload } from "@/features/renderer/schema/astSchema";
import { SALES_CRM_AST } from "@/features/renderer/samples/salesCrmAst";
import { FINANCIAL_ANALYTICS_AST } from "@/features/renderer/samples/financialAnalyticsAst";
import { INVENTORY_MANAGEMENT_AST } from "@/features/renderer/samples/inventoryManagementAst";
import { ADMIN_DASHBOARD_AST } from "@/features/renderer/samples/adminDashboardAst";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Layers, Play, Eye, Sparkles } from "lucide-react";

export default function WorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  const [activeView, setActiveView] = useState("workspace");
  const [showUpload, setShowUpload] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showRendererDemo, setShowRendererDemo] = useState(false);
  const [activeAstPreset, setActiveAstPreset] = useState<"sales" | "finance" | "inventory" | "admin">("sales");
  const [aiGeneratedAst, setAiGeneratedAst] = useState<AppASTPayload | null>(null);

  const workspaceTitle =
    resolvedParams.id === "new" ? "New Workspace" : `Workspace / ${resolvedParams.id}`;

  const currentAst = aiGeneratedAst || (
    activeAstPreset === "finance"
      ? FINANCIAL_ANALYTICS_AST
      : activeAstPreset === "inventory"
      ? INVENTORY_MANAGEMENT_AST
      : activeAstPreset === "admin"
      ? ADMIN_DASHBOARD_AST
      : SALES_CRM_AST
  );

  const handleSelectTemplate = (templateId: string) => {
    setShowTemplatesModal(false);
    setShowRendererDemo(true);
    setActiveView("workspace");
  };

  return (
    <AppShell
      activeView={activeView}
      onViewChange={setActiveView}
      onSelectTemplate={handleSelectTemplate}
      workspaceTitle={workspaceTitle}
    >
      <div className="flex flex-1 h-full overflow-hidden relative">
        {/* Workspace Surface Host */}
        <WorkspaceSurface
          activeViewKey={activeView}
          rendererSlot={
            showRendererDemo ? (
              <DynamicRenderer
                astPayload={currentAst}
                onWidgetEvent={(event) => {
                  console.log("[Renderer Event]:", event);
                }}
              />
            ) : undefined
          }
        >
          {activeView === "workspace" && (
            <div className="space-y-10">
              {/* Onboarding Empty Hero Banner */}
              <EmptyWorkspace
                onSelectTemplate={handleSelectTemplate}
                onFocusPrompt={() => {
                  const textarea = document.querySelector("textarea");
                  if (textarea) textarea.focus();
                }}
              />

              {/* AI Prompt Studio Input Box */}
              <div className="pt-2">
                <PromptInput
                  onSubmit={(promptText) => {
                    console.log("UI Prompt Submitted:", promptText);
                  }}
                  onASTGenerated={(generatedAst) => {
                    console.log("AI Generated AST Payload:", generatedAst);
                    setAiGeneratedAst(generatedAst);
                    setShowRendererDemo(true);
                  }}
                  onTemplatesClick={() => setShowTemplatesModal(true)}
                  onUploadClick={() => setShowUpload(!showUpload)}
                />
              </div>

              {/* Renderer Engine Live Demo Trigger Bar */}
              <div className="rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold">
                      <Eye size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Phase 3 AI Application Generation Engine Live Demo</h4>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        {aiGeneratedAst
                          ? "Showing AI Generated AST Blueprint from prompt."
                          : "Test rendering generated AppASTPayload blueprints inside WorkspaceSurface."}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowRendererDemo(!showRendererDemo)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white text-xs font-extrabold flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-lg"
                  >
                    <Play size={13} />
                    <span>{showRendererDemo ? "Hide Renderer Frame" : "Render AST Blueprint"}</span>
                  </button>
                </div>

                {/* AST Preset Switcher Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 text-xs">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} className="text-[var(--primary)]" />
                    AST Preset:
                  </span>
                  {[
                    { key: "sales", label: "Sales CRM" },
                    { key: "finance", label: "Financial Analytics" },
                    { key: "inventory", label: "Inventory SKU Monitor" },
                    { key: "admin", label: "Admin Infrastructure" },
                  ].map((preset) => (
                    <button
                      key={preset.key}
                      onClick={() => {
                        setAiGeneratedAst(null);
                        setActiveAstPreset(preset.key as any);
                        setShowRendererDemo(true);
                      }}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        !aiGeneratedAst && activeAstPreset === preset.key
                          ? "bg-[var(--primary)] text-white shadow"
                          : "bg-white/5 text-[var(--text-secondary)] hover:bg-white/10"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload Area */}
              <AnimatePresence>
                {showUpload && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full"
                  >
                    <FileUpload
                      isOpen={showUpload}
                      onClose={() => setShowUpload(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Start Templates */}
              <div className="pt-6 border-t border-white/10">
                <QuickStart
                  onSelectTemplate={handleSelectTemplate}
                  onBrowseAll={() => setShowTemplatesModal(true)}
                />
              </div>

              {/* Recent Projects Manager */}
              <div className="pt-6 border-t border-white/10">
                <RecentProjects
                  onOpenProject={(id) => {
                    setShowRendererDemo(true);
                  }}
                />
              </div>
            </div>
          )}

          {activeView === "templates" && (
            <div className="py-4">
              <QuickStart
                onSelectTemplate={handleSelectTemplate}
                onBrowseAll={() => setShowTemplatesModal(true)}
              />
            </div>
          )}

          {activeView === "history" && (
            <div className="py-4">
              <PromptHistory
                onSelect={(text) => {
                  setShowRendererDemo(true);
                  setActiveView("workspace");
                }}
              />
            </div>
          )}

          {activeView === "settings" && (
            <div className="py-4">
              <SettingsPanel />
            </div>
          )}

          {(activeView === "applications" || activeView === "favorites" || activeView === "help") && (
            <div className="h-96 flex items-center justify-center">
              <EmptyState
                icon={Layers}
                title={`${activeView.charAt(0).toUpperCase() + activeView.slice(1)} Studio`}
                description="This workspace area is connected to the Dynamic Renderer."
              />
            </div>
          )}
        </WorkspaceSurface>

        {/* Copilot Chat Panel */}
        <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>

      {/* Floating Copilot FAB */}
      {!chatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => setChatOpen(true)}
          className="fixed bottom-14 right-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white flex items-center justify-center shadow-[0_4px_20px_var(--primary-glow)] hover:shadow-[0_4px_30px_var(--primary-glow)] hover:scale-105 transition-all z-50 cursor-pointer"
          aria-label="Open Copilot"
          title="Open Copilot Chat"
        >
          <MessageSquare size={20} />
        </motion.button>
      )}

      {/* Template Gallery Modal */}
      <TemplateGallery
        isOpen={showTemplatesModal}
        onClose={() => setShowTemplatesModal(false)}
        onSelect={(id) => handleSelectTemplate(id)}
      />
    </AppShell>
  );
}
