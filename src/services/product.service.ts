import { Response } from 'express';

import { ProductModel } from '../models/product.model';
import { UserModel } from '../models/user.model';
import { CreateProductPayload } from '../types/service/product.service.d';

export const productService = {
  create: async (payload: CreateProductPayload, res: Response) => {
    const { signedInUser, ...others } = payload;

    const product = new ProductModel(others);
    product.vendor = new UserModel({ objectId: signedInUser.objectId });
    await product.save();

    return res.json(product.toJSON());
  },
};
