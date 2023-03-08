import { configureStore } from "@reduxjs/toolkit";
import { formsReducer } from "./forms/reducers";

const rootReducer = {
  forms: formsReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
