import { Response } from 'express';
import mongoose from 'mongoose';

import constants from '../constants';
import { ProductModel } from '../models/product.model';
import { Product } from '../types/model.d';
import {
  CreateProductPayload,
  ListProductsPayload,
  UpdateProductPayload,
} from '../types/service/product.service.d';

export const productService = {
  list: async (payload: ListProductsPayload, res: Response) => {
    const { page, limit, vendorId } = payload;

    const conditions: mongoose.FilterQuery<Product> = {};
    vendorId && (conditions.vendor = vendorId);

    const listProductQuery = ProductModel.find(conditions)
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-vendor');
    const countProductQuery = ProductModel.count(conditions);

    const [products, count] = await Promise.all([
      listProductQuery.exec(),
      countProductQuery.exec(),
    ]);

    return res.json({
      data: products,
      total: count,
      page,
      limit,
    });
  },

  create: async (payload: CreateProductPayload, res: Response) => {
    const product = new ProductModel(payload);
    await product.save();

    return res.status(201).json(product.toJSON());
  },

  update: async (payload: UpdateProductPayload, res: Response) => {
    const { productId, vendor, ...others } = payload;

    const product = await ProductModel.findOne({
      _id: productId,
      vendor,
    }).exec();
    if (!product) {
      return res.status(404).json({
        message: constants.ERROR_MESSAGE.ENTITY_NOT_FOUND,
      });
    }

    // Assume we can only update info of an unpublished product
    if (product.isPublished === true) {
      return res.status(400).json({
        message: 'Cannot update information of a published product',
      });
    }

    Object.assign(product, others);
    await product.save();

    return res.json(product.toJSON());
  },
};
