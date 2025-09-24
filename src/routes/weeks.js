// src/routes/weeks.js
import { Router } from 'express';

import {
  getWeekDashboardController,
  getBabyDevelopmentController,
  getMomBodyController,
  getPublicDashboardController,
} from '../controllers/weeksController.js';
import { authenticate } from '../middlewares/authenticate.js';

export const weekRouter = Router();

// ПУБЛІЧНИЙ (неавторизований)
weekRouter.get('/public/dashboard', getPublicDashboardController);

// ПРИВАТНІ

weekRouter.use(authenticate);

weekRouter.get('/dashboard', getWeekDashboardController);
weekRouter.get('/:week/baby', getBabyDevelopmentController);

weekRouter.get('/:week/mom', getMomBodyController);
