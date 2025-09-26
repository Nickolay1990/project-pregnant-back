import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionsCollection } from '../db/models/session.js';
import { createSession } from '../utils/createSession.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });

  const newSessionData = createSession();

  const newSession = await SessionsCollection.create({
    userId: newUser._id,
    ...newSessionData,
  });

  return { user: newUser, session: newSession };
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const newSessionData = createSession();

  const newSession = await SessionsCollection.create({
    userId: user._id,
    ...newSessionData,
  });

  return {
    user,
    newSession,
  };
};

export const refreshTokenSession = async (refreshToken) => {
  const session = await SessionsCollection.findOne({
    refreshToken,
  });

  console.log('4444444444444444444444', { session });

  if (!session) {
    throw createHttpError(404, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSessionData = createSession();

  await SessionsCollection.deleteOne({ refreshToken });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSessionData,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
