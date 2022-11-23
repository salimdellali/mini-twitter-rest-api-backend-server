import bcrypt from 'bcryptjs';
import UserRepository from './user.repository';
import { HttpException } from '../../expections';
import TokenUtil from '../../utils/token.util';
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
      message: 'Account created succesfully',
    };
  };

  static login = async (username: string, password: string) => {
    // check if user doesn't exist
    const user = await UserRepository.findUserByUsername(username);
    if (!user)
      throw new HttpException(404, "User with such username doesn't exists");

    // validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new HttpException(400, 'Wrong password');

    // credentials are valid
    // update lastAccess Date
    const nowDate = new Date();
    const lastAccesDate = user.lastAccess;
    await UserRepository.updateLastAccessDateById(user._id, nowDate);

    const { accessToken, refreshToken } = await TokenUtil.generateTokens(user);

    // send back the result
    return {
      success: true,
      message: 'Logged in sucessfully',
      accessToken,
      refreshToken,
      lastAccess: lastAccesDate,
    };
  };
}
