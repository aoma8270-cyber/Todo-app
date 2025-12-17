// src/components/MatrixView.jsx (修正後)
import React from 'react'

const MatrixCell = ({ title, tasks, label }) => {
  // 修正: return文を追加
  return (
    <div className="border p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
        <span className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">
          {tasks.length}
        </span>
      </div>

      <ul className="list-disc pl-5 space-y-1 overflow-auto flex-grow">
        {tasks.map((todo) => (
          // 修正: mapのコールバック関数でJSXをreturnし、keyを設定
          <li key={todo.id}> 
            {/* 完了タスクのスタイルは省略（リストビューに任せる） */}
            {todo.title} 
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="text-gray-400 italic">
            タスクなし
          </li>
        )}
      </ul>
    </div>
  );
};

function MatrixView({ todos }) {

  // 修正: Q4のフィルタリング条件を変更
  const q1 = todos.filter(t => t.isUrgent && t.isImportant);      // ① すぐやる (Do)
  const q2 = todos.filter(t => !t.isUrgent && t.isImportant);     // ② 計画する (Decide/Schedule)
  const q3 = todos.filter(t => t.isUrgent && !t.isImportant);     // ③ 任せる/減らす (Delegate)
  const q4 = todos.filter(t => !t.isUrgent && !t.isImportant);    // ④ やめる/暇つぶし (Delete)

  return (
    // 2x2のグリッドレイアウトを適用
    <div className="grid grid-cols-2 gap-4 h-[500px] mt-4"> 
      <MatrixCell 
        title="① すぐやる"
        label="緊急＆重要 (Do)"
        tasks={q1}
        />
      <MatrixCell 
        title="② 計画する"
        label="緊急でない＆重要 (Decide)"
        tasks={q2}
        />
      <MatrixCell 
        title="③ 任せる/減らす"
        label="緊急＆重要でない (Delegate)"
        tasks={q3}
        />
      <MatrixCell 
        title="④ やめる/暇つぶし"
        label="緊急でない＆重要でない (Delete)"
        tasks={q4}
        />
    </div>
  )
}

export default MatrixView