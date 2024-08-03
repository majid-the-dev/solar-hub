import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

export const User = models?.User || model('User', userSchema);