import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getPublicProfile, getUsers } from '../controllers/userControllers.js';
import {
  userIdSchema,
  updateUserSchema,
} from '../validations/userValidation.js';
import { paginationSchema } from '../validations/storiesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import upload from '../middleware/multer.js';
import { updateAvatarController } from '../controllers/updateAvatarController.js';
import { updateUserController } from '../controllers/updateUserController.js';

const userRouter = Router();

userRouter.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateAvatarController,
);

userRouter.patch(
  '/users/me',
  authenticate,
  celebrate(updateUserSchema),
  updateUserController,
);

userRouter.get(
  '/users/:id/public',
  celebrate(userIdSchema),
  celebrate(paginationSchema),
  getPublicProfile,
);

userRouter.get('/users', celebrate(paginationSchema), getUsers);

export default userRouter;
