import axios, { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export const signupUser = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post("/signup", {
            email,
            password,
        });
        console.log("Signup User", { response });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<{ message: string }>;
            console.log({ serverError });
            if (serverError.response) {
                throw new Error(
                    serverError.response.data.message ||
                        "An error occurred during signup."
                );
            }
        }
        throw new Error("An error occurred during signup.");
    }
};

export const loginUser = async (
    email: string,
    password: string,
    role: boolean
) => {
    try {
        const response = await axiosInstance.post("/admin/login", {
            email,
            password,
            role: role ? "ADMIN" : "USER",
        });
        console.log("Login User", { response });

        return response;
    } catch (error) {
        console.log("Login Error", { error });
        throw error;
    }
};
