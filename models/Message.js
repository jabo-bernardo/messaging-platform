import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    createdAt: {
        type: String,
        default: Date.now()
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

export default new model("message", messageSchema);