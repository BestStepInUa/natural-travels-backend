import { Schema, model } from 'mongoose';
const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
});
export const Category = model('Category', categorySchema);
