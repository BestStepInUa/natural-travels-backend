import { Schema, model } from 'mongoose';
const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    avatar: { type: String, default: '' },
    articlesAmount: { type: Number, default: 0 },
    savedArticles: {
      type: [Schema.Types.ObjectId],
      ref: 'Article',
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);
export const User = model('User', userSchema);
