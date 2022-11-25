import { NextFunction, Request, Response } from 'express';
import { IAuthenticatedExpressRequest } from '../../shared/interfaces';
import TweetService from './tweet.service';

export default class TweetController {
  static getFeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await TweetService.getFeed();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static getTweetsByUser = async (
    req: IAuthenticatedExpressRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { user } = req;
      const result = await TweetService.getTweetsByUser(user!);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static postTweetByContentAndUser = async (
    req: IAuthenticatedExpressRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { user } = req;
      const { content } = req.body;

      const result = await TweetService.postTweetByContentAndUser(
        user!,
        content,
      );
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  static updateTweetContentByIdAndUser = async (
    req: IAuthenticatedExpressRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { tweetId, content } = req.body;
      const { user } = req;

      const result = await TweetService.updateTweetContentByIdAndUser(
        user!,
        tweetId,
        content,
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static deleteTweetByIdAndUser = async (
    req: IAuthenticatedExpressRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { tweetId } = req.body;
      const { user } = req;

      const result = await TweetService.deleteTweetByIdAndUser(user!, tweetId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
