import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../expections';

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const messageObject = {
    success: false,
    message: error.status === 500 ? 'Internal server error' : error.message,
  };
  res.status(error.status).json(messageObject);
};
