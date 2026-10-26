import { createClient } from "@supabase/supabase-js";

// Server-only client. Uses the service role key, so never import this in a client component.
export function serverDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
