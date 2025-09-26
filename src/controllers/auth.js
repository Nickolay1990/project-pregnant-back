import {
  loginUser,
  logoutUser,
  refreshTokenSession,
  registerUser,
} from '../services/auth.js';
import { setupSession } from '../utils/setupSession.js';

export const registerUserController = async (req, res) => {
  const { user, session } = await registerUser(req.body);

  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const { newSession, user } = await loginUser(req.body);

  setupSession(res, newSession);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: user,
  });
};

export const refreshUserSessionController = async (req, res) => {
  const rawToken = req.cookies.refreshToken;
  const refreshToken = decodeURIComponent(rawToken);
  const session = await refreshTokenSession(refreshToken);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');

  res.status(204).send();
};
