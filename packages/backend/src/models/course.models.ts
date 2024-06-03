import mongoose from "mongoose";

import { Schema } from "mongoose";

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },

        price: {
            type: Number,
            required: true,
        },

        imageUrl: {
            type: String,
        },

        isPublished: Boolean,
    },
    { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
