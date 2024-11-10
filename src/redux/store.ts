import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "@/redux/newsSlice";
import userReducer from "@/redux/userSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
