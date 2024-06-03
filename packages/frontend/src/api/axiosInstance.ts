import axios from "axios";
import { DOMAIN_URL } from "../utils/constants";

const axiosInstance = axios.create({
    baseURL: DOMAIN_URL + "/api",
});

axiosInstance.interceptors.request.use((config) => {
    console.log("AXIOS Config", config);

    try {
        const currentUser = localStorage.getItem("currentUser");

        if (currentUser) {
            const token = JSON.parse(currentUser).token;
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    } catch (error) {
        console.log("Error", error);
        return Promise.reject(error);
    }
});
export default axiosInstance;
