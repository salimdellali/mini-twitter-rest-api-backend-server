import { Document, Types } from 'mongoose';

export default interface IAuth extends Document {
  user: Types.ObjectId;
  refreshToken: string;
  createdAt: Date;
}
