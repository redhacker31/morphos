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
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Layers, Play, Eye } from "lucide-react";

// Sample Valid JSON AST Payload 1: Sales CRM Dashboard Blueprint
const SAMPLE_SALES_AST = {
  version: "1.0.0",
  meta: {
    title: "Enterprise Sales & ARR Dashboard",
    description: "Live pipeline revenue metrics and monthly deal forecasts.",
    theme: "dark-glass",
  },
  layout: {
    type: "dashboard",
    columns: 12,
    gap: 16,
  },
  nodes: [
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-111111111111",
      type: "hero-banner",
      gridPosition: { x: 0, y: 0, w: 12, h: 3 },
      props: {
        title: "Q3 Executive Revenue Operations",
        description: "Validated JSON AST Blueprint rendered dynamically by MorphOS Renderer Engine.",
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-222222222222",
      type: "metric-card",
      gridPosition: { x: 0, y: 3, w: 4, h: 4 },
      props: {
        title: "Total ARR Pipeline",
        description: "Compared to Q2 target",
        data: { value: "4,250,000" },
        config: { unit: "$", trend: "+18.4%", isPositive: true },
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-333333333333",
      type: "metric-card",
      gridPosition: { x: 4, y: 3, w: 4, h: 4 },
      props: {
        title: "Average Deal Cycle",
        description: "Time to close",
        data: { value: "18.2" },
        config: { unit: "", trend: "-2.4 Days", isPositive: true },
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-444444444444",
      type: "metric-card",
      gridPosition: { x: 8, y: 3, w: 4, h: 4 },
      props: {
        title: "Win Rate Percentage",
        description: "Closed-won deals",
        data: { value: "36.8%" },
        config: { unit: "", trend: "+4.1%", isPositive: true },
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-555555555555",
      type: "bar-chart",
      gridPosition: { x: 0, y: 7, w: 6, h: 6 },
      props: {
        title: "Monthly Revenue Performance",
        description: "Actual ARR vs target quota",
        data: [
          { name: "Jan", value: 380 },
          { name: "Feb", value: 520 },
          { name: "Mar", value: 610 },
          { name: "Apr", value: 740 },
          { name: "May", value: 890 },
          { name: "Jun", value: 950 },
        ],
        config: { color: "#8B5CF6", xAxisKey: "name", yAxisKey: "value" },
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-666666666666",
      type: "line-chart",
      gridPosition: { x: 6, y: 7, w: 6, h: 6 },
      props: {
        title: "Lead Acquisition Velocity",
        description: "Weekly qualified inbound leads",
        data: [
          { name: "W1", value: 140 },
          { name: "W2", value: 210 },
          { name: "W3", value: 290 },
          { name: "W4", value: 380 },
          { name: "W5", value: 460 },
        ],
        config: { color: "#06B6D4", xAxisKey: "name", yAxisKey: "value" },
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-777777777777",
      type: "data-table",
      gridPosition: { x: 0, y: 13, w: 12, h: 6 },
      props: {
        title: "Recent High-Value Accounts",
        description: "Key enterprise pipeline deals",
        data: [
          { ID: "ACC-901", Name: "Acme Corp Enterprise", Stage: "Negotiation", ARR: "$180,000", Owner: "Sarah M." },
          { ID: "ACC-902", Name: "Starlight Logistics", Stage: "Proposal Sent", ARR: "$95,000", Owner: "David K." },
          { ID: "ACC-903", Name: "Global Health Systems", Stage: "Qualified", ARR: "$240,000", Owner: "Elena R." },
          { ID: "ACC-904", Name: "Apex Data Group", Stage: "Closed Won", ARR: "$150,000", Owner: "Sarah M." },
        ],
        config: { columns: ["ID", "Name", "Stage", "ARR", "Owner"] },
      },
    },
  ],
};

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

  const workspaceTitle =
    resolvedParams.id === "new" ? "New Workspace" : `Workspace / ${resolvedParams.id}`;

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
                astPayload={SAMPLE_SALES_AST}
                onWidgetEvent={(event) => {
                  console.log("[Renderer Widget Event]:", event);
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

              {/* Renderer Engine Live Demo Trigger Bar */}
              <div className="rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold">
                    <Eye size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Phase 2 Dynamic Renderer Engine Live Demo</h4>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      Test rendering valid JSON AST blueprints directly inside WorkspaceSurface.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRendererDemo(!showRendererDemo)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white text-xs font-extrabold flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-lg"
                >
                  <Play size={13} />
                  <span>{showRendererDemo ? "Hide Renderer Frame" : "Render Sample JSON AST Blueprint"}</span>
                </button>
              </div>

              {/* Prompt Studio Input Box */}
              <div className="pt-2">
                <PromptInput
                  onSubmit={(promptText) => {
                    console.log("UI Prompt Submitted:", promptText);
                    setShowRendererDemo(true);
                  }}
                  onTemplatesClick={() => setShowTemplatesModal(true)}
                  onUploadClick={() => setShowUpload(!showUpload)}
                />
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
