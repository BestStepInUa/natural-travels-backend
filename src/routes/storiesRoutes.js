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
  '/stories/saved/:storyId',
  celebrate(storyIdSchema),
  saveStoryController,
);

storyRouter.delete(
  '/stories/saved/:storyId',
  celebrate(storyIdSchema),
  removeSavedStoryController,
);

storyRouter.get(
  'stories/my-stories',
  celebrate(paginationSchema),
  getMyStoriesController,
);

storyRouter.get(
  'stories/saved',
  celebrate(paginationSchema),
  getSavedStoriesController,
);

export default storyRouter;
