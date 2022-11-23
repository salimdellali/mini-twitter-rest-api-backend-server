import { Document, Types } from 'mongoose';

export default interface IUserToken extends Document {
  user: Types.ObjectId;
  token: string;
  createdAt: Date;
}
