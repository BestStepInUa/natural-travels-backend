import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getPublicProfile, getUsers } from '../controllers/userControllers.js';
import { userIdSchema } from '../validations/userValidation.js';
import { paginationSchema } from '../validations/storiesValidation.js';

const userRouter = Router();

userRouter.get(
  '/users/:id/public',
  celebrate(userIdSchema),
  celebrate(paginationSchema),
  getPublicProfile,
);

userRouter.get('/users', celebrate(paginationSchema), getUsers);

export default userRouter;
