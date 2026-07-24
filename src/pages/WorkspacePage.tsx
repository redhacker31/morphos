import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { WorkspaceSurface } from "@/components/workspace/WorkspaceSurface";
import PromptInput from "@/components/workspace/PromptInput";
import FileUpload from "@/components/workspace/FileUpload";
import TemplateGallery from "@/components/workspace/TemplateGallery";
import PromptHistory from "@/components/workspace/PromptHistory";
import SettingsPanel from "@/components/workspace/SettingsPanel";
import ChatPanel from "@/components/workspace/ChatPanel";
import { QuickStart, TEMPLATE_CARDS } from "@/components/workspace/QuickStart";
import { RecentProjects } from "@/components/workspace/RecentProjects";
import { EmptyWorkspace } from "@/components/workspace/EmptyWorkspace";
import { EmptyState } from "@/components/ui/EmptyState";
import { DynamicRenderer } from "@/features/renderer";
import { useAIGenerator } from "@/features/ai-generator/hooks/useAIGenerator";
import { useProjects } from "@/hooks/useProjects";
import { usePromptHistory } from "@/hooks/usePromptHistory";
import { useSession } from "@/hooks/useSession";
import { useCryptoPortfolio } from "@/hooks/useCryptoPortfolio";
import { CryptoBentoDashboard } from "@/components/dashboard/CryptoBentoDashboard";
import { supabase } from "@/integrations/supabase/client";
import { mockTemplates } from "@/lib/mock-data";
import type { AppASTPayload } from "@/features/renderer/schema/astSchema";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Layers, Play, Eye, AlertCircle, X } from "lucide-react";

// Fallback sample AST shown when no generated app is loaded yet.
const SAMPLE_SALES_AST = {
  version: "1.0.0",
  meta: {
    title: "Enterprise Sales & ARR Dashboard",
    description: "Live pipeline revenue metrics and monthly deal forecasts.",
    theme: "dark-glass"
  },
  layout: {
    type: "dashboard",
    columns: 12,
    gap: 16
  },
  nodes: [{
    id: "a1b2c3d4-e5f6-4a5b-8c9d-111111111111",
    type: "hero-banner",
    gridPosition: {
      x: 0,
      y: 0,
      w: 12,
      h: 3
    },
    props: {
      title: "Q3 Executive Revenue Operations",
      description: "Validated JSON AST Blueprint rendered dynamically by MorphOS Renderer Engine."
    }
  }, {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-333333333333",
    type: "metric-card",
    gridPosition: {
      x: 0,
      y: 3,
      w: 4,
      h: 4
    },
    props: {
      title: "Total ARR Pipeline",
      description: "Compared to Q2 target",
      data: {
        value: "4,250,000"
      },
      config: {
        unit: "$",
        trend: "+18.4%",
        isPositive: true
      }
    }
  }, {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-444444444444",
    type: "metric-card",
    gridPosition: {
      x: 4,
      y: 3,
      w: 4,
      h: 4
    },
    props: {
      title: "Win Rate Percentage",
      description: "Closed-won deals",
      data: {
        value: "36.8%"
      },
      config: {
        unit: "",
        trend: "+4.1%",
        isPositive: true
      }
    }
  }, {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-555555555555",
    type: "bar-chart",
    gridPosition: {
      x: 0,
      y: 7,
      w: 6,
      h: 6
    },
    props: {
      title: "Monthly Revenue Performance",
      description: "Actual ARR vs target quota",
      data: [{
        name: "Jan",
        value: 380
      }, {
        name: "Feb",
        value: 520
      }, {
        name: "Mar",
        value: 610
      }, {
        name: "Apr",
        value: 740
      }, {
        name: "May",
        value: 890
      }, {
        name: "Jun",
        value: 950
      }],
      config: {
        color: "#8B5CF6",
        xAxisKey: "name",
        yAxisKey: "value"
      }
    }
  }, {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-777777777777",
    type: "data-table",
    gridPosition: {
      x: 0,
      y: 13,
      w: 12,
      h: 6
    },
    props: {
      title: "Recent High-Value Accounts",
      description: "Key enterprise pipeline deals",
      data: [{
        ID: "ACC-901",
        Name: "Acme Corp Enterprise",
        Stage: "Negotiation",
        ARR: "$180,000",
        Owner: "Sarah M."
      }, {
        ID: "ACC-902",
        Name: "Starlight Logistics",
        Stage: "Proposal Sent",
        ARR: "$95,000",
        Owner: "David K."
      }, {
        ID: "ACC-903",
        Name: "Global Health Systems",
        Stage: "Qualified",
        ARR: "$240,000",
        Owner: "Elena R."
      }, {
        ID: "ACC-904",
        Name: "Apex Data Group",
        Stage: "Closed Won",
        ARR: "$150,000",
        Owner: "Sarah M."
      }],
      config: {
        columns: ["ID", "Name", "Stage", "ARR", "Owner"]
      }
    }
  }]
};

