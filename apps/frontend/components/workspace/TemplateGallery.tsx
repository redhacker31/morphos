"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Heart,
  BarChart3,
  Receipt,
  KanbanSquare,
  X,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { mockTemplates } from "@/lib/mock-data";

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Heart,
  BarChart3,
  Receipt,
  KanbanSquare,
};

const categories = ["All", "Business", "Finance", "Operations", "Healthcare", "Analytics", "Productivity"];

interface TemplateGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (templateId: string) => void;
}

export default function TemplateGallery({ isOpen, onClose, onSelect }: TemplateGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredTemplates =
    activeCategory === "All"
      ? mockTemplates
      : mockTemplates.filter((t) => t.category === activeCategory);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-4xl max-h-[80vh] glass-strong rounded-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--card-border)] shrink-0">
          <div>
            <h2 className="text-lg font-semibold">Template Gallery</h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Start with a pre-built template
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-primary)] transition-colors"
            aria-label="Close gallery"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-[var(--card-border)] overflow-x-auto shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all",
                activeCategory === cat
                  ? "bg-[var(--primary-subtle)] text-[var(--primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template, index) => {
              const Icon = iconMap[template.icon] || BarChart3;

              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredId(template.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="glass group p-5 cursor-pointer hover:border-[var(--card-border-hover)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-200"
                    style={{
                      background: `color-mix(in srgb, ${template.color} 12%, transparent)`,
                      boxShadow: hoveredId === template.id ? `0 0 20px color-mix(in srgb, ${template.color} 25%, transparent)` : "none",
                    }}
                  >
                    <Icon size={20} style={{ color: template.color }} />
                  </div>

                  <h3 className="text-sm font-semibold mb-1.5">{template.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
                    {template.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] border-[var(--card-border)] text-[var(--text-muted)]">
                      {template.category}
                    </Badge>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect?.(template.id);
                      }}
                      className="flex items-center gap-1 text-xs font-medium text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Use Template
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
