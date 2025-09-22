import { Router } from 'express';
import {
  getTasksController,
  createTaskController,
  toggleTaskStatusController,
} from '../controllers/tasks.controller.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createTaskSchema } from '../validation/tasks.js';
import { authenticate } from '../middlewares/authenticate.js';

export const tasksRouter = Router();

tasksRouter.use(authenticate);
tasksRouter.post('/', validateBody(createTaskSchema), createTaskController);
tasksRouter.get('/', getTasksController);
tasksRouter.patch('/:taskId/status', toggleTaskStatusController);
