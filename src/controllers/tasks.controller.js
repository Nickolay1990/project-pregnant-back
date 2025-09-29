import {
  getTasksService,
  createTaskService,
  toggleTaskStatusService,
} from '../services/tasks.service.js';

export async function getTasksController(req, res) {
  const userId = req.user._id;
  const tasks = await getTasksService(userId);

  res.json({
    status: 200,
    message: 'Successfully found tasks!',
    data: tasks,
  });
}

export async function createTaskController(req, res) {
  const userId = req.user._id;
  const task = await createTaskService(req.body, userId);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a task!',
    data: task,
  });
}

export async function toggleTaskStatusController(req, res) {
  const userId = req.user._id;
  const { taskId } = req.params;
  const task = await toggleTaskStatusService(taskId, userId);

  res.status(200).json({
    status: 200,
    message: 'Successfully changed a status of task!',
    data: task,
  });
}
