import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';

import {
  getAllArticles,
  saveArticle,
  removeSavedArticle,
  getMyArticle,
  getSavedArticles,
  getArticleById,
  getRecommendedStories,
} from '../controllers/storiesControllers.js';

import {
  getAllArticlesSchema,
  articleIdSchema,
  paginationSchema,
} from '../validations/storiesValidation.js';

const storyRouter = Router();

storyRouter.get('/stories', celebrate(getAllArticlesSchema), getAllArticles);

storyRouter.get(
  '/stories/recommended',
  celebrate(paginationSchema),
  getRecommendedStories,
);

storyRouter.get(
  '/stories/my-stories',
  authenticate,
  celebrate(paginationSchema),
  getMyArticle,
);

storyRouter.get(
  '/stories/saved',
  authenticate,
  celebrate(paginationSchema),
  getSavedArticles,
);

storyRouter.post(
  '/stories/saved/:storyId',
  authenticate,
  celebrate(articleIdSchema),
  saveArticle,
);

storyRouter.delete(
  '/stories/saved/:storyId',
  authenticate,
  celebrate(articleIdSchema),
  removeSavedArticle,
);

storyRouter.get('/stories/:id', getArticleById);

export default storyRouter;