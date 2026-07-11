import createHttpError from 'http-errors';

import { SavedArticle } from '../models/savedArticle.js';
import { Article } from '../models/article.js';

export const getAllArticles = async (req, res) => {
  const { page = 1, perPage = 9, categoryId, type } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);
  const skip = (pageNumber - 1) * perPageNumber;

  const filter = {};

  if (categoryId) {
    filter.category = categoryId;
  }

  const sort = type === 'popular' ? { rate: -1, _id: 1 } : {};

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

  await SavedArticle.create({
    userId,
    storyId,
  });

  res.status(201).json({
    message: 'Story saved successfully',
    data: story,
  });
};

export const removeSavedArticle = async (req, res) => {
  const { storyId } = req.params;
  const userId = req.user._id;

  const deleted = await SavedArticle.findOneAndDelete({
    userId,
    storyId,
  });

  if (!deleted) {
    throw createHttpError(404, 'Story is not in saved list');
  }

  res.status(200).json({
    message: 'Story removed from saved',
    data: deleted,
  });
};

export const getMyArticle = async (req, res) => {
  const userId = req.user._id;

  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;
  const skip = (page - 1) * perPage;

  const [stories, total] = await Promise.all([
    Article.find({ ownerId: userId })
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 }),

    Article.countDocuments({ ownerId: userId }),
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
    SavedArticle.find({ userId })
      .populate('storyId')
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 }),

    SavedArticle.countDocuments({ userId }),
  ]);

  res.json({
    data: saved.map((item) => item.storyId),
    page,
    perPage,
    totalItems: total,
    totalPages: Math.ceil(total / perPage),
  });
};

export const getRecommendedStories = async (req, res) => {
  const { page = 1, perPage = 9 } = req.query;
  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);
  const skip = (pageNumber - 1) * perPageNumber;

  const [topCategory] = await SavedArticle.aggregate([
    {
      $lookup: {
        from: Article.collection.name,
        localField: 'storyId',
        foreignField: '_id',
        as: 'article',
      },
    },
    { $unwind: '$article' },
    { $group: { _id: '$article.category', totalSaves: { $sum: 1 } } },
    { $sort: { totalSaves: -1, createdAt: -1, _id: 1 } },
    { $limit: 1 },
  ]);

  if (!topCategory) {
    return res.status(200).json({
      page: pageNumber,
      perPage: perPageNumber,
      totalStories: 0,
      totalPages: 1,
      stories: [],
    });
  }

  const pipeline = [
    { $match: { category: topCategory._id } },
    {
      $lookup: {
        from: SavedArticle.collection.name,
        localField: '_id',
        foreignField: 'storyId',
        as: 'saves',
      },
    },
    { $addFields: { savesCount: { $size: '$saves' } } },
    { $sort: { savesCount: -1, createdAt: -1 } },
    { $project: { saves: 0 } },
    {
      $facet: {
        stories: [{ $skip: skip }, { $limit: perPageNumber }],
        totalCount: [{ $count: 'total' }],
      },
    },
  ];

  const [result] = await Article.aggregate(pipeline);
  const stories = result.stories;
  const totalStories = result.totalCount[0]?.total || 0;

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalStories,
    totalPages: Math.ceil(totalStories / perPageNumber) || 1,
    stories,
  });
};
