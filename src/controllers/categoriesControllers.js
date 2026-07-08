import { Category } from '../models/category.js';

export const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ category: 1 }).lean();
  res.status(200).json(categories);
};
