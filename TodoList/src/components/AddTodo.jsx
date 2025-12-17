import axios from "axios";
import { useState } from "react";

const AddTodo = ({ setTodos, activeTab }) => {
  const [task, setTask] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const handleNewTask = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task === "") return;
    try {
      const payload = {
        title: task,
        isUrgent: isUrgent,
        isImportant: isImportant,
        category: activeTab,
      }
      console.log("debug start")
      console.log("1. 送信するデータ:", payload)
      const response = await axios.post("http://localhost:3000/todos", payload);
      console.log("2. サーバー応答データ:", response.data); 
      console.log("--- DEBUG END ---");
      setTodos((todos) => [...todos, response.data]);
      
      // 成功後、状態をリセット
      setTask("");
      setIsUrgent(false);
      setIsImportant(false);
      
    } catch (error) {
      console.error("追加に失敗しました", error);
    }
  };

  return (
    <form className="flex flex-col gap-3 mb-6" onSubmit={handleSubmit}>
      
      {/* 1. タスク入力と追加ボタンのグループ */}
      <div className="flex gap-3">
        <input
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-grow"
          value={task}
          placeholder="Add New Task"
          onChange={handleNewTask}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-150 whitespace-nowrap"
        >
          追加
        </button>
      </div>

      {/* 2. 優先度チェックボックスのグループ */}
      <div className="flex gap-6 mt-1">
        
        <label className="flex items-center space-x-2 cursor-pointer text-gray-700">
          <input 
            type="checkbox"
            checked={isUrgent}
            onChange={(e) => setIsUrgent(e.target.checked)}
            // name属性を追加し、HTMLフォームとしてもデータを認識させる（必須ではないが安全）
            name="isUrgent"
            className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <span>🔥 緊急</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer text-gray-700">
          <input 
            type="checkbox"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
            name="isImportant"
            className="h-4 w-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
          />
          <span>⭐ 重要</span>
        </label>

      </div>
    </form>
  );
};
export default AddTodo;