import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    joinedAt: {
        type: String,
        default: Date.now()
    },
    rooms: {
        type: Array,
        default: []
    }
});

export default new model("User", userSchema);