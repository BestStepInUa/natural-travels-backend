import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  getCurrentUser,
} from '../controllers/authControllers.js';
import { authenticate } from '../middleware/authenticate.js';

export const authRouter = Router();

authRouter.post(
  '/auth/register',
  celebrate(registerUserSchema, { abortEarly: false }),
  registerUser,
);

authRouter.post(
  '/auth/login',
  celebrate(loginUserSchema, { abortEarly: false }),
  loginUser,
);
authRouter.post('/auth/refresh', authenticate, refreshUserSession);
authRouter.post('/auth/logout', authenticate, logoutUser);
authRouter.get("/auth/me", getCurrentUser);
