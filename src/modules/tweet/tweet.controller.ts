import { NextFunction, Response } from 'express';
import { IAuthenticatedExpressRequest } from '../../shared/interfaces';
import TweetService from './tweet.service';

export default class TweetController {
  static postTweetByUserAndContent = async (
    req: IAuthenticatedExpressRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { user } = req;
      const { content } = req.body;

      const result = await TweetService.postTweetByUserIdAndContent(
        user!._id,
        content,
      );
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}
