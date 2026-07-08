import { Joi, Segments } from 'celebrate';
import { objectIdValidator } from '../utils/objectIdValidator.js';

export const userIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required().custom(objectIdValidator),
  }),
};