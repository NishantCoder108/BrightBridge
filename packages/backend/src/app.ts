import express from "express";
import userRoutes from "./routes/userRoutes";
import courseRoutes from "./routes/courseRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api", userRoutes);
app.use("/api", courseRoutes);

app.listen(PORT, () => {
  console.log(`Server  running on  http://localhost:${PORT}`);
});

export default app;
