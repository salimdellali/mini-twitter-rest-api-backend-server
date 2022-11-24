import { JwtPayload } from 'jsonwebtoken';
import TweetRepository from './tweet.repository';

export default class TweetService {
  static postTweetByUserAndContent = async (
    user: JwtPayload,
    content: string,
  ) => {
    const newTweetObject = {
      user: user._id,
      username: user.username,
      content,
    };
    await TweetRepository.create(newTweetObject);

    return {
      success: true,
      message: 'Tweet created succesfully',
    };
  };
}
