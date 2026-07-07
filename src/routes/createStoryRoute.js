import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import upload from '../middleware/multer.js';
import { createStoryController } from '../controllers/createStoryController.js';
import { createStorySchema } from '../validations/createStoryValidation.js';

const router = Router();

router.post(
  '/api/stories',
  authenticate,
  upload.single('img'),
  celebrate(createStorySchema),
  createStoryController,
);

export default router;
