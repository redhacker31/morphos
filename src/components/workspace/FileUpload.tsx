
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileSpreadsheet,
  FileText,
  File,
  X,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { UploadedFile } from "@/lib/mock-data";

interface FileUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

const fileTypeIcons = {
  csv: FileSpreadsheet,
  excel: FileSpreadsheet,
  pdf: FileText,
};

const fileTypeColors = {
  csv: "text-[var(--success)]",
  excel: "text-[var(--success)]",
  pdf: "text-[var(--destructive)]",
};

export default function FileUpload({ isOpen, onClose }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    // Mock file upload
    const mockFile: UploadedFile = {
      id: `file-${Date.now()}`,
      name: "Uploaded_File.csv",
      size: "1.2 MB",
      type: "csv",
      progress: 0,
    };

    setFiles((prev) => [...prev, mockFile]);

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles((prev) =>
        prev.map((f) =>
          f.id === mockFile.id ? { ...f, progress: Math.min(progress, 100) } : f
        )
      );
      if (progress >= 100) clearInterval(interval);
    }, 200);
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold">Upload Files</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-primary)] transition-colors"
            aria-label="Close upload"
          >
            <X size={16} />
          </button>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
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
            Drag & drop files here, or{" "}
            <span className="text-[var(--primary)] font-medium cursor-pointer">browse</span>
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Badge variant="outline" className="text-[10px] border-[var(--card-border)] text-[var(--text-muted)]">CSV</Badge>
            <Badge variant="outline" className="text-[10px] border-[var(--card-border)] text-[var(--text-muted)]">Excel</Badge>
            <Badge variant="outline" className="text-[10px] border-[var(--card-border)] text-[var(--text-muted)]">PDF</Badge>
          </div>
        </div>

        {/* Uploaded Files */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 space-y-2 overflow-hidden"
            >
              {files.map((file) => {
                const Icon = fileTypeIcons[file.type] || File;
                const colorClass = fileTypeColors[file.type] || "text-[var(--text-muted)]";

                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[var(--card)] border border-[var(--card-border)]"
                  >
                    <Icon size={18} className={colorClass} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{file.name}</div>
                      <div className="text-xs text-[var(--text-muted)]">{file.size}</div>
                      {file.progress < 100 && (
                        <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${file.progress}%` }}
                            className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                          />
                        </div>
                      )}
                    </div>
                    {file.progress >= 100 ? (
                      <CheckCircle size={16} className="text-[var(--success)] shrink-0" />
                    ) : (
                      <Loader2 size={16} className="text-[var(--primary)] animate-spin shrink-0" />
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                      aria-label="Remove file"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
