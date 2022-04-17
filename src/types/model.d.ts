import mongoose from 'mongoose';

export type User = {
  objectId: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  carts: Array<{
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }>;
};

export type Product = {
  name: string;
  price: string;
  variants: Array<{ color: string }>;
  isPublished: boolean;
  quantity: number;
  vendor: User | mongoose.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
};
