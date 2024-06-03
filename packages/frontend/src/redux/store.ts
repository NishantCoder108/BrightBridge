import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import courseReducer from "./slices/authSlice";
import verifyReducer from "./slices/verifySlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        course: courseReducer,
        verifyToken: verifyReducer,

        // ... other reducers ...
    },
});
// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
