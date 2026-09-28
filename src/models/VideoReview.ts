import mongoose from 'mongoose';

const VideoReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    required: [true, 'Please provide a video URL'],
  },
  thumbnailUrl: {
    type: String,
    default: '',
  },
  platform: {
    type: String,
    required: true,
    enum: ['youtube', 'instagram', 'custom'],
    default: 'youtube',
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
