/// <reference types="vite/client" />

// 環境変数そのものに対する型定義
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_API_KEY: string;
}

// 環境変数自体への型定義
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
