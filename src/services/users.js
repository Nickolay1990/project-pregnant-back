import { UsersCollection } from '../db/models/user.js';

export const updateUser = async (userId, payload) => {
  const userUpdate = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    payload,
    { new: true },
  );

  return userUpdate;
};
