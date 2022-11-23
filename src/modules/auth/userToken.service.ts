import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import TokenUtil from '../../utils/token.util';
import { HttpException } from '../../expections';
import UserTokenRepository from './userTOken.repository';
export default class UserTokenService {
  static getNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
    const { refreshTokenDetails } = await UserTokenService.verifyRefreshToken(
      refreshToken,
    );
    const { _id } = refreshTokenDetails as JwtPayload;
    const accessToken = TokenUtil.generateAccessToken(_id);
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
}
