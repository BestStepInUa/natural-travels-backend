import createHttpError from 'http-errors';
import { User } from '../models/user.js';

export const updateUserController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;

    if (!name) {
      throw createHttpError(400, 'Немає даних для оновлення');
    }

    const user = await User.findByIdAndUpdate(userId, { name }, { new: true });

    if (!user) {
      throw createHttpError(404, 'Користувача не знайдено');
    }

    res.status(200).json({
      message: 'User updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};
