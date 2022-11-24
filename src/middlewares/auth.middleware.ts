import { NextFunction, Response } from 'express';
import jwt, { JwtPayload, JsonWebTokenError } from 'jsonwebtoken';
import { HttpException } from '../expections';
import { IAuthenticatedExpressRequest } from '../shared/interfaces';

export const authMiddleware = (
  req: IAuthenticatedExpressRequest,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.header('Authorization');

  // check if access token present
  if (!accessToken) throw new HttpException(401, 'No token, access denied');

  // verify access token
  try {
    const accesTokenPayload = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
    );
    req.user = accesTokenPayload as JwtPayload;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError)
      throw new HttpException(401, 'Invalid token, access denied');
    throw new HttpException(400, 'Bad request');
  }
};
