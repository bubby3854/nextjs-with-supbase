// app/todo/page.tsx

import { TodoList } from "@/components/todo/TodoList"; // 절대경로로 import

export default function TodoPage() {
  return (
    // main 태그: 웹 페이지의 주요 콘텐츠를 나타내는 시맨틱 HTML 요소
    // - 페이지의 핵심 콘텐츠를 포함
    // - 문서 구조를 명확하게 표현
    // - 접근성(accessibility) 향상
    <main
      className="
      container    // 최대 너비를 설정하고 좌우 여백을 자동으로 조정
      mx-auto      // 좌우 마진을 자동으로 설정하여 컨텐츠를 중앙 정렬
      p-4          // 모든 방향(상하좌우)에 1rem(16px)의 패딩 적용
      min-h-screen // 최소 높이를 화면 전체 높이로 설정하여 컨텐츠가 적을 때도 페이지가 꽉 차도록 함
    "
    >
      <TodoList />
    </main>
  );
}
