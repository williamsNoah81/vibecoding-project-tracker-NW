// src/App.jsx

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Board from './components/Board';
import TaskModal from './components/TaskModal';
import DesignSystemModal from './components/DesignSystemModal';
import { getTasksFromDB, saveTaskToDB, deleteTaskFromDB } from './db';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);

  // Load tasks from local database on mount
  useEffect(() => {
    async function loadTasks() {
      try {
        const loadedTasks = await getTasksFromDB();
        setTasks(loadedTasks);
      } catch (error) {
        console.error('Failed to load tasks from local DB:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTasks();
  }, []);

  const handleSaveTask = async (taskData) => {
    let taskToSave;
    if (selectedTask) {
      taskToSave = { ...selectedTask, ...taskData };
      setTasks((prev) => prev.map((t) => (t.id === selectedTask.id ? taskToSave : t)));
    } else {
      taskToSave = {
        id: String(Date.now()),
        ...taskData,
      };
      setTasks((prev) => [taskToSave, ...prev]);
    }

    await saveTaskToDB(taskToSave);
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    await deleteTaskFromDB(taskId);
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskMove = async (taskId, newStatus) => {
    let updatedTask = null;
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          updatedTask = { ...t, status: newStatus };
          if (newStatus === 'done' && !t.statusBadge) {
            updatedTask.statusBadge = t.type === 'BUG' ? 'Fixed' : 'Done';
          }
          return updatedTask;
        }
        return t;
      })
    );

    if (updatedTask) {
      await saveTaskToDB(updatedTask);
    }
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
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center text-xs font-mono text-indigo-400">
              <span className="animate-pulse">Loading database...</span>
            </div>
          ) : (
            <Board
              tasks={tasks}
              searchQuery={searchQuery}
              onCardClick={(task) => {
                setSelectedTask(task);
                setIsTaskModalOpen(true);
              }}
              onTaskMove={handleTaskMove}
            />
          )}
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