import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import axios from "axios";
import MatrixView from "./MatrixView";
import ViewSwitcher from "./ViewSwitcher";
import Sidebar from "./Sidebar";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [activeTab, setActiveTab] = useState("Inbox");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    const categoryMatches = (todo.category || "Inbox") === activeTab;
    const shouldDisplay = showCompleted ? todo.completed : !todo.completed;

    return categoryMatches && shouldDisplay;
  });

  return (
    <div className="flex min-h-screen bg-white">

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-6 max-w-5xl">
        <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
          Task Manager
        </h1>

        <AddTodo setTodos={setTodos} activeTab={activeTab} />
        <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />

        {viewMode === "list" && (
          <div className="flex items-center justify-end mt-4 mb-4">
                <input
                    id="show-completed"
                    type="checkbox"
                    checked={showCompleted}
                    onChange={() => setShowCompleted(!showCompleted)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="show-completed" className="ml-2 text-sm text-gray-600 select-none">
                    完了したタスクを表示
                </label>
            </div>
        )}

        <div className="transition-all duration-300 mt-4">
          {viewMode === "list" ? (
            <TodoList todos={filteredTodos} setTodos={setTodos} />
          ) : (
            <MatrixView todos={filteredTodos} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
