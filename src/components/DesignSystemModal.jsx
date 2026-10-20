import React from 'react';

export default function DesignSystemModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="bg-[#0F1420] border border-[#252E45] rounded-xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-4 border-b border-[#252E45] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <h2 className="text-sm font-bold text-white">DESIGN.md System Tokens Inspector</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white">✕</button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-xs custom-scrollbar">
          {/* Surface Tokens */}
          <section>
            <h3 className="font-mono text-indigo-400 uppercase tracking-wider mb-3">1. Surface Tokens</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-[#0B0F19] border border-[#252E45] rounded">
                <div className="font-mono text-[10px] text-slate-400">Canvas</div>
                <div className="font-bold text-white">#0B0F19</div>
              </div>
              <div className="p-3 bg-[#141A28] border border-[#252E45] rounded">
                <div className="font-mono text-[10px] text-slate-400">Column Surface</div>
                <div className="font-bold text-white">#141A28</div>
              </div>
              <div className="p-3 bg-[#192033] border border-[#252E45] rounded">
                <div className="font-mono text-[10px] text-slate-400">Card Surface</div>
                <div className="font-bold text-white">#192033</div>
              </div>
            </div>
          </section>

          {/* Task Type Badges */}
          <section>
            <h3 className="font-mono text-indigo-400 uppercase tracking-wider mb-3">2. Task Accent Tokens</h3>
            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-indigo-950/90 text-indigo-300 border border-indigo-700/60">
                FEAT (Feature)
              </span>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-rose-950/90 text-rose-300 border border-rose-700/60">
                BUG (Bug Fix)
              </span>
            </div>
          </section>

          {/* Due Urgency Matrix */}
          <section>
            <h3 className="font-mono text-indigo-400 uppercase tracking-wider mb-3">3. Due Urgency Tokens</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/50 flex items-center justify-between">
                <span>Critical (&lt;4h / Today)</span>
                <span className="font-mono text-[10px]">Due in 3h</span>
              </div>
              <div className="p-2.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/50 flex items-center justify-between">
                <span>Warning (1d - 2d)</span>
                <span className="font-mono text-[10px]">Due in 1d</span>
              </div>
              <div className="p-2.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 flex items-center justify-between">
                <span>Calm (&gt;2d)</span>
                <span className="font-mono text-[10px]">Due in 5d</span>
              </div>
              <div className="p-2.5 rounded bg-slate-800/60 text-slate-400 border border-slate-700/40 flex items-center justify-between">
                <span>Done / Neutral</span>
                <span className="font-mono text-[10px]">Merged</span>
              </div>
            </div>
          </section>
        </div>

        <div className="p-4 border-t border-[#252E45] flex justify-end">
          <button onClick={onClose} className="px-4 py-1.5 bg-indigo-600 text-white text-xs rounded">
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}