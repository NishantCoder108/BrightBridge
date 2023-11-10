import { Router } from "express";

const router = Router();

router.get("/courses", (req, res) => {
  res.send("List of Courses");
});

router.post("/courses", (req, res) => {
  res.send("Courses Created!");
});

export default router;
