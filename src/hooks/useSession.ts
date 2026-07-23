import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/**
 * App-level session bootstrap. Signs in anonymously on first visit so every
 * data operation (projects, prompt history, chat) has a valid auth context
 * and RLS-scoped rows. Renders a gate until the session is ready.
 */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      if (data.session) {
        setSession(data.session);
        setReady(true);
        return;
      }
      const { data: anon, error } = await supabase.auth.signInAnonymously();
      if (!active) return;
      if (error) {
        // Even on error, unblock the UI so the app is still usable.
        setReady(true);
        return;
      }
      setSession(anon?.session ?? null);
      setReady(true);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, ready, userId: session?.user?.id ?? null };
}
