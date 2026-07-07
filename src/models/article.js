import { Schema, model } from 'mongoose';
const articleSchema = new Schema(
  {
    img: { type: String, required: true },
    title: { type: String, minlength: 2, maxlength: 40, required: true },
    article: { type: String, minlength: 12, maxlength: 3000, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    rate: Number,
    date: String,
  },
  {
    timestamps: true,
    collection: 'articles',
  },
);
export const Article = model('article', articleSchema);
