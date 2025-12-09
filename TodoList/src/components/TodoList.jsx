import React from "react";

const TodoList = ({ todos, setTodos }) => {
  const handleRemoveTask = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleUpdateTask = (index) => {
    const newTodos = todos.map((todo, todoIndex) => {
      if (todoIndex === index) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <ul className="space-y-3 p-4 bg-gray-50 rounded-lg">
      {todos.map((todo, index) => (
        <li
          className={`bg-white p-4 shadow-md rounded-lg flex items-center justify-between transition duration-300 hover:shadow-lg mt-3" ${
            todo.isCompleted ? "bg-green-50" : "bg-white"
          }`}
          key={index}
        >
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => handleUpdateTask(index)}
            className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
          />
          <span
           className={`text-lg ${todo.isCompleted ? "text-gray-400 line-through" : "text-gray-700"}`}>
            {todo.task}
          </span>
          
          <span
            onClick={() => handleRemoveTask(index)}
            style={{ cursor: "pointer" }}
            className={`text-lg ${todo.isCompleted ? "text-gray-400 line-through" : "text-gray-700"}`}
          >
            ×
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
