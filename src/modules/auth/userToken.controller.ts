import { NextFunction, Request, Response } from 'express';
import UserTokenService from './userToken.service';

export default class UserTokenController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const result = await UserTokenService.login(username, password);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static getNewAccessTokenWithRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { refreshToken } = req.body;
      const result = await UserTokenService.getNewAccessTokenWithRefreshToken(
        refreshToken,
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const result = await UserTokenService.logout(refreshToken);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static verifyRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { refreshToken } = req.body;
      const result = await UserTokenService.verifyRefreshToken(refreshToken);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
