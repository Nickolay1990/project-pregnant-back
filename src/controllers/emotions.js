import { Emotion } from '../db/models/emotion.js';

// Контролер для отримання всіх емоцій із БД
export const getAllEmotionsController = async (req, res) => {
  // знайти всі емоції, брати лише _id і title
  const emotions = await Emotion.find({}, { title: 1 })
    .sort({ title: 1 }) // сортуємо по назві
    .lean();

  console.log(emotions);

  return res.status(200).json({
    status: 200,
    message: 'Список емоцій отримано',
    data: emotions,
  });
};
