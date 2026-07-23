import { useCallback, useEffect, useState } from "react";
import { sb } from "@/lib/db";

export interface PromptHistoryRow {
  id: string;
  text: string;
  pinned: boolean;
  favorited: boolean;
  created_at: string;
}

/**
 * usePromptHistory — CRUD for the `prompt_history` table (RLS-scoped to user).
 */
export function usePromptHistory(enabled = true) {
  const [items, setItems] = useState<PromptHistoryRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data, error } = await sb
      .from("prompt_history")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setItems(data as PromptHistoryRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (enabled) refresh();
  }, [refresh, enabled]);

  const addPrompt = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const { data, error } = await sb
      .from("prompt_history")
      .insert({ text: trimmed })
      .select("*")
      .single();
    if (error) return;
    setItems((prev) => [data as PromptHistoryRow, ...prev]);
  }, []);

  const patchItem = useCallback(
    async (id: string, patch: Partial<PromptHistoryRow>) => {
      await sb.from("prompt_history").update(patch).eq("id", id);
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, ...patch } : i))
      );
    },
    []
  );

  const togglePin = useCallback(
    (id: string, value: boolean) => patchItem(id, { pinned: value }),
    [patchItem]
  );
  const toggleFavorite = useCallback(
    (id: string, value: boolean) => patchItem(id, { favorited: value }),
    [patchItem]
  );
  const deleteItem = useCallback(async (id: string) => {
    await sb.from("prompt_history").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return {
    items,
    loading,
    refresh,
    addPrompt,
    togglePin,
    toggleFavorite,
    deleteItem,
  };
}
