import { Types } from 'mongoose';
import { UserCreateDTO } from './user.dto';
import User from './user.model';
import { HttpException } from '../../expections';

export default class UserRepository {
  static create = async (newUserObject: UserCreateDTO) => {
    try {
      const newUser = new User(newUserObject);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      console.error('DB_ERROR: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };

  static findUserByUsername = async (username: string) => {
    try {
      return await User.findOne({ username });
    } catch (error) {
      console.error('DB_ERROR: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };

  static isUserExistByUsername = async (username: string) => {
    try {
      return await User.exists({ username });
    } catch (error) {
      console.error('DB_ERROR: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };

  static updateLastAccessDateById = async (
    _id: Types.ObjectId,
    newLastAccessDate: Date,
  ) => {
    try {
      return User.findOneAndUpdate({ _id }, { lastAccess: newLastAccessDate });
    } catch (error) {
      console.error('DB_ERROR: ' + error);
      throw new HttpException(500, 'Internal server error');
    }
  };

  // @TODO implement deleteByUsername
  // static deleteByUsername = async (username: string) => {};
}
