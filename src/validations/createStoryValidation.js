import { Joi, Segments } from 'celebrate';

export const createStorySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(2).max(40).required().messages({
      'string.empty': 'Заголовок історії є обов’язковим',
      'string.min': 'Заголовок має містити щонайменше 2 символи',
      'string.max': 'Заголовок має містити не більше 40 символів',
      'any.required': 'Заголовок історії є обов’язковим',
    }),
    article: Joi.string().trim().min(12).max(3000).required().messages({
      'string.empty': 'Текст історії є обов’язковим',
      'string.min': 'Текст історії має містити щонайменше 12 символів',
      'string.max': 'Текст історії має містити не більше 3000 символів',
      'any.required': 'Текст історії є обов’язковим',
    }),
    category: Joi.string()
      .trim()
      .pattern(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      )
      .required()
      .messages({
        'string.empty': 'Вибір категорії є обов’язковим',
        'string.pattern.base':
          'Категорія має містити валідний унікальний ідентифікатор (ObjectId)',
        'any.required': 'Вибір категорії є обов’язковим',
      }),
  }),
};
