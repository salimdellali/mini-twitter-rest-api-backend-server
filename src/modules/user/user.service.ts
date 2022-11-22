import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.model';
import { HttpException } from '../../expections';
export default class UserService {
  static signup = async (username: string, password: string) => {
    // check if user exists
    const isUserExist = await User.exists({ username });
    if (isUserExist) {
      throw new HttpException(400, 'User with such username already exists');
    }

    // user does not exists, create new
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const now = new Date();
    const newUserObject = {
      username,
      password: hashedPassword,
      lastAccess: now,
    };
    const newUser = new User(newUserObject);
    const newSavedUser = await newUser.save();

    // create jwt token and sign it
    const token = await jwt.sign(
      { id: newSavedUser.id },
      process.env.JWT_SECRET!,
      { expiresIn: 3600 },
    );

    // send back the result
    return {
      token,
      user: {
        username,
        lastAccess: now,
      },
    };
  };
}
