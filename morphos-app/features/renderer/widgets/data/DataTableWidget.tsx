"use client";

import React, { useState } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { Database, Search, ChevronLeft, ChevronRight } from "lucide-react";

export const DataTableWidgetMetadata: WidgetMetadata = {
  type: "data-table",
  displayName: "Interactive Data Table",
  category: "data",
  description: "Renders multi-column tabular records with inline search and row selection.",
  version: "1.0.0",
  capabilities: {
    editable: true,
    resizable: true,
    exportable: true,
    requiresData: true,
    supportsFilters: true,
    interactive: true,
    realtimeCapable: true,
  },
  defaultConfig: {
    columns: ["ID", "Name", "Category", "Status", "Amount"],
    pageSize: 4,
  },
  defaultData: [
    { ID: "REC-101", Name: "Enterprise License", Category: "SaaS", Status: "Active", Amount: "$12,400" },
    { ID: "REC-102", Name: "Cloud Storage Tier", Category: "Infrastructure", Status: "Pending", Amount: "$3,200" },
    { ID: "REC-103", Name: "Security Audit Addon", Category: "Services", Status: "Completed", Amount: "$8,500" },
    { ID: "REC-104", Name: "API Gateway Cluster", Category: "Infrastructure", Status: "Active", Amount: "$15,000" },
    { ID: "REC-105", Name: "Dedicated DB Instance", Category: "Database", Status: "Active", Amount: "$6,800" },
  ],
};

export function DataTableWidget({
  id,
  title = "Data Records",
  description,
  data = DataTableWidgetMetadata.defaultData,
  config = DataTableWidgetMetadata.defaultConfig,
  onWidgetEvent,
}: BaseWidgetProps) {
  const rows = Array.isArray(data) ? data : (DataTableWidgetMetadata.defaultData as any[]);
  const columns = (config.columns as string[]) || Object.keys(rows[0] || {});
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((val) => String(val).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full h-full rounded-2xl bg-[var(--surface-elevated)]/90 border border-white/10 p-5 space-y-4 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/15 flex items-center justify-center text-[var(--primary)]">
            <Database size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">{title}</h4>
            {description && <p className="text-[10px] text-[var(--text-muted)]">{description}</p>}
          </div>
        </div>

        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search records..."
            className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] w-36"
          />
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[var(--text-secondary)]">
          <thead className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-white/[0.02]">
            <tr>
              {columns.map((col) => (
                <th key={col} className="py-2 px-3 border-b border-white/5">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredRows.slice(0, 4).map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onWidgetEvent?.({ widgetId: id, eventType: "onCellClick", timestamp: Date.now(), payload: row })}
                className="hover:bg-white/5 cursor-pointer transition-colors"
              >
                {columns.map((col) => (
                  <td key={col} className="py-2.5 px-3 whitespace-nowrap text-white font-medium">
                    {String(row[col] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-2 border-t border-white/5">
        <span>Showing {Math.min(4, filteredRows.length)} of {filteredRows.length} records</span>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded bg-white/5 hover:bg-white/10 text-white"><ChevronLeft size={12} /></button>
          <button className="p-1 rounded bg-white/5 hover:bg-white/10 text-white"><ChevronRight size={12} /></button>
        </div>
      </div>
    </div>
  );
}
