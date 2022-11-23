import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { HttpException } from '../../expections';
import UserTokenRepository from './userToken.repository';
import { UserRepository } from '../user';
export default class UserTokenService {
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

    const accessToken = UserTokenService.generateAccessToken(user._id);
    const refreshToken = UserTokenService.generateRefreshToken(user._id);

    // renew token if already exists
    const userToken = await UserTokenRepository.findUserTokenByUserId(user._id);
    if (userToken) await userToken.remove();

    const newUserTokenObject = {
      user: user._id,
      refreshToken: refreshToken,
    };
    await UserTokenRepository.create(newUserTokenObject);

    // send back the result
    return {
      success: true,
      message: 'Logged in sucessfully',
      accessToken,
      refreshToken,
      lastAccess: lastAccesDate,
    };
  };

  static getNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
    const { refreshTokenDetails } = await UserTokenService.verifyRefreshToken(
      refreshToken,
    );
    const { _id } = refreshTokenDetails as JwtPayload;
    const accessToken = UserTokenService.generateAccessToken(_id);
    return {
      success: true,
      message: 'New access token created successfully',
      accessToken,
    };
  };

  static logout = async (refreshToken: string) => {
    const userToken = await UserTokenRepository.findUserTokenByRefreshToken(
      refreshToken,
    );
    // if refresh token linked to user is not found, logout anyway
    if (!userToken) return { success: true, message: 'Logged out sucessfully' };

    // refresh token linked to user exists, so remove it and logout
    await UserTokenRepository.delete(userToken);
    return { success: true, message: 'Logged out sucessfully' };
  };

  static verifyRefreshToken = async (refreshToken: string) => {
    const userToken = await UserTokenRepository.findUserTokenByRefreshToken(
      refreshToken,
    );
    if (!userToken) throw new HttpException(401, 'Invalid refresh token');

    // user token exist
    try {
      const refreshTokenDetails = await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_PRIVATE_KEY!,
      );
      return {
        success: true,
        message: 'Valid refresh token',
        refreshTokenDetails,
      };
    } catch (error) {
      throw new HttpException(401, 'Invalid refresh token');
    }
  };

  /**
   * support functions
   */

  static generateAccessToken = (_id: Types.ObjectId) => {
    const payload = { _id };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
      { expiresIn: '14m' },
    );
    return accessToken;
  };

  static generateRefreshToken = (_id: Types.ObjectId) => {
    const payload = { _id };
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY!,
      { expiresIn: '30d' },
    );
    return refreshToken;
  };
}
