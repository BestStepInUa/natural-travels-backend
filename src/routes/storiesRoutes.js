import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllArticles,
  saveArticle,
  removeSavedArticle,
  getMyArticle,
  getSavedArticles,
  getArticleById,
} from '../controllers/storiesControllers.js';

import {
  getAllArticlesSchema,
  articleIdSchema,
  paginationSchema,
} from '../validations/storiesValidation.js';

const storyRouter = Router();

storyRouter.get('/stories', celebrate(getAllArticlesSchema), getAllArticles);

storyRouter.get('/stories/:id', getArticleById);

storyRouter.post(
  '/stories/saved/:storyId',
  celebrate(articleIdSchema),
  saveArticle,
);

storyRouter.delete(
  '/stories/saved/:storyId',
  celebrate(articleIdSchema),
  removeSavedArticle,
);

storyRouter.get(
  '/stories/my-stories',
  celebrate(paginationSchema),
  getMyArticle,
);

storyRouter.get(
  '/stories/saved',
  celebrate(paginationSchema),
  getSavedArticles,
);

export default storyRouter;
