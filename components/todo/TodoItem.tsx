// app/components/TodoItem.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { EditTodoDialog } from "./EditTodoDialog";

// TodoItem 컴포넌트의 props 타입 정의
type TodoItemProps = {
  id: string; // 할 일 항목의 고유 식별자
  title: string; // 할 일 제목
  completed: boolean; // 완료 상태
  onToggle: (id: string) => void; // 완료 상태 토글 핸들러
  onDelete: (id: string) => void; // 삭제 핸들러
  onEdit: (id: string, title: string) => void; // 수정 핸들러
};

// TodoItem 컴포넌트: 개별 할 일 항목을 표시하고 관리
export const TodoItem = ({
  id,
  title,
  completed,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) => {
  return (
    // 카드 컴포넌트로 할 일 항목을 감싸서 시각적 구분
    <Card className="w-full">
      <CardContent className="flex items-center justify-between p-4">
        {/* 왼쪽 영역: 체크박스와 제목 */}
        <div className="flex items-center space-x-4">
          {/* 완료 상태를 토글할 수 있는 체크박스 */}
          <Checkbox checked={completed} onCheckedChange={() => onToggle(id)} />
          {/* 완료된 항목은 취소선과 회색 텍스트로 표시 */}
          <span
            className={completed ? "line-through text-muted-foreground" : ""}
          >
            {title}
          </span>
        </div>
        {/* 오른쪽 영역: 수정 및 삭제 버튼 */}
        <div className="flex items-center space-x-2">
          {/* 수정 다이얼로그 컴포넌트 */}
          <EditTodoDialog id={id} title={title} onEdit={onEdit} />
          {/* 삭제 버튼 */}
          <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
