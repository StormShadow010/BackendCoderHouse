import { model, Schema } from "mongoose";

let collection = "users";

const schema = new Schema({
    photo: {
        type: String,
        default: "/assets/icons/avatar.png"
    },
    email: {
        type: String,
        required: true,
        unique: true, //No repeate value in database
        index: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0,
        index: true
    }
}, { timestamps: true });

export const User = model(collection, schema);
