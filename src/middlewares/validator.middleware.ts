import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpException } from '../expections/HttpException.exception';

export const validatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    throw new HttpException(
      400,
      JSON.stringify({
        success: false,
        message: errors.array(),
      }),
    );

  next();
};
