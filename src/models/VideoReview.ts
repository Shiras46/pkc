import mongoose from 'mongoose';

const VideoReviewSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: [true, 'Please provide a video URL'],
  },
  platform: {
    type: String,
    required: true,
    enum: ['youtube', 'instagram'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.VideoReview || mongoose.model('VideoReview', VideoReviewSchema);
