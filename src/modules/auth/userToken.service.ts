import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import TokenUtil from '../../utils/token.util';
import UserTokenRepository from './userTOken.repository';
export default class UserTokenService {
  static getNewAccessToken = async (refreshToken: string) => {
    const { tokenDetails } = await TokenUtil.verifyRefreshToken(refreshToken);
    const { _id } = tokenDetails as JwtPayload;
    const payload = { _id };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
      { expiresIn: '14m' },
    );
    return {
      success: true,
      accessToken,
      message: 'New access token created successfully',
    };
  };

  static logout = async (refreshToken: string) => {
    const userToken = await UserTokenRepository.findUserTokenByRefreshToken(
      refreshToken,
    );
    if (!userToken) return { success: true, message: 'Logged out sucessfully' };

    await UserTokenRepository.delete(userToken);
    return { success: true, message: 'Logged out sucessfully' };
  };
}
