require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import courseRoutes from "./routes/courseRoutes";

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/BrightBridgeDB";

mongoose
  .connect(mongoUri)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", courseRoutes);

app.listen(PORT, () => {
  console.log(`Server  running on  http://localhost:${PORT}`);
});

export default app;
