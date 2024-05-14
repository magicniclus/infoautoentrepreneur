import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./adminSlice";
import userReducer from "./createUserSlice";

export const store = configureStore({
  reducer: {
    createUser: userReducer,
    admin: adminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
