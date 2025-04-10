// app/login/page.tsx

/**
 * 로그인 페이지 컴포넌트
 *
 * 소셜 인증 옵션을 제공하는 서버 컴포넌트입니다.
 * 환영 메시지를 표시하고 중앙 정렬된 레이아웃에 LoginForm 컴포넌트를 렌더링합니다.
 */
import { LoginForm } from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    // 전체 화면 중앙 정렬 컨테이너
    <section className="flex h-screen w-full items-center justify-center">
      <div className="lg:p-8">
        {/* 반응형 너비를 가진 인증 폼 컨테이너 */}
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {/* 제목과 설명이 있는 헤더 섹션 */}
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome!</h1>
            <p className="text-sm text-muted-foreground">
              Choose your preferred sign in method
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
