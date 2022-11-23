import { Types } from 'mongoose';

export interface AuthCreateDTO {
  user: Types.ObjectId;
  refreshToken: string;
}
