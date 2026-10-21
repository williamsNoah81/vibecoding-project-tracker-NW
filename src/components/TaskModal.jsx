import React, { useState, useEffect } from 'react';
import { ASSIGNEES } from '../theme';

export default function TaskModal({ task, isOpen, onClose, onSave, onDelete }) {
  // Returns current date/time formatted for <input type="datetime-local" />
  const getDefaultDateTime = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2); // Default to 2 days out
    return d.toISOString().slice(0, 16);
  };

  const [formData, setFormData] = useState({
    title: '',
    type: 'FEAT',
    status: 'todo',
    dueDate: getDefaultDateTime(),
    assignee: ASSIGNEES[0].name,
    promptContext: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : getDefaultDateTime(),
      });
    } else {
      setFormData({
        title: '',
        type: 'FEAT',
        status: 'todo',
        dueDate: getDefaultDateTime(),
        assignee: ASSIGNEES[0].name,
        promptContext: '',
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAssignee = ASSIGNEES.find((a) => a.name === formData.assignee) || ASSIGNEES[0];
    onSave({
      ...formData,
      assigneeInitials: selectedAssignee.initials,
      assigneeColor: selectedAssignee.color,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0F1420] border border-[#252E45] rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-[#252E45] flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-base">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#0B0F19] text-xs text-slate-200 p-2.5 rounded border border-[#252E45] focus:outline-none focus:border-indigo-500"
              placeholder="Task title..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#0B0F19] text-xs text-slate-200 p-2.5 rounded border border-[#252E45]"
              >
                <option value="FEAT">FEAT (Feature)</option>
                <option value="BUG">BUG (Bug Fix)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#0B0F19] text-xs text-slate-200 p-2.5 rounded border border-[#252E45]"
              >
                <option value="todo">To do</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Assignee</label>
              <select
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                className="w-full bg-[#0B0F19] text-xs text-slate-200 p-2.5 rounded border border-[#252E45]"
              >
                {ASSIGNEES.map((a) => (
                  <option key={a.name} value={a.name}>{a.name} ({a.initials})</option>
                ))}
              </select>
            </div>

            {/* Date & Time Picker */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Due Date & Time</label>
              <input
                type="datetime-local"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full bg-[#0B0F19] text-xs text-slate-200 p-2.5 rounded border border-[#252E45] focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Prompt Context (Vibecoding Anchor)</label>
            <textarea
              rows="3"
              value={formData.promptContext || ''}
              onChange={(e) => setFormData({ ...formData, promptContext: e.target.value })}
              className="w-full bg-[#0B0F19] text-xs text-slate-200 p-2.5 rounded border border-[#252E45] font-mono placeholder:text-slate-600"
              placeholder="Paste AI prompts or technical specifications..."
            ></textarea>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#252E45]">
            {task ? (
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium"
              >
                Delete Task
              </button>
            ) : <div />}

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium"
              >
                Save Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}