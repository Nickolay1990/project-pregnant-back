const USERS = new Map();
let NEXT_ID = 1;

function getBox(userId) {
  if (!USERS.has(userId)) USERS.set(userId, []);
  return USERS.get(userId);
}

export function listTasks(userId) {
  const box = getBox(userId);
  return [...box].sort((a, b) => a.date.localeCompare(b.date));
}

export function createTask(userId, data) {
  const box = getBox(userId);
  const task = {
    id: String(NEXT_ID++),
    name: String(data.name || '').trim(),
    date: data.date,
    isDone: Boolean(data.isDone),
    userId,
  };
  box.push(task);
  return task;
}

export function findTask(userId, taskId) {
  const box = getBox(userId);
  return box.find(t => t.id === String(taskId)) || null;
}

export function saveTask(userId, task) {
  const box = getBox(userId);
  const i = box.findIndex(t => t.id === String(task.id));
  if (i === -1) {
    box.push(task);
  } else {
    box[i] = task;
  }
  return task;
}
