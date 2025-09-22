import createHttpError from 'http-errors';
import { Diary } from '../db/models/diary.js';

// утиліта: перетворює всі id в строки + прибирає дублікати
const uniqueIds = (arr = []) => [...new Set(arr.map(String))];

export const createDiaryService = async ({
  title,
  emotions,
  descr = '',
  userId,
}) => {
  const ids = uniqueIds(emotions ?? []);
  // не дозволяємо створювати запис без жодної емоції
  if (ids.length === 0) {
    throw createHttpError(422, 'Потрібна щонайменше 1 емоція');
  }
  // створюємо новий документ у колекції
  const doc = await Diary.create({ title, emotions: ids, descr, userId });

  // повертаємо його з підставленими назвами емоцій
  return Diary.findById(doc._id).populate('emotions', 'title').lean();
};

export const getDiariesService = async (userId) => {
  return Diary.find({ userId })
    .sort({ createdAt: -1 }) // останні записи — першими
    .populate('emotions', 'title')
    .lean();
};

export const updateDiaryService = async (
  diaryId,
  { title, descr, emotions, userId },
) => {
  const $set = {}; // об’єкт для оновлення лише тих полів, які передані

  if (title !== undefined) $set.title = title;
  if (descr !== undefined) $set.descr = descr;

  if (emotions !== undefined) {
    // нормалізація + перевірка, що список не пустий
    const ids = uniqueIds(emotions ?? []);
    if (ids.length === 0) {
      throw createHttpError(422, 'Потрібна щонайменше 1 емоція');
    }
    $set.emotions = ids;
  }
  // оновлюємо лише записи, які належать конкретному користувачу
  const updated = await Diary.findOneAndUpdate(
    { _id: diaryId, userId }, // умова пошуку
    { $set }, // поля для оновлення
    { new: true }, // повернути оновлений документ
  )
    .populate('emotions', 'title')
    .lean();

  if (!updated) {
    throw createHttpError(404, 'Запис не знайдено');
  }

  return updated;
};

export const deleteDiaryService = async (diaryId, userId) => {
  const deleted = await Diary.findOneAndDelete({ _id: diaryId, userId }).lean();

  if (!deleted) {
    throw createHttpError(404, 'Запис не знайдено');
  }

  return deleted;
};
