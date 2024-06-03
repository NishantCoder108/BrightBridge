import mongoose from "mongoose";

import { Schema } from "mongoose";

const adminSchema = new Schema({
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 1024,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
    },
});

export default mongoose.model("Admin", adminSchema);
