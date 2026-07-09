import { model, Schema } from 'mongoose';
import { handleMongooseError, setUpdateOptions } from './hooks.js';
import { AVATAR_URL } from '../constants/user.js';

const userSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    storiesCount: { type: Number, default: 0 },
    avatarUrl: { type: String, trim: true, default: AVATAR_URL },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.post('save', handleMongooseError);
userSchema.pre('findOneAndUpdate', setUpdateOptions);
userSchema.post('findOneAndUpdate', handleMongooseError);

export const User = model('user', userSchema);
