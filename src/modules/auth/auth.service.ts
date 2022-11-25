import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { HttpException } from '../../expections';
import AuthRepository from './auth.repository';
import { UserRepository } from '../user';
export default class AuthService {
  /**
   * controller functions
   */

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

    const { _id } = user;
    const accessToken = AuthService.generateAccessTokenByUserIdAndUsername(
      _id,
      username,
    );
    const refreshToken = AuthService.generateRefreshTokenByUserIdAndUsername(
      _id,
      username,
    );

    // renew token if already exists
    const auth = await AuthRepository.findAuthByUserId(user._id);
    if (auth) await auth.remove();

    const newAuthObject = {
      user: user._id,
      refreshToken: refreshToken,
    };
    await AuthRepository.create(newAuthObject);

    // send back the result
    return {
      success: true,
      message: 'Logged in successfully',
      accessToken,
      refreshToken,
      lastAccess: lastAccesDate,
    };
  };

  static getNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
    const { refreshTokenPayload } = await AuthService.verifyRefreshToken(
      refreshToken,
    );

    // @TODO implement issuing new access token only when
    // the old access token is withing 30s of expiry
    const { _id, username } = refreshTokenPayload as JwtPayload;
    const accessToken = AuthService.generateAccessTokenByUserIdAndUsername(
      _id,
      username,
    );
    return {
      success: true,
      message: 'New access token created successfully',
      accessToken,
    };
  };

  static logout = async (refreshToken: string) => {
    const auth = await AuthRepository.findUAuthByRefreshToken(refreshToken);
    // if refresh token linked to user is not found, logout anyway
    if (!auth) return { success: true, message: 'Logged out successfully' };

    // refresh token linked to user exists, so remove it and logout
    await AuthRepository.delete(auth);
    return { success: true, message: 'Logged out successfully' };
  };

  static verifyRefreshToken = async (refreshToken: string) => {
    const auth = await AuthRepository.findUAuthByRefreshToken(refreshToken);
    if (!auth) throw new HttpException(401, 'Invalid refresh token');

    // user token exist
    try {
      const refreshTokenPayload = await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_PRIVATE_KEY!,
      );
      return {
        success: true,
        message: 'Valid refresh token',
        refreshTokenPayload,
      };
    } catch (error) {
      throw new HttpException(401, 'Invalid refresh token');
    }
  };

  /**
   * support functions
   */

  static generateAccessTokenByUserIdAndUsername = (
    _id: Types.ObjectId,
    username: string,
  ) => {
    const payload = { _id, username };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
      { expiresIn: '14m' },
    );
    return accessToken;
  };

  static generateRefreshTokenByUserIdAndUsername = (
    _id: Types.ObjectId,
    username: string,
  ) => {
    const payload = { _id, username };
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY!,
      { expiresIn: '30d' },
    );
    return refreshToken;
  };
}