// Map template ids (from QuickStart cards + Template Gallery) to generation
// prompts so "Use Template" generates a real app via the AI backend.
const TEMPLATE_PROMPTS: Record<string, string> = {};
TEMPLATE_CARDS.forEach(t => {
  TEMPLATE_PROMPTS[t.id] = `Build a ${t.title}. ${t.desc}`;
});
mockTemplates.forEach(t => {
  TEMPLATE_PROMPTS[t.id] = `Build a ${t.title}. ${t.description}`;
});
const FALLBACK_PROMPT = "Build a polished operational dashboard with a hero banner, three KPI metric cards, a revenue trend bar chart, a market distribution chart, and a records data table.";
function promptForTemplate(id: string): string {
  return TEMPLATE_PROMPTS[id] || FALLBACK_PROMPT;
}
export default function WorkspacePage() {
  const {
    id = "new"
  } = useParams<{
    id: string;
  }>();
  const {
    ready,
    userId
  } = useSession();
  const ai = useAIGenerator();
  const projectsHook = useProjects(ready);
  const historyHook = usePromptHistory(ready);
  const [activeView, setActiveView] = useState("workspace");
  const cryptoHook = useCryptoPortfolio(ready && activeView === "crypto");
  const [showUpload, setShowUpload] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showRendererDemo, setShowRendererDemo] = useState(false);
  const [activeAst, setActiveAst] = useState<AppASTPayload | null>(null);
  const [prompt, setPrompt] = useState("");
  const [genError, setGenError] = useState<string | null>(null);
  const workspaceTitle = id === "new" ? "New Workspace" : `Workspace / ${id}`;
  if (!ready) {
    return <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[var(--background)] text-[var(--text-primary)]">
        <div className="w-3 h-3 rounded-full bg-[var(--primary)] animate-bounce" />
        <span className="text-xs text-[var(--text-muted)]">Preparing your workspace...</span>
      </div>;
  }
  const handleGenerate = async (promptText: string) => {
    const res = await ai.generate(promptText);
    if (res.success && res.ast) {
      setGenError(null);
      setActiveAst(res.ast);
      setShowRendererDemo(true);
      // Persist the generated app + prompt (ownership is set server-side).
      try {
        await projectsHook.createProject({
          title: res.ast.meta.title,
          prompt: promptText,
          ast: res.ast,
          domain: res.requirements?.domain ?? null,
          node_count: res.ast.nodes.length
        });
      } catch (e) {
        console.warn("Failed to save project", e);
      }
      try {
        await historyHook.addPrompt(promptText);
      } catch (e) {
        console.warn("Failed to save prompt", e);
      }
    } else {
      setGenError(res.errors[0] || "Generation failed. Please try again.");
    }
  };
  const handleSelectTemplate = (templateId: string) => {
    setShowTemplatesModal(false);
    if (templateId === "tmpl-crypto") {
      setActiveView("crypto");
      return;
    }
    setActiveView("workspace");
    const promptText = promptForTemplate(templateId);
    setPrompt(promptText);
    void handleGenerate(promptText);
  };
  const handleOpenProject = (project: {
    id: string;
    ast: unknown;
  }) => {
    setActiveAst(project.ast as AppASTPayload);
    setShowRendererDemo(true);
    setActiveView("workspace");
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };
  return <AppShell activeView={activeView} onViewChange={setActiveView} onSelectTemplate={handleSelectTemplate} workspaceTitle={workspaceTitle} userId={userId} onSignOut={handleSignOut}>
      <div className="flex flex-1 h-full overflow-hidden relative">
        {/* Workspace Surface Host */}
        <WorkspaceSurface activeViewKey={activeView} rendererSlot={showRendererDemo ? <DynamicRenderer astPayload={activeAst ?? SAMPLE_SALES_AST} onWidgetEvent={event => {
        console.log("[Renderer Widget Event]:", event);
      }} /> : undefined}>
          {activeView === "workspace" && <div className="space-y-10">
              {/* Onboarding Empty Hero Banner */}
              <EmptyWorkspace onSelectTemplate={handleSelectTemplate} onFocusPrompt={() => {
            const textarea = document.querySelector("textarea");
            if (textarea) textarea.focus();
          }} />

              {/* Renderer Engine Live Demo Trigger Bar */}
              <div className="rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold">
                    <Eye size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-primary)]">
                      {activeAst ? "Live AI-Generated Application" : "Dynamic Renderer Engine"}
                    </h4>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      {activeAst ? "Generated by AI from your prompt. Describe another app to regenerate." : "Generate an app from a prompt, or preview the sample blueprint below."}
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowRendererDemo(!showRendererDemo)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white text-xs font-extrabold flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-lg">
                  <Play size={13} />
                  <span>{showRendererDemo ? "Hide Preview" : "Preview Blueprint"}</span>
                </button>
              </div>

              {/* Generation Error Banner */}
              {genError && <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 flex items-start gap-3 backdrop-blur-xl">
                  <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[var(--text-primary)]">Generation failed</h4>
                    <p className="text-[11px] text-red-300/90 break-words">{genError}</p>
                  </div>
                  <button onClick={() => setGenError(null)} className="text-red-400 hover:text-[var(--text-primary)] transition-colors shrink-0" aria-label="Dismiss error">
                    <X size={16} />
                  </button>
                </div>}

              {/* Prompt Studio Input Box */}
              <div className="pt-2">
                <PromptInput prompt={prompt} onPromptChange={setPrompt} isGenerating={ai.isGenerating} progress={ai.progress} onGenerate={handleGenerate} onTemplatesClick={() => setShowTemplatesModal(true)} onUploadClick={() => setShowUpload(!showUpload)} />
              </div>

              {/* File Upload Area */}
              <AnimatePresence>
                {showUpload && <motion.div initial={{
              opacity: 0,
              height: 0
            }} animate={{
              opacity: 1,
              height: "auto"
            }} exit={{
              opacity: 0,
              height: 0
            }} className="w-full">
                    <FileUpload isOpen={showUpload} onClose={() => setShowUpload(false)} />
                  </motion.div>}
              </AnimatePresence>

              {/* Quick Start Templates */}
              <div className="pt-6 border-[var(--card-border)] rounded-[1px] 0, 0, 1)] border-[2px] shadow-[0px_4px_16px_0px_#2043F0FF]">
                <QuickStart onSelectTemplate={handleSelectTemplate} onBrowseAll={() => setShowTemplatesModal(true)} />
              </div>

              {/* Recent Projects Manager */}
              <div className="pt-6 border-t border-[var(--card-border)]">
                <RecentProjects projects={projectsHook.projects} loading={projectsHook.loading} onOpen={handleOpenProject} onToggleFavorite={projectsHook.toggleFavorite} onDelete={projectsHook.deleteProject} onDuplicate={projectsHook.duplicateProject} />
              </div>
            </div>}

          {activeView === "templates" && <div className="py-4">
              <QuickStart onSelectTemplate={handleSelectTemplate} onBrowseAll={() => setShowTemplatesModal(true)} />
            </div>}

          {activeView === "history" && <div className="py-4">
              <PromptHistory items={historyHook.items} loading={historyHook.loading} onSelect={text => {
            setPrompt(text);
            setActiveView("workspace");
          }} onTogglePin={historyHook.togglePin} onToggleFavorite={historyHook.toggleFavorite} onDelete={historyHook.deleteItem} />
            </div>}

          {activeView === "settings" && <div className="py-4">
              <SettingsPanel />
            </div>}

          {activeView === "crypto" && <div className="py-4 space-y-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-base font-bold text-[var(--text-primary)]">Crypto Portfolio Bento</h2>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Live data persisted to your Enter Cloud portfolio.
                  </p>
                </div>
                <button onClick={() => setActiveView("workspace")} className="px-3 py-1.5 rounded-xl border border-[var(--card-border)] bg-[var(--hover-overlay)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--card-border-hover)] transition-all">
                  Back to Workspace
                </button>
              </div>
              {cryptoHook.loading ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {[0, 1, 2, 3].map(i => <div key={i} className="h-56 rounded-3xl border border-[var(--card-border)] bg-[var(--hover-overlay)] skeleton" />)}
                </div> : <CryptoBentoDashboard portfolio={cryptoHook.portfolio ?? undefined} />}
            </div>}

          {(activeView === "applications" || activeView === "favorites" || activeView === "help") && <div className="h-96 flex items-center justify-center">
              <EmptyState icon={Layers} title={`${activeView.charAt(0).toUpperCase() + activeView.slice(1)} Studio`} description="This workspace area is connected to the Dynamic Renderer." />
            </div>}
        </WorkspaceSurface>

        {/* Copilot Chat Panel */}
        <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>

      {/* Floating Copilot FAB */}
      {!chatOpen && <motion.button initial={{
      scale: 0
    }} animate={{
      scale: 1
    }} transition={{
      type: "spring",
      stiffness: 300,
      damping: 20
    }} onClick={() => setChatOpen(true)} className="fixed bottom-14 right-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white flex items-center justify-center shadow-[0_4px_20px_var(--primary-glow)] hover:shadow-[0_4px_30px_var(--primary-glow)] hover:scale-105 transition-all z-50 cursor-pointer" aria-label="Open Copilot" title="Open Copilot Chat">
          <MessageSquare size={20} />
        </motion.button>}

      {/* Template Gallery Modal */}
      <TemplateGallery isOpen={showTemplatesModal} onClose={() => setShowTemplatesModal(false)} onSelect={templateId => handleSelectTemplate(templateId)} />
    </AppShell>;
}