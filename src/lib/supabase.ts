import type { Note } from "@/modules/notes/note.entity";
import {
  createClient,
  RealtimeChannel,
  type RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";

// Supabaseのクライアントを作成(初期化)
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const subscribe = (
  userId: string,
  callback: (payload: RealtimePostgresChangesPayload<Note>) => void
) => {
  return supabase
    .channel("notes-changes")
    .on<Note>(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "notes",
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
};

export const unsubscribe = (channel: RealtimeChannel) => {
  supabase.removeChannel(channel);
};
