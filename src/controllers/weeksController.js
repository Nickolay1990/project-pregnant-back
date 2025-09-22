// src/controllers/weeksController.js
import { validateWeekParam } from '../middlewares/validateWeekParam.js';
import {
  getWeekDashboardService,
  getBabyDevelopmentService,
  getMomBodyService,
  calculatePregnancyInfoPublic,
} from '../services/weekService.js';
import { calculateCurrentWeekFromUser } from '../utils/calculatePregnancy.js';

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
  const weekNumber = calculateCurrentWeekFromUser(req.user);
  const data = await getWeekDashboardService(weekNumber, req.user);

  res.status(200).json({
    status: 200,
    message: 'Данні отримані',
    data: data,
  });
};

// Малюк
export const getBabyDevelopmentController = async (req, res) => {
  const weekNumber = req.params.week
    ? validateWeekParam(req.params.week)
    : calculateCurrentWeekFromUser(req.user);
  const data = await getBabyDevelopmentService(weekNumber);

  res.status(200).json({
    status: 200,
    message: 'Данні отримані',
    data: data,
  });
};

// Мама
export const getMomBodyController = async (req, res) => {
  const weekNumber = req.params.week
    ? validateWeekParam(req.params.week)
    : calculateCurrentWeekFromUser(req.user);
  const data = await getMomBodyService(weekNumber);

  res.status(200).json({
    status: 200,
    message: 'Данні отримані',
    data: data,
  });
};
