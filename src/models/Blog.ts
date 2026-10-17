import { Schema, model, models } from 'mongoose';

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
    showCta: {
        type: Boolean,
        default: true,
    },
    ctaEyebrow: {
        type: String,
        default: 'START PLANNING YOUR CELEBRATION',
    },
    ctaTitle: {
        type: String,
        default: 'Ready to make your dream event a reality?',
    },
    ctaDescription: {
        type: String,
        default: 'Whether it is an intimate engagement, a grand royal wedding, or an elegant corporate event, our master chefs and planners handle every detail seamlessly.',
    },
    ctaButtonText: {
        type: String,
        default: 'Request Free Consultation',
    },
    ctaButtonLink: {
        type: String,
        default: '/contact',
    },
    ctaSecondaryText: {
        type: String,
        default: 'Chat on WhatsApp',
    },
    ctaSecondaryLink: {
        type: String,
        default: 'https://api.whatsapp.com/send?phone=918138002333&text=Hi%20PKC%20Events,%20I%20would%20like%20to%20inquire%20about%20event%20management%20and%20catering.',
    },
}, { timestamps: true, strict: false });

// Add virtual 'id' if needed to transform _id to id
BlogSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtuals are included in toJSON
BlogSchema.set('toJSON', {
    virtuals: true,
});

// Always delete stale cached model in memory to ensure new schema fields (CTA fields) are recognized
if (models && models.Blog) {
    delete (models as any).Blog;
}

const Blog = model('Blog', BlogSchema);

export default Blog;

