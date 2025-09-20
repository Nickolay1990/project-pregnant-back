// src/controllers/weeksController.js
import {
  getWeekDashboardService,
  getBabyDevelopmentService,
  getMomBodyService,
} from '../services/weekService.js';

// Дашборд
export const getWeekDashboardController = async (req, res, next) => {
  try {
    const weekNumber = Number(req.params.week);
    const user = req.user; // після JWT авторизації
    const data = await getWeekDashboardService(weekNumber, user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// Малюк
export const getBabyDevelopmentController = async (req, res, next) => {
  try {
    const weekNumber = Number(req.params.week);
    const data = await getBabyDevelopmentService(weekNumber);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// Мама
export const getMomBodyController = async (req, res, next) => {
  try {
    const weekNumber = Number(req.params.week);
    const data = await getMomBodyService(weekNumber);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
