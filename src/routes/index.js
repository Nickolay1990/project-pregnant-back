import { Router } from 'express';
import authRouter from './auth.js';
import { diariesRouter } from './diaries.js';
import { emotionsRouter } from './emotions.js';
import usersRouter from './users.js';
import { authenticate } from '../middlewares/authenticate.js';
import { tasksRouter } from './tasks.js';
// import { weekRouter } from './weeks.js';

const router = Router();

router.use('/api/auth', authRouter);
router.use('/api/diaries', diariesRouter);
router.use('/api/emotions', emotionsRouter);
router.use('/api/users', authenticate, usersRouter);
router.use('/api/tasks', tasksRouter);
// router.use('/api/week', weekRouter);

export default router;
