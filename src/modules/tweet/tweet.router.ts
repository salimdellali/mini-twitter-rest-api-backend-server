import { Router } from 'express';
import { validatorMiddleware } from '../../middlewares';
import { tweetContentValidation } from '../../validations/tweetContent.validation';
import TweetController from './tweet.controller';

const router = Router();

router
  .route('/post')
  .post(
    tweetContentValidation,
    validatorMiddleware,
    TweetController.postTweetByUserAndContent,
  );

router
  .route('/content/edit')
  .patch(
    tweetContentValidation,
    validatorMiddleware,
    TweetController.updateTweetContentById,
  );

export default router;
