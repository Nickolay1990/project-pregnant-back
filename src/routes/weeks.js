// src/routes/weeks.js
import { Router } from 'express';

import {
  getWeekDashboardController,
  getBabyDevelopmentController,
  getMomBodyController,
} from '../controllers/weeksController.js';

export const weekRouter = Router();

weekRouter.get('/:week/dashboard', getWeekDashboardController); // публічний
weekRouter.get('/:week/dashboard', getWeekDashboardController); // приватний
weekRouter.get('/:week/baby', getBabyDevelopmentController);
weekRouter.get('/:week/mom', getMomBodyController);
