import jwt from 'jsonwebtoken';
import { HttpException } from '../expections';
import UserTokenRepository from '../modules/auth/userTOken.repository';

export default class TokenUtil {
  static generateTokens = async (user: any) => {
    const payload = { _id: user._id };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
      { expiresIn: '14m' },
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY!,
      { expiresIn: '30d' },
    );

    // renew token if already exists
    const userToken = await UserTokenRepository.findUserTokenByUserId(user._id);
    if (userToken) await userToken.remove();

    const newUserTokenObject = {
      user: user._id,
      token: refreshToken,
    };
    await UserTokenRepository.create(newUserTokenObject);

    return { accessToken, refreshToken };
  };

  static verifyRefreshToken = async (refreshToken: string) => {
    try {
      const userToken = await UserTokenRepository.findUserTokenByRefreshToken(
        refreshToken,
      );
      if (!userToken) throw new HttpException(401, 'Invalid refresh token');

      const tokenDetails = await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_PRIVATE_KEY!,
      );
      if (!tokenDetails) throw new HttpException(401, 'Invalid refresh token');

      return {
        tokenDetails,
        error: false,
        message: 'Valid refresh token',
      };
    } catch (error) {
      throw new HttpException(401, 'Invalid refresh token');
    }
  };
}
