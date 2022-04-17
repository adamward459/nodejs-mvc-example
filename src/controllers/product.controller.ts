import { Response } from 'express';
import Joi from 'joi';
import mongoose from 'mongoose';

import constants from '../constants';
import helpers from '../helpers';
import { productService } from '../services';
import { AuthedRequest } from '../types/global.d';
import {
  CreateProductPayload,
  ListProductsPayload,
  UpdateProductPayload,
} from '../types/service/product.service.d';

export const productController = {
  list: (req: AuthedRequest, res: Response) => {
    const schema = Joi.object({
      page: Joi.number()
        .default(constants.PAGINATION.PAGE)
        .min(constants.PAGINATION.MIN_PAGE)
        .optional(),
      limit: Joi.number()
        .default(constants.PAGINATION.LIMIT)
        .min(constants.PAGINATION.MIN_LIMIT)
        .optional(),
      vendorId: Joi.string().trim().optional(),
    });

    const payload =
      helpers.validatePayloadAndThrowIfNotValid<ListProductsPayload>(
        schema,
        req.body
      );
    req.user.role === constants.USER_ROLE.VENDOR &&
      (payload.vendorId = req.user.objectId);

    return productService.list(payload, res);
  },

  create: (req: AuthedRequest, res: Response) => {
    const schema = Joi.object({
      name: Joi.string().trim().min(5).required(),
      price: Joi.number().min(100).required(),
      variants: Joi.array()
        .items(
          Joi.object({
            color: Joi.string().trim().required(),
          })
        )
        .min(1)
        .required(),
    });

    const payload =
      helpers.validatePayloadAndThrowIfNotValid<CreateProductPayload>(
        schema,
        req.body
      );
    payload.vendor = req.user.objectId;

    return productService.create(payload, res);
  },

  update: (req: AuthedRequest, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params['productId'])) {
      return res.status(400).json({
        message: 'Invalid productId',
      });
    }

    const schema = Joi.object({
      name: Joi.string().trim().min(5).optional(),
      price: Joi.number().min(100).optional(),
      variants: Joi.array()
        .items(
          Joi.object({
            color: Joi.string().trim().required(),
          })
        )
        .min(1)
        .optional(),
      isPublished: Joi.boolean().optional(),
    });

    const payload =
      helpers.validatePayloadAndThrowIfNotValid<UpdateProductPayload>(
        schema,
        req.body
      );
    payload.productId = req.params['productId'];
    payload.vendor = req.user.objectId;

    return productService.update(payload, res);
  },
};
