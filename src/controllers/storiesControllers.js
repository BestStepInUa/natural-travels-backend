import createHttpError from 'http-errors';

import { SavedStory } from '../models/savedStory.js';
import { Article } from '../models/article.js';

export const getAllArticles = async (req, res) => {
  const { page = 1, perPage = 9, category, type } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);
  const skip = (pageNumber - 1) * perPageNumber;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  const sort = type === 'popular' ? { rate: -1 } : {};

  const [totalStories, stories] = await Promise.all([
    Article.countDocuments(filter),
    Article.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(perPageNumber)
      .populate('category')
      .populate('ownerId')
      .lean(),
  ]);

  const totalPages = Math.ceil(totalStories / perPageNumber) || 1;

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalStories,
    totalPages,
    stories,
  });
};

export const getArticleById = async (req, res) => {
  const { id } = req.params;
  const result = await Article.findById(id)
  .populate('category')
  .populate('ownerId')
  .lean();

  if (!result) {
    return res.status(404).json({ message: 'Story not found' });
  }

  res.json(result);
};

export const saveArticle = async (req, res) => {
  const { storyId } = req.params;
  const userId = req.user._id;

  const story = await Article.findById(storyId);

  if (!story) {
    throw createHttpError(404, 'Story not found');
  }

  await SavedStory.create({
    userId,
    storyId,
  });

  res.status(201).json({
    message: 'Story saved successfully',
  });
};

export const removeSavedArticle = async (req, res) => {
  const { storyId } = req.params;
  const userId = req.user._id;

  const deleted = await SavedStory.findOneAndDelete({
    userId,
    storyId,
  });

  if (!deleted) {
    throw createHttpError(404, 'Story is not in saved list');
  }

  res.status(200).json({
    message: 'Story removed from saved',
  });
};

export const getMyArticle = async (req, res) => {
  const userId = req.user._id;

  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;
  const skip = (page - 1) * perPage;

  const [stories, total] = await Promise.all([
    Article.find({ owner: userId })
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 }),

    Article.countDocuments({ owner: userId }),
  ]);

  res.json({
    data: stories,
    page,
    perPage,
    totalItems: total,
    totalPages: Math.ceil(total / perPage),
  });
};

export const getSavedArticles = async (req, res) => {
  const userId = req.user._id;

  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;
  const skip = (page - 1) * perPage;

  const [saved, total] = await Promise.all([
    SavedStory.find({ userId })
      .populate('storyId')
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 }),

    SavedStory.countDocuments({ userId }),
  ]);

  res.json({
    data: saved.map((item) => item.storyId),
    page,
    perPage,
    totalItems: total,
    totalPages: Math.ceil(total / perPage),
  });
};
