import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveAvatarToCloudinary } from '../utils/saveAvatarToCloudinary.js';

export const updateAvatarController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      throw createHttpError(400, 'Завантаження зображення є обов’язковим');
    }

    let uploadResult;
    try {
      uploadResult = await saveAvatarToCloudinary(req.file.buffer, userId);
    } catch {
      throw createHttpError(
        500,
        'Помилка при завантаженні зображення на Cloudinary',
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { avatarUrl: uploadResult.secure_url },
      { new: true },
    );

    if (!user) {
      throw createHttpError(404, 'Користувача не знайдено');
    }

    res.status(200).json({
      message: 'Avatar updated successfully',
      avatarUrl: user.avatarUrl,
    });
  } catch (error) {
    next(error);
  }
};
