import axios, { AxiosError } from "axios";
import AxiosInstances from "../axiosInstance";

// AxiosInstances.interceptors.request.use((config) => {
//     console.log("AXIOS Config", config);

//     try {
//         const currentUser = localStorage.getItem("currentUser");

//         if (!currentUser) {
//             throw new Error("Token is not available");
//         }

//         const token = JSON.parse(currentUser).token;
//         config.headers.Authorization = `Bearer ${token.token}`;
//         return config;
//     } catch (error) {
//         console.log("Error", error);
//         return Promise.reject(error);
//     }
// });

export const getAllCourses = async () => {
    try {
        const response = await AxiosInstances.get("/admin/courses");
        console.log("All Admin Courses", { response });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<{ message: string }>;
            console.log({ serverError });
            if (serverError.response) {
                throw new Error(
                    serverError.response.data.message ||
                        "An error occurred during getting courses."
                );
            }
        }
        throw new Error("An error occurred during getting courses.");
    }
};

export const createCourse = async (data: object) => {
    try {
        const response = await AxiosInstances.post("/admin/courses", data);
        console.log("Created Courses", { response });
        return response;
    } catch (error) {
        console.error("Error Creating Course :", error);

        throw error;
    }
};
