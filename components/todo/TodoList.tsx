// app/components/TodoList.ts
"use client"; // Next.js에서 클라이언트 컴포넌트임을 명시

import { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm"; // TodoForm 추가
import { TodoItem } from "./TodoItem"; // TodoItem 추가
import { SearchBar } from "./SearchBar"; // *SearchBar 추가
import { createClient } from "@/lib/supabase/client";

// Todo 항목의 타입 정의
type Todo = {
  id: string; // 고유 식별자
  title: string; // 할 일 내용
  completed: boolean; // 완료 여부
  created_at: string;
};

export const TodoList = () => {
  // 상태 관리: todos 배열과 검색어
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); //* search 위한 상태 추가
  const supabase = createClient(); // supabase 객체 가져오기

  useEffect(() => {
    fetchTodos();
  }, []);
  // 두번째 인자가 빈 배열이기 때문에 처음 컴포넌트가 마운트 될 때만 실행됩니다.

  // 할 일 목록 가져오기
  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  console.log(todos);

  // 새로운 할 일 추가 함수
  // 새로운 할 일 추가 함수
  const addTodo = async (title: string) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      created_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase.from("todos").insert(newTodo);

      if (error) throw error;

      // 새로운 할 일을 추가한 후 할 일 목록을 다시 가져옵니다
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // 할 일 삭제 함수

  // 할 일 삭제 함수
  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) throw error;
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // 할 일 완료 상태 토글 함수
  // 할 일 완료 상태 토글 함수
  const toggleTodo = async (id: string) => {
    console.log(id);
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;

      const { error } = await supabase
        .from("todos")
        .update({ completed: !todo.completed })
        .eq("id", id);

      if (error) throw error;

      // 할 일 완료 상태를 토글한 후 할 일 목록을 다시 가져옵니다
      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };
  // 할 일 내용 수정 함수
  const editTodo = async (id: string, title: string) => {
    try {
      const { error } = await supabase
        .from("todos")
        .update({ title })
        .eq("id", id);

      if (error) throw error;
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
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
