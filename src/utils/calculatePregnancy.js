// src/utils/calculatePregnancy.js
import createHttpError from 'http-errors';

export const calculateCurrentWeekFromUser = (user) => {
  if (!user?.pregnancyStart) {
    throw createHttpError(
      400,
      'Pregnancy start date not found in user profile',
    );
  }

  const today = new Date();
  const start = new Date(user.pregnancyStart);
  const diffInDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const weekNumber = Math.min(42, Math.max(1, Math.ceil(diffInDays / 7)));

  return weekNumber;
};
