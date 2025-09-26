import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  getGoogleOAuthUrlController,
  googleCallbackController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  registerUserController,
);
authRouter.post('/login', validateBody(loginUserSchema), loginUserController);
authRouter.get('/get-oauth-url', getGoogleOAuthUrlController);
authRouter.get('/confirm-google-auth', googleCallbackController);
authRouter.post('/refresh', authenticate, refreshUserSessionController);
authRouter.post('/logout', authenticate, logoutUserController);

export default authRouter;
