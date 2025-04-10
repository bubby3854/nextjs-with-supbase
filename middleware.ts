// ./middleware.ts

/**
 * Next.js 미들웨어
 * 모든 요청에 대해 인증 상태를 확인하고 필요한 경우 리다이렉션을 수행합니다.
 */
import { updateSession } from "@/lib/supabase/supabaseMiddleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const res = await updateSession(request);
  return res;
}

/**
 * 미들웨어가 적용될 경로를 지정합니다.
 * - "/": 메인 페이지 (보호된 경로)
 * - "/login": 로그인 페이지
 * - "/todo": Todo 페이지 (보호된 경로)
 */
export const config = {
  matcher: ["/", "/login", "/todo"],
};
