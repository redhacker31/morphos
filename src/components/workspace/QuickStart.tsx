
import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Package,
  DollarSign,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Bitcoin,
  LayoutDashboard,
  Sparkle,
  ChevronRight,
} from "lucide-react";

export interface TemplateCardItem {
  id: string;
  title: string;
  category: string;
  icon: any;
  color: string;
  desc: string;
  widgetsCount: number;
}

export const TEMPLATE_CARDS: TemplateCardItem[] = [
  {
    id: "tmpl-crm",
    title: "Enterprise Sales CRM",
    category: "Sales & Deals",
    icon: TrendingUp,
    color: "#8B5CF6",
    desc: "Track active pipelines, deal stages, and ARR forecasts.",
    widgetsCount: 4,
  },
  {
    id: "tmpl-[id]",
    title: "Customer Intelligence CRM",
    category: "CRM & Support",
    icon: Users,
    color: "#06B6D4",
    desc: "360° client profiles, support tickets, and churn risk analytics.",
    widgetsCount: 5,
  },
  {
    id: "tmpl-inventory",
    title: "Supply Chain & Inventory",
    category: "Logistics",
    icon: Package,
    color: "#10B981",
    desc: "Real-time SKU levels, reorder threshold alerts, and warehouse maps.",
    widgetsCount: 4,
  },
  {
    id: "tmpl-finance",
    title: "Corporate Finance Hub",
    category: "Finance & BI",
    icon: DollarSign,
    color: "#F59E0B",
    desc: "P&L tracking, monthly burn rate forecasts, and OpEx breakdown.",
    widgetsCount: 6,
  },
  {
    id: "tmpl-hospital",
    title: "Healthcare EHR & Triage",
    category: "Healthcare",
    icon: HeartPulse,
    color: "#EC4899",
    desc: "Patient flow, triage queue, bed occupancy, and staffing shifts.",
    widgetsCount: 5,
  },
  {
    id: "tmpl-education",
    title: "Campus LMS & Analytics",
    category: "Education",
    icon: GraduationCap,
    color: "#3B82F6",
    desc: "Student enrollment, course completion rates, and grade distributions.",
    widgetsCount: 4,
  },
  {
    id: "tmpl-hr",
    title: "HR & People Operations",
    category: "Human Resources",
    icon: Briefcase,
    color: "#A855F7",
    desc: "Employee onboarding progress, PTO requests, and team sentiment.",
    widgetsCount: 4,
  },
  {
    id: "tmpl-admin",
    title: "Executive Admin Dashboard",
    category: "Management",
    icon: LayoutDashboard,
    color: "#6366F1",
    desc: "Cross-department KPI summary, system status, and task timelines.",
    widgetsCount: 6,
  },
  {
    id: "tmpl-crypto",
    title: "Crypto Portfolio Bento",
    category: "Finance",
    icon: Bitcoin,
    color: "#F7931A",
    desc: "Live crypto bento: sales stats, transactions, balance gauge, and market forecast.",
    widgetsCount: 4,
  },
];

interface QuickStartProps {
  onSelectTemplate: (templateId: string) => void;
  onBrowseAll?: () => void;
}

export function QuickStart({ onSelectTemplate, onBrowseAll }: QuickStartProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5 select-none">
          <Sparkle size={13} className="text-[var(--primary)]" />
          Quick Start Application Templates
        </h3>
        {onBrowseAll && (
          <button
            onClick={onBrowseAll}
            className="text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors flex items-center gap-0.5 cursor-pointer"
          >
            Browse All Templates
            <ChevronRight size={13} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TEMPLATE_CARDS.map((template) => {
          const Icon = template.icon;
          return (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTemplate(template.id)}
              className="glass p-4 rounded-2xl border border-white/[0.05] hover:border-white/20 transition-all duration-200 cursor-pointer flex flex-col justify-between h-40 group relative overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${template.color} 15%, transparent)`,
                  }}
                >
                  <Icon size={18} style={{ color: template.color }} />
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[var(--text-muted)] bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                  {template.widgetsCount} Widgets
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-white group-hover:text-[var(--primary)] transition-colors">
                  {template.title}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                  {template.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.05] text-[10px] text-[var(--text-secondary)] font-semibold group-hover:text-white transition-colors">
                <span>Use Template</span>
                <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
