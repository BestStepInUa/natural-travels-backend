import { Joi, Segments } from 'celebrate';
import { objectIdValidator } from '../utils/objectIdValidator.js';

export const userIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required().custom(objectIdValidator),
  }),
};

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(50).optional(),
  }),
};
