"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command as CommandIcon,
  Sparkles,
  Layout,
  Clock,
  Settings,
  HelpCircle,
  FileText,
  Sun,
  Moon,
  FolderOpen,
  ArrowRight,
  X,
  TrendingUp,
  Users,
  Package,
  DollarSign,
} from "lucide-react";

export interface CommandItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  view?: string;
  templateId?: string;
  action?: string;
  shortcut?: string;
}

export interface CommandGroup {
  category: string;
  items: CommandItem[];
}

const COMMAND_GROUPS: CommandGroup[] = [
  {
    category: "Navigation",
    items: [
      { id: "nav-prompt", title: "Prompt Studio", icon: Sparkles, view: "workspace", shortcut: "G P" },
      { id: "nav-apps", title: "Open Recent Applications", icon: FolderOpen, view: "workspace", shortcut: "G W" },
      { id: "nav-history", title: "Prompt History", icon: Clock, view: "history", shortcut: "G H" },
      { id: "nav-templates", title: "Template Library", icon: Layout, view: "templates", shortcut: "G T" },
      { id: "nav-settings", title: "Settings & Preferences", icon: Settings, view: "settings", shortcut: "G S" },
      { id: "nav-help", title: "Documentation & Help", icon: HelpCircle, view: "help", shortcut: "G D" },
    ],
  },
  {
    category: "Quick Templates",
    items: [
      { id: "tmpl-sales", title: "Sales Pipeline Dashboard", icon: TrendingUp, templateId: "tmpl-1" },
      { id: "tmpl-crm", title: "Customer Relationship Manager", icon: Users, templateId: "tmpl-2" },
      { id: "tmpl-inventory", title: "Inventory & Stock Tracker", icon: Package, templateId: "tmpl-3" },
      { id: "tmpl-finance", title: "Corporate Finance Analytics", icon: DollarSign, templateId: "tmpl-4" },
    ],
  },
  {
    category: "System Actions",
    items: [
      { id: "sys-theme-dark", title: "Switch to Dark Glass Theme", icon: Moon, action: "theme-dark" },
      { id: "sys-theme-light", title: "Switch to High Contrast Light", icon: Sun, action: "theme-light" },
      { id: "sys-docs", title: "View Phase 0 Architecture Manual", icon: FileText, action: "open-docs" },
    ],
  },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView?: (view: string) => void;
  onSelectTemplate?: (id: string) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectView,
  onSelectTemplate,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter commands by query
  const allFilteredItems: CommandItem[] = COMMAND_GROUPS.flatMap((g) => g.items).filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  const executeCommand = useCallback(
    (item: CommandItem) => {
      if (item.view && onSelectView) {
        onSelectView(item.view);
      } else if (item.templateId && onSelectTemplate) {
        onSelectTemplate(item.templateId);
      } else if (item.action === "open-docs") {
        window.open("file:///d:/projects/MorphOS/docs/Phase_0_Architecture_and_Engineering_Foundation.md", "_blank");
      }
      onClose();
    },
    [onSelectView, onSelectTemplate, onClose]
  );

  // Global keydown handler for Arrow Keys, Enter, Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, allFilteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + allFilteredItems.length) % Math.max(1, allFilteredItems.length));
      } else if (e.key === "Enter" && allFilteredItems.length > 0) {
        e.preventDefault();
        const selected = allFilteredItems[selectedIndex];
        if (selected) {
          executeCommand(selected);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, allFilteredItems, executeCommand, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1060] flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl rounded-2xl bg-[var(--surface-elevated)] border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6)] overflow-hidden z-10 select-none"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
            <Search size={18} className="text-[var(--text-muted)] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={handleQueryChange}
              placeholder="Type a command or search templates, views, settings..."
              className="flex-1 bg-transparent text-sm text-white placeholder-[var(--text-muted)] focus:outline-none"
            />
            <button
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-4 scrollbar-none">
            {allFilteredItems.length === 0 ? (
              <div className="py-12 text-center text-xs text-[var(--text-muted)] space-y-1">
                <p>No matching commands found for &quot;{query}&quot;</p>
                <p className="text-[10px]">Try searching for &quot;prompt&quot;, &quot;sales&quot;, &quot;history&quot; or &quot;theme&quot;</p>
              </div>
            ) : (
              COMMAND_GROUPS.map((group) => {
                const groupItems = group.items.filter((item) =>
                  item.title.toLowerCase().includes(query.toLowerCase())
                );
                if (groupItems.length === 0) return null;

                return (
                  <div key={group.category} className="space-y-1">
                    <div className="px-3 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      {group.category}
                    </div>

                    {groupItems.map((item) => {
                      const globalIdx = allFilteredItems.findIndex((i) => i.id === item.id);
                      const isSelected = globalIdx === selectedIndex;
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.id}
                          onClick={() => executeCommand(item)}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs cursor-pointer transition-all ${
                            isSelected
                              ? "bg-[var(--primary)] text-white shadow-md"
                              : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={16} />
                            <span className="font-semibold">{item.title}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {item.shortcut && (
                              <kbd
                                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                                  isSelected
                                    ? "bg-white/20 text-white"
                                    : "bg-white/5 text-[var(--text-muted)] border border-white/10"
                                }`}
                              >
                                {item.shortcut}
                              </kbd>
                            )}
                            <ArrowRight
                              size={13}
                              className={`opacity-0 ${isSelected ? "opacity-100 text-white" : ""}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts Help */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-t border-white/10 text-[10px] text-[var(--text-muted)] select-none">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-white/10 font-mono text-[9px]">↑↓</kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-white/10 font-mono text-[9px]">↵</kbd> Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-white/10 font-mono text-[9px]">ESC</kbd> Close
              </span>
            </div>
            <div className="flex items-center gap-1 text-[var(--primary)] font-semibold">
              <CommandIcon size={12} />
              <span>MorphOS Command Layer</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
