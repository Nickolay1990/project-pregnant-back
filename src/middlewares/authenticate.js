import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw createHttpError(401, 'Authorization header is missing.');
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    throw createHttpError(
      401,
      'Invalid authorization format. Must be "Bearer <token>".',
    );
  }

  const session = await SessionsCollection.findOne({ accessToken: token });
  if (!session) {
    throw createHttpError(401, 'Session not found.');
  }

  const now = new Date();
  const isAccessTokenExpired = now > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired.');
  }

  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    throw createHttpError(401, 'User not found or deleted.');
  }

  req.user = user;
  next();
};
