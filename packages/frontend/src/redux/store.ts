import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import courseReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    course: courseReducer,
    // ... other reducers ...
  },
});
// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
