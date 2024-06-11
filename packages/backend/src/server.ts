// src/server.ts
import path from "path";
import app from "./app";

const PORT = process.env.PORT || 3000;

// Serve the static files from the public directory

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server  running on  http://localhost:${PORT}`);
});
