import { supabase } from "@/integrations/supabase/client";

// MorphOS tables are created via migrations but may not be present in the
// auto-generated Database type yet. Cast to a loose client so queries compile
// without editing the generated src/integrations/supabase/types.ts (which the
// framework rewrites). Runtime behavior is identical to the typed client.
export const sb = supabase as unknown as {
  from: (table: string) => {
    select: (columns?: string) => any;
    insert: (values: unknown | unknown[]) => any;
    update: (values: unknown) => any;
    delete: () => any;
  };
  functions: {
    invoke: (
      name: string,
      options?: { body?: unknown; [key: string]: unknown }
    ) => Promise<{ data: any; error: any }>;
  };
};
