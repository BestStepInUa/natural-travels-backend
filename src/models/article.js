import { Schema, model } from 'mongoose';
import { handleMongooseError, setUpdateOptions } from './hooks.js';

const articleSchema = new Schema(
  {
    img: { type: String, required: true },
    title: { type: String, minlength: 2, maxlength: 40, required: true },
    article: { type: String, minlength: 12, maxlength: 3000, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    rate: { type: Number, default: 1 },
    date: String,
  },
  {
    timestamps: true,
  },
);

articleSchema.post('save', handleMongooseError);
articleSchema.pre('findOneAndUpdate', setUpdateOptions);
articleSchema.post('findOneAndUpdate', handleMongooseError);

export const Article = model('article', articleSchema);
