import mongoose from 'mongoose';

import { Product } from '../types/model.d';

const variantSchema = new mongoose.Schema({
  color: String,
});

const productSchema = new mongoose.Schema<Product>(
  {
    name: String,
    price: Number,
    variants: [variantSchema],
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

productSchema.index({ name: 1 });
productSchema.index({ price: 1 });

export const ProductModel = mongoose.model('Product', productSchema);
