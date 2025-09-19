import createHttpError from "http-errors";
import { createDiaryService, deleteDiaryService, getDiariesService, updateDiaryService } from "../services/diaries.js";

export const createDiaryController = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw createHttpError(401, 'Потрібна авторизація');

        const { title, emotions, descr = '' } = req.body;

        const newDiary = await createDiaryService({
            title,
            emotions,
            descr,
            userId
        });

        return res.status(201).json({
            status: 201,
            message: 'Запис у щоденнику створено успішно',
            data: newDiary,
        });
    } catch (err) {
        next(err)
    }
};

export const getDiariesController = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw createHttpError(401, 'Потрібна авторизація');

        const diaries = await getDiariesService(userId);

        return res.status(200).json({
            status: 200,
            message: 'Список записів отримано',
            data: diaries,
        });
    } catch (err) {
        next(err);
    }
};

export const updateDiaryController = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw createHttpError(401, 'Потрібна авторизація');

        const { diaryId } = req.params;
        const { title, descr, emotions } = req.body;

        const updated = await updateDiaryService(diaryId, { title, descr, emotions, userId });

        return res.status(200).json({
            status: 200,
            message: 'Запис оновлено',
            data: updated,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteDiaryController = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw createHttpError(401, 'Потрібна авторизація');

        const { diaryId } = req.params;

        const deletedDiary = await deleteDiaryService(diaryId, userId);

        return res.status(200).json({
            status: 200,
            message: 'Запис видалено',
            data: deletedDiary
        });
    } catch (err) {
        next(err);
    }
};