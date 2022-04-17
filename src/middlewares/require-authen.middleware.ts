import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import constants from '../constants';

export default function requireAuthen(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authenHeader = req.headers.authorization;
  if (!authenHeader) {
    return res.status(401).json({
      message: constants.ERROR_MESSAGE.UN_AUTHORIZED,
    });
  }
  const [, jwtToken] = authenHeader.split('Bearer ');
  if (!jwtToken) {
    return res.status(401).json({
      message: constants.ERROR_MESSAGE.UN_AUTHORIZED,
    });
  }

  try {
    const { objectId, email, role } = jwt.verify(
      jwtToken,
      constants.TOKEN_SETTING.SECRET
    ) as jwt.JwtPayload;

    req['user'] = {
      objectId: new mongoose.Types.ObjectId(objectId),
      email,
      role,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      message: constants.ERROR_MESSAGE.UN_AUTHORIZED,
    });
  }
}
