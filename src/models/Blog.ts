
import mongoose, { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Wedding Planning Tips", "Catering & Menu Guides", "Event Trends"],
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: 'PKC Editorial',
    },
    date: {
        type: String, // Storing as string YYYY-MM-DD to match existing format, or could be Date
        required: true,
    },
    published: {
        type: Boolean,
        default: true,
    },
    metaTitle: {
        type: String,
        default: '',
    },
    metaDescription: {
        type: String,
        default: '',
    },
}, { timestamps: true });

// Add virtual 'id' if needed to transform _id to id
BlogSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtuals are included in toJSON
BlogSchema.set('toJSON', {
    virtuals: true,
});

const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;
