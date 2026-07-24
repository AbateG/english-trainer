/* db.js — thin IndexedDB wrapper for offline progress + analytics storage
   No external dependencies. Two stores:
   - "progress": one record per (level, skillId) — completion + score
   - "analytics": one record per (level, skillId, exerciseIndex) — attempt/error
     counts, so we can see which specific grammar points trip learners up.
   - "feedback": free-text notes the learner chooses to leave, exportable.
*/
const TrainerDB = (() => {
  const DB_NAME = 'english-trainer-db';
  const DB_VERSION = 2;
  const STORE = 'progress';
  const ANALYTICS_STORE = 'analytics';
  const FEEDBACK_STORE = 'feedback';
  let dbPromise = null;

  function open() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(ANALYTICS_STORE)) {
          db.createObjectStore(ANALYTICS_STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(FEEDBACK_STORE)) {
          db.createObjectStore(FEEDBACK_STORE, { keyPath: 'id', autoIncrement: true });
        }
      };
      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = (e) => reject(e.target.error);
    });
    return dbPromise;
  }

  function keyFor(level, skillId) {
    return `${level}:${skillId}`;
  }

  async function getProgress(level, skillId) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(keyFor(level, skillId));
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async function saveProgress(level, skillId, record) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put({ id: keyFor(level, skillId), level, skillId, ...record });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  async function getAllProgress() {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  // ---------- Analytics: which exact grammar points cause errors ----------
  // exerciseKey should be stable across shuffles — we use the exercise's
  // own prompt text (EN) as its identity, since array index changes on shuffle.
  function analyticsKeyFor(level, skillId, exerciseKey) {
    return `${level}:${skillId}:${exerciseKey}`;
  }

  async function recordAttempt(level, skillId, exerciseKey, exerciseLabel, isCorrect) {
    const db = await open();
    const id = analyticsKeyFor(level, skillId, exerciseKey);
    return new Promise((resolve, reject) => {
      const tx = db.transaction(ANALYTICS_STORE, 'readwrite');
      const store = tx.objectStore(ANALYTICS_STORE);
      const getReq = store.get(id);
      getReq.onsuccess = () => {
        const existing = getReq.result || { id, level, skillId, exerciseLabel, attempts: 0, errors: 0 };
        existing.attempts += 1;
        if (!isCorrect) existing.errors += 1;
        existing.exerciseLabel = exerciseLabel; // keep label fresh
        store.put(existing);
      };
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  async function getAllAnalytics() {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(ANALYTICS_STORE, 'readonly');
      const req = tx.objectStore(ANALYTICS_STORE).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  // ---------- Feedback: free-text notes the learner leaves ----------
  async function saveFeedbackNote(text) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(FEEDBACK_STORE, 'readwrite');
      tx.objectStore(FEEDBACK_STORE).add({ text, createdAt: Date.now() });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  async function getAllFeedbackNotes() {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(FEEDBACK_STORE, 'readonly');
      const req = tx.objectStore(FEEDBACK_STORE).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  return {
    getProgress, saveProgress, getAllProgress,
    recordAttempt, getAllAnalytics,
    saveFeedbackNote, getAllFeedbackNotes,
  };
})();

