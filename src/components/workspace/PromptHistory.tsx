import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Search, Pin, Star, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PromptHistoryRow } from "@/hooks/usePromptHistory";

function relTime(iso?: string): string {
  if (!iso) return "Just now";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

interface PromptHistoryProps {
  items: PromptHistoryRow[];
  loading: boolean;
  onSelect?: (text: string) => void;
  onTogglePin: (id: string, value: boolean) => void;
  onToggleFavorite: (id: string, value: boolean) => void;
  onDelete: (id: string) => void;
}

export default function PromptHistory({
  items,
  loading,
  onSelect,
  onTogglePin,
  onToggleFavorite,
  onDelete,
}: PromptHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = items.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinned = filtered.filter((i) => i.pinned);
  const unpinned = filtered.filter((i) => !i.pinned);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[var(--card-border)] shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-[var(--primary)]" />
          <h2 className="text-lg font-semibold">Prompt History</h2>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--card)] border border-[var(--card-border)] rounded-lg pl-9 pr-4 py-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]/50 transition-colors"
            aria-label="Search prompts"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {loading ? (
          <div className="text-center py-8 text-xs text-[var(--text-muted)] flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Loading prompts...
          </div>
        ) : (
          <>
            {/* Pinned */}
            {pinned.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-1.5 px-2 mb-2">
                  <Pin size={12} className="text-[var(--text-muted)]" />
                  <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Pinned
                  </span>
                </div>
                <AnimatePresence>
                  {pinned.map((item) => (
                    <HistoryItem
                      key={item.id}
                      item={item}
                      onSelect={onSelect}
                      onTogglePin={onTogglePin}
                      onToggleFavorite={onToggleFavorite}
                      onDelete={onDelete}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Recent */}
            {unpinned.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 px-2 mb-2">
                  <Clock size={12} className="text-[var(--text-muted)]" />
                  <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Recent
                  </span>
                </div>
                <AnimatePresence>
                  {unpinned.map((item) => (
                    <HistoryItem
                      key={item.id}
                      item={item}
                      onSelect={onSelect}
                      onTogglePin={onTogglePin}
                      onToggleFavorite={onToggleFavorite}
                      onDelete={onDelete}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-8 text-sm text-[var(--text-muted)]">
                No prompts found
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function HistoryItem({
  item,
  onSelect,
  onTogglePin,
  onToggleFavorite,
  onDelete,
}: {
  item: PromptHistoryRow;
  onSelect?: (text: string) => void;
  onTogglePin: (id: string, value: boolean) => void;
  onToggleFavorite: (id: string, value: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--hover-overlay)] cursor-pointer transition-colors mb-1"
      onClick={() => onSelect?.(item.text)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--text-primary)] leading-relaxed truncate">
          {item.text}
        </p>
        <span className="text-[10px] text-[var(--text-muted)] mt-0.5 block">
          {relTime(item.created_at)}
        </span>
      </div>

      <div
        className={cn(
          "flex items-center gap-1 shrink-0 transition-opacity",
          showActions ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(item.id, !item.pinned);
          }}
          className={cn(
            "w-7 h-7 flex items-center justify-center rounded-md transition-colors cursor-pointer",
            item.pinned
              ? "text-[var(--primary)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          )}
          aria-label={item.pinned ? "Unpin" : "Pin"}
        >
          <Pin size={13} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id, !item.favorited);
          }}
          className={cn(
            "w-7 h-7 flex items-center justify-center rounded-md transition-colors cursor-pointer",
            item.favorited
              ? "text-amber-400"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          )}
          aria-label={item.favorited ? "Unfavorite" : "Favorite"}
        >
          <Star size={13} fill={item.favorited ? "currentColor" : "none"} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-muted)] hover:text-red-400 transition-colors cursor-pointer"
          aria-label="Delete"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </motion.div>
  );
}
