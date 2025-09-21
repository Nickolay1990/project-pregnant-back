// src/controllers/weeksController.js
import { validateWeekParam } from '../middlewares/validateWeekParam.js';
import {
  getWeekDashboardService,
  getBabyDevelopmentService,
  getMomBodyService,
  calculatePregnancyInfoPublic,
} from '../services/weekService.js';

// 1. ПУБЛІЧНИЙ дашборд
export const getPublicDashboardController = async (req, res) => {
  const { weekNumber, daysLeft } = calculatePregnancyInfoPublic();

  const data = await getWeekDashboardService(weekNumber, null);

  res.status(200).json({
    ...data,
    daysLeft,
  });
};

// 2. Приватний дашборд
export const getWeekDashboardController = async (req, res) => {
  const weekNumber = validateWeekParam(req.params.week);
  const data = await getWeekDashboardService(weekNumber, req.user);
  res.status(200).json(data);
};

// Малюк
export const getBabyDevelopmentController = async (req, res) => {
  const weekNumber = validateWeekParam(req.params.week);
  const data = await getBabyDevelopmentService(weekNumber);
  res.status(200).json(data);
};

// Мама
export const getMomBodyController = async (req, res) => {
  const weekNumber = validateWeekParam(req.params.week);
  const data = await getMomBodyService(weekNumber);
  res.status(200).json(data);
};
