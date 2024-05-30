import mongoose from "mongoose";

import { Schema } from "mongoose";

const userSchema = new Schema({
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
    purchasedCourses: [
        {
            ref: "Course",
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
        },
    ],
});

export default mongoose.model("User", userSchema);
