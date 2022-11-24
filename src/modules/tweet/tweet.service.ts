import { Types } from 'mongoose';
import TweetRepository from './tweet.repository';

export default class TweetService {
  static postTweetByUserIdAndContent = async (
    userId: Types.ObjectId,
    content: string,
  ) => {
    const newTweetObject = {
      user: userId,
      content,
    };
    await TweetRepository.create(newTweetObject);

    return {
      success: true,
      message: 'Tweet created succesfully',
    };
  };
}
