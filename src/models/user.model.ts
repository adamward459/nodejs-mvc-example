import mongoose from 'mongoose';

import { User } from '../types/model.d';

const userSchema = new mongoose.Schema<User>(
  {
    email: String,
    password: String,
    role: String,
    carts: {
      type: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1, role: -1 });

export const UserModel = mongoose.model<User>('User', userSchema);
