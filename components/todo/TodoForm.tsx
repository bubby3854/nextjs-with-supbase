"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

// TodoForm 컴포넌트의 props 타입 정의
type TodoFormProps = {
  onSubmit: (title: string) => void; // 할 일 제출 시 호출될 콜백 함수
  initialValue?: string; // 초기 입력값 (선택적)
  isEditing?: boolean; // 수정 모드 여부 (선택적)
};

// TodoForm 컴포넌트: 할 일을 추가하거나 수정하는 폼
export const TodoForm = ({
  onSubmit,
  initialValue = "", // 초기값이 없을 경우 빈 문자열
  isEditing = false, // 수정 모드 기본값은 false
}: TodoFormProps) => {
  // 입력값 상태 관리
  const [title, setTitle] = useState(initialValue);

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼의 기본 제출 동작 방지

    if (title.trim()) {
      // 입력값이 공백이 아닌 경우에만 처리
      onSubmit(title); // 부모 컴포넌트로 입력값 전달
      setTitle(""); // 입력 필드 초기화
    }
  };

  return (
    // 폼 컨테이너: 가로 배치를 위한 flex 레이아웃
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      {/* 할 일 입력 필드 */}
      <Input
        type="text"
        placeholder="Add a new todo"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        className="flex-1" // 남은 공간을 모두 차지
      />
      {/* 제출 버튼: 수정 모드에 따라 다른 내용 표시 */}
      <Button type="submit" disabled={!title.trim()}>
        {isEditing ? "Update" : <Plus className="h-4 w-4" />}
      </Button>
    </form>
  );
};
