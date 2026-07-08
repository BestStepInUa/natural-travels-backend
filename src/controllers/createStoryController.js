import createHttpError from 'http-errors';
import { Category } from '../models/category.js';
import { Article } from '../models/article.js';
import { saveStoryImageToCloudinary } from '../utils/saveStoryImageToCloudinary.js';

export const createStoryController = async (req, res, next) => {
  try {
    const { title, article, category } = req.body;
    const userId = req.user._id;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      throw createHttpError(400, 'Категорію не знайдено');
    }

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
      article,
      img: uploadResult.secure_url,
      ownerId: userId,
      category,
    });

    res.status(201).json({
      id: story._id,
      message: 'Story created successfully',
      story,
    });
  } catch (error) {
    next(error);
  }
};
