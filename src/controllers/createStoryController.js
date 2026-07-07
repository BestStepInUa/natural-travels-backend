import createHttpError from 'http-errors';
import { Article } from '../models/article.js';
import { saveStoryImageToCloudinary } from '../utils/saveStoryImageToCloudinary.js';

export const createStoryController = async (req, res, next) => {
  try {
    const { title, article, category } = req.body;
    const userId = req.user._id;

    if (!req.file) {
      throw createHttpError(400, 'Завантаження зображення є обов’язковим');
    }

    let uploadResult;
    try {
      uploadResult = await saveStoryImageToCloudinary(req.file.buffer);
    } catch {
      throw createHttpError(
        500,
        'Помилка при завантаженні зображення на Cloudinary',
      );
    }

    const story = await Article.create({
      title,
      description: article,
      image: uploadResult.secure_url,
      owner: userId,
      category,
    });

    res.status(201).json({
      id: story._id,
      message: 'Story created successfully',
    });
  } catch (error) {
    next(error);
  }
};
