import React from 'react';
import TaskCard from './TaskCard';

export default function Column({ column, tasks, onCardClick, onDragOver, onDrop, onDragStart }) {
  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
      className="flex-1 min-w-[280px] bg-[#141A28] border border-[#252E45] rounded-xl flex flex-col h-full overflow-hidden"
    >
      {/* Column Header */}
      <div className="p-4 border-b border-[#252E45] flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
          <h2 className="text-sm font-bold text-slate-200">{column.title}</h2>
          <span className={`text-xs font-mono font-bold ${column.countColor}`}>
            {tasks.length}
          </span>
        </div>
        <button className="text-slate-500 hover:text-slate-300 text-xs font-mono">···</button>
      </div>

      {/* Task List Container */}
      <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onCardClick}
            onDragStart={onDragStart}
          />
        ))}

        {tasks.length === 0 && (
          <div className="h-32 border border-dashed border-[#252E45] rounded-lg flex flex-col items-center justify-center text-slate-500 space-y-1">
            <span className="text-xs font-medium text-slate-400">No tasks in {column.title}</span>
            <span className="text-[10px] font-mono text-slate-600">Column is empty</span>
          </div>
        )}
      </div>
    </div>
  );
}