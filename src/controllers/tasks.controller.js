import {
    getTasksService,
    createTaskService,
    toggleTaskStatusService,
  } from '../services/tasks.service.js';

  // GET /api/tasks (приватный)
  export async function getTasksController(req, res) {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const tasks = await getTasksService(String(userId));
      return res.json(tasks);
    } catch (e) {
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // POST /api/tasks (приватный)
  export async function createTaskController(req, res) {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const { task, error, status } = await createTaskService(String(userId), req.body);
      if (error) return res.status(status || 400).json({ message: error });
      return res.status(201).json(task);
    } catch (e) {
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // PATCH /api/tasks/:taskId/status (приватный)
  export async function toggleTaskStatusController(req, res) {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const { taskId } = req.params;
      const { task, error, status } = await toggleTaskStatusService(String(userId), String(taskId));
      if (error) return res.status(status || 400).json({ message: error });
      return res.json(task);
    } catch (e) {
      return res.status(500).json({ message: 'Server error' });
    }
  }
