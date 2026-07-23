
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  LayoutTemplate,
  Clock,
  AppWindow,
  Star,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  User,
  Folder,
  Sparkles,
  ChevronDown,
  Plus,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

interface SidebarGroup {
  title: string;
  items: NavItem[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    title: "AI Studio",
    items: [
      { id: "workspace", label: "Prompt Studio", icon: LayoutDashboard },
      { id: "templates", label: "Templates", icon: LayoutTemplate },
      { id: "history", label: "Prompt History", icon: Clock },
    ],
  },
  {
    title: "Library",
    items: [
      { id: "applications", label: "Recent Applications", icon: AppWindow, badge: "4" },
      { id: "favorites", label: "Favorite Starred", icon: Star },
    ],
  },
];

const WORKSPACES = [
  { id: "ws-main", name: "Main Executive Studio", role: "Owner" },
  { id: "ws-acme", name: "Acme Corp SaaS", role: "Team" },
  { id: "ws-[id]", name: "Healthcare Analytics", role: "Editor" },
];

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  userId?: string | null;
}

export default function Sidebar({
  activeView,
  onViewChange,
  collapsed,
  onToggleCollapse,
  userId,
}: SidebarProps) {
  const shortId = userId ? userId.slice(0, 8) : "guest";
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "AI Studio": true,
    "Library": true,
  });
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(WORKSPACES[0]);

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  };

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 64 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="h-full flex flex-col bg-[#0F0F12]/90 backdrop-blur-2xl border-r border-white/10 relative z-[1020] shrink-0 overflow-hidden select-none"
      >
        {/* Logo Header */}
        <div
          className={cn(
            "h-16 flex items-center shrink-0 border-b border-white/10 px-4",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          <Logo collapsed={collapsed} size="md" />
          {!collapsed && (
            <div className="flex items-center gap-1 text-[10px] text-[var(--primary)] font-extrabold bg-[var(--primary)]/10 px-2 py-0.5 rounded-full border border-[var(--primary)]/20 shadow-[0_0_10px_var(--primary-glow)]">
              <Sparkles size={10} />
              v1.1
            </div>
          )}
        </div>

        {/* Workspace Switcher */}
        {!collapsed && (
          <div className="p-3 border-b border-white/10 relative">
            <button
              onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/5 transition-all text-xs cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)]/40 flex items-center justify-center text-[var(--primary)] font-bold text-[10px] shrink-0">
                  <Building2 size={13} />
                </div>
                <div className="truncate text-left">
                  <div className="font-bold text-white truncate text-[11px]">{selectedWorkspace.name}</div>
                  <div className="text-[9px] text-[var(--text-muted)]">{selectedWorkspace.role} Workspace</div>
                </div>
              </div>
              <ChevronDown size={14} className={`text-[var(--text-muted)] group-hover:text-white transition-transform ${workspaceMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {workspaceMenuOpen && (
              <div className="absolute left-3 right-3 top-16 bg-[var(--surface-elevated)] border border-white/15 rounded-xl shadow-2xl p-1 z-30 space-y-1">
                <div className="px-2.5 py-1 text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Switch Workspace
                </div>
                {WORKSPACES.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => {
                      setSelectedWorkspace(ws);
                      setWorkspaceMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
                      ws.id === selectedWorkspace.id ? "bg-[var(--primary)] text-white font-bold" : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{ws.name}</span>
                    <span className="text-[9px] opacity-70">{ws.role}</span>
                  </button>
                ))}
                <div className="border-t border-white/10 pt-1">
                  <button
                    onClick={() => setWorkspaceMenuOpen(false)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-[var(--primary)] hover:bg-white/5 flex items-center gap-2 font-semibold cursor-pointer"
                  >
                    <Plus size={13} /> Create Workspace
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Group Navigation */}
        <div className="flex-1 py-4 px-2 space-y-6 overflow-y-auto scrollbar-none">
          {sidebarGroups.map((group) => (
            <div key={group.title} className="space-y-1.5">
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="w-full flex items-center justify-between px-3 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider hover:text-white transition-colors cursor-pointer"
                >
                  <span>{group.title}</span>
                  <motion.span
                    animate={{ rotate: expandedGroups[group.title] ? 0 : -90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ChevronDown size={12} />
                  </motion.span>
                </button>
              )}

              <AnimatePresence initial={false}>
                {(collapsed || expandedGroups[group.title]) && (
                  <motion.div
                    initial={collapsed ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={collapsed ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="space-y-0.5 overflow-hidden"
                  >
                    {group.items.map((item) => (
                      <SidebarItem
                        key={item.id}
                        item={item}
                        active={activeView === item.id}
                        collapsed={collapsed}
                        onClick={() => onViewChange(item.id)}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* System & Profile Section */}
        <div className="py-3 px-2 space-y-0.5 border-t border-white/10 bg-black/20">
          <SidebarItem
            item={{ id: "settings", label: "Settings", icon: Settings }}
            active={activeView === "settings"}
            collapsed={collapsed}
            onClick={() => onViewChange("settings")}
          />
          <SidebarItem
            item={{ id: "help", label: "Help & Support", icon: HelpCircle }}
            active={activeView === "help"}
            collapsed={collapsed}
            onClick={() => onViewChange("help")}
          />

          <Separator className="my-2 bg-white/10" />

          {/* Profile Card */}
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-[var(--text-secondary)] hover:bg-white/5 hover:text-white transition-colors duration-200 group relative",
              collapsed && "justify-center px-0"
            )}
          >
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_12px_rgba(139,92,246,0.4)]">
                G
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[var(--success)] border-2 border-[#0F0F12] shadow-[0_0_8px_var(--success-glow)]" />
            </div>
            {!collapsed && (
            <div className="flex-grow min-w-0">
              <div className="text-xs font-bold text-white truncate">Guest</div>
              <div className="text-[10px] text-[var(--text-muted)] truncate font-mono">anon · {shortId}</div>
            </div>
            )}
            {!collapsed && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={14} className="text-[var(--text-muted)]" />
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle Handle */}
        <button
          onClick={onToggleCollapse}
          className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-12 rounded-l-none rounded-r-lg bg-[#0F0F12] border-t border-b border-r border-white/15 flex items-center justify-center text-[var(--text-muted)] hover:text-white transition-all z-50 shadow-xl cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.aside>
    </TooltipProvider>
  );
}

function SidebarItem({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;

  const content = (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 rounded-xl text-xs font-semibold transition-all duration-200 relative group cursor-pointer overflow-hidden",
        collapsed ? "justify-center px-0 py-3" : "px-3 py-2.5",
        active
          ? "text-white"
          : "text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.04]"
      )}
      aria-label={item.label}
    >
      {/* Active Pill Indicator */}
      {active && (
        <motion.div
          layoutId="active-sidebar-pill"
          className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/10 border-l-2 border-[var(--primary)] z-0 rounded-xl"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative z-10 shrink-0 transition-colors duration-200",
          active ? "text-[var(--primary)]" : "text-[var(--text-secondary)] group-hover:text-white"
        )}
      >
        <Icon size={17} />
      </motion.div>

      {!collapsed && (
        <span className="truncate relative z-10 text-xs">
          {item.label}
        </span>
      )}

      {!collapsed && item.badge && (
        <span className="ml-auto text-[10px] bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30 px-2 py-0.5 rounded-full font-bold relative z-10">
          {item.badge}
        </span>
      )}
    </button>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="bg-[#0F0F12] border border-white/10 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}
