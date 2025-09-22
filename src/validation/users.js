import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(32).messages({
    'string.max': "Поле ім'я має містити не більше 32 символів",
    'string.min': "Поле ім'я має містити не менше 3 символів",
  }),
  email: Joi.string().max(64).email().messages({
    'string.max': 'Email має містити не більше 64 символів',
    'string.email': 'Email має бути валідного значення',
  }),
  gender: Joi.string().valid('boy', 'girl', 'I don`t know yet').messages({
    'string.valid':
      'Значення може бути тільки: boy, girl, або I don`t know yet',
  }),
  dueDate: Joi.string().custom((value, helpers) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(value)) {
      return helpers.error('string.pattern.base', { regex: regex });
    }

    const dueDate = new Date(value);
    const currentDate = new Date();

    const minDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    const maxDate = new Date(
      currentDate.getTime() + 40 * 7 * 24 * 60 * 60 * 1000,
    );

    if (dueDate < minDate || dueDate > maxDate) {
      return helpers.error('any.custom', {
        message:
          'dueDate має бути у форматі YYYY-MM-DD і знаходитися в межах від 1 до 40 тижнів від поточної дати.',
      });
    }

    return value;
  }),
});
