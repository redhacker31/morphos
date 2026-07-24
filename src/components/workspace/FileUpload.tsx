import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileSpreadsheet,
  FileText,
  X,
  CheckCircle,
  Loader2,
  AlertCircle,
  Sparkles,
  Table2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { parseFile, type ParsedFile } from "@/lib/fileParser";

interface FileUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onParsed?: (result: ParsedFile) => void;
}

interface UploadEntry {
  id: string;
  name: string;
  sizeLabel: string;
  kind: "spreadsheet" | "pdf";
  status: "parsing" | "done" | "error";
  error?: string;
  result?: ParsedFile;
}

const MAX_BYTES = 15 * 1024 * 1024; // 15 MB

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function kindOf(file: File): "spreadsheet" | "pdf" {
  const name = file.name.toLowerCase();
  return name.endsWith(".pdf") || file.type === "application/pdf" ? "pdf" : "spreadsheet";
}

function iconFor(kind: "spreadsheet" | "pdf") {
  return kind === "pdf" ? FileText : FileSpreadsheet;
}

function colorFor(kind: "spreadsheet" | "pdf") {
  return kind === "pdf" ? "text-[var(--destructive)]" : "text-[var(--success)]";
}

export default function FileUpload({ isOpen, onClose, onParsed }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [entries, setEntries] = useState<UploadEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (fileList: FileList | null) => {
    const file = fileList?.[0];
    if (!file) return;

    if (file.size > MAX_BYTES) {
      const entry: UploadEntry = {
        id: `file-${Date.now()}`,
        name: file.name,
        sizeLabel: formatSize(file.size),
        kind: kindOf(file),
        status: "error",
        error: "File exceeds the 15 MB limit.",
      };
      setEntries((prev) => [...prev, entry]);
      return;
    }

    const id = `file-${Date.now()}`;
    const kind = kindOf(file);
    setEntries((prev) => [
      ...prev,
      { id, name: file.name, sizeLabel: formatSize(file.size), kind, status: "parsing" },
    ]);

    try {
      const result = await parseFile(file);
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: "done", result } : e))
      );
    } catch (err) {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === id
            ? {
                ...e,
                status: "error",
                error: err instanceof Error ? err.message : "Failed to parse file.",
              }
            : e
        )
      );
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      void handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    void handleFiles(e.target.files);
    e.target.value = "";
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const generate = (entry: UploadEntry) => {
    if (entry.status !== "done" || !entry.result) return;
    onParsed?.(entry.result);
  };

  if (!isOpen) return null;

  const doneEntry = entries.find((e) => e.status === "done" && e.result);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Upload Data File</h3>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
              Parse a spreadsheet or PDF, then generate a dashboard from its contents.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--hover-overlay)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Close upload"
          >
            <X size={16} />
          </button>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer",
            isDragging
              ? "border-[var(--primary)] bg-[var(--primary-subtle)]"
              : "border-[var(--card-border)] hover:border-[var(--card-border-hover)]"
          )}
        >
          <Upload
            size={32}
            className={cn(
              "mx-auto mb-3 transition-colors",
              isDragging ? "text-[var(--primary)]" : "text-[var(--text-muted)]"
            )}
          />
          <p className="text-sm text-[var(--text-secondary)] mb-1">
            Drag & drop a file here, or{" "}
            <span className="text-[var(--primary)] font-medium">browse</span>
          </p>
          <p className="text-[11px] text-[var(--text-muted)]">
            Up to 15 MB. Parsing runs locally in your browser.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Badge variant="outline" className="text-[10px] border-[var(--card-border)] text-[var(--text-muted)]">
              CSV
            </Badge>
            <Badge variant="outline" className="text-[10px] border-[var(--card-border)] text-[var(--text-muted)]">
              XLSX
            </Badge>
            <Badge variant="outline" className="text-[10px] border-[var(--card-border)] text-[var(--text-muted)]">
              PDF
            </Badge>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.xlsx,.xls,.pdf"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>

        {/* Parsed Files */}
        <AnimatePresence>
          {entries.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 space-y-3 overflow-hidden"
            >
              {entries.map((entry) => {
                const Icon = iconFor(entry.kind);
                const colorClass = colorFor(entry.kind);
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-3 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={colorClass} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate text-[var(--text-primary)]">
                          {entry.name}
                        </div>
                        <div className="text-xs text-[var(--text-muted)]">{entry.sizeLabel}</div>
                      </div>
                      {entry.status === "parsing" && (
                        <Loader2 size={16} className="text-[var(--primary)] animate-spin shrink-0" />
                      )}
                      {entry.status === "done" && (
                        <CheckCircle size={16} className="text-[var(--success)] shrink-0" />
                      )}
                      {entry.status === "error" && (
                        <AlertCircle size={16} className="text-[var(--destructive)] shrink-0" />
                      )}
                      <button
                        onClick={() => removeEntry(entry.id)}
                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                        aria-label="Remove file"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    {/* Error */}
                    {entry.status === "error" && (
                      <div className="text-[11px] text-red-300 bg-red-500/10 border border-red-500/30 rounded-md px-2.5 py-1.5">
                        {entry.error}
                      </div>
                    )}

                    {/* Preview */}
                    {entry.status === "done" && entry.result && (
                      <ParsedPreview result={entry.result} />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate action */}
        {doneEntry && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => generate(doneEntry)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white text-xs font-extrabold flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-lg"
            >
              <Sparkles size={14} />
              Generate Dashboard from File
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ParsedPreview({ result }: { result: ParsedFile }) {
  if (result.fileType === "pdf") {
    return (
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
          <FileText size={12} /> Extracted text
        </div>
        <p className="text-[11px] text-[var(--text-secondary)] line-clamp-4 leading-relaxed bg-[var(--hover-overlay)] rounded-md p-2">
          {result.text?.slice(0, 400) || "No text extracted."}
        </p>
      </div>
    );
  }

  const sample = result.rows.slice(0, 3);
  const cols = result.columns.slice(0, 4);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-[10px]">
        <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[var(--text-muted)]">
          <Table2 size={12} /> {result.rowCount} rows
        </span>
        <span className="text-[var(--text-muted)]">·</span>
        <span className="text-[var(--text-muted)]">{result.columns.length} columns</span>
        {result.numericColumns.length > 0 && (
          <>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-[var(--success)]">
              numeric: {result.numericColumns.slice(0, 3).join(", ")}
            </span>
          </>
        )}
      </div>
      <div className="overflow-x-auto rounded-md border border-[var(--card-border)]">
        <table className="w-full text-left text-[10px]">
          <thead className="bg-[var(--hover-overlay)] text-[var(--text-muted)] uppercase tracking-wider">
            <tr>
              {cols.map((c) => (
                <th key={c} className="py-1.5 px-2 font-bold truncate max-w-[120px]">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--card-border)]">
            {sample.map((row, i) => (
              <tr key={i} className="text-[var(--text-secondary)]">
                {cols.map((c) => (
                  <td key={c} className="py-1.5 px-2 truncate max-w-[120px]">
                    {String(row[c] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
