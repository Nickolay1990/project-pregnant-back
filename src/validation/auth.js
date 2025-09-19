import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(32).required(),
  email: Joi.string().max(64).email().required(),
  password: Joi.string().min(8).max(128).required(),
  gender: Joi.string().valid('boy', 'girl', 'I don`t know yet').required(),
  dueDate: Joi.string()
    .required()
    .custom((value, helpers) => {
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
            'dueDate must be in YYYY-MM-DD format and be between 1 and 40 weeks from the current date.',
        });
      }

      return value;
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().max(64).email().required(),
  password: Joi.string().min(8).max(128).required(),
});
