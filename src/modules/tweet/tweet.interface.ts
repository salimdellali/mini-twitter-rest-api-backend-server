import { Document, Types } from 'mongoose';

export default interface ITweet extends Document {
  user: Types.ObjectId;
  username: string;
  content: string;
  nbLikes: number;
  nbRetweets: number;
}
