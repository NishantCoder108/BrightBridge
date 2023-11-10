import { Router } from "express";

const router = Router();

router.get("/users", (req, res) => {
  res.send("List of all Users ...");
});

router.post("/users", (req, res) => {
  res.send("User Created");
});

export default router;
