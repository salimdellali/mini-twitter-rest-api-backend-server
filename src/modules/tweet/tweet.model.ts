import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    nbLikes: {
      type: Number,
      default: 0,
    },
    nbRetweets: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: 'tweets' },
);

const Tweet = mongoose.model('Tweet', TweetSchema);

export default Tweet;
