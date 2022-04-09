import mongoose from 'mongoose';

import { User } from '../types/model.d';

const userSchema = new mongoose.Schema<User>(
  {
    email: String,
    password: String,
    role: String,
  },
  { timestamps: true }
);

userSchema.index({ email: 1, role: -1 });

export const UserModel = mongoose.model('User', userSchema);
