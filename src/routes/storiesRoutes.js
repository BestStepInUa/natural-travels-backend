import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  saveStoryController,
  removeSavedStoryController,
  getMyStoriesController,
  getSavedStoriesController,
  getStoryById,
} from '../controllers/storiesController.js';

import {
  storyIdSchema,
  paginationSchema,
} from '../validations/storiesValidation.js';

const storyRouter = Router();

storyRouter.get('/stories/:id', getStoryById);

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
