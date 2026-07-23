import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

/**
 * Ensure an anonymous session exists. MorphOS uses anonymous auth so the site
 * works with no login wall, while each visitor's projects/history/chat stay
 * private (RLS scopes rows to auth.uid()).
 */
export async function ensureSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  if (data?.session) return data.session;
  const { data: anon, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return anon?.session ?? null;
}

export async function getCurrentUserId(): Promise<string | null> {
  const session = await ensureSession();
  return session?.user?.id ?? null;
}
