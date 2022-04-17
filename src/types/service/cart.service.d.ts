import mongoose from 'mongoose';

export type UpdateCartPayload = {
  userId: mongoose.Types.ObjectId;
  carts: Array<{ productId: string; quantity: number }>;
};
