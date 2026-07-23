
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Star,
  MoreVertical,
  FolderOpen,
  Copy,
  Trash2,
  ExternalLink,
  LayoutGrid,
  List as ListIcon,
  Sparkles,
  Layers,
} from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  lastModified: string;
  status: "Active" | "Draft" | "Synced";
  isFavorite: boolean;
  size: string;
  nodeCount: number;
}

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "ws-sales-1",
    title: "Q3 Sales & Deal Velocity Dashboard",
    category: "CRM & Sales",
    lastModified: "10 minutes ago",
    status: "Synced",
    isFavorite: true,
    size: "1.4 MB",
    nodeCount: 6,
  },
  {
    id: "ws-fin-2",
    title: "Global Financial P&L Analytics",
    category: "Finance",
    lastModified: "2 hours ago",
    status: "Active",
    isFavorite: true,
    size: "840 KB",
    nodeCount: 5,
  },
  {
    id: "ws-inv-3",
    title: "Warehouse Inventory & SKU Monitor",
    category: "Logistics",
    lastModified: "Yesterday",
    status: "Draft",
    isFavorite: false,
    size: "2.1 MB",
    nodeCount: 8,
  },
  {
    id: "ws-[id]-4",
    title: "Hospital Patient Triage Flow",
    category: "Healthcare",
    lastModified: "3 days ago",
    status: "Synced",
    isFavorite: false,
    size: "1.1 MB",
    nodeCount: 4,
  },
];

interface RecentProjectsProps {
  onOpenProject: (id: string) => void;
}

export function RecentProjects({ onOpenProject }: RecentProjectsProps) {
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const deleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setActiveMenuId(null);
  };

  const duplicateProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const source = projects.find((p) => p.id === id);
    if (!source) return;
    const newProj: ProjectItem = {
      ...source,
      id: `ws-${Date.now()}`,
      title: `${source.title} (Copy)`,
      lastModified: "Just now",
    };
    setProjects([newProj, ...projects]);
    setActiveMenuId(null);
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5 select-none">
          <Clock size={13} />
          Recent Projects & Workspaces
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 rounded-md text-xs transition-all cursor-pointer ${
                viewMode === "grid" ? "bg-[var(--surface-elevated)] text-white shadow" : "text-[var(--text-muted)] hover:text-white"
              }`}
              title="Grid View"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1 rounded-md text-xs transition-all cursor-pointer ${
                viewMode === "list" ? "bg-[var(--surface-elevated)] text-white shadow" : "text-[var(--text-muted)] hover:text-white"
              }`}
              title="List View"
            >
              <ListIcon size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Container */}
      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-white/5 mx-auto flex items-center justify-center text-[var(--text-muted)]">
            <FolderOpen size={20} />
          </div>
          <h4 className="text-sm font-bold text-white">No Recent Projects</h4>
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
                onClick={() => onOpenProject(project.id)}
                className="glass p-5 rounded-2xl border border-white/[0.05] hover:border-white/20 transition-all cursor-pointer flex flex-col justify-between h-36 group relative"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary-glow)]" />
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-[var(--primary)] transition-colors truncate max-w-[200px]">
                        {project.title}
                      </h4>
                      <span className="text-[10px] text-[var(--text-muted)]">{project.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => toggleFavorite(project.id, e)}
                      className={`p-1 rounded-md hover:bg-white/10 transition-colors ${
                        project.isFavorite ? "text-amber-400" : "text-[var(--text-muted)] hover:text-white"
                      }`}
                    >
                      <Star size={14} fill={project.isFavorite ? "currentColor" : "none"} />
                    </button>

                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === project.id ? null : project.id);
                        }}
                        className="p-1 rounded-md text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <MoreVertical size={14} />
                      </button>

                      {activeMenuId === project.id && (
                        <div className="absolute right-0 top-6 w-36 rounded-xl bg-[var(--surface-elevated)] border border-white/15 shadow-xl p-1 z-20 space-y-0.5">
                          <button
                            onClick={(e) => duplicateProject(project.id, e)}
                            className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] text-[var(--text-secondary)] hover:text-white hover:bg-white/10 flex items-center gap-2"
                          >
                            <Copy size={12} /> Duplicate
                          </button>
                          <button
                            onClick={(e) => deleteProject(project.id, e)}
                            className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-3 border-t border-white/[0.05]">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-white font-medium">
                      {project.status}
                    </span>
                    <span>{project.nodeCount} Widgets</span>
                  </div>
                  <span>{project.lastModified}</span>
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
              onClick={() => onOpenProject(project.id)}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => toggleFavorite(project.id, e)}
                  className={`${project.isFavorite ? "text-amber-400" : "text-[var(--text-muted)]"}`}
                >
                  <Star size={14} fill={project.isFavorite ? "currentColor" : "none"} />
                </button>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[var(--primary)] transition-colors">
                    {project.title}
                  </h4>
                  <div className="text-[10px] text-[var(--text-muted)] flex items-center gap-2">
                    <span>{project.category}</span>
                    <span>•</span>
                    <span>{project.nodeCount} Widgets</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-[var(--text-muted)]">
                <span>{project.lastModified}</span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-white text-[10px]">{project.status}</span>
                <ExternalLink size={14} className="group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
