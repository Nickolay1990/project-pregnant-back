import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(32).required().messages({
    'string.empty': "Поле ім'я є обов'язковим",
    'string.max': "Поле ім'я має містити не більше 32 символів",
    'string.min': "Поле ім'я має містити не менше 3 символів",
    'any.required': "Поле ім'я є обов'язковим",
  }),
  email: Joi.string().max(64).email().required().messages({
    'string.empty': "Email є обов'язковим",
    'string.max': 'Email має містити не більше 64 символів',
    'string.email': 'Email має бути валідного значення',
    'any.required': "Email є обов'язковим",
  }),
  password: Joi.string().min(8).max(128).required().messages({
    'string.empty': "Пароль є обов'язковим",
    'string.max': 'Пароль має містити не більше 128 символів',
    'string.min': "Поле ім'я має містити не менше 8 символів",
    'any.required': "Пароль є обов'язковим",
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().max(64).email().required().messages({
    'string.empty': "Email є обов'язковим",
    'string.max': 'Email має містити не більше 64 символів',
    'string.email': 'Email має бути валідного значення',
    'any.required': "Email є обов'язковим",
  }),
  password: Joi.string().min(8).max(128).required().messages({
    'string.empty': "Пароль є обов'язковим",
    'string.max': 'Пароль має містити не більше 128 символів',
    'string.min': "Поле ім'я має містити не менше 8 символів",
    'any.required': "Пароль є обов'язковим",
  }),
});
