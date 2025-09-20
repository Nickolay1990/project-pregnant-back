// src/controllers/weeksController.js
import { validateWeekParam } from '../middlewares/validateWeekParam.js';
import {
  getWeekDashboardService,
  getBabyDevelopmentService,
  getMomBodyService,
} from '../services/weekService.js';

// Дашборд
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
