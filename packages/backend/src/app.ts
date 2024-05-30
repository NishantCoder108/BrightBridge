require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors, { CorsOptions } from "cors";
import userRoutes from "./routes/userRoutes";
import courseRoutes from "./routes/courseRoutes";

const app = express();

const allowedOrigins: string[] = ["http://localhost:5173"];

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
app.use(cors(corsOptions));

dbConnect;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/admin", userRoutes);
app.use("/user", courseRoutes);

export default app;
