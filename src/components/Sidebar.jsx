import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-56 bg-[#0F1420] border-r border-[#252E45] flex flex-col justify-between p-4 shrink-0">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center space-x-2.5 px-2 mb-8">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
            V
          </div>
          <span className="font-bold text-white tracking-wide text-base">VibeBoard</span>
        </div>

        {/* Workspace Label */}
        <div className="px-2 mb-4 flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          <span>WORKSPACE MATRIX</span>
          <span className="text-indigo-400 font-semibold">v2.4.8</span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <a
            href="#board"
            className="flex items-center space-x-3 px-3 py-2 rounded bg-indigo-600/10 text-indigo-400 font-medium text-xs border border-indigo-500/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Board</span>
          </a>

          <a
            href="#settings"
            className="flex items-center space-x-3 px-3 py-2 rounded text-slate-400 hover:text-slate-200 hover:bg-[#192033] text-xs transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </a>
        </nav>
      </div>

      <div className="p-3 rounded bg-[#141A28] border border-[#252E45]">
        <div className="text-[11px] font-semibold text-slate-300 mb-1">Vibecoding Active</div>
        <div className="text-[10px] text-slate-500">M3 Design Tokens Applied</div>
      </div>
    </aside>
  );
}