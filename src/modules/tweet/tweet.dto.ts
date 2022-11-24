import { Types } from 'mongoose';

export interface TweetCreateDTO {
  user: Types.ObjectId;
  content: string;
}
