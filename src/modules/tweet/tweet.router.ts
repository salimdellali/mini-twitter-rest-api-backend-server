import { Router } from 'express';
import { validatorMiddleware } from '../../middlewares';
import { tweetContentValidation } from '../../validations/tweetContent.validation';
import TweetController from './tweet.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.route('/feed/get').get(TweetController.getFeed);

router
  .route('/user/all/get')
  .get(authMiddleware, TweetController.getTweetsByUser);

router
  .route('/user/post')
  .post(
    authMiddleware,
    tweetContentValidation,
    validatorMiddleware,
    TweetController.postTweetByContentAndUser,
  );

router
  .route('/user/content/edit')
  .patch(
    authMiddleware,
    tweetContentValidation,
    validatorMiddleware,
    TweetController.updateTweetContentByIdAndUser,
  );

router
  .route('/user/delete')
  .delete(authMiddleware, TweetController.deleteTweetByIdAndUser);

export default router;
