import { Request, Response } from 'express';
import UserService from './user.service';

export default class UserController {
  static signup = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result = await UserService.signup(username, password);
    return res.status(200).json(result);
  };
}
