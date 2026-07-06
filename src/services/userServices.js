import createHttpError from "http-errors";
import { User } from '../models/user.js';
import { Story } from '../models/story.js';

export const getUserPublicProfileWithStories = async (userId, page, perPage) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const skip = (page - 1) * perPage;

  const stories = await Story.find({ owner: userId })
    .skip(skip)
    .limit(perPage)
    .sort({ createdAt: -1 });

  const total = user.storiesCount || 0;
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