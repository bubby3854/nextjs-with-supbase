// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

// 브라우저 환경에서 사용할 Supabase 클라이언트 생성
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
