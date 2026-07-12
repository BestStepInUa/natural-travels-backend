import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Article } from '../models/article.js';

export const getUserPublicProfileWithStories = async (
  userId,
  page,
  perPage,
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const skip = (page - 1) * perPage;

  const [stories, total] = await Promise.all([
    Article.find({ ownerId: userId })
      .populate('ownerId', 'name avatarUrl')
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 }),
    Article.countDocuments({ ownerId: userId }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    user: user,
    stories: {
      data: stories,
      page: page,
      perPage: perPage,
      totalItems: total,
      totalPages: totalPages,
    },
  };
};
export const getAllUsers = async (page, perPage) => {
  const skip = (page - 1) * perPage;

  const [totalUsers, users] = await Promise.all([
    User.countDocuments(),
    User.find().sort({ articlesAmount: -1 }).skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalUsers / perPage);

  return {
    users,
    page,
    perPage,
    totalUsers,
    totalPages,
  };
};
