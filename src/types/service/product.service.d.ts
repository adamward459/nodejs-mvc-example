import mongoose from 'mongoose';

import { Product } from '../model.d';

export type CreateProductPayload = Omit<
  Product,
  'isPublished' | 'createdAt' | 'updatedAt'
>;

export type UpdateProductPayload = Partial<
  Omit<Product, 'createdAt' | 'updatedAt'>
> & {
  productId: string;
};

export type ListProductsPayload = {
  page: number;
  limit: number;
  vendorId?: mongoose.Types.ObjectId;
};
