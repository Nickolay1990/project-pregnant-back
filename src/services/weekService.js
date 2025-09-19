// src/services/weeksService.js
import { BabyState } from '../db/models/BabyState.js';
import { MomState } from '../db/models/MomState.js';
import createHttpError from 'http-errors';

// Дашборд
export const getWeekDashboardService = async (weekNumber, user) => {
  const baby = await BabyState.findOne({ weekNumber });
  const mom = await MomState.findOne({ weekNumber });

  if (!baby || !mom) {
    throw createHttpError(404, 'Data not found for this week');
  }

  let daysLeft;
  if (user?.dueDate) {
    const today = new Date();
    daysLeft = Math.max(
      0,
      Math.ceil((new Date(user.dueDate) - today) / (1000 * 60 * 60 * 24)),
    );
  } else {
    daysLeft = (42 - weekNumber) * 7;
  }

  return {
    weekNumber,
    daysLeft,
    baby,
    mom,
  };
};

// Розвиток малюка
export const getBabyDevelopmentService = async (weekNumber) => {
  const baby = await BabyState.findOne({ weekNumber });
  if (!baby) {
    throw createHttpError(404, 'Baby development not found');
  }
  return baby;
};

// Стан мами
export const getMomBodyService = async (weekNumber) => {
  const mom = await MomState.findOne({ weekNumber });
  if (!mom) {
    throw createHttpError(404, 'Mom state not found');
  }
  return mom;
};
