import { Types } from 'mongoose';
import { TweetCreateDTO } from './tweet.dto';
import Tweet from './tweet.model';
import { HttpException } from '../../expections';

export default class TweetRepository {
  static create = async (newTweetObject: TweetCreateDTO) => {
    try {
      const newTweet = new Tweet(newTweetObject);
      const savedTweet = await newTweet.save();
      return savedTweet;
    } catch (error) {
      console.error('[DB_ERROR]\t: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };

  static updateTweetContentById = async (
    tweetId: Types.ObjectId,
    newTweetContent: string,
  ) => {
    try {
      return Tweet.findOneAndUpdate(
        { _id: tweetId },
        { content: newTweetContent },
      );
    } catch (error) {
      console.error('[DB_ERROR]\t: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };

  static isTweetExistByTweetIdAndUserId = async (
    userId: Types.ObjectId,
    tweetId: Types.ObjectId,
  ) => {
    try {
      const exist = await Tweet.exists({
        _id: tweetId,
        user: userId,
      });
      return exist;
    } catch (error) {
      console.error('[DB_ERROR]\t: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };
}
