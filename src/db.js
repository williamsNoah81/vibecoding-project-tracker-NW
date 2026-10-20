// src/db.js

const DB_NAME = 'VibeBoardDB';
const DB_VERSION = 2; // Incremented version to trigger onupgradeneeded for existing users
const STORE_NAME = 'tasks';

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
      
      // Delete old object store to clear legacy seed data for existing users
      if (db.objectStoreNames.contains(STORE_NAME)) {
        db.deleteObjectStore(STORE_NAME);
      }
      
      // Create fresh empty store
      const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      store.createIndex('status', 'status', { unique: false });
    };

    request.onsuccess = (e) => resolve(e.target.result);
  });
}