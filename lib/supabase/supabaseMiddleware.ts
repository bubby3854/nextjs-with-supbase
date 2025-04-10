import { type NextRequest, NextResponse } from "next/server";

import { createServerClient } from "@supabase/ssr";

/**
 * Supabase 세션 업데이트 및 인증 상태 확인 함수
 *
 * @param request Next.js 요청 객체
 * @returns NextResponse 객체 (리다이렉션 또는 다음 미들웨어로 전달)
 */
export async function updateSession(request: NextRequest) {
  // 기본 응답 객체 생성
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Supabase 클라이언트 생성
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // 모든 쿠키 가져오기
        getAll() {
          return request.cookies.getAll();
        },
        // 쿠키 설정
        setAll(cookiesToSet) {
          // 요청 객체에 쿠키 설정
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // 새로운 응답 객체 생성
          supabaseResponse = NextResponse.next({
            request,
          });
          // 응답 객체에 쿠키 설정
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 현재 사용자 정보 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인된 사용자가 /login 페이지에 접근하는 경우
  if (user && request.nextUrl.pathname === "/login") {
    console.log("user");

    const url = request.nextUrl.clone();
    url.pathname = "/"; // 홈페이지로 리다이렉트
    return NextResponse.redirect(url);
  }

  // *로그인되지 않은 사용자가 보호된 경로에 접근하는 경우
  if (!user && request.nextUrl.pathname !== "/login") {
    console.log("redirecting to login");
    const url = request.nextUrl.clone();
    url.pathname = "/login"; // 로그인 페이지로 리다이렉트
    return NextResponse.redirect(url);
  }

  // 정상적인 경우 기본 응답 반환
  return supabaseResponse;
}
