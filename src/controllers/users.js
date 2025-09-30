import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { updateUser } from '../services/users.js';
import { calculateCurrentWeekFromUser } from '../utils/calculatePregnancy.js';

export const getCurrentUserController = async (req, res) => {
  const user = req.user;
  if (!user) {
    throw createHttpError(404, 'User not found.');
  }
  const userObj = user.toObject();

  const currentWeek = calculateCurrentWeekFromUser(userObj);
  userObj.currentWeek = currentWeek;

  res.status(200).json({
    status: 200,
    message: 'Successfully found current user.',
    data: { user: userObj },
  });
};

export const updateUserAvatarController = async (req, res, next) => {
  const { userId } = req.params;

  const photo = req.file;
  if (!photo) {
    next(createHttpError(400, 'No file uploaded!'));
    return;
  }

  if (Object.keys(req.body).length > 0) {
    return next(createHttpError(400, 'Only a photo file can be uploaded.'));
  }

  let photoUrl;
  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }

  const result = await updateUser(userId, { photo: photoUrl });

  if (!result) {
    next(createHttpError(404, 'User not found.'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully update avatar user!',
    data: result,
  });
};

export const updateUserController = async (req, res, next) => {
  const { userId } = req.params;
  const result = await updateUser(userId, req.body);

  if (!result) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully update a user!`,
    data: result,
  });
};
