import React, { useState, useEffect } from 'react';
import { formatTaskBrief } from '../utils/formatBrief';

const AI_TOOLS = ['Claude', 'ChatGPT', 'Gemini', 'Cursor', 'Lovable', 'Replit', 'Other'];

const CONTEXT_TEMPLATE = `## Context

**Background**
- Explain the task background here...

**Constraints**
- List technical constraints or rules...

**Tried so far**
- What approaches or prompts have been attempted?

**Pick up**
- What needs to be done next?`;

function getRelativeTime(timestamp) {
  if (!timestamp) return null;
  const elapsedMinutes = Math.floor((Date.now() - new Date(timestamp).getTime()) / (1000 * 60));

  if (elapsedMinutes < 1) return 'last updated just now';
  if (elapsedMinutes < 60) return `last updated ${elapsedMinutes} m ago`;
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `last updated ${elapsedHours} h ago`;
  const elapsedDays = Math.floor(elapsedHours / 24);
  return `last updated ${elapsedDays} d ago`;
}

export default function TaskModal({ task, teamMembers, isOpen, onClose, onSave, onDelete }) {
  const getDefaultDateTime = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().slice(0, 16);
  };

  const defaultAssignee = teamMembers && teamMembers.length > 0 ? teamMembers[0].name : '';

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'FEAT',
    status: 'todo',
    dueDate: getDefaultDateTime(),
    assignee: defaultAssignee,
    promptContext: CONTEXT_TEMPLATE,
    contextTool: 'Claude',
    contextUpdatedAt: null,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : getDefaultDateTime(),
        promptContext: task.promptContext ?? CONTEXT_TEMPLATE,
        contextTool: task.contextTool || 'Claude',
        contextUpdatedAt: task.contextUpdatedAt || null,
        assignee: task.assignee || defaultAssignee,
      });
    } else {
      setFormData({
        title: '',
        type: 'FEAT',
        status: 'todo',
        dueDate: getDefaultDateTime(),
        assignee: defaultAssignee,
        promptContext: CONTEXT_TEMPLATE,
        contextTool: 'Claude',
        contextUpdatedAt: null,
      });
    }
  }, [task, isOpen, teamMembers]);

  if (!isOpen) return null;

  const handleContextChange = (e) => {
    const newContext = e.target.value;
    setFormData((prev) => ({
      ...prev,
      promptContext: newContext,
      contextUpdatedAt: new Date().toISOString(),
    }));
  };

  const handleCopyBrief = () => {
    const briefText = formatTaskBrief(formData);
    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAssignee = teamMembers.find((a) => a.name === formData.assignee) || teamMembers[0];
    onSave({
      ...formData,
      assigneeInitials: selectedAssignee.initials,
      assigneeColor: selectedAssignee.color,
    });
  };

  const relativeUpdatedText = getRelativeTime(formData.contextUpdatedAt);

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
                {teamMembers.map((a) => (
                  <option key={a.name} value={a.name}>{a.name} ({a.initials})</option>
                ))}
              </select>
            </div>

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
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-slate-400">
                Prompt Context (Vibecoding Anchor)
              </label>

              {relativeUpdatedText && (
                <span className="text-[10px] font-mono text-indigo-400">
                  {relativeUpdatedText}
                </span>
              )}
            </div>

            <textarea
              rows="5"
              value={formData.promptContext}
              onChange={handleContextChange}
              className="w-full bg-[#0B0F19] text-xs text-slate-200 p-2.5 rounded border border-[#252E45] font-mono placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed"
              placeholder="Paste AI prompts or technical specifications..."
            ></textarea>

            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <label className="text-[11px] text-slate-400">AI Tool:</label>
                <select
                  value={formData.contextTool}
                  onChange={(e) => setFormData({ ...formData, contextTool: e.target.value })}
                  className="bg-[#0B0F19] text-[11px] text-slate-200 px-2 py-1 rounded border border-[#252E45] focus:outline-none focus:border-indigo-500"
                >
                  {AI_TOOLS.map((tool) => (
                    <option key={tool} value={tool}>{tool}</option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleCopyBrief}
                className="text-[10px] text-indigo-300 bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-700/50 px-2 py-1 rounded font-mono flex items-center gap-1 transition-colors shrink-0"
              >
                {copied ? <span className="text-emerald-400 font-bold">✓ Copied!</span> : <span>📋 Copy Context</span>}
              </button>
            </div>
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