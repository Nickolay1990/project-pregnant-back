import {
  getTasksService,
  createTaskService,
  toggleTaskStatusService,
} from '../services/tasks.service.js';

export async function getTasksController(_req, res) {
  try {
    const tasks = await getTasksService();
    return res.json(tasks);
  } catch {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function createTaskController(req, res) {
  try {
    const { task, error, status } = await createTaskService(req.body);
    if (error) return res.status(status || 400).json({ message: error });
    return res.status(201).json(task);
  } catch {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function toggleTaskStatusController(req, res) {
  try {
    const { taskId } = req.params;
    const { task, error, status } = await toggleTaskStatusService(String(taskId));
    if (error) return res.status(status || 400).json({ message: error });
    return res.json(task);
  } catch {
    return res.status(500).json({ message: 'Server error' });
  }
}
