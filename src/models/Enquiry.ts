
import mongoose, { Schema, model, models } from 'mongoose';

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
        default: '',
    },
    service: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        default: '',
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

if (models.Enquiry) {
    delete (models as any).Enquiry;
}

const Enquiry = models.Enquiry || model('Enquiry', EnquirySchema);

export default Enquiry;
