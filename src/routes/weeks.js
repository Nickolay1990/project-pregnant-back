// src/routes/weeks.js
import { Router } from 'express';
import { authentificate } from '../middlewares/authentificate.js';
import {
  getWeekDashboardController,
  getBabyDevelopmentController,
  getMomBodyController,
} from '../controllers/weeksController.js';

export const weekRouter = Router();

weekRouter.use(authentificate);

weekRouter.get('/:week/dashboard', getWeekDashboardController);
weekRouter.get('/:week/baby', getBabyDevelopmentController);
weekRouter.get('/:week/mom', getMomBodyController);
