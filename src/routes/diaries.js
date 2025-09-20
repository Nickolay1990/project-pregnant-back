import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createDiarySchema, updateDiarySchema } from '../validation/diaries.js';
import { createDiaryController, deleteDiaryController, getDiariesController, updateDiaryController } from '../controllers/diaries.js';
import { validateDiaryId } from '../middlewares/validateDiaryId.js';

export const diariesRouter = Router();

diariesRouter.post('/', validateBody(createDiarySchema), createDiaryController);
diariesRouter.get('/',getDiariesController);
diariesRouter.patch('/:diaryId',validateDiaryId, validateBody(updateDiarySchema), updateDiaryController);
diariesRouter.delete('/:diaryId',validateDiaryId, deleteDiaryController);
