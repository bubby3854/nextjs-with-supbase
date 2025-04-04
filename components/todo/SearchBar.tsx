// SearchBar.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// SearchBar 컴포넌트의 props 타입 정의
type SearchBarProps = {
  onSearch: (query: string) => void; // 검색어 변경 시 호출될 콜백 함수
};

// SearchBar 컴포넌트: 할 일 항목을 검색할 수 있는 입력 필드
export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    // 상대적 위치 지정을 위한 컨테이너
    <div className="relative w-full">
      {/* 검색 아이콘 - 입력 필드 왼쪽에 고정 */}
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      {/* 검색 입력 필드 */}
      <Input
        type="text"
        placeholder="Search todos"
        className="pl-8" // 검색 아이콘을 위한 왼쪽 패딩
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value) // 입력값 변경 시 부모 컴포넌트에 전달
        }
      />
    </div>
  );
};
