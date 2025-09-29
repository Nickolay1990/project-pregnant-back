import createHttpError from 'http-errors';
import { Task } from '../models/task.model.js';

export async function getTasksService(userId) {
  return Task.find({ userId }).sort({ date: 1 }).lean();
}

export async function createTaskService(payload, userId) {
  const newTask = await Task.create({ ...payload, userId });
  return newTask;
}

export async function toggleTaskStatusService(taskId, userId) {
  const doc = await Task.findOne({ _id: taskId, userId });
  console.log(doc);

  if (!doc) {
    throw createHttpError(401, 'Task not found');
  }

  doc.isDone = !doc.isDone;
  await doc.save();

  return doc;
}
