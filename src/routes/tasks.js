import { Router } from 'express';
import {
  getTasksController,
  createTaskController,
  toggleTaskStatusController,
} from '../controllers/tasks.controller.js';

export const tasksRouter = Router();
tasksRouter.post('/', createTaskController);
tasksRouter.get('/', getTasksController);
tasksRouter.patch('/:taskId/status', toggleTaskStatusController);
