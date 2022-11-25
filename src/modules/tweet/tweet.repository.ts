import { Types } from 'mongoose';
import { TweetCreateDTO } from './tweet.dto';
import Tweet from './tweet.model';
import { HttpException } from '../../expections';

export default class TweetRepository {
  static findAllSortedByCreatedAtDesc = async () => {
    try {
      const allTweets = await Tweet.find(
        {},
        'username content nbLikes nbRetweets createdAt',
      )
        .sort({ createdAt: -1 })
        .lean();
      return allTweets;
    } catch (error) {
      console.error('[DB_ERROR]\t: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };

  static findByUserIdSortedByCreatedAtDesc = async (userId: Types.ObjectId) => {
    try {
      const userTweets = await Tweet.find({ user: userId })
        .sort({
          createdAt: -1,
        })
        .lean();
      return userTweets;
    } catch (error) {
      console.error('[DB_ERROR]\t: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };

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
      return Tweet.findByIdAndUpdate(tweetId, { content: newTweetContent });
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

  static deleteById = (tweetId: Types.ObjectId) => {
    try {
      return Tweet.findByIdAndDelete(tweetId);
    } catch (error) {
      console.error('[DB_ERROR]\t: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };
}
