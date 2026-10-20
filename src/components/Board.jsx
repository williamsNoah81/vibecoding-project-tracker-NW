import React from 'react';

const DEFAULT_STAGES = ['To do', 'In Progress', 'Review', 'Done'];

export default function Board({ stages = DEFAULT_STAGES, tasks = [], onTaskClick }) {
  // Group tasks by their stage/status
  const stageMap = stages.reduce((acc, stage) => {
    acc[stage] = [];
    return acc;
  }, {});

  tasks.forEach((task) => {
    const stage = task.stage || task.status || 'To do';
    if (stageMap[stage]) {
      stageMap[stage].push(task);
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full overflow-x-auto">
      {stages.map((stage) => {
        const columnTasks = stageMap[stage] || [];

        return (
          <div
            key={stage}
            className="flex flex-col bg-surface-container-low rounded-xl p-3 gap-3 min-w-[280px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-1 py-1">
              <div className="flex items-center gap-2">
                <h2 className="font-sans text-sm font-semibold text-on-surface">{stage}</h2>
                <span className="px-2 py-0.5 rounded-full bg-surface-container font-mono text-xs text-on-surface-variant font-bold">
                  {columnTasks.length}
                </span>
              </div>
            </div>

            {/* Column Tasks */}
            <div className="flex flex-col gap-2">
              {columnTasks.length ? (
                columnTasks.map((task) => (
                  <div
                    key={task.id || task.title}
                    onClick={() => onTaskClick?.(task)}
                    className="flex flex-col bg-surface-container rounded-lg p-3 cursor-pointer border border-outline-variant/10 hover:bg-surface-container-high transition-colors shadow-sm"
                  >
                    <h3 className="font-sans text-sm font-medium text-on-surface">
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="font-sans text-xs text-on-surface-variant mt-1 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="border border-dashed border-outline-variant/30 rounded-lg p-4 text-on-surface-variant text-xs text-center bg-surface-container/30">
                  No tasks
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}