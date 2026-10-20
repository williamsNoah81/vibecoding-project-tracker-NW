import React from 'react';

export default function Header({ onOpenNewTaskModal, onOpenDesignModal, searchQuery, setSearchQuery }) {
  return (
    <header className="h-16 border-b border-[#252E45] bg-[#0F1420] px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Project: <span className="text-indigo-400">Synthetic Intelligence Layer</span>
        </h1>
        <button
          onClick={onOpenDesignModal}
          className="text-xs px-2.5 py-1 rounded bg-[#192033] hover:bg-[#252E45] border border-[#252E45] text-indigo-300 transition-colors flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          DESIGN.md System Tokens
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks or assignees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 bg-[#0B0F19] text-xs text-slate-200 pl-8 pr-3 py-1.5 rounded border border-[#252E45] focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500"
          />
          <svg className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button
          onClick={onOpenNewTaskModal}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2 rounded shadow-lg shadow-indigo-600/20 transition-all flex items-center space-x-1"
        >
          <span className="text-base font-bold leading-none">+</span>
          <span>New Task</span>
        </button>
      </div>
    </header>
  );
}