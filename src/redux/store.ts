import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "@/redux/newsSlice";
import userReducer from "@/redux/userSlice";
import kanbanReducer from "@/redux/kanbanSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    users: userReducer,
    kanban: kanbanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
