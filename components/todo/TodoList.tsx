"use client";

import { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { SearchBar } from "./SearchBar";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { User } from "@supabase/supabase-js";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
  user_id: string; // user_id를 추가해줍니다
};

/**
 * TodoList 컴포넌트
 * 사용자별 Todo 목록을 관리하고 표시하는 메인 컴포넌트
 */
export const TodoList = () => {
  // 상태 관리
  const [todos, setTodos] = useState<Todo[]>([]); // Todo 목록 상태
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [user, setUser] = useState<User | null>(null); // 현재 로그인한 사용자 상태

  const supabase = createClient(); // Supabase 클라이언트 초기화

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    fetchTodos();

    // 로그인한 사용자 정보
    getUser();
  }, []);

  /**
   * 현재 로그인한 사용자 정보를 가져오는 함수
   */
  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error("Error getting user:", error);
    }
  };

  /**
   * 현재 사용자의 Todo 목록을 가져오는 함수
   * - 사용자 인증 확인
   * - 사용자의 Todo만 필터링하여 조회
   * - 최신순으로 정렬
   */
  const fetchTodos = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  /**
   * 새로운 Todo를 추가하는 함수
   */
  const addTodo = async (title: string) => {
    if (!user) return;

    const newTodo = {
      title,
      completed: false,
      created_at: new Date().toISOString(),
      user_id: user.id,
    };

    try {
      const { error } = await supabase.from("todos").insert(newTodo);
      if (error) throw error;
      fetchTodos(); // 목록 새로고침
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  /**
   * Todo를 삭제하는 함수
   */
  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) throw error;
      fetchTodos(); // 목록 새로고침
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  /**
   * Todo의 완료 상태를 토글하는 함수
   */
  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;

      const { error } = await supabase
        .from("todos")
        .update({ completed: !todo.completed })
        .eq("id", id);

      if (error) throw error;
      fetchTodos(); // 목록 새로고침
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  /**
   * Todo의 제목을 수정하는 함수
   */
  const editTodo = async (id: string, title: string) => {
    try {
      const { error } = await supabase
        .from("todos")
        .update({ title })
        .eq("id", id);

      if (error) throw error;
      // 할 일 내용을 수정한 후 할 일 목록을 다시 가져옵니다
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // 검색어에 따른 Todo 필터링
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // *로그아웃 컴포넌트 추가
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* 헤더: 제목과 로그아웃 버튼 */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <LogoutButton />
      </div>
      {/* 검색 바 */}
      <SearchBar onSearch={setSearchQuery} />
      {/* Todo 입력 폼 */}
      <TodoForm onSubmit={addTodo} />
      {/* Todo 목록 */}
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
