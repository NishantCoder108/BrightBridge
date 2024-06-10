// src/server.ts
import app from "./app";

const PORT = process.env.PORT || 3000;

app.get("/test", (req, res) => {
    res.send({ message: "successfully deployed.", status: 200 });
});

app.listen(PORT, () => {
    console.log(`Server  running on  http://localhost:${PORT}`);

})
