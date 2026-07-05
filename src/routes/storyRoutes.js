import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import {
  saveStoryController,
  removeSavedStoryController,
  getMyStoriesController,
  getSavedStoriesController,
} from '../controllers/storiesController.js';

import {
  storyIdSchema,
  paginationSchema,
} from '../validations/storiesValidation.js';

const storyRouter = Router();

storyRouter.post(
  '/:storyId/save',
  celebrate(storyIdSchema),
  saveStoryController,
);

storyRouter.delete(
  '/:storyId/save',
  celebrate(storyIdSchema),
  removeSavedStoryController,
);

storyRouter.get(
  '/my-stories',
  celebrate(paginationSchema),
  getMyStoriesController,
);

storyRouter.get(
  '/saved',
  celebrate(paginationSchema),
  getSavedStoriesController,
);

export default storyRouter;
