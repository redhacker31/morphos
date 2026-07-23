
import React, { useState } from "react";
import type { BaseWidgetProps, WidgetMetadata } from "../../types/renderer";
import { Send, FileText } from "lucide-react";

export const FormContainerWidgetMetadata: WidgetMetadata = {
  type: "form-container",
  displayName: "Dynamic Form Container",
  category: "forms",
  description: "Renders dynamic interactive form inputs with validation and submission events.",
  version: "1.0.0",
  capabilities: {
    editable: true,
    resizable: true,
    exportable: false,
    requiresData: false,
    supportsFilters: false,
    interactive: true,
    realtimeCapable: false,
  },
  defaultConfig: {
    fields: [
      { name: "full_name", label: "Full Name", type: "text", placeholder: "e.g. John Doe" },
      { name: "email", label: "Email Address", type: "email", placeholder: "john@company.com" },
      { name: "role", label: "Role Title", type: "text", placeholder: "Senior Architect" },
    ],
    submitText: "Submit Entry",
  },
  defaultData: {},
};

export function FormContainerWidget({
  id,
  title = "Interactive Input Form",
  description = "Fill out the fields below",
  config = FormContainerWidgetMetadata.defaultConfig,
  onWidgetEvent,
}: BaseWidgetProps) {
  const fields = (config.fields as any[]) || (FormContainerWidgetMetadata.defaultConfig.fields as any[]);
  const submitText = (config.submitText as string) || "Submit Entry";
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onWidgetEvent?.({
      widgetId: id,
      eventType: "onSubmit",
      timestamp: Date.now(),
      payload: formData,
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="w-full h-full rounded-2xl bg-[var(--surface-elevated)]/90 border border-white/10 p-5 space-y-4 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 flex items-center justify-center text-[var(--accent)]">
          <FileText size={16} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white">{title}</h4>
          {description && <p className="text-[10px] text-[var(--text-muted)]">{description}</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 flex-1">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1">
            <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">{field.label}</label>
            <input
              type={field.type || "text"}
              placeholder={field.placeholder || ""}
              value={formData[field.name] || ""}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full mt-2 py-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-md"
        >
          <Send size={13} />
          <span>{submitted ? "Submitted Successfully!" : submitText}</span>
        </button>
      </form>
    </div>
  );
}
