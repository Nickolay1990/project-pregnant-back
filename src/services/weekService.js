// src/services/weeksService.js
import { BabyState } from '../db/models/BabyState.js';
import { MomState } from '../db/models/MomState.js';
import createHttpError from 'http-errors';
import { calculateCurrentWeekFromUser } from '../utils/calculatePregnancy.js';
import { validateWeekParam } from '../middlewares/validateWeekParam.js';

// Дашборд
// Публічний
export const calculatePregnancyInfoPublic = () => {
  const weekNumber = 1;
  const daysLeft = (42 - weekNumber) * 7;
  return { weekNumber, daysLeft };
};
export const getPublicWeekDashboardService = async () => {
  const { weekNumber, daysLeft } = calculatePregnancyInfoPublic();

  const baby = await BabyState.findOne({ weekNumber });
  const mom = await MomState.findOne({ weekNumber });

  if (!baby || !mom) {
    throw createHttpError(404, 'Data not found for public dashboard');
  }

  return { weekNumber, daysLeft, baby, mom };
};

//Приватний
export const getWeekDashboardService = async (user) => {
  if (!user) {
    throw createHttpError(401, 'User not authenticated');
  }

  const { weekNumber, daysLeft } = calculateCurrentWeekFromUser(user);

  const baby = await BabyState.findOne({ weekNumber });
  const mom = await MomState.findOne({ weekNumber });

  if (!baby || !mom) {
    throw createHttpError(404, 'Data not found for this week');
  }

  return { weekNumber, daysLeft, baby, mom };
};
// Розвиток малюка приватний
export const getBabyDevelopmentService = async (week, user) => {
  if (!user) {
    throw createHttpError(401, 'User not authenticated');
  }

  const weekNumber = week
    ? validateWeekParam(week)
    : calculateCurrentWeekFromUser(user);

  const baby = await BabyState.findOne({ weekNumber });
  if (!baby) {
    throw createHttpError(404, 'Baby development not found');
  }

  return baby;
};

// Стан мами приватний
export const getMomBodyService = async (week, user) => {
  if (!user) {
    throw createHttpError(401, 'User not authenticated');
  }

  const weekNumber = week
    ? validateWeekParam(week) // може кинути 400
    : calculateCurrentWeekFromUser(user);

  const mom = await MomState.findOne({ weekNumber });
  if (!mom) {
    throw createHttpError(404, 'Mom state not found');
  }

  return mom;
};
