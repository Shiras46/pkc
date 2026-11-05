import { Schema, model, models } from 'mongoose';

const EnquirySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        default: '',
        trim: true,
    },
    phone: {
        type: String,
        required: false,
        default: '',
        trim: true,
    },
    service: {
        type: String,
        required: false,
        default: 'General Inquiry',
        trim: true,
    },
    eventType: {
        type: String,
        required: false,
        default: 'General Inquiry',
        trim: true,
    },
    eventDate: {
        type: String,
        required: false,
        default: '',
    },
    guestCount: {
        type: Number,
        required: false,
    },
    message: {
        type: String,
        required: false,
        default: '',
        trim: true,
    },
    date: {
        type: String, // String format YYYY-MM-DD to match admin panel
        default: () => new Date().toISOString().split('T')[0],
    },
    status: {
        type: String,
        default: 'New',
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true, strict: false });

// Add virtual 'id' to map _id to id
EnquirySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

EnquirySchema.set('toJSON', {
    virtuals: true,
});

// Always clear stale cached model in memory to ensure new schema applies immediately
if (models && (models as any).Enquiry) {
    delete (models as any).Enquiry;
}

const Enquiry = models.Enquiry || model('Enquiry', EnquirySchema);

export default Enquiry;
