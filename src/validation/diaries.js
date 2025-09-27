import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

const objectId = (value, helpers) =>
  isValidObjectId(value) ? value : helpers.error('any.invalid');

export const createDiarySchema = Joi.object({
  title: Joi.string().trim().max(30).required().messages({
    'string.empty': "Заголовок є обов'язковим",
    'string.max': 'Заголовок має містити не більше 30 символів',
    'any.required': "Поле «Заголовок» є обов'язковим",
  }),
  descr: Joi.string().allow('').max(5000).messages({
    'string.max': 'Опис занадто довгий (макс. 5000 символів)',
  }),
  emotions: Joi.array()
    .items(Joi.string().custom(objectId, 'mongo id'))
    .min(1)
    .required()
    .messages({
      'any.required': 'Необхідно передати хоча б одну емоцію',
      'array.min': 'Потрібна щонайменше 1 емоція',
      'any.invalid': 'Невірний формат ідентифікатора емоції',
    }),
});

export const updateDiarySchema = Joi.object({
  title: Joi.string().trim().max(30).messages({
    'string.max': 'Заголовок має містити не більше 30 символів',
  }),
  descr: Joi.string().allow('').max(5000).messages({
    'string.max': 'Опис занадто довгий (макс. 5000 символів)',
  }),
  emotions: Joi.array()
    .items(Joi.string().custom(objectId, 'mongo id'))
    .min(1)
    .messages({
      'array.min': 'Потрібна щонайменше 1 емоція',
      'any.invalid': 'Невірний формат ідентифікатора емоції',
    }),
  userId: Joi.string().custom(objectId, 'mongo id').required().messages({
    'any.required': 'Потрібен userId',
    'any.invalid': 'Невірний формат userId',
  }),
});
