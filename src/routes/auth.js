import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  registerUserController,
);
authRouter.post('/login', validateBody(loginUserSchema), loginUserController);
authRouter.post('/refresh', refreshUserSessionController);
authRouter.post('/logout', logoutUserController);

export default authRouter;
