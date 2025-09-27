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

  const accessToken = decodeURIComponent(token);

  console.log('111111111111111111111111111', { token });
  const session = await SessionsCollection.findOne({
    accessToken: accessToken,
  });

  if (!session) {
    throw createHttpError(444, 'Session not found.');
  }

  const now = new Date();
  const isaccessTokenExpired = now > new Date(session.accessTokenValidUntil);
  if (isaccessTokenExpired) {
    throw createHttpError(401, 'access token expired.');
  }

  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    throw createHttpError(401, 'User not found or deleted.');
  }

  req.user = user;

  next();
};
