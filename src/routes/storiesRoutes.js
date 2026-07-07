import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  saveStory,
  removeSavedStory,
  getMyStories,
  getSavedStories,
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
