import { useCallback, useEffect, useState } from "react";
import { sb } from "@/lib/db";

export interface ProjectRow {
  id: string;
  title: string;
  prompt: string | null;
  ast: unknown;
  domain: string | null;
  status: string;
  is_favorite: boolean;
  node_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  title: string;
  prompt: string;
  ast: unknown;
  domain?: string | null;
  node_count?: number;
  status?: string;
}

/**
 * useProjects — CRUD for the `projects` table (RLS-scoped to the current user).
 * Ownership (user_id) is set server-side by a trigger, so the client never
 * decides it.
 */
export function useProjects(enabled = true) {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data, error } = await sb
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false });
    if (!error && data) setProjects(data as ProjectRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (enabled) refresh();
  }, [refresh, enabled]);

  const createProject = useCallback(
    async (input: CreateProjectInput): Promise<ProjectRow | null> => {
      const { data, error } = await sb
        .from("projects")
        .insert({
          title: input.title,
          prompt: input.prompt,
          ast: input.ast,
          domain: input.domain ?? null,
          node_count: input.node_count ?? 0,
          status: input.status ?? "Active",
          is_favorite: false,
        })
        .select("*")
        .single();
      if (error) throw error;
      await refresh();
      return data as ProjectRow;
    },
    [refresh]
  );

  const updateProject = useCallback(
    async (id: string, patch: Partial<ProjectRow>) => {
      await sb.from("projects").update(patch).eq("id", id);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
      );
    },
    []
  );

  const toggleFavorite = useCallback(
    async (id: string, value: boolean) => {
      await sb.from("projects").update({ is_favorite: value }).eq("id", id);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_favorite: value } : p))
      );
    },
    []
  );

  const deleteProject = useCallback(async (id: string) => {
    await sb.from("projects").delete().eq("id", id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const duplicateProject = useCallback(
    async (src: ProjectRow): Promise<ProjectRow | null> => {
      const { data, error } = await sb
        .from("projects")
        .insert({
          title: `${src.title} (Copy)`,
          prompt: src.prompt,
          ast: src.ast,
          domain: src.domain,
          node_count: src.node_count,
          status: "Draft",
          is_favorite: false,
        })
        .select("*")
        .single();
      if (error) throw error;
      await refresh();
      return data as ProjectRow;
    },
    [refresh]
  );

  return {
    projects,
    loading,
    refresh,
    createProject,
    updateProject,
    toggleFavorite,
    deleteProject,
    duplicateProject,
  };
}
