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
    },
});

export const { setVerifiedToken } = authVerifySlice.actions;
export default authVerifySlice.reducer;
