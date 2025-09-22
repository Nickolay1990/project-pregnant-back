import createHttpError from 'http-errors';
import { Task } from '../models/task.model.js';

export async function getTasksService() {
  return Task.find({}).sort({ date: 1 }).lean();
}

export async function createTaskService(payload) {
  const newTask = await Task.create(payload);
  return newTask;
}

export async function toggleTaskStatusService(taskId) {
  const doc = await Task.findById(taskId);

  if (!doc) {
    throw createHttpError(401, 'Task not found');
  }

  doc.isDone = !doc.isDone;
  await doc.save();

  return doc;
}
