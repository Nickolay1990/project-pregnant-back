import { Router } from 'express';
import { authRequired } from '../middlewares/authRequired.js';
import {
  getTasksController,
  createTaskController,
  toggleTaskStatusController,
} from '../controllers/tasks.controller.js';

export const tasksRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Private tasks API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 96
 *         date:
 *           type: string
 *           description: "Format 'YYYY-MM-DD', must be today or later"
 *         isDone:
 *           type: boolean
 *           default: false
 *         userId:
 *           type: string
 *       required: [name, date]
 *       example:
 *         id: "1"
 *         name: "Drink water"
 *         date: "2025-09-20"
 *         isDone: false
 *         userId: "user_123"
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 96
 *               date:
 *                 type: string
 *                 description: "Format 'YYYY-MM-DD', must be today or later"
 *               isDone:
 *                 type: boolean
 *             required: [name, date]
 *           examples:
 *             default:
 *               value:
 *                 name: "Buy groceries"
 *                 date: "2025-09-22"
 *                 isDone: false
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get tasks list of current user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Unauthorized
 */
tasksRouter.post('/', authRequired, createTaskController);
tasksRouter.get('/', authRequired, getTasksController);

/**
 * @swagger
 * /api/tasks/{taskId}/status:
 *   patch:
 *     summary: Toggle task status (isDone)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Status toggled
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
tasksRouter.patch('/:taskId/status', authRequired, toggleTaskStatusController);
