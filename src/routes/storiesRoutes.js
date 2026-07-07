import { Router } from 'express';
import { celebrate } from 'celebrate';

import { getAllStories } from '../controllers/storiesControllers.js';

import {
  saveStory,
  removeSavedStory,
  getMyStories,
  getSavedStories,
  getStoryById,
} from '../controllers/storiesControllers.js';

import {
  getAllStoriesSchema,
  storyIdSchema,
  paginationSchema,
} from '../validations/storiesValidation.js';

const storyRouter = Router();

storyRouter.get('/stories', celebrate(getAllStoriesSchema), getAllStories);

storyRouter.get('/stories/:id', getStoryById);

storyRouter.post(
  '/stories/saved/:storyId',
  celebrate(storyIdSchema),
  saveStory,
);

storyRouter.delete(
  '/stories/saved/:storyId',
  celebrate(storyIdSchema),
  removeSavedStory,
);

storyRouter.get(
  '/stories/my-stories',
  celebrate(paginationSchema),
  getMyStories,
);

storyRouter.get('/stories/saved', celebrate(paginationSchema), getSavedStories);

export default storyRouter;
