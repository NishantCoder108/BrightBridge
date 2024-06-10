import { Router } from "express";

const router = Router();

router.get("/courses", (req, res) => {
  res.json({courses:"All courses list",status:200});
});

router.post("/courses", (req, res) => {
  res.send("Courses Created!");
});

export default router;
