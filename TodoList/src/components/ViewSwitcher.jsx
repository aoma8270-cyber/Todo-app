import React from 'react'

function ViewSwitcher({ viewMode, setViewMode }) {
  return (
    <div>
      <button
       onClick={() => setViewMode("list")}
       className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-bold text-sm transition duration-200 ${
          viewMode === "list" 
            ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5" 
            : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
        }`}>
        リスト一覧
      </button>
      <button
       onClick={() => setViewMode("matrix")}
       className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-bold text-sm transition duration-200 ${
          viewMode === "matrix" 
            ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5" 
            : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
        }`}>
        マトリクス
      </button>
    </div>
  )
}

export default ViewSwitcher