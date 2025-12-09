import { useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
const Todo = () => {

  const [todos, setTodos] = useState([]);

  return (
    <div>
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8">ToDo List</h1>
      <AddTodo setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default Todo;