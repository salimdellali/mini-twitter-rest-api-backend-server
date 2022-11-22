import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpException } from '../expections';

export const validatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const messageObject = {
    success: false,
    message: errors.array(),
  };

  if (!errors.isEmpty()) throw new HttpException(400, messageObject);

  next();
};
