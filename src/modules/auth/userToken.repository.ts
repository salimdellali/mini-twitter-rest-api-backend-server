import { Types } from 'mongoose';
import UserToken from './userToken.model';
import IUserToken from './userToken.interface';
import { UserTokenCreateDTO } from './userToken.dto';

export default class UserTokenRepository {
  static create = async (newUserTokenObject: UserTokenCreateDTO) => {
    const newUserToken = new UserToken(newUserTokenObject);
    return newUserToken.save();
  };

  static findUserTokenByUserId = async (userId: Types.ObjectId) => {
    return await UserToken.findOne({ user: userId });
  };

  static findUserTokenByRefreshToken = async (refreshToken: string) => {
    return await UserToken.findOne({ token: refreshToken });
  };

  static delete = async (userToken: IUserToken) => {
    return await userToken.remove();
  };
}
