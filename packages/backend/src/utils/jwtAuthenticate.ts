import jwt from "jsonwebtoken";
import { IAuthRequest, IValidationError } from "../interfaces/authInterface";
import { NextFunction, Response } from "express";

const createJWTToken = (payload: object | string, secret: string) => {
    try {
        const token = jwt.sign(payload, secret, {
            expiresIn: "1h",
        });

        return token;
    } catch (error) {
        console.log("Token signing failed : ", error);

        throw error;
    }
};

const verifyJWTToken = (token: string, secret: string) => {
    try {
        const decoded = jwt.verify(token, secret);

        return decoded;
    } catch (error) {
        console.log(error);

        throw error;
    }
};

const isAuthenticate =
    (secret: string | undefined) =>
    (req: IAuthRequest, res: Response, next: NextFunction) => {
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

export { createJWTToken, verifyJWTToken, isAuthenticate };
