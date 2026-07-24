import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Star,
  MoreVertical,
  FolderOpen,
  Copy,
  Trash2,
  LayoutGrid,
  List as ListIcon,
  Loader2,
} from "lucide-react";
import type { ProjectRow } from "@/hooks/useProjects";

const DOMAIN_LABELS: Record<string, string> = {
  "sales-crm": "CRM & Sales",
  "financial-analytics": "Finance",
  "inventory-logistics": "Logistics",
  "admin-infrastructure": "Infrastructure",
  "hr-portal": "Human Resources",
  "hospital-triage": "Healthcare",
  "education-portal": "Education",
  "project-management": "Productivity",
  "portfolio-tracker": "Investments",
  "erp-system": "Operations",
  "general-dashboard": "Dashboard",
  "mixed-application": "Multi-domain",
};

function categoryFor(p: ProjectRow): string {
  return DOMAIN_LABELS[p.domain || ""] || "Application";
}

function relTime(iso?: string): string {
  if (!iso) return "Just now";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

interface RecentProjectsProps {
  projects: ProjectRow[];
  loading: boolean;
  onOpen: (project: ProjectRow) => void;
  onToggleFavorite: (id: string, value: boolean) => void;
  onDelete: (id: string) => void;
  onDuplicate: (project: ProjectRow) => void;
}

export function RecentProjects({
  projects,
  loading,
  onOpen,
  onToggleFavorite,
  onDelete,
  onDuplicate,
}: RecentProjectsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5 select-none">
          <Clock size={13} />
          Recent Projects & Workspaces
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[var(--hover-overlay)] rounded-lg border border-[var(--card-border)] p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 rounded-md text-xs transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
              title="Grid View"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1 rounded-md text-xs transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
              title="List View"
            >
              <ListIcon size={14} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-[var(--card-border)] p-10 text-center text-xs text-[var(--text-muted)] flex items-center justify-center gap-2">
          <Loader2 size={16} className="animate-spin" />
          Loading your projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--card-border)] p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[var(--hover-overlay)] mx-auto flex items-center justify-center text-[var(--text-muted)]">
            <FolderOpen size={20} />
          </div>
          <h4 className="text-sm font-bold text-[var(--text-primary)]">No Recent Projects</h4>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
            Generate your first application by describing it in the prompt studio above or selecting a quick start template.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -2 }}
                onClick={() => onOpen(project)}
                className="glass p-5 rounded-2xl border border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-all cursor-pointer flex flex-col justify-between h-36 group relative"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary-glow)]" />
                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors truncate max-w-[200px]">
                        {project.title}
                      </h4>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {categoryFor(project)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(project.id, !project.is_favorite);
                      }}
                      className={`p-1 rounded-md hover:bg-[var(--active-overlay)] transition-colors cursor-pointer ${
                        project.is_favorite
                          ? "text-amber-400"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <Star size={14} fill={project.is_favorite ? "currentColor" : "none"} />
                    </button>

                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === project.id ? null : project.id);
                        }}
                        className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--active-overlay)] transition-colors cursor-pointer"
                      >
                        <MoreVertical size={14} />
                      </button>

                      {activeMenuId === project.id && (
                        <div className="absolute right-0 top-6 w-36 rounded-xl bg-[var(--surface-elevated)] border border-[var(--card-border)] shadow-xl p-1 z-20 space-y-0.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDuplicate(project);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--active-overlay)] flex items-center gap-2 cursor-pointer"
                          >
                            <Copy size={12} /> Duplicate
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(project.id);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] text-red-400 hover:bg-red-500/10 flex items-center gap-2 cursor-pointer"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-3 border-t border-[var(--card-border)]">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[var(--hover-overlay)] border border-[var(--card-border)] text-[var(--text-primary)] font-medium">
                      {project.status}
                    </span>
                    <span>{project.node_count || 0} Widgets</span>
                  </div>
                  <span>{relTime(project.updated_at || project.created_at)}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => onOpen(project)}
              className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--hover-overlay)] border border-[var(--card-border)] hover:bg-[var(--hover-overlay)] hover:border-[var(--card-border)] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(project.id, !project.is_favorite);
                  }}
                  className={`${project.is_favorite ? "text-amber-400" : "text-[var(--text-muted)]"} cursor-pointer`}
                >
                  <Star size={14} fill={project.is_favorite ? "currentColor" : "none"} />
                </button>
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                    {project.title}
                  </h4>
                  <div className="text-[10px] text-[var(--text-muted)] flex items-center gap-2">
                    <span>{categoryFor(project)}</span>
                    <span>•</span>
                    <span>{project.node_count || 0} Widgets</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-[var(--text-muted)]">
                <span>{relTime(project.updated_at || project.created_at)}</span>
                <span className="px-2 py-0.5 rounded bg-[var(--hover-overlay)] text-[var(--text-primary)] text-[10px]">
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
