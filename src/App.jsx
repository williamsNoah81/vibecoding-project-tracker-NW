// src/App.jsx

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Board from './components/Board';
import ProjectDeliverables from './components/ProjectDeliverables';
import SettingsView from './components/SettingsView';
import TaskModal from './components/TaskModal';
import { getTasksFromDB, saveTaskToDB, deleteTaskFromDB } from './db';
import { getStoredTeamMembers } from './theme';

export default function App() {
  const [activeTab, setActiveTab] = useState('board');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [teamMembers, setTeamMembers] = useState(getStoredTeamMembers);

  useEffect(() => {
    localStorage.setItem('vibeboard_team', JSON.stringify(teamMembers));
  }, [teamMembers]);

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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onOpenNewTaskModal={() => {
            setSelectedTask(null);
            setIsTaskModalOpen(true);
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {activeTab === 'board' ? (
          <>
            <ProjectDeliverables />
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
          </>
        ) : (
          <SettingsView teamMembers={teamMembers} setTeamMembers={setTeamMembers} />
        )}
      </div>

      <TaskModal
        task={selectedTask}
        teamMembers={teamMembers}
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}