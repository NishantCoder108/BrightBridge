import axiosInstance from "../axiosInstance";

export const verifyAdmin = async () => {
    try {
        const response = await axiosInstance.post("/admin/me");
        console.log("Verify Admin ", response);

        return response;
    } catch (error) {
        console.log("Verify Admin Error", error);

        throw error;
    }
};
