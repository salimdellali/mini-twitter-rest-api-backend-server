//  user.model.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    registerDate: {
      type: Date,
      default: Date.now,
    },
    lastAccess: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'users' },
);

const User = mongoose.model('User', UserSchema);

export default User;
