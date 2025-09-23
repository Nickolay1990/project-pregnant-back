// src/utils/calculatePregnancy.js
import createHttpError from 'http-errors';

export const calculateCurrentWeekFromUser = (user) => {
  if (!user?.dueDate) {
    throw createHttpError(400, 'Due date not found in user profile');
  }

  const today = new Date();
  const dueDate = new Date(user.dueDate);

  // рахуємо залишок днів до пологів
  const daysLeft = Math.max(
    0,
    Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)),
  );

  // визначаємо номер тижня (від 1 до 42)
  const weekNumber = Math.min(42, Math.max(1, 42 - Math.floor(daysLeft / 7)));

  return { weekNumber, daysLeft };
};
