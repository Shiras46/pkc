
import mongoose, { Schema, model, models } from 'mongoose';

const EnquirySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    service: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    date: {
        type: String, // String format YYYY-MM-DD
        default: () => new Date().toISOString().split('T')[0],
    },
    status: {
        type: String,
        default: 'New',
    },
}, { timestamps: true });

// Add virtual 'id' to map _id to id
EnquirySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

EnquirySchema.set('toJSON', {
    virtuals: true,
});

const Enquiry = models.Enquiry || model('Enquiry', EnquirySchema);

export default Enquiry;
