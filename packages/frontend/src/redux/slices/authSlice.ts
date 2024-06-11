import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    email: string | null;
    token: string | null;
    message: string | null;
    role: string | null;
}
const initialState: AuthState = {
    token: null, // Token is null initially
    email: null,
    message: null,
    role: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // setToken: (state, action) => {
        //     state = action.payload;
        //     // if (state != null) {
        //     //     localStorage.setItem("currentUser", JSON.stringify(state));
        //     // }
        // },
        clearToken: (state) => {
            state.token = null;

            localStorage.removeItem("currentUser");
        },
        // Add other reducers as needed
    },
});

export const { clearToken } = authSlice.actions;
export default authSlice.reducer;
