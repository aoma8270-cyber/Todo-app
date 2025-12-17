import React from 'react'

function Sidebar({ activeTab, setActiveTab }) {

  const tabs = ["Inbox", "日", "週", "月", "年"];

  return (
    <div className='w-64 bg-gray-50 border-r border-gray-200 p-4 hidden md:block min-h-screen'>
      <h2 className="text-xl font-bold text-gray-700 mb-6 px-2">カテゴリ</h2>
      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li key={tab}>
            <button
             onClick={() => setActiveTab(tab)}
             className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar