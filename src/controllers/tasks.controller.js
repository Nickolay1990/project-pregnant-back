import {
  getTasksService,
  createTaskService,
  toggleTaskStatusService,
} from '../services/tasks.service.js';

export async function getTasksController(_req, res) {
  const tasks = await getTasksService();

  res.json({
    status: 200,
    message: 'Successfully found tasks!',
    data: tasks,
  });
}

export async function createTaskController(req, res) {
  const task = await createTaskService(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a task!',
    data: task,
  });
}

export async function toggleTaskStatusController(req, res) {
  const { taskId } = req.params;
  const task = await toggleTaskStatusService(taskId);

  res.status(200).json({
    status: 200,
    message: 'Successfully changed a status of task!',
    data: task,
  });
}
