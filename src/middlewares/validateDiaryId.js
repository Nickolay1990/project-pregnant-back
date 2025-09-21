import createHttpError from "http-errors";
import mongoose from "mongoose";

export const validateDiaryId = (req, res, next) => {
    const { diaryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(diaryId)) {
        return next(createHttpError(400, 'Невірний формат ідентифікатора щоденника'))
    }

    next();
};

