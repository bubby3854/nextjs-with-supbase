/**
 * 로그인 폼 컴포넌트
 *
 * 소셜 인증 옵션을 제공하는 클라이언트 컴포넌트입니다.
 * 현재 구글과 카카오 로그인 방식을 지원하며 각각의 로딩 상태를 관리합니다.
 */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "./icons";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export function LoginForm() {
  // 각 인증 제공자의 로딩 상태 관리
  const [isLoading, setIsLoading] = useState<{
    google: boolean;
    kakao: boolean;
  }>({
    google: false,
    kakao: false,
  });

  /**
   * 구글 인증 처리 함수
   * Supabase의 소셜 로그인 기능을 사용하여 구글 로그인을 처리합니다.
   */
  const handleGoogleLogin = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, google: true }));
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error("구글 로그인에 실패했습니다.");
        throw error;
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading((prev) => ({ ...prev, google: false }));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign in</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* 구글 인증 버튼 */}
        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          disabled={isLoading.google}
          className="w-full"
        >
          {isLoading.google ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}
          Continue with Google
        </Button>
      </CardContent>
    </Card>
  );
}
