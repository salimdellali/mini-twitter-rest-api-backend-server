import { Types } from 'mongoose';

export interface UserTokenCreateDTO {
  user: Types.ObjectId;
  refreshToken: string;
}
