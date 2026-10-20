import React from 'react';
import Column from './Column';
import { COLUMNS } from '../theme';

export default function Board({ tasks, searchQuery, onCardClick, onTaskMove }) {
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onTaskMove(taskId, status);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-x-auto flex space-x-5">
      {COLUMNS.map((col) => {
        const colTasks = filteredTasks.filter((t) => t.status === col.id);
        return (
          <Column
            key={col.id}
            column={col}
            tasks={colTasks}
            onCardClick={onCardClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
          />
        );
      })}
    </div>
  );
}