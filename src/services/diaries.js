import createHttpError from "http-errors";
import { Diary } from "../db/models/diary.js"
import { Emotion } from "../db/models/emotion.js";

export const createDiaryService = async ({ title, emotions, descr = '', userId }) => {
    const uniqueIds = [...new Set((emotions ?? []).map(String))];

    const found = await Emotion.find({ _id: { $in: uniqueIds } }, { _id: 1 }).lean();
    if (found.length !== uniqueIds.length) {
        const foundSet = new Set(found.map(e => String(e._id)));
        const invalid = uniqueIds.filter(id => !foundSet.has(String(id)));
        throw createHttpError(422, 'Деякі емоції відсутні у базі', { errors: invalid });
    }

    const doc = await Diary.create({ title, emotions: uniqueIds, descr, userId });

    return Diary.findById(doc._id).populate('emotions', 'title').lean();
};

export const getDiariesService = async (userId) => {
    return Diary.find({ userId })
        .sort({ createdAt: -1 })
        .populate('emotions', 'title')
        .lean();
};

export const updateDiaryService = async (diaryId, { title, descr, emotions, userId }) => {
  const $set = {};

  if (title !== undefined) $set.title = title;
  if (descr !== undefined) $set.descr = descr;

  if (emotions !== undefined) {
    const uniqueIds = [...new Set((emotions ?? []).map(String))];

    if (uniqueIds.length === 0) {
      throw createHttpError(422, 'Потрібна щонайменше 1 емоція');
    }

    const found = await Emotion.find({ _id: { $in: uniqueIds } }, { _id: 1 }).lean();
    if (found.length !== uniqueIds.length) {
      const foundSet = new Set(found.map(e => String(e._id)));
      const invalid = uniqueIds.filter(id => !foundSet.has(String(id)));
      throw createHttpError(422, 'Деякі емоції відсутні у базі', { errors: invalid });
    }

    $set.emotions = uniqueIds;
  }

  const updated = await Diary.findOneAndUpdate(
    { _id: diaryId, userId },
    { $set },
    { new: true }
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
