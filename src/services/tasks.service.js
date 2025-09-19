import { Task } from '../models/task.model.js';

export async function getTasksService() {
  return Task.find({}).sort({ date: 1 }).lean();
}

export async function createTaskService(payload) {
  const doc = await Task.create({
    name: String(payload?.name ?? '').trim(),
    date: String(payload?.date ?? ''),
    isDone: Boolean(payload?.isDone),
  });
  return { task: doc.toObject() };
}

export async function toggleTaskStatusService(taskId) {
  const doc = await Task.findById(taskId);
  if (!doc) return { error: 'Task not found', status: 404 };

  doc.isDone = !doc.isDone;
  await doc.save();

  return { task: doc.toObject() };
}
