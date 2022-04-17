import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';

export default function handleAppError(
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      message: error.message,
      fields: error.details[0].path,
    });
  }

  console.log(error);
  return next();
}
