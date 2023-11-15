import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    // ... other reducers ...
  },
});
// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
