// src/controllers/weeksController.js

import {
  getWeekDashboardService,
  getBabyDevelopmentService,
  getMomBodyService,
  getPublicWeekDashboardService,
} from '../services/weekService.js';

// 1. Публічний ендпоінт дашборд
export const getPublicDashboardController = async (req, res) => {
  const data = await getPublicWeekDashboardService();

  res.status(200).json(data);
};

// 2. Приватний ендпоінт дашборд
export const getWeekDashboardController = async (req, res) => {
  const data = await getWeekDashboardService(req.user);

  res.status(200).json({
    status: 200,
    message: 'Data received',
    data,
  });
};

// Приватний ендпоінт малюк
export const getBabyDevelopmentController = async (req, res) => {
  const data = await getBabyDevelopmentService(req.params.week, req.user);

  res.status(200).json({
    status: 200,
    message: 'Data received',
    data,
  });
};

// Приватний ендпоінт мама
export const getMomBodyController = async (req, res) => {
  const data = await getMomBodyService(req.params.week, req.user);

  res.status(200).json({
    status: 200,
    message: 'Data received',
    data,
  });
};
