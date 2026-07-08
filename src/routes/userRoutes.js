import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getPublicProfile } from '../controllers/userControllers.js';
import { userIdSchema } from '../validations/userValidation.js';
import { paginationSchema } from '../validations/storiesValidation.js';

const userRouter = Router();

userRouter.get(
  '/:id/public',
  celebrate(userIdSchema),
  celebrate(paginationSchema),
  getPublicProfile
);

export default userRouter;