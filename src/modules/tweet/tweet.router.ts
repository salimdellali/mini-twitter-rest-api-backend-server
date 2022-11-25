import { Router } from 'express';
import { validatorMiddleware, authMiddleware } from '../../middlewares';
import { tweetContentValidation } from '../../validations';
import TweetController from './tweet.controller';

const router = Router();

router.route('/feed/get').get(TweetController.getFeed);

// requires authentication
router
  .route('/user/all/get')
  .get(authMiddleware, TweetController.getTweetsByUser);

// requires authentication
router
  .route('/user/post')
  .post(
    authMiddleware,
    tweetContentValidation,
    validatorMiddleware,
    TweetController.postTweetByContentAndUser,
  );

// requires authentication
router
  .route('/user/content/edit')
  .patch(
    authMiddleware,
    tweetContentValidation,
    validatorMiddleware,
    TweetController.updateTweetContentByIdAndUser,
  );

// requires authentication
router
  .route('/user/delete')
  .delete(authMiddleware, TweetController.deleteTweetByIdAndUser);

export default router;
