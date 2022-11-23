import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';

export default class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const result = await AuthService.login(username, password);
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
      const result = await AuthService.getNewAccessTokenWithRefreshToken(
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
      const result = await AuthService.logout(refreshToken);
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
      const result = await AuthService.verifyRefreshToken(refreshToken);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
