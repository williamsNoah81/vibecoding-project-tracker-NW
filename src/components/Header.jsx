import React, { useState } from 'react';

export default function Header({ onOpenNewTaskModal, searchQuery, setSearchQuery }) {
  const [projectTitle, setProjectTitle] = useState(() => {
    return localStorage.getItem('vibeboard_project_title') || 'Synthetic Intelligence Layer';
  });
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleTitleSave = () => {
    setIsEditingTitle(false);
    localStorage.setItem('vibeboard_project_title', projectTitle);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    }
  };

  return (
    <header className="h-16 border-b border-[#252E45] bg-[#0F1420] px-6 flex items-center justify-between shrink-0">
      {/* Editable Project Title */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-white tracking-tight">Project:</span>
        {isEditingTitle ? (
          <input
            type="text"
            autoFocus
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={handleKeyDown}
            className="bg-[#0B0F19] text-xl font-bold text-indigo-400 px-2 py-0.5 rounded border border-indigo-500 focus:outline-none tracking-tight"
          />
        ) : (
          <h1
            onClick={() => setIsEditingTitle(true)}
            title="Click to edit project title"
            className="text-xl font-bold text-indigo-400 tracking-tight hover:text-indigo-300 hover:underline cursor-pointer transition-colors"
          >
            {projectTitle}
          </h1>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Search Field */}
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

        {/* New Task Button */}
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