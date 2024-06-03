import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    verifyToken: boolean;
    token?: null; // Token is null initially
    email?: null;
    message?: null;
    role?: null;
}
const initialState: AuthState = {
    token: null, // Token is null initially
    email: null,
    message: null,
    role: null,
    verifyToken: false,
};

const authVerifySlice = createSlice({
    name: "authVerify",
    initialState,
    reducers: {
        setVerifiedToken: (state, action) => {
            state.verifyToken = action.payload;
        },
        clearToken: (state, action) => {
            if (state) {
                state.token = null;
                state.email = null;
                state.message = null;
                state.role = null;
                state.verifyToken = false;
            }

            localStorage.removeItem("currentUser");
        },
    },
});

export const { setVerifiedToken } = authVerifySlice.actions;
export default authVerifySlice.reducer;
