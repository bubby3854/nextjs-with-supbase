// app/components/TodoList.ts
"use client"; // Next.js에서 클라이언트 컴포넌트임을 명시

import { useState } from "react";
import { TodoForm } from "./TodoForm"; // TodoForm 추가
import { TodoItem } from "./TodoItem"; // TodoItem 추가
import { SearchBar } from "./SearchBar"; // *SearchBar 추가

// Todo 항목의 타입 정의
type Todo = {
  id: string; // 고유 식별자
  title: string; // 할 일 내용
  completed: boolean; // 완료 여부
};

export const TodoList = () => {
  // 상태 관리: todos 배열과 검색어
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); //* search 위한 상태 추가

  // 새로운 할 일 추가 함수
  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(), // 고유 ID 생성
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]); // 기존 todos 배열에 새 항목 추가
  };

  // 할 일 삭제 함수
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // ID가 일치하지 않는 항목만 필터링
  };

  // 할 일 완료 상태 토글 함수
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(
        (todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo // 완료 상태 반전
      )
    );
  };

  // 할 일 내용 수정 함수
  const editTodo = (id: string, title: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)) // ID가 일치하는 항목의 제목만 수정
    );
  };

  // *필터링된 todo를 전달합니다
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // 메인 컨테이너: 최대 너비 제한 및 중앙 정렬
    // SearchBar 컴포넌트에 setSearchQuery 함수 전달
    // TodoForm 컴포넌트에 addTodo 함수 전달
    // TodoItem 컴포넌트에 toggleTodo, deleteTodo, editTodo 함수 전달
    // *filteredTodos 로 렌더링
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-center">Todo List</h1>
      <SearchBar onSearch={setSearchQuery} />
      <TodoForm onSubmit={addTodo} />
      <div className="space-y-2">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </div>
    </div>
  );
};
