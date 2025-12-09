import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import axios from "axios";

const Todo = () => {

  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todos")
        setTodos(response.data)
      } catch (error) {
        console.error("データの取得に失敗しました:", error)
      }
    }
    fetchTodos()
  }, [])
  return (
    <div>
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8">ToDo List</h1>
      <AddTodo setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default Todo;