import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../expections';

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errorStatus;
  let errorMessage;
  switch (error.status) {
    case 500:
    case undefined:
      errorStatus = 500;
      errorMessage = 'Internal server error';
      console.error('[SYS_ERROR]\t: ' + errorMessage);
      break;
    default:
      errorStatus = error.status;
      errorMessage = error.message;
      break;
  }
  const messageObject = {
    success: false,
    message: errorMessage,
  };

  res.status(errorStatus).json(messageObject);
};
