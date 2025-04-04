// EditTodoDialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useState } from "react";

// EditTodoDialog 컴포넌트의 props 타입 정의
type EditTodoDialogProps = {
  id: string; // 수정할 할 일 항목의 고유 식별자
  title: string; // 현재 할 일 제목
  onEdit: (id: string, title: string) => void; // 수정 완료 시 호출될 콜백 함수
};

// EditTodoDialog 컴포넌트: 할 일 항목을 수정하기 위한 다이얼로그
export const EditTodoDialog: React.FC<EditTodoDialogProps> = ({
  id,
  title,
  onEdit,
}) => {
  // 다이얼로그 열림/닫힘 상태 관리
  const [open, setOpen] = useState(false);
  // 수정 중인 할 일 제목 상태 관리
  const [editTitle, setEditTitle] = useState(title);

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onEdit(id, editTitle); // 수정된 제목을 부모 컴포넌트에 전달
      setOpen(false); // 다이얼로그 닫기
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 수정 버튼 - 연필 아이콘 */}
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      {/* 다이얼로그 내용 */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        {/* 수정 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 제목 입력 필드 */}
          <Input
            type="text"
            value={editTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditTitle(e.target.value)
            }
            placeholder="Edit todo..."
            className="w-full"
          />
          {/* 작업 버튼 그룹 */}
          <div className="flex justify-end space-x-2">
            {/* 취소 버튼 */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            {/* 저장 버튼 - 빈 문자열인 경우 비활성화 */}
            <Button type="submit" disabled={!editTitle.trim()}>
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
