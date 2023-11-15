import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}
const initialState: AuthState = {
  token: null, // Token is null initially
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    // Add other reducers as needed
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
