import { Schema, model } from 'mongoose';
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  articlesAmount: {
    type: Number,
    default: 0,
  },
  savedArticles: {
    type: [Schema.Types.ObjectId],
    ref: 'Article',
    default: [],
  },
});
export const User = model('User', userSchema);
