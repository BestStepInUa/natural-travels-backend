import { Schema, model } from 'mongoose';

import { handleMongooseError, setUpdateOptions } from './hooks.js';

const savedStorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    storyId: {
      type: Schema.Types.ObjectId,
      ref: 'story',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

savedStorySchema.index({ userId: 1, storyId: 1 }, { unique: true });

savedStorySchema.post('save', handleMongooseError);
savedStorySchema.pre('findOneAndUpdate', setUpdateOptions);
savedStorySchema.post('findOneAndUpdate', handleMongooseError);

export const SavedStory = model('savedStory', savedStorySchema);
