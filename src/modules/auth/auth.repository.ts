import { Types } from 'mongoose';
import Auth from './auth.model';
import IAuth from './auth.interface';
import { AuthCreateDTO } from './auth.dto';
import { HttpException } from '../../expections';

export default class AuthRepository {
  static create = async (newAuthObject: AuthCreateDTO) => {
    try {
      const newAuth = new Auth(newAuthObject);
      const savedAuth = await newAuth.save();
      return savedAuth;
    } catch (error) {
      console.error('DB_ERROR: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };

  static findAuthByUserId = async (userId: Types.ObjectId) => {
    try {
      return await Auth.findOne({ user: userId });
    } catch (error) {
      console.error('DB_ERROR: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };

  static findUAuthByRefreshToken = async (refreshToken: string) => {
    try {
      return await Auth.findOne({ token: refreshToken });
    } catch (error) {
      console.error('DB_ERROR: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };

  static delete = async (auth: IAuth) => {
    try {
      return await auth.remove();
    } catch (error) {
      console.error('DB_ERROR: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };
}
