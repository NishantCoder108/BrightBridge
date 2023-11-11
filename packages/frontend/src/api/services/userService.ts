import axios, { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export const signupUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/users", { email, password });
    console.log("Signup User", { response });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<{ message: string }>;
      console.log({ serverError });
      if (serverError?.message) {
        throw new Error(
          serverError.message || "An error occurred during signup."
        );
      }
    }
    throw new Error("An error occurred during signup.");
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/login", { email, password });
    console.log("Login User", { response });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<{ message: string }>;
      console.log({ serverError });
      if (serverError?.message) {
        throw new Error(
          serverError.message || "An error occurred during login."
        );
      }
    }
    throw new Error("An error occurred during login.");
  }
};
