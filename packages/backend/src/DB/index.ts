import mongoose from "mongoose";
const dbUrl = process.env.MONGO_URI;

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(dbUrl + "courses");

        console.log(
            `Database  successfully connected!! 🥳 at HOST : ${conn.connection.host}`
        );
    } catch (error) {
        console.log(`Database connection error : ${error}`);
        process.exit(1);
    }
};

export default dbConnect;
