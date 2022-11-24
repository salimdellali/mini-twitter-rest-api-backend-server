import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IAuthenticatedExpressRequest extends Request {
  user?: JwtPayload;
}
