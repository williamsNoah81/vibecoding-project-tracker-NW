// src/db.js

const DB_NAME = 'VibeBoardDB';
const DB_VERSION = 1;
const STORE_NAME = 'tasks';

/**
 * Opens or initializes the local IndexedDB database.
 */
function initDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (e) => reject(e.target.error);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('status', 'status', { unique: false });
      }
    };

    request.onsuccess = (e) => resolve(e.target.result);
  });
}

/**
 * Retrieves all tasks from the local database store.
 */
export async function getTasksFromDB() {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    // Fallback read from localStorage
    const saved = localStorage.getItem('vibeboard_tasks');
    return saved ? JSON.parse(saved) : [];
  }
}

/**
 * Saves or updates a task in the local database.
 */
export async function saveTaskToDB(task) {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(task);

      request.onsuccess = () => resolve(task);
      request.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    // Fallback sync to localStorage
    const saved = localStorage.getItem('vibeboard_tasks');
    const tasks = saved ? JSON.parse(saved) : [];
    const existingIndex = tasks.findIndex((t) => t.id === task.id);
    if (existingIndex >= 0) {
      tasks[existingIndex] = task;
    } else {
      tasks.unshift(task);
    }
    localStorage.setItem('vibeboard_tasks', JSON.stringify(tasks));
    return task;
  }
}

/**
 * Removes a task from the local database.
 */
export async function deleteTaskFromDB(taskId) {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(taskId);

      request.onsuccess = () => resolve(taskId);
      request.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    // Fallback sync to localStorage
    const saved = localStorage.getItem('vibeboard_tasks');
    if (saved) {
      const tasks = JSON.parse(saved).filter((t) => t.id !== taskId);
      localStorage.setItem('vibeboard_tasks', JSON.stringify(tasks));
    }
    return taskId;
  }
}