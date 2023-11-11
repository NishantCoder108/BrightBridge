import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = Router();

router.get("/users", (req, res) => {
  res.send("List of all Users ...");
});

//Signup
router.post(
  "/signup",
  [body("email").isEmail(), body("password").isLength({ min: 3 })],
  async (req: Request, res: Response) => {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    function generateUsername(email: string) {
      const usernamePart = email.split("@")[0];
      const randomString = Math.random().toString(36).substring(2, 7);

      return `${usernamePart.substring(2)}_${randomString}`;
    }

    try {
      const userData = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use." });
      }

      userData.username = generateUsername(userData.email);

      // Create and save the new user
      const newUser = new User(userData);
      await newUser.save();

      // Respond with the created user
      res.status(201).json({ message: "User created successfully" });
    } catch (err: any) {
      // General error handling
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

//Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist." });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // User is authenticated, proceed with generating a token/session
    if (isMatch) {
      const token = jwt.sign(
        { userId: user._id }, // Payload
        process.env.JWT_SECRET as string, // Secret key
        { expiresIn: "1h" } // Expiration time
      );

      res.json({ token });
    }
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
