"use client";

import { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { SearchBar } from "./SearchBar";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "@/components/auth/LogoutButton"; // 로그아웃 컴포넌트 import

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
};

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const supabase = createClient();

  useEffect(() => {
    fetchTodos();
  }, []);

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

  const addTodo = async (title: string) => {
    console.log(new Date());
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      created_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase.from("todos").insert(newTodo);

      if (error) throw error;

      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) throw error;
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find((todo) => todo.id === id);

      if (!todo) return;

      const { error } = await supabase
        .from("todos")
        .update({ completed: !todo.completed })
        .eq("id", id);

      if (error) throw error;

      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

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

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // *로그아웃 컴포넌트 추가
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <LogoutButton />
      </div>
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
