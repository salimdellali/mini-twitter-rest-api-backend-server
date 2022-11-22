import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
    const newSavedUser = await UserRepository.create(newUserObject);

    // create jwt token and sign it
    const token = await jwt.sign(
      { id: newSavedUser.id },
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
      { expiresIn: 3600 },
    );

    // send back the result
    return {
      token,
      user: {
        id: newSavedUser.id,
        username,
        lastAccess: nowDate,
      },
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

    // renew jwt token
    const token = await jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
      {
        expiresIn: 3600,
      },
    );

    // send back the result
    return {
      token,
      user: {
        id: user.id,
        username,
        lastAccess: lastAccesDate,
      },
    };
  };
}
