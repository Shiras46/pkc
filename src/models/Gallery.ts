import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    default: 'Events & Celebrations',
  },
  src: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  alt: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
