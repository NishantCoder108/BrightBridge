import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User";

const router = Router();

router.get("/users", (req, res) => {
  res.send("List of all Users ...");
});

router.post(
  "/users",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req: Request, res: Response) => {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use." });
      }

      // Create and save the new user
      const newUser = new User(req.body);
      await newUser.save();

      // Respond with the created user
      res.status(201).json(newUser);
    } catch (err) {
      // General error handling
      res.status(500).json({ message: "Server error", error: err });
    }
  }
);

export default router;
