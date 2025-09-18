const USERS = new Map();
let NEXT_ID = 1;

export function listTasks(userId) {
  const box = USERS.get(userId);
  if (!box) return [];
  return Array.from(box.values()).sort((a, b) => {
    if (a.date === b.date) return a.createdAt - b.createdAt;
    return a.date.localeCompare(b.date);
  });
}

export function createTask(userId, data) {
  const box = USERS.get(userId) || new Map();
  if (!USERS.has(userId)) USERS.set(userId, box);

  const id = String(NEXT_ID++);
  const now = Date.now();
  const task = {
    id,
    name: data.name.trim(),
    date: data.date,
    isDone: Boolean(data.isDone ?? false),
    userId,
    createdAt: now,
    updatedAt: now,
  };
  box.set(id, task);
  return task;
}

export function findTask(userId, taskId) {
  const box = USERS.get(userId);
  if (!box) return null;
  return box.get(taskId) || null;
}

export function saveTask(userId, task) {
  const box = USERS.get(userId) || new Map();
  if (!USERS.has(userId)) USERS.set(userId, box);
  task.updatedAt = Date.now();
  box.set(task.id, task);
  return task;
}
