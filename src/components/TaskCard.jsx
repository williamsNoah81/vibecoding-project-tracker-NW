import React, { useState } from 'react';
import { TASK_TYPES, getDueUrgencyToken } from '../theme';
import { formatTaskBrief } from '../utils/formatBrief';

export default function TaskCard({ task, onClick, onDragStart }) {
  const [copied, setCopied] = useState(false);
  const typeConfig = TASK_TYPES[task.type] || TASK_TYPES.FEAT;
  const isDone = task.status === 'done';
  const urgency = getDueUrgencyToken(task.dueDate, isDone);

  const handleCopyContext = (e) => {
    e.stopPropagation();
    const briefText = formatTaskBrief(task);
    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={() => onClick(task)}
      className={`group relative bg-[#192033] hover:bg-[#1e273e] border-y border-r border-[#252E45] hover:border-indigo-500/50 rounded-lg p-3 transition-all duration-150 cursor-pointer shadow-sm hover:shadow-md border-l-4 ${urgency.barClass}`}
    >
      <div className="flex items-center justify-between mb-2.5 gap-2">
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${typeConfig.badge}`}>
          {typeConfig.label}
        </span>

        {task.statusBadge ? (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 flex items-center gap-1">
            <span>✓</span> {task.statusBadge}
          </span>
        ) : (
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${urgency.badgeClass}`}>
            ⏰ {urgency.label}
          </span>
        )}
      </div>

      <h3 className="text-xs font-semibold text-slate-100 leading-snug mb-3 group-hover:text-indigo-300 transition-colors">
        {task.title}
      </h3>

      <div className="flex items-center justify-between pt-2 border-t border-[#252E45]/60">
        <div className="flex items-center space-x-2 min-w-0">
          <div className={`w-5 h-5 rounded-full ${task.assigneeColor || 'bg-indigo-600'} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
            {task.assigneeInitials}
          </div>
          <span className="text-[11px] text-slate-400 font-medium truncate">
            {task.assignee}
          </span>
        </div>

        {/* Micro Copy Button */}
        <button
          onClick={handleCopyContext}
          title="Copy prompt context for AI"
          className="text-[9px] font-mono text-indigo-400 hover:text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900 px-1.5 py-0.5 rounded border border-indigo-700/40 transition-colors shrink-0"
        >
          {copied ? (
            <span className="text-emerald-400 font-bold">✓ Copied</span>
          ) : (
            <span>📋 Copy</span>
          )}
        </button>
      </div>
    </div>
  );
}