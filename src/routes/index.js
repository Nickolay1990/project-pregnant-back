import { Router } from 'express';
// import { usersRouter } from './users.js';
import { tasksRouter } from './tasks.js';
// import { diariesRouter } from './diaries.js';
// import { weekRouter } from './weeks.js';

const router = Router();

// router.use('/api/users', usersRouter);
router.use('/api/tasks', tasksRouter);
// router.use('/api/diaries', diariesRouter);
// router.use('/api/week', weekRouter);

export default router;
