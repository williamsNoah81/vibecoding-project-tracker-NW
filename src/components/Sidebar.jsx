import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-60 bg-[#0F1420] border-r border-[#252E45] flex flex-col justify-between shrink-0">
      <div className="p-4 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center space-x-2.5 px-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-indigo-600/30">
            V
          </div>
          <span className="text-base font-bold text-white tracking-wide">
            VibeBoard
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('board')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg font-medium text-xs transition-colors ${
              activeTab === 'board'
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#141A28]'
            }`}
          >
            <span className="text-sm">📋</span>
            <span>Board</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg font-medium text-xs transition-colors ${
              activeTab === 'settings'
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#141A28]'
            }`}
          >
            <span className="text-sm">⚙️</span>
            <span>Settings</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}