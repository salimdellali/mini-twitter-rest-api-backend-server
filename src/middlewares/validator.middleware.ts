import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpException } from '../expections';
import { IAuthenticatedExpressRequest } from '../shared/interfaces';

export const validatorMiddleware = (
  req: Request | IAuthenticatedExpressRequest,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new HttpException(400, errors.array());

  next();
};
