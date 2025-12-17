// src/components/TodoList.jsx
import React, { useState } from "react";
import axios from "axios";


const TodoList = ({ todos, setTodos }) => {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // 編集関連
  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
  };

  const handleEditSave = async (todo) => {
    if (editTitle.trim() === "" || editTitle === todo.title) {
      setEditId(null);
      return;
    }
    try {
      const response = await axios.put(`http://localhost:3000/todos/${todo.id}`, {
        title: editTitle,
        completed: todo.completed,
        isUrgent: todo.isUrgent,
        isImportant: todo.isImportant,
        category: todo.category
      });
      // ✅ 修正箇所 1
      setTodos(prevTodos => prevTodos.map((t) => (t.id === todo.id ? response.data : t)));
      setEditId(null);
    } catch (error) {
      console.error("タスク編集エラー:", error);
    }
  };

  const handleKeyDown = (e, todo) => {
    if (e.key === 'Enter') handleEditSave(todo);
    if (e.key === 'Escape') setEditId(null);
  };

  // 削除
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      // ✅ 修正箇所 2
      setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("削除エラー:", error);
    }
  };

  // 完了切り替え (今回の原因箇所！)
  const handleToggleComplete = async (todo) => {
    try {
      const updatedStatus = !todo.completed;
      const response = await axios.put(`http://localhost:3000/todos/${todo.id}`, {
        title: todo.title,
        completed: updatedStatus,
        isUrgent: todo.isUrgent,
        isImportant: todo.isImportant,
        category: todo.category
      });
      // ✅ 修正箇所 3: ここを修正することでタスク消滅が直ります
      setTodos(prevTodos => prevTodos.map((t) => t.id === todo.id ? response.data : t));
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  // 優先度更新
  const handleUpdatePriority = async (todo, field) => {
    const updatedValue = !todo[field];
    try {
      const response = await axios.put(`http://localhost:3000/todos/${todo.id}`, {
        completed: todo.completed,
        isUrgent: field === "isUrgent" ? updatedValue : todo.isUrgent,
        isImportant: field === "isImportant" ? updatedValue : todo.isImportant,
        title: todo.title,
        category: todo.category
      });
      // ✅ 修正箇所 4
      setTodos(prevTodos => prevTodos.map((t) => t.id === todo.id ? response.data : t));
    } catch (error) {
      console.error("優先度更新エラー:", error);
    }
  };

  return (
    <ul className="space-y-3 p-4 bg-gray-50 rounded-lg">
      {todos.map((todo) => {
        const isEditing = editId === todo.id;
        return (
          <li key={todo.id} className={`bg-white p-4 shadow-md rounded-lg flex flex-col sm:flex-row sm:items-center justify-between transition duration-300 hover:shadow-lg mt-3 ${todo.completed ? "bg-green-50" : "bg-white"}`}>
            <div className="flex items-center flex-grow mb-2 sm:mb-0">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
                className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={() => handleEditSave(todo)}
                  onKeyDown={(e) => handleKeyDown(e, todo)}
                  autoFocus
                  className="text-lg text-gray-700 border-b border-blue-500 focus:outline-none flex-grow min-w-0"
                />
              ) : (
                <span className={`text-lg cursor-pointer ${todo.completed ? "text-gray-400 line-through" : "text-gray-700"}`} onDoubleClick={() => handleEdit(todo)}>
                  {todo.title || todo.task}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 sm:ml-4">
              <button onClick={() => handleUpdatePriority(todo, "isUrgent")} className={`px-3 py-1 text-sm rounded-full border font-bold transition-colors duration-200 ${todo.isUrgent ? "bg-red-500 text-white border-red-600 shadow-sm" : "bg-white text-gray-400 border-gray-200 hover:bg-gray-100"}`}>🔥 緊急</button>
              <button onClick={() => handleUpdatePriority(todo, "isImportant")} className={`px-3 py-1 text-sm rounded-full border font-bold transition-colors duration-200 ${todo.isImportant ? "bg-yellow-400 text-white border-yellow-500 shadow-sm" : "bg-white text-gray-400 border-gray-200 hover:bg-gray-100"}`}>⭐ 重要</button>
              <button onClick={() => handleDelete(todo.id)} className="text-gray-400 hover:text-red-500 transition-colors ml-2 p-2">×</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;