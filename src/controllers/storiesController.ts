import { Article } from '../models/article.ts';
import { User } from '../models/users.js';
import { Category } from '../models/categories.js';
import type { Request, Response } from 'express';

export const getStories = async (req: Request, res: Response) => {
  const { page = 1, perPage = 9, category, type } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);
  const skip = (pageNumber - 1) * perPageNumber;

  const filter: any = {};

  if (category) {
    filter.category = category;
  }

  const sort: Record<string, 1 | -1> =
    type === 'popular' ? { rate: -1 } : { date: -1 };

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
