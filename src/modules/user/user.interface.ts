import { Document } from 'mongoose';

export default interface IUser extends Document {
  username: string;
  password: string;
  registerDate: Date;
  lastAccess: Date;
}
