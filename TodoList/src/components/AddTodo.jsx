import { useState } from "react";

const AddTodo = ({ setTodos }) => {
  const [task, setTask] = useState("");
  const handleNewTask = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task === "") return;
    setTodos((todos) => [...todos, { task, isCompleted: false }]);
    setTask("");
  };
  return (
    <form className="flex gap-3 mb-6" onSubmit={handleSubmit}>
      <input
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-grow"
        value={task}
        placeholder="Add New Task"
        onChange={handleNewTask}
      />
      <button
       type="submit"
       className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-150">
        Add
      </button>
    </form>
  );
};
export default AddTodo;
