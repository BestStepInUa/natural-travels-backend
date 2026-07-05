import { Schema, model } from 'mongoose';

import { handleMongooseError, setUpdateOptions } from './hooks.js';

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

storySchema.post('save', handleMongooseError);
storySchema.pre('findOneAndUpdate', setUpdateOptions);
storySchema.post('findOneAndUpdate', handleMongooseError);

export const Story = model('story', storySchema);
