import { Request, Response } from 'express';
import Joi from 'joi';

import constants from '../constants';
import helpers from '../helpers';
import { authService } from '../services';
import { SignUpPayload, SignInPayload } from '../types/service/auth.service.d';

const sharedSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().trim().min(7).required(),
  role: Joi.string()
    .valid(...Object.values(constants.USER_ROLE))
    .required(),
});

export const authController = {
  signUp: (req: Request, res: Response) => {
    const schema = sharedSchema;

    const payload = helpers.validatePayloadAndThrowIfNotValid<SignUpPayload>(
      schema,
      req.body
    );

    return authService.signUp(payload, res);
  },

  signIn: (req: Request, res: Response) => {
    const schema = sharedSchema;

    const payload = helpers.validatePayloadAndThrowIfNotValid<SignInPayload>(
      schema,
      req.body
    );
    return authService.signIn(payload, res);
  },
};
