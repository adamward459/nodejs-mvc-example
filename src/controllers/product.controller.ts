import { Response } from 'express';
import Joi from 'joi';

import helpers from '../helpers';
import { productService } from '../services';
import { AuthedRequest } from '../types/global.d';
import { CreateProductPayload } from '../types/service/product.service.d';

export const productController = {
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
    payload.signedInUser = req.user;

    return productService.create(payload, res);
  },
};
