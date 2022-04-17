import mongoose from 'mongoose';

import { Product } from '../types/model.d';

const productSchema = new mongoose.Schema<Product>(
  {
    name: String,
    price: Number,
    isPublished: { type: Boolean, default: false },
    quantity: { type: Number, default: 0 },
    variants: [],
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

productSchema.index({ name: 1 });
productSchema.index({ price: 1 });

export const ProductModel = mongoose.model<Product>('Product', productSchema);
