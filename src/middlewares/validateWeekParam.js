import createHttpError from 'http-errors';

export const validateWeekParam = (week) => {
  const num = Number(week);
  if (isNaN(num) || num < 1 || num > 42) {
    throw createHttpError(
      400,
      'Invalid week number. Must be between 1 and 42.',
    );
  }
  return num;
};
