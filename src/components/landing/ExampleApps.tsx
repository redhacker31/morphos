import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, DollarSign, Package, HeartPulse, Layout, CheckCircle2, ArrowRight } from "lucide-react";
const EXAMPLE_APPS = [{
  id: "crm",
  name: "Enterprise Sales CRM",
  category: "CRM & Revenue",
  icon: TrendingUp,
  color: "#8B5CF6",
  description: "Multi-pipeline deal management with automated ARR forecasting and lead scoring.",
  metrics: [{
    label: "Active Pipeline",
    value: "$4.2M"
  }, {
    label: "Win Rate",
    value: "34.8%"
  }, {
    label: "Avg Deal Cycle",
    value: "18 Days"
  }],
  widgets: ["Pipeline Kanban", "Deal Velocity Chart", "Lead Scoring Table", "ARR Gauge"]
}, {
  id: "finance",
  name: "Corporate Financial Intelligence",
  category: "Finance & BI",
  icon: DollarSign,
  color: "#06B6D4",
  description: "Real-time P&L analytics, burn rate monitoring, and multi-currency expense tracking.",
  metrics: [{
    label: "Monthly Runway",
    value: "24 Mos"
  }, {
    label: "OpEx Efficiency",
    value: "+14.2%"
  }, {
    label: "Gross Margin",
    value: "78.4%"
  }],
  widgets: ["Burn Rate Line Chart", "OpEx Breakdown", "Cash Flow Forecast", "Variance Table"]
}, {
  id: "inventory",
  name: "Global Supply Chain & Inventory",
  category: "Logistics",
  icon: Package,
  color: "#10B981",
  description: "Real-time SKU tracking, warehouse reorder alerts, and automated supplier manifests.",
  metrics: [{
    label: "Active SKUs",
    value: "14,280"
  }, {
    label: "Fulfillment SLA",
    value: "99.4%"
  }, {
    label: "Stockout Risk",
    value: "0.2%"
  }],
  widgets: ["SKU Heatmap", "Reorder Threshold Alert", "Warehouse Map", "Supplier Performance"]
}, {
  id: "healthcare",
  name: "Patient Flow & EHR Operations",
  category: "Healthcare",
  icon: HeartPulse,
  color: "#EC4899",
  description: "HIPAA-compliant triage tracking, bed occupancy rates, and clinician scheduling.",
  metrics: [{
    label: "Bed Occupancy",
    value: "88.2%"
  }, {
    label: "Avg Triage Time",
    value: "4.2 Min"
  }, {
    label: "Patient Satisfaction",
    value: "4.9 / 5"
  }],
  widgets: ["Bed Occupancy Matrix", "Triage Queue Table", "Staffing Shift Grid", "ER Wait Time Gauge"]
}];
export function ExampleApps() {
  const [activeTab, setActiveTab] = useState(EXAMPLE_APPS[0].id);
  const selectedApp = EXAMPLE_APPS.find(app => app.id === activeTab) || EXAMPLE_APPS[0];
  return <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 border-[1px] border-[#B0BFDCFF]">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--card-border)] text-xs font-semibold text-[var(--accent)]">
            <Layout size={14} />
            <span>Structured Generation Output</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] md:text-5xl tracking-tight">
            Generated Applications in Seconds
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            MorphOS translates complex requirements into multi-widget, interactive application layouts without writing a single line of React code.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {EXAMPLE_APPS.map(app => {
          const Icon = app.icon;
          const isActive = activeTab === app.id;
          return <button key={app.id} onClick={() => setActiveTab(app.id)} className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${isActive ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] border-[var(--card-border-hover)] shadow-[0_4px_20px_rgba(0,0,0,0.4)]" : "bg-transparent text-[var(--text-secondary)] border-[var(--card-border)] hover:text-[var(--text-primary)] hover:border-[var(--card-border)]"}`}>
                <Icon size={16} style={{
              color: app.color
            }} />
                <span>{app.name}</span>
              </button>;
        })}
        </div>

        {/* Selected Application Card Showcase */}
        <AnimatePresence mode="wait">
          <motion.div key={selectedApp.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.3
        }} className="rounded-3xl bg-[var(--surface)] border border-[var(--card-border)] p-8 lg:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-md" style={{
                  backgroundColor: `color-mix(in srgb, ${selectedApp.color} 15%, transparent)`,
                  color: selectedApp.color
                }}>
                    {selectedApp.category}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)]">
                    {selectedApp.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {selectedApp.description}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--card-border)]">
                  {selectedApp.metrics.map((metric, i) => <div key={i} className="space-y-1">
                      <div className="text-[10px] text-[var(--text-muted)] font-medium">
                        {metric.label}
                      </div>
                      <div className="text-lg font-extrabold text-[var(--text-primary)]">
                        {metric.value}
                      </div>
                    </div>)}
                </div>

                {/* Generated Widgets List */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    Included Dynamic Widgets
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedApp.widgets.map((widget, i) => <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-secondary)] bg-[var(--hover-overlay)] px-3 py-2 rounded-lg border border-[var(--card-border)]">
                        <CheckCircle2 size={13} className="text-[var(--success)] shrink-0" />
                        <span className="truncate">{widget}</span>
                      </div>)}
                  </div>
                </div>
              </div>

              {/* Visual Preview Frame Column */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[var(--background-secondary)] border border-[var(--card-border)] p-5 space-y-4 shadow-2xl relative">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--hover-overlay)] px-3 py-0.5 rounded-full border border-[var(--card-border)]">
                      morphos://ast.app.{selectedApp.id}
                    </div>
                    <div className="text-[10px] text-[var(--success)] font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                      VALIDATED AST
                    </div>
                  </div>

                  {/* Mock Widget Layout Grid */}
                  <div className="grid grid-cols-12 gap-3 min-h-[260px]">
                    <div className="col-span-8 rounded-xl bg-[var(--hover-overlay)] border border-[var(--card-border)] p-4 space-y-3 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <div className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
                          <selectedApp.icon size={14} style={{
                          color: selectedApp.color
                        }} />
                          <span>Primary Performance Metric</span>
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)]">Real-time</span>
                      </div>
                      <div className="h-28 w-full rounded-lg bg-gradient-to-t from-[var(--primary)]/20 to-transparent border-b border-[var(--primary)]/40 relative flex items-end justify-between px-4 pb-2">
                        {[40, 65, 55, 80, 95, 70, 85].map((h, idx) => <div key={idx} className="w-4 rounded-t bg-gradient-to-t from-[var(--primary)] to-[var(--secondary)]" style={{
                        height: `${h}%`
                      }} />)}
                      </div>
                    </div>

                    <div className="col-span-4 space-y-3">
                      <div className="rounded-xl bg-[var(--hover-overlay)] border border-[var(--card-border)] p-3.5 space-y-1">
                        <div className="text-[10px] text-[var(--text-muted)]">Efficiency Rate</div>
                        <div className="text-xl font-bold text-[var(--text-primary)]">99.8%</div>
                        <div className="text-[9px] text-[var(--success)]">+4.2% vs last month</div>
                      </div>
                      <div className="rounded-xl bg-[var(--hover-overlay)] border border-[var(--card-border)] p-3.5 space-y-1">
                        <div className="text-[10px] text-[var(--text-muted)]">Active Users</div>
                        <div className="text-xl font-bold text-[var(--text-primary)]">1,420</div>
                        <div className="text-[9px] text-[var(--accent)]">Live websocket sync</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>;
}