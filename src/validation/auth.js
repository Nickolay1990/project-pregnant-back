import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(32).required(),
  email: Joi.string().max(64).email().required(),
  password: Joi.string().min(8).max(128).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().max(64).email().required(),
  password: Joi.string().min(8).max(128).required(),
});
