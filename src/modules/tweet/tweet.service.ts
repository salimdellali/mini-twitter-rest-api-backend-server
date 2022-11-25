import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { HttpException } from '../../expections';
import TweetRepository from './tweet.repository';

export default class TweetService {
  static getFeed = async () => {
    const feed = await TweetRepository.findAllSortedByCreatedAtDesc();

    return {
      success: true,
      message: 'Feed fetched successfully',
      feed,
    };
  };

  static getTweetsByUser = async (user: JwtPayload) => {
    const userTweets = await TweetRepository.findByUserIdSortedByCreatedAtDesc(
      user._id,
    );

    return {
      success: true,
      message: 'User tweets fetched successfully',
      userTweets,
    };
  };

  static postTweetByContentAndUser = async (
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
      message: 'Tweet created successfully',
    };
  };

  static updateTweetContentByIdAndUser = async (
    user: JwtPayload,
    tweetId: Types.ObjectId,
    newTweetContent: string,
  ) => {
    // check if tweet exists and is owned by the user
    const isExistAndOwned =
      await TweetRepository.isTweetExistByTweetIdAndUserId(user._id, tweetId);
    if (!isExistAndOwned)
      throw new HttpException(400, "Tweet doesn't exist or forbidden edit");

    await TweetRepository.updateTweetContentById(tweetId, newTweetContent);
    return {
      success: true,
      message: 'Tweet content updated successfully',
    };
  };

  static deleteTweetByIdAndUser = async (
    user: JwtPayload,
    tweetId: Types.ObjectId,
  ) => {
    // check if tweet exists and is owned by the user
    const isExistAndOwned =
      await TweetRepository.isTweetExistByTweetIdAndUserId(user._id, tweetId);
    if (!isExistAndOwned)
      throw new HttpException(400, "Tweet doesn't exist or forbidden delete");

    await TweetRepository.deleteById(tweetId);
    return {
      success: true,
      message: 'Tweet deleted successfully',
    };
  };
}
