import axios from "axios";
import React from "react";

const TodoList = ({ todos, setTodos }) => {
  const handleRemoveTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`)
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.error("削除エラー:", error)
    }
  }
    

  const handleUpdateTask = async (id, currentCompleted) => {
    try {
      const response = await axios.put(`http://localhost:3000/todos/${id}`, {
        completed: !currentCompleted,
      })
      const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return response.data
      }
      return todo;
    })
    setTodos(newTodos);
    } catch (error) {
      console.error("更新エラー:", error)
    }
    
  };

  return (
    <ul className="space-y-3 p-4 bg-gray-50 rounded-lg">
      {todos.map((todo) => (
        <li
          className={`bg-white p-4 shadow-md rounded-lg flex items-center justify-between transition duration-300 hover:shadow-lg mt-3" ${
            todo.completed ? "bg-green-50" : "bg-white"
          }`}
          key={todo.id}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleUpdateTask(todo.id, todo.completed)}
            className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
          />
          <span
           className={`text-lg ${todo.completed ? "text-gray-400 line-through" : "text-gray-700"}`}>
            {todo.title || todo.task}
          </span>
          
          <span
            onClick={() => handleRemoveTask(todo.id)}
            style={{ cursor: "pointer" }}
            className={`text-lg ${todo.completed ? "text-gray-400 line-through" : "text-gray-700"}`}
          >
            ×
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
