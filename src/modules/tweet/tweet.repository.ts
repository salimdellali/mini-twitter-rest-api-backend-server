import { TweetCreateDTO } from './tweet.dto';
import Tweet from './tweet.model';

export default class TweetRepository {
  static create = async (newTweetObject: TweetCreateDTO) => {
    const newTweet = new Tweet(newTweetObject);
    return newTweet.save();
  };
}
