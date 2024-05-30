import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
    password: string;
    email: string;
    purchasedCourses: string[];
}
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

userSchema.pre<IUser>("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }
    next();
});
export default mongoose.model("User", userSchema);
