import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import interviewReducer from "./interviewSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    interview: interviewReducer,
  },
});
