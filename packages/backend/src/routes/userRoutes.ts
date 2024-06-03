import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.models";
import Course from "../models/course.models";
import { createJWTToken, isAuthenticate } from "../utils/jwtAuthenticate";
import { IAuthRequest, IValidationError } from "../interfaces/authInterface";
import { IUser } from "../interfaces/userInterface";

const router = Router();

const secret = process.env.USER_SECRET_KEY;

//Sign up

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(409).json({
                message: "User already exists, please login.",
            });
        }

        const newUser = new User({
            email,
            password,
        });
        await newUser.save();

        if (!secret) throw new Error("Something went wrong");

        const token = createJWTToken({ email, id: newUser._id }, secret);

        res.status(201).json({
            message: " You are successfully signed up",
            token,
            email: newUser.email,
        });
    } catch (error) {
        const validationError = error as IValidationError;

        res.status(500).json({
            message: "Sign-up failed. Please try again later.",
            error: validationError.message || "Unknown error",
        });
    }
});

//Login
router.post("/login", async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !secret) {
            return res.status(400).json({ message: "Email does not exist." });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password." });
        }

        const token = createJWTToken(
            { email: user.email, id: user._id },
            secret
        );

        res.json({
            message: "You are successfully logged in",
            token,
            email: user.email,
        });
    } catch (err) {
        const validationError = err as IValidationError;
        res.status(500).json({
            message: "Server error",
            error: validationError.message,
        });
    }
});

//Get all courses

router.get("/courses", isAuthenticate(secret), async (req, res) => {
    try {
        const course = await Course.find({});

        if (!course || course.length === 0) {
            res.status(200).json({
                message: "No courses available at the moment.",
                course: course,
            });
            return;
        }

        res.json({
            message: "All courses retrieved successfully.",
            courses: course,
        });
    } catch (error) {
        const validationError = error as IValidationError;

        res.status(500).json({
            message: "Failed to retrieve courses.",
            error: validationError.message || "Unknown error",
        });
    }
});

//Buy courses
router.post(
    "/courses/:courseId",
    isAuthenticate(secret),
    async (req: IAuthRequest, res) => {
        try {
            const { courseId } = req.params;
            const reqData = req.user;

            const { email, id } = reqData as IUser;
            console.log({ reqData });

            const user = await User.findById({ _id: id }).select("-password");
            console.log({ user });

            const course = await Course.findById({ _id: courseId });
            console.log({ course });

            if (!user || !course) {
                throw new Error("Course not found ,please try again");
            }
            const purchasedCourses = user.purchasedCourses;

            if (purchasedCourses.includes(course.id)) {
                res.status(400).json({
                    message: "Course already purchased",
                });
                return;
            }

            user.purchasedCourses.push(course.id);
            await user.save();

            res.status(201).json({
                message: "Course purchased successfully",
                courseId: course.id,
            });
        } catch (error) {
            const validationError = error as IValidationError;
            res.status(500).json({
                message: "An error occurred while purchasing course",
                error: validationError.message || "Unknown error",
            });
        }
    }
);

router.get(
    "/purchasedCourse",
    isAuthenticate(secret),
    async (req: IAuthRequest, res) => {
        try {
            const { email, id } = req.user as IUser;

            const user = await User.findById({ _id: id }).populate(
                "purchasedCourses"
            );

            if (!user) {
                throw new Error("User not found, please try again");
            }
            const purchasedCourse = user.purchasedCourses || [];

            res.status(200).json({
                message: "All purchased courses",
                course: purchasedCourse,
            });
        } catch (error) {
            const validationError = error as IValidationError;
            res.status(500).json({
                message: "No course",
                error: validationError.message || "Unknown error",
            });
        }
    }
);

router.post("/me", isAuthenticate(secret), (req: IAuthRequest, res) => {
    res.json(req.user);
});
export default router;
