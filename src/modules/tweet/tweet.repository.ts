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
}
