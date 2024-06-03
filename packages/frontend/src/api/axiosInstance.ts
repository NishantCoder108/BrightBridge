import axios from "axios";
import { DOMAIN_URL } from "../utils/constants";

const axiosInstance = axios.create({
    baseURL: DOMAIN_URL + "/api",
});

const baseURL = "http://localhost:5173/";
// axiosInstance.interceptors.request.use((config) => {
//     console.log("AXIOS Config", config);

//     try {
//         const currentUser = localStorage.getItem("currentUser");
//         console.log("1", config);
//         if (currentUser) {
//             const token = JSON.parse(currentUser).token;
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         console.log("2", config);

//         return config;
//     } catch (error) {
//         console.log("3", config);

//         console.log("Error", error);
//         return Promise.reject(error);
//     }
// });

// Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const currentUser = localStorage.getItem("currentUser");
        console.log("1", config);
        if (currentUser) {
            const token = JSON.parse(currentUser).token;
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("2", config);

        return config;
    },
    function (error) {
        console.log("Axios Response Error", error);

        if (error.response && error.response.status >= 400) {
            localStorage.removeItem("currentUser");
            window.location.replace(baseURL);
        }

        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {
        console.log("Axios Response Error", error);

        if (error.response && error.response.status >= 400) {
            const currUser = localStorage.getItem("currentUser");

            if (currUser) {
                localStorage.removeItem("currentUser");
                window.location.replace(baseURL);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
