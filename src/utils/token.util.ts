import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export default class TokenUtil {
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
