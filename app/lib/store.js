import { configureStore } from "@reduxjs/toolkit";
import curntTimeReducer from "./features/Time/curTimeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      currentTime: curntTimeReducer,
    },
  });
};
