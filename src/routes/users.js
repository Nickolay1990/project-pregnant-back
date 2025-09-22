import { Router } from 'express';
import {
  getCurrentUserController,
  updateUserAvatarController,
  updateUserController,
} from '../controllers/users.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/users.js';
import { authenticate } from '../middlewares/authenticate.js';

const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.get('/currentUser', getCurrentUserController);
usersRouter.patch(
  '/updateUserPhoto/:userId',
  isValidId,
  upload.single('photo'),
  updateUserAvatarController,
);
usersRouter.patch(
  '/updateUserData/:userId',
  isValidId,
  validateBody(updateUserSchema),
  updateUserController,
);

export default usersRouter;
