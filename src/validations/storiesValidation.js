import { Joi, Segments } from 'celebrate';
import { objectIdValidator } from '../utils/objectIdValidator.js';

export const storyIdSchema = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().required().custom(objectIdValidator),
  }),
};

export const paginationSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(20).default(10),
  }),
};
