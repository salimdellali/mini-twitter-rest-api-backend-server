import { Types } from 'mongoose';
import Auth from './auth.model';
import IAuth from './auth.interface';
import { AuthCreateDTO } from './auth.dto';

export default class AuthRepository {
  static create = async (newAuthObject: AuthCreateDTO) => {
    const newAuth = new Auth(newAuthObject);
    const savedAuth = await newAuth.save();
    return savedAuth;
  };

  static findAuthByUserId = async (userId: Types.ObjectId) => {
    return await Auth.findOne({ user: userId });
  };

  static findUAuthByRefreshToken = async (refreshToken: string) => {
    return await Auth.findOne({ token: refreshToken });
  };

  static delete = async (auth: IAuth) => {
    return await auth.remove();
  };
}
