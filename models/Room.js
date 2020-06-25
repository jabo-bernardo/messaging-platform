import { Schema, model } from 'mongoose';

const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "No description provided."
    },
    icon: {
        type: String,
        default: ""
    },
    createdAt: {
        type: String,
        default: Date.now()
    },
    owner: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        required: true
    },
    banned: {
        type: Array,
        default: []
    },
    messages: {
        type: Array,
        default: []
    }
});

export default new model("Room", roomSchema);