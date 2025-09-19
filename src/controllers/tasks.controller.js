import {
  getTasksService,
  createTaskService,
  toggleTaskStatusService,
} from '../services/tasks.service.js';
export async function getTasksController(req, res) {
  try {
    const userId = String(req.headers['x-user-id'] || 'public');
    const tasks = await getTasksService(userId);
    return res.json(tasks);
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function createTaskController(req, res) {
  try {
    const userId = String(req.headers['x-user-id'] || 'public');
    const { task, error, status } = await createTaskService(userId, req.body);
    if (error) return res.status(status || 400).json({ message: error });
    return res.status(201).json(task);
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function toggleTaskStatusController(req, res) {
  try {
    const userId = String(req.headers['x-user-id'] || 'public');
    const { taskId } = req.params;
    const { task, error, status } = await toggleTaskStatusService(userId, String(taskId));
    if (error) return res.status(status || 400).json({ message: error });
    return res.json(task);
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
}
