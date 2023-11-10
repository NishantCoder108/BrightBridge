import { Router } from "express";
import User from "../models/User";

const router = Router();

router.get("/users", (req, res) => {
  res.send("List of all Users ...");
});

router.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
