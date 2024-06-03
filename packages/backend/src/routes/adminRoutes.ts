import Course from "../models/course.models";
import express, { NextFunction, Request, Response, Router } from "express";
import {
    createJWTToken,
    isAuthenticate,
    verifyJWTToken,
} from "../utils/jwtAuthenticate";
import { IAuthRequest, IValidationError } from "../interfaces/authInterface";

const app = Router();
const secret = process.env.ADMIN_SECRET_KEY;

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
    const { email, password, role } = req.body;
    const adminEmail = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    console.log("Req body", req.body);
    console.log({ adminEmail, adminPassword });
    try {
        const adminUser =
            adminEmail === email &&
            adminPassword === password &&
            role === "ADMIN";

        console.log(adminEmail === email);
        console.log(adminPassword === password);
        console.log(role === "ADMIN");
        console.log({ adminUser });
        if (!adminUser || !secret) {
            res.status(403).json({
                message: "Invalid username or password",
            });

            return;
        }
        const token = createJWTToken({ email, role: "ADMIN" }, secret);

        res.json({
            message: "You are successfully logged in",
            token,
            role,
            email,
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
app.post("/courses", isAuthenticate(secret), async (req, res) => {
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
app.get("/courses", isAuthenticate(secret), async (req, res) => {
    try {
        const course = await Course.find({});

        if (!course || course.length === 0) {
            res.status(404).json({
                message: "Course not found",
                course: course,
            });
            return;
        }
        res.status(200).json(course);
    } catch (error) {
        const validationError = error as IValidationError;

        res.status(500).json({
            message: "Failed to retrieve the course.",
            error: validationError.message || "Unknown error",
        });
    }
});

// Update course
app.put("/courses/:courseId", isAuthenticate(secret), async (req, res) => {
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

app.delete("/courses/:courseId", isAuthenticate(secret), async (req, res) => {
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

app.post("/me", isAuthenticate(secret), (req: IAuthRequest, res) => {
    res.json(req.user);
});
export default app;
