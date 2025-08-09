import { createClient } from "@supabase/supabase-js";

// Supabaseのクライアントを作成(初期化)
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);
