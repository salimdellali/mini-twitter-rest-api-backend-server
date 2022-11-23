import mongoose from 'mongoose';

const UserTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    refreshToken: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 30 * 86400, // 30 days
    },
  },
  { collection: 'userTokens' },
);

const UserToken = mongoose.model('UserToken', UserTokenSchema);

export default UserToken;
