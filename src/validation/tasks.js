import Joi from 'joi';

export const createTaskSchema = Joi.object({
  name: Joi.string().min(3).max(32).required().messages({
    'string.empty': "Заголовок є обов'язковим",
    'string.max': 'Заголовок має містити не більше 32 символів',
    'string.min': 'Заголовок має містити не менше 3 символів',
    'any.required': "Поле «Заголовок» є обов'язковим",
  }),
  date: Joi.date().iso().required().messages({
    'date.empty': "Поле дати є обов'язковим",
    'any.required': "Поле дати є обов'язковим",
  }),
  isDone: Joi.boolean().required().messages({
    'boolean.empty': "Статус завдання є обов'язковим",
    'any.required': "Статус завдання є обов'язковим",
  }),
});
