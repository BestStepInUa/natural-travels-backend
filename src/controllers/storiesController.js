import createHttpError from 'http-errors';

import { SavedStory } from '../models/savedStory.js';
import { Story } from '../models/story.js';

export const getStoryById = async (req, res) => {
  const { id } = req.params;
  const result = await Story.findById(id);

  if (!result) {
    return res.status(404).json({ message: 'Story not found' });
  }

  res.json(result);
};

export const saveStory = async (req, res) => {
  const { storyId } = req.params;
  const userId = req.user._id;

  const story = await Story.findById(storyId);

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

export const removeSavedStory = async (req, res) => {
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

export const getMyStories = async (req, res) => {
  const userId = req.user._id;

  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;
  const skip = (page - 1) * perPage;

  const [stories, total] = await Promise.all([
    Story.find({ owner: userId })
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 }),

    Story.countDocuments({ owner: userId }),
  ]);

  res.json({
    data: stories,
    page,
    perPage,
    totalItems: total,
    totalPages: Math.ceil(total / perPage),
  });
};

export const getSavedStories = async (req, res) => {
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
