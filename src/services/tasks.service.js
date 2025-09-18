import { listTasks, createTask, findTask, saveTask } from '../utils/tasksStore.js';
import { validateName, validateDateStr } from '../utils/validateTask.js';

export async function getTasksService(userId) {
  return listTasks(userId);
}

export async function createTaskService(userId, payload) {
  const { name, date, isDone } = payload ?? {};
  const nameErr = validateName(name);
  if (nameErr) return { error: nameErr, status: 400 };

  const dateErr = validateDateStr(date);
  if (dateErr) return { error: dateErr, status: 400 };

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
