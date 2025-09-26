import {
  loginOrSignupWithGoogle,
  loginUser,
  logoutUser,
  refreshTokenSession,
  registerUser,
} from '../services/auth.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
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
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshTokenSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
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

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();

  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const googleCallbackController = async (req, res, next) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('Missing code');
  }

  const session = await loginOrSignupWithGoogle(code);

  setupSession(res, session);

  res.redirect(`${getEnvVar('GOOGLE_REDIRECT_UI')}`);
};
