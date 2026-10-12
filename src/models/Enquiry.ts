import { Schema, model, models } from 'mongoose';

const EnquirySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        default: '',
    },
    phone: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        required: false,
        default: 'General',
    },
    eventDate: {
        type: String,
        required: false,
    },
    guestCount: {
        type: Number,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'confirmed', 'cancelled'],
        default: 'new',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Add virtual 'id' to map _id to id
EnquirySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

EnquirySchema.set('toJSON', {
    virtuals: true,
});

const Enquiry = models.Enquiry || model('Enquiry', EnquirySchema);

export default Enquiry;
