import bcrypt from 'bcryptjs';
import UserRepository from './user.repository';
import { HttpException } from '../../expections';
export default class UserService {
  static signup = async (username: string, password: string) => {
    // check if user exists
    const isUserExist = await UserRepository.isUserExistByUsername(username);
    if (isUserExist)
      throw new HttpException(400, 'User with such username already exists');

    // user does not exists, create new
    const salt = await bcrypt.genSalt(+process.env.SALT!);
    const hashedPassword = await bcrypt.hash(password, salt);
    const nowDate = new Date();
    const newUserObject = {
      username,
      password: hashedPassword,
      lastAccess: nowDate,
    };
    await UserRepository.create(newUserObject);

    return {
      success: true,
      message: 'Account created successfully',
    };
  };
}
