import {
  createDiaryService,
  deleteDiaryService,
  getDiariesService,
  updateDiaryService,
  getDiaryByIdService,
} from '../services/diaries.js';

export const createDiaryController = async (req, res) => {
  // id користувача ставить мідлвара аутентифікації
  const userId = req.user._id;

  // дістаємо дані з тіла запиту (descr = '' за замовчуванням)
  const { title, emotions, descr = '' } = req.body;

  // створюємо новий запис у щоденнику через сервіс
  const newDiary = await createDiaryService({
    title,
    emotions,
    descr,
    userId,
  });

  return res.status(201).json({
    status: 201,
    message: 'Запис у щоденнику створено успішно',
    data: newDiary,
  });
};

export const getDiariesController = async (req, res) => {
  const userId = req.user._id;

  // отримуємо всі записи цього користувача
  const diaries = await getDiariesService(userId);

  return res.status(200).json({
    status: 200,
    message: 'Список записів отримано',
    data: diaries,
  });
};

export const updateDiaryController = async (req, res) => {
  const userId = req.user._id;

  // дістаємо id запису з параметрів маршруту
  const { diaryId } = req.params;
  // дістаємо дані з тіла запиту (оновлювані поля)
  const { title, descr, emotions } = req.body;

  // оновлюємо запис у БД, передаємо ідентифікатор користувача для захисту від чужих записів
  const updated = await updateDiaryService(diaryId, {
    title,
    descr,
    emotions,
    userId,
  });

  return res.status(200).json({
    status: 200,
    message: 'Запис оновлено',
    data: updated,
  });
};

export const deleteDiaryController = async (req, res) => {
  const userId = req.user._id;

  // id запису беремо з параметрів маршруту
  const { diaryId } = req.params;

  // видаляємо запис, що належить цьому користувачу
  const deletedDiary = await deleteDiaryService(diaryId, userId);

  return res.status(200).json({
    status: 200,
    message: 'Запис видалено',
    data: deletedDiary,
  });
};

export const getDiaryByIdController = async (req, res) => {
  const userId = req.user._id;
  const { diaryId } = req.params;

  const diary = await getDiaryByIdService(diaryId, userId);

  return res.status(200).json({
    status: 200,
    message: 'Запис отримано',
    data: diary,
  });
};
