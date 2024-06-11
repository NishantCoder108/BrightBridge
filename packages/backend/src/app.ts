require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors, { CorsOptions } from "cors";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import dbConnect from "./DB";
import courseRoutes from "./routes/courseRoutes";
import path from "path";

const app = express();

const allowedOrigins: string[] = ["http://localhost:3000"];

const corsOptions: CorsOptions = {
    origin: function (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void
    ) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (!allowedOrigins.includes(origin)) {
            const msg =
                "The CORS policy for this site does not allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
};

// Use the CORS middleware
// app.use(cors(corsOptions));

dbConnect();

if (process.env.NODE_ENV === "production") {
    console.log = () => {};
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

export default app;
