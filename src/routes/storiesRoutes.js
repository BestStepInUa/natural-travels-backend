import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';

import {
  getAllStories,
  saveStory,
  removeSavedStory,
  getMyStories,
  getSavedStories,
  getStoryById,
  getRecommendedStories,
} from '../controllers/storiesControllers.js';

import {
  getAllStoriesSchema,
  storyIdSchema,
  paginationSchema,
} from '../validations/storiesValidation.js';

const storyRouter = Router();

storyRouter.get('/stories', celebrate(getAllStoriesSchema), getAllStories);

storyRouter.get(
  '/stories/recommended',
  celebrate(paginationSchema),
  getRecommendedStories,
);

storyRouter.get(
  '/stories/my-stories',
  authenticate,
  celebrate(paginationSchema),
  getMyStories,
);

storyRouter.get(
  '/stories/saved',
  authenticate,
  celebrate(paginationSchema),
  getSavedStories,
);

storyRouter.post(
  '/stories/saved/:storyId',
  authenticate,
  celebrate(storyIdSchema),
  saveStory,
);

storyRouter.delete(
  '/stories/saved/:storyId',
  authenticate,
  celebrate(storyIdSchema),
  removeSavedStory,
);

storyRouter.get('/stories/:id', getStoryById);

export default storyRouter;