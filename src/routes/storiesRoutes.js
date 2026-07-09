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
  celebrate(getAllArticlesSchema),
  getMyArticle,
);

storyRouter.get(
  '/stories/saved-stories',
  authenticate,
  celebrate(getAllArticlesSchema),
  getSavedArticles,
);

storyRouter.post(
  '/stories/save/:storyId',
  authenticate,
  celebrate(articleIdSchema),
  saveArticle,
);

storyRouter.delete(
  '/stories/save/:storyId',
  authenticate,
  celebrate(articleIdSchema),
  removeSavedArticle,
);

storyRouter.get('/stories/:id', getArticleById);

export default storyRouter;
