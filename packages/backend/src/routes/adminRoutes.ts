import Admin from "../models/admin.models";

import User from "../models/user.models";
import Course from "../models/course.models";

import express, { NextFunction, Request, Response } from "express";
import { createJWTToken, verifyJWTToken } from "../utils/jwtAuthenticate";
import { IAuthRequest, IValidationError } from "../interfaces/authInterface";
import { ICourse } from "../interfaces/courseInterface";

const app = express();
const secret = process.env.ADMIN_SECRET_KEY;

const isAuthenticate = (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token || !secret) {
            return res.status(401).json({
                message: "You are not authenticated",
            });
        }

        const decoded = verifyJWTToken(token, secret);

        req.user = decoded;
        next();
    } catch (error) {
        const validationError = error as IValidationError;

        console.log({ validationError });
        res.status(401).json({
            message: "Invalid token",
            error: validationError.message || "Unknown error",
        });
        return;
    }
};

// //Post
// app.post("/signup", async (req, res) => {
//     const { username, password } = req.body;
//     const payload = { username, password };

//     try {
//         const isAdminUser = await Admin.findOne({ username, password });

//         if (isAdminUser) {
//             res.status(403).json({
//                 message: "You are already signed up. Please log in.",
//             });
//             return;
//         }

//         const adminUser = new Admin({ username, password });
//         await adminUser.save();

//         const token = createJWTToken(payload, secret);

//         res.json({
//             message: "You are successfully signed up",
//             token,
//         });
//     } catch (error) {
//         console.log(error);

//         res.status(501).json({
//             message: "Something went wrong",
//             error: error || "Unknown error",
//         });
//     }
// });

//Login
app.post("/login", async (req, res) => {
    const { username, password, role } = req.body;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    try {
        const adminUser =
            adminUsername === username &&
            adminPassword === password &&
            role === "ADMIN";

        console.log({ adminUser });
        if (!adminUser || !secret) {
            res.status(403).json({
                message: "Invalid username or password",
            });

            return;
        }
        const token = createJWTToken({ username, role: "ADMIN" }, secret);

        res.json({
            message: "You are successfully logged in",
            token,
        });
    } catch (error) {
        console.log(error);
        const validationError = error as IValidationError;

        res.status(500).json({
            message: "An error occurred during the login process",
            error: validationError.message || "Unknown error",
        });
    }
});

//Create course
app.post("/courses", isAuthenticate, async (req, res) => {
    const { imageurl, title, description, price, isPublished } = req.body;

    try {
        const course = new Course({
            imageurl,
            title,
            description,
            price,
            isPublished,
        });
        await course.save();

        res.status(201).json({
            message: "Course created successfully",
            courseId: course.id,
        });
    } catch (error) {
        console.log(error);
        const validationError = error as IValidationError;

        res.status(500).json({
            message: "Failed to create the course.",
            error: validationError.message || "Unknown error",
        });
    }
});

//Get all courses list
app.get("/courses", isAuthenticate, async (req, res) => {
    try {
        const course = await Course.find({});

        if (!course || course.length === 0) {
            res.status(404).json({
                message: "Course not found",
                course: course,
            });
            return;
        }
        res.status(200).json({ course });
    } catch (error) {
        const validationError = error as IValidationError;

        res.status(500).json({
            message: "Failed to retrieve the course.",
            error: validationError.message || "Unknown error",
        });
    }
});

// Update course
app.put("/courses/:courseId", isAuthenticate, async (req, res) => {
    const courseId = req.params.courseId;
    // const { imageurl, title, description, price, isPublished } = req.body;

    try {
        const course = await Course.findByIdAndUpdate(courseId, req.body, {
            new: true, //it will return modified data
        });

        res.status(200).json({
            message: "Course updated successfully",
            course,
        });
    } catch (error) {
        const validationError = error as IValidationError;

        res.status(500).json({
            message: "Failed to update the course.",
            error: validationError.message || "Unknown error",
        });
    }
});

//Delete Course

app.delete("/courses/:courseId", isAuthenticate, async (req, res) => {
    const courseId = req.params.courseId;

    try {
        const course = await Course.findByIdAndDelete(courseId);

        console.log({ course });

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                courseId: courseId,
            });
        }
        res.status(200).json({
            message: "Course deleted successfully",
            courseId: courseId,
        });
    } catch (error) {
        const validationError = error as IValidationError;

        res.status(500).json({
            message: "Failed to delete the course.",
            error: validationError.message || "Unknown error",
        });
    }
});

export default app;
