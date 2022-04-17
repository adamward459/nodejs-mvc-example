import { NextFunction, Response } from 'express';

import constants from '../constants';
import { AuthedRequest } from '../types/global.d';

export default function requiredRoles(...roles: string[]) {
  return function (req: AuthedRequest, res: Response, next: NextFunction) {
    if (roles.includes(req.user.role)) {
      return next();
    } else {
      return res.status(403).json({
        message: constants.ERROR_MESSAGE.FORBIDDEN,
      });
    }
  };
}
