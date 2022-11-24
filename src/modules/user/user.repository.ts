import { Types } from 'mongoose';
import { UserCreateDTO } from './user.dto';
import User from './user.model';

export default class UserRepository {
  static create = async (newUserObject: UserCreateDTO) => {
    const newUser = new User(newUserObject);
    return await newUser.save();
  };

  static findUserByUsername = async (username: string) => {
    return await User.findOne({ username });
  };

  static isUserExistByUsername = async (username: string) => {
    return await User.exists({ username });
  };

  static updateLastAccessDateById = async (
    _id: Types.ObjectId,
    newLastAccessDate: Date,
  ) => {
    return User.findOneAndUpdate({ _id }, { lastAccess: newLastAccessDate });
  };

  // @TODO implement deleteByUsername
  // static deleteByUsername = async (username: string) => {};
}
