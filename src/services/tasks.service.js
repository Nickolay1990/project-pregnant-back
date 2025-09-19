import { listTasks, createTask, findTask, saveTask } from '../utils/tasksStore.js';

export async function getTasksService(userId) {
  return listTasks(userId);
}

export async function createTaskService(userId, payload) {
  const name = String(payload?.name ?? '').trim();
  const date = String(payload?.date ?? '');
  const isDone = Boolean(payload?.isDone);
  if (!name || !date) {
    return { error: 'name and date are required', status: 400 };
  }

  const task = createTask(userId, { name, date, isDone });
  return { task };
}

export async function toggleTaskStatusService(userId, taskId) {
  const task = findTask(userId, taskId);
  if (!task) return { error: 'Task not found', status: 404 };

  task.isDone = !task.isDone;
  saveTask(userId, task);
  return { task };
}
