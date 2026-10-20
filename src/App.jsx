import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Board from './components/Board';
import TaskModal from './components/TaskModal';
import DesignSystemModal from './components/DesignSystemModal';

const INITIAL_TASKS = [
  // To Do
  { id: '1', title: 'Patch WebGL canvas memory leak during hot module reload', type: 'BUG', status: 'todo', dueDate: 'Due in 3h', assignee: 'Alex Rivera', assigneeInitials: 'AR', assigneeColor: 'bg-blue-600' },
  { id: '2', title: 'Fix Supabase RLS recursion on auth token refresh', type: 'BUG', status: 'todo', dueDate: 'Due in 2d', assignee: 'Devon Vance', assigneeInitials: 'DV', assigneeColor: 'bg-emerald-600' },
  { id: '3', title: 'Refactor prompt injection sanitization middleware', type: 'FEAT', status: 'todo', dueDate: 'Due in 5d', assignee: 'Maya Lin', assigneeInitials: 'ML', assigneeColor: 'bg-slate-600' },
  { id: '4', title: 'Add automated Playwright smoke tests for vibe flow export', type: 'FEAT', status: 'todo', dueDate: 'Due in 7d', assignee: 'Kiran Patel', assigneeInitials: 'KP', assigneeColor: 'bg-purple-600' },
  { id: '5', title: 'Configure Redis cluster vector caching for prompt memoization', type: 'FEAT', status: 'todo', dueDate: 'Due in 9d', assignee: 'Sarah Chen', assigneeInitials: 'SC', assigneeColor: 'bg-indigo-600' },

  // In Progress
  { id: '6', title: 'Implement Streaming SSE handler for Cursor chat protocol', type: 'FEAT', status: 'in_progress', dueDate: 'Due Today', assignee: 'Sarah Chen', assigneeInitials: 'SC', assigneeColor: 'bg-indigo-600' },
  { id: '7', title: 'Scaffold shadcn/ui command menu with fuzzy search', type: 'FEAT', status: 'in_progress', dueDate: 'Due in 1d', assignee: 'Devon Vance', assigneeInitials: 'DV', assigneeColor: 'bg-emerald-600' },
  { id: '8', title: 'Fix React SSR hydration mismatch on timestamp formatters', type: 'BUG', status: 'in_progress', dueDate: 'Due in 2d', assignee: 'Maya Lin', assigneeInitials: 'ML', assigneeColor: 'bg-slate-600' },
  { id: '9', title: 'Implement matrix transform algebra for infinite 60fps canvas pan', type: 'FEAT', status: 'in_progress', dueDate: 'Due in 4d', assignee: 'Alex Rivera', assigneeInitials: 'AR', assigneeColor: 'bg-blue-600' },

  // Review
  { id: '10', title: 'Repair dropped WebSocket reconnect heartbeat in multi-tab state', type: 'BUG', status: 'review', dueDate: 'Due in 4h', assignee: 'Kiran Patel', assigneeInitials: 'KP', assigneeColor: 'bg-purple-600' },
  { id: '11', title: 'Synchronize WCAG AAA compliant semantic surface tokens', type: 'FEAT', status: 'review', dueDate: 'Due in 2d', assignee: 'Maya Lin', assigneeInitials: 'ML', assigneeColor: 'bg-slate-600' },
  { id: '12', title: 'Standardize AST parser for user-defined prompt markdown interpolations', type: 'FEAT', status: 'review', dueDate: 'Due in 6d', assignee: 'Sarah Chen', assigneeInitials: 'SC', assigneeColor: 'bg-indigo-600' },

  // Done
  { id: '13', title: 'Migrate global store to Zustand v5 with local storage hydration', type: 'FEAT', status: 'done', dueDate: 'Done', statusBadge: 'Merged', assignee: 'Alex Rivera', assigneeInitials: 'AR', assigneeColor: 'bg-blue-600' },
  { id: '14', title: 'Resolve double LLM invocation loop on hot debounce debounce', type: 'BUG', status: 'done', dueDate: 'Done', statusBadge: 'Fixed', assignee: 'Devon Vance', assigneeInitials: 'DV', assigneeColor: 'bg-emerald-600' },
  { id: '15', title: 'Embed monaco-editor syntax highlighters for :cursorrules', type: 'FEAT', status: 'done', dueDate: 'Done', statusBadge: 'Done', assignee: 'Sarah Chen', assigneeInitials: 'SC', assigneeColor: 'bg-indigo-600' },
  { id: '16', title: 'Add GitHub webhook triggers for branch CI workflow status', type: 'FEAT', status: 'done', dueDate: 'Done', statusBadge: 'Done', assignee: 'Kiran Patel', assigneeInitials: 'KP', assigneeColor: 'bg-purple-600' },
  { id: '17', title: 'Eliminate memory thrashing during long synthetic prompt streams', type: 'BUG', status: 'done', dueDate: 'Done', statusBadge: 'Fixed', assignee: 'Alex Rivera', assigneeInitials: 'AR', assigneeColor: 'bg-blue-600' },
  { id: '18', title: 'Initialize Tailwind theme configuration with high-density tokens', type: 'FEAT', status: 'done', dueDate: 'Done', statusBadge: 'Done', assignee: 'Maya Lin', assigneeInitials: 'ML', assigneeColor: 'bg-slate-600' },
];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('vibeboard_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('vibeboard_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (taskData) => {
    if (selectedTask) {
      setTasks((prev) => prev.map((t) => (t.id === selectedTask.id ? { ...t, ...taskData } : t)));
    } else {
      const newTask = {
        id: String(Date.now()),
        ...taskData,
      };
      setTasks((prev) => [newTask, ...prev]);
    }
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskMove = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated = { ...t, status: newStatus };
          if (newStatus === 'done' && !t.statusBadge) {
            updated.statusBadge = t.type === 'BUG' ? 'Fixed' : 'Done';
          }
          return updated;
        }
        return t;
      })
    );
  };

  return (
    <div className="flex h-screen bg-[#0B0F19] text-slate-100 font-sans antialiased overflow-hidden select-none">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onOpenNewTaskModal={() => {
            setSelectedTask(null);
            setIsTaskModalOpen(true);
          }}
          onOpenDesignModal={() => setIsDesignModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="flex-1 overflow-hidden flex flex-col">
          <Board
            tasks={tasks}
            searchQuery={searchQuery}
            onCardClick={(task) => {
              setSelectedTask(task);
              setIsTaskModalOpen(true);
            }}
            onTaskMove={handleTaskMove}
          />
        </main>
      </div>

      <TaskModal
        task={selectedTask}
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />

      <DesignSystemModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
      />
    </div>
  );
}