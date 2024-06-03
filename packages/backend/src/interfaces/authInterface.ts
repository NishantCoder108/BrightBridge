import { Request } from "express";

export interface IAuthRequest extends Request {
    user?: object | string;
}

export interface IValidationError {
    message: string;
    error: {
        [key: string]: {
            message: string;
            kind: string;
            path: string;
            value: any;
        };
    };
}
